const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt.js')
//Create a user using : POST "/api/auth/createuser". No login requred

router.post('/createuser',[
    body('name').isLength({min: 3}),
    body('email').isEmail(),
    body('password').isLength({min: 5}),
] , async (req,res)=>{
    
    // Finds the validation errors in this request and wraps them in an object with handy functions
    //if there are errors , return bad request and then the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether a user with the same email already exists or not
    try{
    let user = await User.findOne({email: req.body.email})
      if(user){
        return res.status(400).json({error: "Sorry, a user with this email already exists"})
      }
      secPass = req.body.password
      //create a new user
      user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    res.json(user)
  } catch(error){ //catch errors
    console.error(error.message);
    res.status(500).send("Some error occured")
  }
})

module.exports = router
