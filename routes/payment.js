const express = require('express');
const router = express.Router();
var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.resolve('Data/Configuration.js');
var configuration = require(filePath);


router.post('/', (req, res) => {

  const data = req.body
  console.log("this is req.body " + data)
  
  try {
    var configObject = new configuration();
    var instance = new cybersourceRestApi.PaymentsApi(configObject);
  
    var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    clientReferenceInformation.code = 'fromMac74';
  
    var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
    processingInformation.commerceIndicator = 'internet';
  
    var subMerchant = new cybersourceRestApi.Ptsv2paymentsAggregatorInformationSubMerchant();
    subMerchant.cardAcceptorId = '1234567890';
    subMerchant.country = 'US';
    subMerchant.phoneNumber = '4158880000';
    subMerchant.address1 = '1 Market St';
    subMerchant.postalCode = '94105';
    subMerchant.locality = 'San Francisco';
    subMerchant.name = 'Visa Inc';
    subMerchant.administrativeArea = 'CA';
    subMerchant.region = 'PEN';
    subMerchant.email = 'test@cybs.com';
  
    var aggregatorInformation = new cybersourceRestApi.Ptsv2paymentsAggregatorInformation();
    aggregatorInformation.subMerchant = subMerchant;
    aggregatorInformation.name = 'V-Internatio';
    aggregatorInformation.aggregatorId = '123456789';
  
    var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
    amountDetails.totalAmount = '102.21';
    amountDetails.currency = 'USD';
  
    var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    billTo.country = 'US';
    billTo.firstName = 'John';
    billTo.lastName = 'Deo';
    billTo.phoneNumber = '4158880000';
    billTo.address1 = 'test';
    billTo.postalCode = '94105';
    billTo.locality = 'San Francisco';
    billTo.administrativeArea = 'MI';
    billTo.email = 'test@cybs.com';
    billTo.address2 = 'Address 2';
    billTo.district = 'MI';
    billTo.buildingNumber = '123';
    billTo.company = 'Visa';
  
    var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
    orderInformation.amountDetails = amountDetails;
    orderInformation.billTo = billTo;
  
    var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
    var card = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
    card.expirationYear = '2031';
    card.number = req.body.number;
    card.expirationMonth = '03';
    card.securityCode = '123';
    card.type = '001';
    paymentInformation.card = card;
  
    var request = new cybersourceRestApi.CreatePaymentRequest();
    request.clientReferenceInformation = clientReferenceInformation;
    request.processingInformation = processingInformation;
    request.aggregatorInformation = aggregatorInformation;
    request.orderInformation = orderInformation;
    request.paymentInformation = paymentInformation;
  
  
    console.log('\n*************** Process Payment ********************* ');
  
      instance.createPayment(request, function (error, data, response) {
      if (error) {
        console.log('\nError in process a payment : ' + JSON.stringify(error));
      }
      else if (data) {
        console.log('\nData of process a payment : ' + JSON.stringify(data));
        res.send(data)
      }
      console.log('\nResponse of process a payment : ' + JSON.stringify(response));
      console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
      var requestID = data.id;
      console.log("request id = " + requestID);
      callback(error, data);
      
    });
  
  
  } catch (error) {
    console.log(error);
  }
  
});



module.exports = router;