const admin = require('../config/firebaseAdmin');

const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.replace('Bearer ', '')
      : null;

    if (!token) {
      return res.status(401).json({ message: 'Missing Authorization token' });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = {
      uid: decodedToken.uid,
      email: decodedToken.email || null,
    };
    return next();
  } catch (error) {
    console.error('Auth error:', error.message || error);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

module.exports = requireAuth;
