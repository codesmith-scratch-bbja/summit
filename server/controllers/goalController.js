const express = require('express');
const prisma = require('../db.js');

const goalController = {
  getUserGoals: async (req, res, next) => {
    console.log('Getting user goals');
    try {
      res.locals.allGoals = { message: `REQUEST RECEIVED TO GET ALL GOALS` };

      // Check if session is valid and associated with user
      // console.log(sessions);
      // const session = sessions.get(req.cookies.session);
      // const userId = req.query.user_id;
      // console.log({ session, userId });
      // if (!session) {
      //   res.status(401).send('Unauthorized');
      //   return;
      // }

      // if (session.userId !== Number(userId)) {
      //   res.status(403).send('Forbidden');
      //   return;
      // }
      console.log('Querying Db');

      const userGoals = await prisma.goal.findMany({
        where: {
          userId: 23
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

  createGoal: async (req, res, next) => {
    // destructure whatever is necessary from req.body for new path creation.

    // create new path object here according to DB Schema.

    try {
      // add to new path to DB.
      res.locals.newGoal = { message: 'REQUEST RECEIVED TO CREATE GOAL' };
      console.log(req.body);
      const newGoal = await prisma.goal.create({
        data: {
          title: req.body.title,
          userId: Number(req.locals.userId)
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
  }
};

module.exports = goalController;
