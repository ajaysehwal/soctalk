import mongoose from "mongoose";
export const DB_connection = async () => {
  const connectionString = process.env.Database_URL || "";
  try {
    await mongoose.connect(connectionString);
    console.log("Connection with database Stablized...");
  } catch (err: any) {
    console.log("Error connection to mongoDB", err.message);
  }
};
