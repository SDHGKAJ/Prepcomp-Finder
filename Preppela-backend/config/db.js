import mongoose from "mongoose";

export default async function connectDB() {
  const MONGO = process.env.MONGO_URI;
  if (!MONGO) {
    console.error("MONGO_URI not set");
    process.exit(1);
  }
  try {
    await mongoose.connect(MONGO, { serverSelectionTimeoutMS: 10000 });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    console.error("Check MONGO_URI, Atlas IP whitelist and local DNS/network.");
    process.exit(1);
  }
}
