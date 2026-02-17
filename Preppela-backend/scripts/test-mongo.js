import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  try {
    console.log("Connecting to:", process.env.MONGO_URI ? process.env.MONGO_URI.split("@")[1] : "MONGO_URI missing");
    await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected OK");
    process.exit(0);
  } catch (err) {
    console.error("Connect error:", err);
    process.exit(1);
  }
})();