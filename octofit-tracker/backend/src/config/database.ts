import mongoose from "mongoose";

const connectDatabase = async () => {
  await mongoose.connect("mongodb://localhost:27017/octofit_db");
};

export { mongoose };
export default connectDatabase;
