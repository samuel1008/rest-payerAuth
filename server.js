const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const paymentRoutes = require('./routes/payment');
const transactionRoutes = require('./routes/transaction')
const bodyParser = require('body-parser')
const ejs = require('ejs');



//middleware
app.use(cors());
app.use(morgan());
//init middleware, body-parser is part of express - this will allow us to get data in user route req.body...etc
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => res.render('index'));

app.use('/payment', paymentRoutes);
app.use('/', transactionRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listneing on port ${port}`));