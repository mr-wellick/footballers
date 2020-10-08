import jwt from 'jsonwebtoken';

const newToken = user => {
  return jwt.sign({ id: user.id }, process.env.SECRET, {
    expiresIn: process.env.EXPIRES_IN
  });
};

export default newToken;
