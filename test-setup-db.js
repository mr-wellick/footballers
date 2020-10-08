import mongoose from 'mongoose';
import cuid from 'cuid';
import map from 'lodash.map';
import { User } from './src/user/user.model.js';

const models = { User };
const URI = 'mongodb://localhost:27017/lrnz-devapi-testing';

const remove = collection => {
  return new Promise((resolve, reject) => {
    collection.deleteOne(err => {
      if (err) return reject(err);
      resolve();
    });
  });
};

beforeEach(async done => {
  const db = cuid();

  function clearDB() {
    return Promise.all(
      map(mongoose.connection.collections, c => remove(c))
    );
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(URI + db, {
        useNewUrlParser: true,
        autoIndex: true
      });
      await clearDB();
      await Promise.all(
        Object.keys(models).map(name => models[name].init())
      );
    } catch (err) {
      console.log('connection error');
      console.error(err);
      throw err;
    }
  } else {
    await clearDB();
  }

  done();
});

afterEach(async done => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.disconnect();
  return done();
});

afterAll(done => {
  return done();
});
