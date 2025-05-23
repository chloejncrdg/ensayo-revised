import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
  
  const token = req.cookies.access_token_client;
  if (!token) {
    console.log('No token found in cookies');
    return next(createError(401, "You are not authenticated!"))
  }
  
  jwt.verify(token, process.env.JWT, (err, user) => {
    if(err) {
      console.log('Token verification failed:', err);
      return next(createError(403, "Invalid token!"))
    }
    req.user = user
    next()
  })    
}
