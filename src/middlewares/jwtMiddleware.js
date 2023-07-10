'use strict';
import { verify } from 'jsonwebtoken';
import Constants from '../common/config/constants';
import User from '../models/User';

export default function (expectedRoles) {
  return async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        throwAuthenticationError();
      }
      const headerParts = req.headers.authorization.split(' ');
      const prefix = headerParts[0];
      const token = headerParts[1];
      if (prefix !== 'Bearer' || !token) {
        throwAuthenticationError();
      }
      let decoded = '';
      try {
        decoded = verify(token, process.env.JWT_SECRET);
      } catch (error) {
        throwAuthenticationError();
      }
      const role = decoded.role;
      const id = decoded.id;
      if (!role) {
        throwAuthenticationError();
      }
      if (role && expectedRoles.indexOf(role) !== -1) {
        if (role == Constants.roles.user) {
          const user = await User.findOne({ _id: id }).select(Constants.userSelect);
          if (!user) {
            throwAuthenticationError();
          }
          req.user = user;
        }
        req.id = id;
        req.role = role;
      } else {
        throwAuthenticationError();
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}

function throwAuthenticationError() {
  throw { statusCode: 403, message: 'UNAUTHORIZED' };
}