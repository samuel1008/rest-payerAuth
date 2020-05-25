const express = require('express');
const router = express.Router();

router.get('/payment', (req, res) => {

  res.send("you're in the payments page");
  console.log("inside processPayments controller");
});


module.exports = router;