require("dotenv").config();
const app = require("./src/app.js");
const connectDB = require("./src/config/database.js");
const {PORT} = process.env;
const port = PORT || 3000;
const http = require("http");

(async function(){
  // Connect to database
  await connectDB();

  const server = http.createServer(app);

  // Start server
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();