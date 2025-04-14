const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');

require('dotenv').config(); // Load environment variables

const app = express();
const PORT = 3000;

async function startServer() {
  await connectDB();
  app.use(bodyParser.json());
  // app.use(express.static('public'));
  // app.use('/notes', notesRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running fine on port : ${PORT} `);
  });
}

startServer();
