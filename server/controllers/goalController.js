const express = require('express');
const prisma = require('../db.js');

const goalController = {
  getUserGoals: async (req, res, next) => {
    let username;
    if (!req.query.username) {
      username = req.cookies.loggedInAs;
    } else {
      username = req.query.username;
    }
    console.log('Getting user goals', username);
    try {
      const user = await prisma.user.findFirst({
        where: {
          name: username
        },
        select: {
          id: true
        }
      });

      console.log('Querying Db');

      const userGoals = await prisma.goal.findMany({
        where: {
          activeUsers: {
            some: {
              id: user.id
            }
          }
        },
        include: {
          tasks: {
            include: {
              activeUsers: {
                where: {
                  id: user.id
                },
                select: {
                  name: true
                }
              },
              completedUsers: {
                where: {
                  id: user.id
                },
                select: {
                  name: true
                }
              }
            }
          }
        }
      });

      if (!userGoals) {
        console.log('No data found');
        res.locals.userGoals = [];
        return next();
      }
      console.log({ userGoals });
      res.locals.userGoals = userGoals;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      console.log(err);
      if (err)
        return next({
          log: 'Express caught error in goalController/getAllGoals',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },
  addTask: async (req, res, next) => {
    console.log('Adding task to goal');
    const userId = req.cookies.userId;
    // const userId = 'cleg4r33a00017frkqbg7abhg';

    const newTask = await prisma.goal.update({
      where: {
        id: Number(req.body.goalId)
      },
      data: {
        tasks: {
          create: [
            {
              title: req.body.title,
              activeUsers: {
                connect: {
                  id: userId
                }
              }
            }
          ]
        }
      }
    });

    res.locals.newTask = newTask;
    next();
  },
  completeTask: async (req, res, next) => {
    console.log('Marking task complete');
    //const userId = 'cleg4r33a00017frkqbg7abhg';
    const { userId } = req.cookies;

    const toggled = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        completedTasks: {
          connect: {
            id: Number(req.params.taskId)
          }
        },
        activeTasks: {
          disconnect: {
            id: Number(req.params.taskId)
          }
        }
      }
    });
    next();
    //will move a task from completed array to active tasks array
    //add a patch router
    //work w/ query to database routing to mark task as complete/incomplete
  },
  uncompleteTask: async (req, res, next) => {
    console.log('Marking task as incomplete');
    //const userId = 'cleg4r33a00017frkqbg7abhg';
    const { userId } = req.cookies;
    const toggled = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        completedTasks: {
          disconnect: {
            id: Number(req.params.taskId)
          }
        },
        activeTasks: {
          connect: {
            id: Number(req.params.taskId)
          }
        }
      }
    });
    next();
  },
  createGoal: async (req, res, next) => {
    console.log('Creating goal');
    const userId = req.cookies.userId;

    try {
      // add to new path to DB.
      res.locals.newGoal = { message: 'REQUEST RECEIVED TO CREATE GOAL' };
      console.log(req.body);

      const newGoal = await prisma.goal.create({
        data: {
          title: req.body.title,
          activeUsers: {
            connect: {
              id: userId
            }
          },
          tasks: {
            create: req.body.tasks.map((task) => {
              return {
                title: task.title,
                activeUsers: {
                  connect: {
                    id: userId
                  }
                }
              };
            })
          }
        }
      });
      res.locals.newGoal = newGoal;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      if (err)
        return next({
          log: 'Express caught error in goalController/createGoal',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },

  adoptGoal: async (req, res, next) => {
    console.log('Adopting goal');
    const userId = req.cookies.userId;
    const goalToAdopt = req.body.goalId;
    console.log('userId', userId, 'goalToAdopt', goalToAdopt);
    try {
      const adoptedGoal = await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          activegoals: {
            connect: {
              id: goalToAdopt
            }
          }
        }
      });
      res.locals.adoptedGoal = adoptedGoal;
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      if (err)
        return next({
          log: 'Express caught error in goalController/adoptGoal',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },

  updateGoal: async (req, res, next) => {
    // destructure whatever is needed from the req.body to update the path;
    try {
      // update existing goal in the DB, the goal id will be passed in the request params (URL);
      res.locals.updatedGoal = {
        message: 'REQUEST RECEIVED TO UPDATE GOAL',
        goalToUpdate: req.params.id
      };
      next();
    } catch (err) {
      if (err)
        return next({
          log: 'Express caught error in goalController/updateGoal',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },

  deleteGoal: async (req, res, next) => {
    try {
      res.locals.deletedGoal = {
        message: 'REQUEST RECEIVED TO DELETE GOAL',
        goalToDelete: req.params.id
      };
      next();
    } catch (err) {
      if (err) {
        return next({
          log: 'Express caught error in goalController/deleteGoal',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
      }
    }
  },
  trendingGoals: async (req, res, next) => {
    console.log('Getting trending goals');
    const trendingGoals = await prisma.goal.findMany({
      where: {
        trending: true
      }
    });
    res.locals.trendingGoals = trendingGoals;
    next();
  },
  friendGoals: async (req, res, next) => {
    console.log('Getting friends goals');
    const userId = req.cookies.userId;
    // console.log(req.query);
    // const userId = req.query.userId;
    console.log({ userId });
    // Get following relation array
    const data = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        following: {
          select: {
            id: true
          }
        }
      }
    });
    console.log(data);
    if (!data) {
      console.log('No friends found');
      res.locals.friendGoals = [];
      return next();
    }
    const ids = data.following.map((user) => user.id);

    // Get goals of all users within the followig relation array
    const friendGoals = await prisma.user.findMany({
      where: {
        id: {
          in: ids
        }
      },
      select: {
        name: true,
        image: true,
        activegoals: {
          select: {
            title: true,
            id: true
          }
        }
      }
    });
    console.log(friendGoals);
    res.locals.friendGoals = friendGoals;
    next();
  }
};

module.exports = goalController;
