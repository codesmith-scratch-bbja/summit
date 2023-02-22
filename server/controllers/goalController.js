const express = require('express');
const prisma = require('../db.js');

const goalController = {
  getUserGoals: async (req, res, next) => {
    console.log('Getting user goals');
    try {
      res.locals.allGoals = { message: 'REQUEST RECEIVED TO GET ALL GOALS' };
      const userId = req.cookies.userId;
      console.log('Querying Db');

      const userGoals = await prisma.goal.findMany({
        where: {
          userId
        },
        include: {
          tasks: {
            include: {
              task: true
            }
          }
        }
      });

      if (!userGoals) {
        console.log('No data found');
      }
      console.log(userGoals);
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

    const newTask = await prisma.goal.update({
      where: {
        id: Number(req.body.goalId)
      },
      data: {
        tasks: {
          create: [
            {
              task: {
                create: {
                  title: req.body.title
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
          userId
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
    const trendingGoals = await prisma.goal.findMany({
      where: {
        trending: true
      }
    });
    res.locals.trendingGoals = trendingGoals;
    next();
  }
};

module.exports = goalController;
