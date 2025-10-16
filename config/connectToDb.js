const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    // The connection string comes from your .env file
    const uri = process.env.MONGO_URI;

    if (!uri) {
      throw new Error("MONGO_URI not found in environment variables");
    }

    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB successfully!");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectToDb;





