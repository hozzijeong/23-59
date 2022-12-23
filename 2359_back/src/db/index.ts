// import mongoose from 'mongoose';

// const connectDB = () => {
//   const DB_URL = process.env.MONGODB_URL || 'mongodb+srv://team16:1234@cluster0.cei9suq.mongodb.net/test';
//   const db = mongoose.connection;
//   try {
//     mongoose.set('strictQuery', false);
//     mongoose.connect(DB_URL);

//     db.on('connected', () => console.log(`정상적으로 MongoDB 서버에 연결되었습니다. ${DB_URL}`));
//   } catch (error) {
//     db.on('error', () => console.log(`\nMongoDB 연결에 실패하였습니다.\n${DB_URL}\n${error}`));
//   }
// };

// export default connectDB;

export * from './models/content-model';
export * from './models/question-model';
