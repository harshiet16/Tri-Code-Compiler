import mongoose from "mongoose";

export const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      dbName: "wd-compiler",  
    });
    console.log("Connection established!");
  } catch (error) {
    console.error("Error connecting to the database!");
    console.error("Is your IP whitelisted in MongoDB Atlas?");
    console.error("Current MONGO_URI:", process.env.MONGO_URI);
    console.error(error);
  }
};
 