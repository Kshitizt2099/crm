const express = require('express');
const { registerUser, login,registerEmployee } = require('../controllers/authController');
const router = express.Router();
router.post('/register/emp', registerEmployee);
router.post('/register', registerUser);
router.post('/login', login);

module.exports = router;




// const express = require('express');
// const { registerEmployee, registerCustomer, login } = require('../controllers/authController');
// const router = express.Router();

// router.post('/register/customer', registerCustomer);
// router.post('/login', login);

// module.exports = router;
