//verufy  helper function
const { verifyToken: verifyTokenUtility } = require('../utils/jwt');
const  User  = require('../database/models/user'); 
//verifyToken MiddlewareAuthentication
const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = verifyTokenUtility(token); 

    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user; //attaches the authenticated user's data to the req object.
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const allowRoles = (...roles) => { //...rest operator accepts any number of arguments and groups them into an array
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied: unauthorized role' });
    }
    next();
  };
};

module.exports = {
  verifyToken,
  allowRoles,
};
