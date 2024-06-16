import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_DB_URL}/${DB_NAME}`
    );
    console.log("db connected");
    // console.log("db connected", connectionInstance);
  } catch (error) {
    console.log("mongodb connection error", error);
    process.exit(1);
  }
};
export default connectDb;
