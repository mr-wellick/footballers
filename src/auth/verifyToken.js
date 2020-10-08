import jwt from 'jsonwebtoken';

const verifyToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) {
        return reject(err);
      }

      resolve(payload);
    });
  });
};

export default verifyToken;
