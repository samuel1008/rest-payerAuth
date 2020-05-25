const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const paymentRoutes = require('./routes/payment');
const transactionRoutes = require('./routes/transaction')

//middleware
app.use(cors());
app.use(morgan());
app.use(express.json());

//routes
app.get('/', (req, res)  => res.send('API is running'));

app.use('/', paymentRoutes);
app.use('/', transactionRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listneing on port ${port}`));