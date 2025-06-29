const { verifyToken: verifyTokenUtility } = require('../utils/jwt'); // ✅ Rename here
const { User } = require('../database/models/user'); 
const verifyToken = async (req, res, next) => {
  const header = req.headers.authorization;
  const token = header.split(" ")[1]; // Extracts token after "Bearer "



  try {
    const decoded = verifyTokenUtility(token); 
    const user = await User.findByPk(decoded.id);
    if (!user) return res.status(401).json({ error: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

const allowRoles = (...roles) => {
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
