const prisma = require('../db.js');

const userController = {};

userController.getAvatar = async (req, res, next) => {
  console.log('Getting avatar');
  try {
    const userId = req.cookies.userId;

    const avatar = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        image: true
      }
    });

    if (!avatar) {
      console.log('No data found');
    }
    console.log(avatar);
    res.locals.avatar = avatar;
    return next();
  } catch (err) {
    // if DB error, catch that error and return to global error handler.
    console.log(err);
    if (err)
      return next({
        log: 'Express caught error in userController/getAvatar',
        status: 400,
        message: { err: `An error occured: ${err}` }
      });
  }
};

module.exports = userController;
