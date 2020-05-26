const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const crypto = require('crypto');




router.get('/payment', (req, res) => {


  var requestHost = 'apitest.cybersource.com';
var merchantId = 'the_13b';
var merchantKeyId = '43614583-96bf-4b44-b763-1156572108f8';
var merchantSecretKey = '2ly12RK6uY6yPwXKk6XCWbzfOca39Vg1Abown9IqF9g=';
var payload = '{' +
        '  \"clientReferenceInformation\": {' +
        '    \"code\": \"FromMac34\"' +
        '  },' +
        '  \"processingInformation\": {' +
        '    \"commerceIndicator\": \"internet\"' +
        '  },' +
        '  \"orderInformation\": {' +
        '    \"billTo\": {' +
        '      \"firstName\": \"john\",' +
        '      \"lastName\": \"doe\",' +
        '      \"address1\": \"201 S. Division St.\",' +
        '      \"postalCode\": \"48104-2201\",' +
        '      \"locality\": \"Ann Arbor\",' +
        '      \"administrativeArea\": \"MI\",' +
        '      \"country\": \"US\",' +
        '      \"phoneNumber\": \"999999999\",' +
        '      \"email\": \"test@cybs.com\"' +
        '    },' +
        '    \"amountDetails\": {' +
        '      \"totalAmount\": \"10\",' +
        '      \"currency\": \"USD\"' +
        '    }' +
        '  },' +
        '  \"paymentInformation\": {' +
        '    \"card\": {' +
        '      \"expirationYear\": \"2031\",' +
        '      \"number\": \"5555555555554444\",' +
        '      \"securityCode\": \"123\",' +
        '      \"expirationMonth\": \"12\",' +
        '      \"type\": \"002\"' +
        '    }' +
        '  }' +
				'}';

  res.send("you're in the payments page");
  console.log("inside processPayments controller");




});


module.exports = router;