const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "VaibhavIsAGoodBoi";

//Route 1: Create a user using : POST "/api/auth/createuser". No login requred

router.post(
  "/createuser",
  [
    body("name").isLength({ min: 3 }),
    body("email").isEmail(), //validations required
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    //if there are errors , return bad request and then the errors
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether a user with the same email already exists or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry, a user with this email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      //create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true
      //return json(user)
      res.json({ success, authToken });
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 2: Authenticate a user using : POST "/api/auth/login". login not required

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 5 }).exists()],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const passComp = await bcrypt.compare(password, user.password);
      if (!passComp) {
        return res.status(400).json({ error: "Wrong Credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken });
    } catch (error) {
      //catch errors
      console.error(error.message);
      res.status(500).send("Some error occured");
    }
  }
);

//Route 3: Get loggedIn user's details using POST "/api/auth/getuser". login required

router.post("/getuser", fetchuser, async (req, res) => {
  try {
    let userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    //catch errors
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
