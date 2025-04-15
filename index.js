const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const notesRoutes = require('./routes/notes');


require('dotenv').config();

const app = express();
const PORT = 3000;

async function startServer() {
  await connectDB();
  
  //middleware
  app.use(bodyParser.json());

  app.use(express.static('public'));

  

  // Add a route for the root directry URL
  app.get('/', (req, res) => {
    res.send('Welcome to the Note App!');
  });



  app.use('/notes', notesRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running fine on port : ${PORT} `);
  });
}

startServer();
