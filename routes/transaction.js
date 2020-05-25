const express = require('express');
const router = express.Router();

router.get('/transaction', (req, res) => {

  res.send("you're in the find transaction page");
  console.log("inside transaction controller");
});


module.exports = router;