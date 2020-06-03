const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const paymentRoutes = require('./routes/payment');
const transactionRoutes = require('./routes/transaction')
const bodyParser = require('body-parser')
const ejs = require('ejs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

require('dotenv').config();


//middleware
app.use(cors());
app.use(morgan());
//init middleware, body-parser is part of express - this will allow us to get data in user route req.body...etc
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

//routes
app.get('/', (req, res) => {
  
  

  const randomID = uuidv4();
  const date = new Date().getTime() / 1000;
  const OrgUnitId = process.env.ORG_UNIT_ID;
  const apiIdentifier = process.env.API_IDENTIFIER
  const secretKey = process.env.API_KEY

  const payload = {

    "jti": randomID,
    "iat": date,
    "iss": apiIdentifier,
    "OrgUnitId": OrgUnitId,
    "ReferenceId": "samTest1234",
    "Payload": {
        "OrderDetails": {
            "OrderNumber": "0e5c5bf2-ea64-42e8-9ee1-71fff6522e15",
            "Amount": "1500",
            "CurrencyCode": "840"
        }
    },
    "ObjectifyPayload": true,
    "ReferenceId": "c88b20c0-5047-11e6-8c35-8789b865ff15",
    "exp": 1449001465,
    "ConfirmUrl": 'https://mywebsite.com/confirmHandler'

  }

  const encodedJWT = jwt.sign(payload, secretKey, (err, token) => {
    if (err) {
      console.log(err)
    } else {
      console.log(token)
      res.render('index', {token: token}); 
      
    }
  });

  console.log("encodedJWT = " + encodedJWT);


});

app.use('/payment', paymentRoutes);
app.use('/', transactionRoutes);



const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`listneing on port ${port}`)

});