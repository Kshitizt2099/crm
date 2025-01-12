const { Customer } = require('../models');

exports.createCustomer = async (req, res) => {
  console.log(req.body)
  let { name, email, phone, address, password } = req.body;
  const customer_id = generateCustomerId();
  const account_creation_date = new Date();
  const username = `${name}${phone.slice(-4)}`;
  const account_status="customer"
  try {
    const customer = new Customer({
      name, email, phone, address, customer_id, account_creation_date, account_status, username
    });
  
    await customer.save();
   
    res.status(201).send({msg:'customer created'})
    
  } catch (error) {
    res.status(400).send({msg:error.message})
  }
  
};

function generateCustomerId() {
    const randomNum = Math.floor(Math.random() * 10000);
    const timestamp = Date.now();
    return `CUST-${randomNum}-${timestamp}`;
}
