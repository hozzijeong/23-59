import mongoose from 'mongoose';
// import contentModel from './models/content-model';

const connectDB = () => {
  const DB_URL = process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.';
  const db = mongoose.connection;
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(DB_URL);

    db.on('connected', () => console.log(`정상적으로 MongoDB 서버에 연결되었습니다. ${DB_URL}`));
  } catch (error) {
    db.on('error', () => console.log(`\nMongoDB 연결에 실패하였습니다.\n${DB_URL}\n${error}`));
  }
};

//const DB_URL = process.env.MONGODB_URL || 'MongoDB 서버 주소가 설정되지 않았습니다.';
// const DB_URL = process.env.MONGODB_URL || 'mongodb+srv://team16:1234@cluster0.cei9suq.mongodb.net/test';
// console.log('dburl: ', DB_URL);

// mongoose.connect(DB_URL);
// const db = mongoose.connection;

// db.on('connected', () => console.log(`정상적으로 MongoDB 서버에 연결되었습니다. ${DB_URL}`));
// db.on('error', (error) => console.log(`\nMongoDB 연결에 실패하였습니다.\n${DB_URL}\n${error}`));

//export default connectDB;
export * from './models/content-model';
//export { contentModel };
