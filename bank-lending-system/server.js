const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const loanRoutes = require('./routes/loans');
const paymentRoutes = require('./routes/payments'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/loans', loanRoutes);
app.use('/payments', paymentRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
/*server.js is the starting point of your backend. It:

Sets up the server

Adds helpful tools (middleware)

Connects to your routes

Starts listening for API requests*/
