//const URI = 'mongodb://localhost:27017/lrnz-devapi-testing';

beforeEach(async (done) => {
  console.log('before each');
  done();
});

afterEach(async (done) => {
  console.log('after each');
  done();
});

afterAll((done) => {
  console.log('done');
  return done();
});
