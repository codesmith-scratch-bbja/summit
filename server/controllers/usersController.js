// const prisma = require('../db.js');
import prisma from '../db.js';
import { formatGoals } from './goalsController.js';
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

userController.getSessionData = async (req, res, next) => {
  console.log('Getting session data!');
  if (res.locals.authenticated) {
    const { user } = req.session;
    const { name, avatarUrl, id } = user;
    res.locals.sessionData = { id, name, avatarUrl };
  }
  return next();
};

userController.getProfileData = async (req, res, next) => {
  console.log('Getting user profile data');
  const { username: requestedProfileName } = req.params;
  console.log({ requestedProfileName });
  if (res.locals.authenticated) {
    console.log('Checking if profile is own profile');
    res.locals.isOwnProfile = req.session.user.name === requestedProfileName;
  } else {
    res.locals.isOwnProfile = false;
  }

  try {
    const profileUser = await prisma.user.findFirst({
      where: {
        name: requestedProfileName
      },
      select: {
        id: true
      }
    });

    if (!profileUser) {
      console.log('No data found');
      res.locals.profileData = {};
      return next();
    }

    const profileData = await prisma.user.findUnique({
      where: {
        id: profileUser.id
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
        },
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
                    id: profileUser.id
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
                    id: profileUser.id
                  }
                }
              }
            }
          }
        }
      }
    });
    const formattedActiveGoals = formatGoals(profileData.activegoals);
    const formattedCompletedGoals = formatGoals(profileData.completedGoals);

    const isFollowing = profileData.followedBy.some(
      (user) => user.name === req.session.user.name
    );

    const formattedData = {
      ...profileData,
      activeGoals: formattedActiveGoals,
      completedGoals: formattedCompletedGoals,
      isOwnProfile: res.locals.isOwnProfile,
      isFollowing
    };

    res.locals.profileData = formattedData;
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
  if (!req.session.user) {
    return next({
      log: 'Express caught error in userController/followUser',
      status: 400,
      message: { err: 'User not logged in' }
    });
  }
  const { user } = req.session;
  const { userId: userToFollow } = req.params;
  const { action } = req.body;
  const userFollowing = user.id;

  try {
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

// module.exports = userController;
export default userController;
