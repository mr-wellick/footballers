import verifyToken from './verifyToken.js';
import { User } from '../user/user.model.js';

const protect = async (req, res, next) => {
  const bearer = req.headers.authorization;

  // no token
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ message: 'No token or invalid Bearer scheme.' });
  }

  // get token
  const token = bearer.split('Bearer ')[1].trim();
  let payload;

  // token verification
  try {
    payload = await verifyToken(token);
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token.' });
  }

  // get user
  const user = await User.findById(payload.id)
    .select('-password')
    .lean()
    .exec();

  if (!user) {
    return res.status(401).json({ message: 'No user found.' });
  }

  // will fix when auth middleware is added to protected routes
  /* eslint-disable */
  req.user = user;
  next();
};

export default protect;
