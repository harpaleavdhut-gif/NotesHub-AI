const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");


// REGISTER USER

exports.registerUser = async (req, res) => {

  try {

    const {
      name,
      email,
      password,
    } = req.body;


    // CHECK EXISTING USER

    const userExists = await User.findOne({
      email,
    });

    if (userExists) {

      return res.status(400).json({
        message: "User already exists",
      });

    }


    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // CREATE USER

    const user = await User.create({

      name,

      email,

      password: hashedPassword,

    });


    // RESPONSE

    res.status(201).json({

      message: "User Registered Successfully",

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        profileImage: user.profileImage,

      },

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};



// LOGIN USER

exports.loginUser = async (req, res) => {

  try {

    const {
      email,
      password,
    } = req.body;


    // FIND USER

    const user = await User.findOne({
      email,
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email",
      });

    }


    // CHECK PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid Password",
      });

    }


    // CREATE JWT TOKEN

    const token = jwt.sign(

      {
        id: user._id,
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      }

    );


    // RESPONSE

    res.status(200).json({

      message: "Login Successful",

      token,

      user: {

        _id: user._id,

        name: user.name,

        email: user.email,

        profileImage: user.profileImage,

      },

    });

  } catch (error) {

    res.status(500).json({
      error: error.message,
    });

  }

};