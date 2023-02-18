const express = require('express');

// import Schemas here

const pathController = {
  getAllPaths: async (req, res, next) => {
    try {
      res.locals.paths = { message: `REQUEST RECEIVED TO GET PATHS` };
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      if (err)
        return next({
          log: 'Express caught error in pathController/getAllPaths',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },

  createPath: async (req, res, next) => {
    // destructure whatever is necessary from req.body for new path creation.

    // create new path object here according to DB Schema.

    try {
      // add to new path to DB.
      res.locals.newPath = { message: 'REQUEST RECEIVED TO CREATE PATH' };
      next();
    } catch (err) {
      // if DB error, catch that error and return to global error handler.
      if (err)
        return next({
          log: 'Express caught error in pathController/createPath',
          status: 400,
          message: { err: `An error occured: ${err}` }
        });
    }
  },

  updatePath: async (req, res, next) => {
    // destructure whatever is needed from the req.body to update the path;
  }
};

module.exports = pathController;
