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

userController.getUserId = async (req, res, next) => {
  console.log('Getting user id');
  try {
    const username = req.params.username;

    const userId = await prisma.user.findFirst({
      where: {
        name: username
      },
      select: {
        id: true
      }
    });

    if (!userId) {
      console.log('No data found');
    }
    console.log(userId);
    res.locals.userId = userId;
    return next();
  } catch (err) {
    // if DB error, catch that error and return to global error handler.
    console.log(err);
    if (err)
      return next({
        log: 'Express caught error in userController/getUserId',
        status: 400,
        message: { err: `An error occured: ${err}` }
      });
  }
};

userController.getProfileData = async (req, res, next) => {
  console.log('Getting user profile data');
  try {
    const { username } = req.params;

    const profileData = await prisma.user.findFirst({
      where: {
        name: username
      },
      select: {
        id: true,
        followedBy: {
          select: {
            name: true
          }
        },
        following: {
          select: {
            name: true
          }
        },
        image: true,
        activegoals: {
          select: {
            title: true
          }
        }
      }
    });
    res.locals.profileData = profileData;
    return next();
  } catch (err) {
    // if DB error, catch that error and return to global error handler.
    console.log(err);
    if (err)
      return next({
        log: 'Express caught error in userController/getUserProfileData',
        status: 400,
        message: { err: `An error occured: ${err}` }
      });
  }
};

userController.followUser = async (req, res, next) => {
  console.log('Toggling user follow');
  try {
    const { userId: userFollowing } = req.cookies;
    const { userId: userToFollow } = req.params;
    const { action } = req.body;
    console.log(userFollowing, userToFollow);

    switch (action) {
      case 'follow':
        console.log(`${userFollowing} FOLLOWING ${userToFollow}`);
        await prisma.user.update({
          where: {
            id: userToFollow
          },
          data: {
            followedBy: {
              connect: {
                id: userFollowing
              }
            }
          }
        });
        res.locals.actionTaken = 'follow';
        break;
      case 'unfollow':
        console.log(`${userFollowing} UNFOLLOWING ${userToFollow}`);
        await prisma.user.update({
          where: {
            id: userToFollow
          },
          data: {
            followedBy: {
              disconnect: {
                id: userFollowing
              }
            }
          }
        });
        res.locals.actionTaken = 'unfollow';
        break;
      default:
        console.log('No action specified');
    }

    return next();
  } catch (err) {
    // if DB error, catch that error and return to global error handler.
    console.log(err);
    if (err)
      return next({
        log: 'Express caught error in userController/followUser',
        status: 400,
        message: { err: `An error occured: ${err}` }
      });
  }
};

module.exports = userController;
