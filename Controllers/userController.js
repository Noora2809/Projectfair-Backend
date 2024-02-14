//Define logic functions
const users = require("../Models/userSchema");
//Register logic functions

//import jwt
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
  console.log("Inside register fn");
  try {
    // const existingUser=await
    const { username, email, password } = req.body;
    console.log(`${username} ${email} ${password}`);
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(402).json("User already exists");
    } else {
      const newUser = new users({
        username,
        email,
        password,
        github: "",
        link: "",
        profile: "",
      });
      await newUser.save(); //data saved in mongodb
      res.status(200).json("user created succesfully");
    }
  } catch (err) {
    res.status(500).json("Server error");
  }
};

exports.login = async (req, res) => {
  const{email, password} = req.body;
  try {
    const user = await users.findOne({ email, password });
    if(user){
      const token = jwt.sign({userId:user._id},"superkey2024")
      console.log(token);
      res.status(200).json({user,token});

    } else {
      res.status(404).json("Invalid user");
    }
  } catch (err) {
    res.status(500).json("Server error" + err.message);
  }
};
