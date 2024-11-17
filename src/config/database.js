const mongoose = require("mongoose");

const { SuccessMessage } = require("../utils/messages.js");
const logger = require("../utils/logger.js");
const connectDBModuleLog = logger.getLogger("connectDB_controller");

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(SuccessMessage.DATABASE_CONNECTED);
  } catch (error) {
    connectDBModuleLog.error(error.message);
    connectDBModuleLog.error(error);
    process.exit(1);
  }
}

module.exports = connectDB;