import prisma from '../db.js';

export function formatGoals(goals) {
  const formatted = goals.map((goal) => {
    const formattedTasks = goal.tasks.map((task) => {
      const formattedTask = {
        id: task.id,
        title: task.title,
        completed: task.completedUsers.length > 0
      };
      return formattedTask;
    });
    const formattedGoal = {
      id: goal.id,
      title: goal.title,
      tasks: formattedTasks
    };
    return formattedGoal;
  });
  return formatted;
}

const goalController = {
  getUserGoals: async (req, res, next) => {
    if (!req.session.user) {
      console.log('Unauthorized');
      return res.status(401).send('Unauthorized');
    }

    // Destructure user object from session
    const { user } = req.session;

    try {
      console.log('Querying Db', user);

      const userData = await prisma.user.findUnique({
        where: {
          id: user.id
        },
        include: {
          activegoals: {
            select: {
              id: true,
              title: true,
              tasks: {
                select: {
                  id: true,
                  title: true,
                  completedUsers: {
                    where: {
                      id: user.id
                    }
                  }
                }
              }
            }
          },
          completedGoals: {
            select: {
              id: true,
              title: true,
              tasks: {
                select: {
                  id: true,
                  title: true,
                  completedUsers: {
                    where: {
                      id: user.id
                    }
                  }
                }
              }
            }
          }
        }
      });

      if (!userData) {
        console.log('No data found');
        res.locals.userGoals = [];
        return next();
      }

      const formattedActiveGoals = formatGoals(userData.activegoals);
      const formattedCompletedGoals = formatGoals(userData.completedGoals);

      const formattedData = {
        name: userData.name,
        image: userData.image,
        activeGoals: formattedActiveGoals,
        completedGoals: formattedCompletedGoals
      };

      console.log({ formattedData });
      res.locals.userGoals = formattedData;
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
    if (!req.session.user) {
      console.log('Unauthorized');
      return res.status(401).send('Unauthorized');
    }

    // Destructure user object from session
    const { user } = req.session;

    const toggled = await prisma.user.update({
      where: {
        id: user.id
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
    if (!req.session.user) {
      console.log('Unauthorized');
      return res.status(401).send('Unauthorized');
    }

    // Destructure user object from session
    const { user } = req.session;

    const toggled = await prisma.user.update({
      where: {
        id: user.id
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
    if (!req.session.user) {
      console.log('Unauthorized');
      return res.status(401).send('Unauthorized');
    }

    // Destructure user object from session
    const { user } = req.session;

    try {
      // add to new path to DB.
      res.locals.newGoal = { message: 'REQUEST RECEIVED TO CREATE GOAL' };
      console.log(req.body);

      const newGoal = await prisma.goal.create({
        data: {
          title: req.body.title,
          activeUsers: {
            connect: {
              id: user.id
            }
          },
          tasks: {
            create: req.body.tasks.map((task) => {
              return {
                title: task.title,
                activeUsers: {
                  connect: {
                    id: user.id
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
    if (!res.locals.authenticated) {
      console.log('Unauthorized');
      return res.status(401).send('Unauthorized');
    }
    const { user } = req.session;
    const goalToAdopt = req.body.goalId;
    console.log('userId', user.id, 'goalToAdopt', goalToAdopt);
    try {
      const adoptedGoal = await prisma.user.update({
        where: {
          id: user.id
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

    if (!req.session.user) {
      console.log('No user found');
      res.locals.friendGoals = [];
      return next();
    }
    const userId = req.session.user.id;
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

export default goalController;
