const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect(`${process.env.MONGO_CONNECT}`)
    .then(() => console.log('mongoose connect'))
    .catch((error: any) => console.log('mongoose error', error.message))
};

export default connectDB;