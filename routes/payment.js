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
		var apiClient = new cybersourceRestApi.ApiClient();
		var requestObj = new cybersourceRestApi.CheckPayerAuthEnrollmentRequest();

		var clientReferenceInformation = new cybersourceRestApi.Riskv1authenticationsClientReferenceInformation();
		clientReferenceInformation.code = 'cybs_test4';
		requestObj.clientReferenceInformation = clientReferenceInformation;

		var orderInformation = new cybersourceRestApi.Riskv1authenticationsOrderInformation();
		var orderInformationAmountDetails = new cybersourceRestApi.Riskv1decisionsOrderInformationAmountDetails();
		orderInformationAmountDetails.currency = 'USD';
		orderInformationAmountDetails.totalAmount = '10.99';
		orderInformation.amountDetails = orderInformationAmountDetails;

		var orderInformationBillTo = new cybersourceRestApi.Riskv1authenticationsOrderInformationBillTo();
		orderInformationBillTo.address1 = '1 Market St';
		orderInformationBillTo.address2 = 'Address 2';
		orderInformationBillTo.administrativeArea = 'CA';
		orderInformationBillTo.country = 'US';
		orderInformationBillTo.locality = 'san francisco';
		orderInformationBillTo.firstName = 'John';
		orderInformationBillTo.lastName = 'Doe';
		orderInformationBillTo.phoneNumber = '4158880000';
		orderInformationBillTo.email = 'test@cybs.com';
		orderInformationBillTo.postalCode = '94105';
		orderInformation.billTo = orderInformationBillTo;

		requestObj.orderInformation = orderInformation;

		var paymentInformation = new cybersourceRestApi.Riskv1authenticationsPaymentInformation();
		var paymentInformationCard = new cybersourceRestApi.Riskv1authenticationsPaymentInformationCard();
		paymentInformationCard.type = '001';
		paymentInformationCard.expirationMonth = '12';
		paymentInformationCard.expirationYear = '2025';
		paymentInformationCard.number = req.body.creditCardNumber;
		paymentInformation.card = paymentInformationCard;

		requestObj.paymentInformation = paymentInformation;

    var consumerAuthenticationInformation = new cybersourceRestApi.Riskv1decisionsConsumerAuthenticationInformation();
    consumerAuthenticationInformation.referenceId = 'c88b20c0-5047-11e6-8c35-8789b865ff15';
		consumerAuthenticationInformation.transactionMode = 'S';
		requestObj.consumerAuthenticationInformation = consumerAuthenticationInformation;


		var instance = new cybersourceRestApi.PayerAuthenticationApi(configObject, apiClient);

		instance.checkPayerAuthEnrollment( requestObj, function (error, data, response) {
			if(error) {
				console.log('\nError : ' + JSON.stringify(error));
			}
			else if (data) {
				console.log('\nData : ' + JSON.stringify(data));
      }
      
      res.send(data)

			console.log('\nResponse : ' + JSON.stringify(response));
			console.log('\nResponse Code of Check Payer Auth Enrollment : ' + JSON.stringify(response['status']));
			callback(error, data, response);
		});


    // var configObject = new configuration();
    // var instance = new cybersourceRestApi.PaymentsApi(configObject);
  
    // var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
    // clientReferenceInformation.code = 'fromMac76';
  
    // var processingInformation = new cybersourceRestApi.Ptsv2paymentsProcessingInformation();
    // processingInformation.commerceIndicator = 'internet';

  
    // var amountDetails = new cybersourceRestApi.Ptsv2paymentsOrderInformationAmountDetails();
    // amountDetails.totalAmount = '102.21';
    // amountDetails.currency = 'USD';
  
    // var billTo = new cybersourceRestApi.Ptsv2paymentsOrderInformationBillTo();
    // billTo.country = 'US';
    // billTo.firstName = 'John';
    // billTo.lastName = 'Deo';
    // billTo.phoneNumber = '4158880000';
    // billTo.address1 = 'test';
    // billTo.postalCode = '94105';
    // billTo.locality = 'San Francisco';
    // billTo.administrativeArea = 'MI';
    // billTo.email = 'test@cybs.com';
    // billTo.address2 = 'Address 2';
    // billTo.district = 'MI';
    // billTo.buildingNumber = '123';
    // billTo.company = 'Visa';
  
    // var orderInformation = new cybersourceRestApi.Ptsv2paymentsOrderInformation();
    // orderInformation.amountDetails = amountDetails;
    // orderInformation.billTo = billTo;
  
    // var paymentInformation = new cybersourceRestApi.Ptsv2paymentsPaymentInformation();
    // var card = new cybersourceRestApi.Ptsv2paymentsPaymentInformationCard();
    // card.expirationYear = '2031';
    // card.number = req.body.creditCardNumber;
    // card.expirationMonth = '03';
    // card.securityCode = '123';
    // card.type = '001';
    // paymentInformation.card = card;

    // var consumerAuthenticationInformation = new cybersourceRestApi.Ptsv2paymentsConsumerAuthenticationInformation();
    // consumerAuthenticationInformation.ReferenceId = 'samTest1234';
    // consumerAuthenticationInformation.transactionMode = 'S';
  
    // var request = new cybersourceRestApi.CreatePaymentRequest();
    // request.clientReferenceInformation = clientReferenceInformation;
    // request.processingInformation = processingInformation;
    // request.orderInformation = orderInformation;
    // request.paymentInformation = paymentInformation;
    // request.consumerAuthenticationInformation.ReferenceId;
    // request.consumerAuthenticationInformation.transactionMode;

  
  
    // console.log('\n*************** Process Payment ********************* ');
  
    //   instance.createPayment(request, function (error, data, response) {
    //   if (error) {
    //     console.log('\nError in process a payment : ' + JSON.stringify(error));
    //   }
    //   else if (data) {
    //     console.log('\nData of process a payment : ' + JSON.stringify(data));
    //     Cardinal.continue('cca',
    //     {
    //         "AcsUrl":data.acsUrl,
    //         "Payload":data.pareq
    //     },
    //     {
    //         "OrderDetails":{
    //             "TransactionId" :"123456abc"
    //             // Add the rest of the Order object
    //         }
    //     });
    //     res.send(data)
    //   }
    //   console.log('\nResponse of process a payment : ' + JSON.stringify(response));
    //   console.log('\nResponse Code of process a payment : ' + JSON.stringify(response['status']));
    //   var requestID = data.id;
    //   console.log("request id = " + requestID);
    //   callback(error, data);
      
    // });
  
  
  } catch (error) {
    console.log(error);
  }
  
});





module.exports = router;