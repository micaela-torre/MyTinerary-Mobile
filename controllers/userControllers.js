const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
userControllers = {
  newUser: async (req, res) => {
    const { name, lastname, email, password, url, country, google } = req.body;
    let hashedPass = bcryptjs.hashSync(password);
    const newUser = new User({
      name,
      lastname,
      email,
      password: hashedPass,
      url,
      country,
      google,
    });

    try {
      let userExist = await User.findOne({ email: email });
      if (userExist) throw new Error("Email already in use!");
      await newUser.save();
      const token = jwt.sign({ ...newUser }, process.env.SECRETORKEY);
      res.json({
        success: true,
        response: { name: newUser.name, url: newUser.url, token },
        error: null,
      });
    } catch (e) {
      res.json({ success: false, response: e.message });
    }
  },

  logUser: async (req, res) => {
    const { email, password, flagGoogle } = req.body;
    try {
      let userExist = await User.findOne({ email: email });
      if (!userExist) throw new Error("Email and/or password incorrect!");
      if (userExist.google && !flagGoogle)
        throw new Error(
          "You created your account with Google, please log in with them!"
        );
      let passMatch = bcryptjs.compareSync(password, userExist.password);
      if (!passMatch) throw new Error("Email and/or password incorrect!");
      const token = jwt.sign({ ...userExist }, process.env.SECRETORKEY);
      res.json({
        success: true,
        response: { name: userExist.name, url: userExist.url, token },
      });
    } catch (e) {
      res.json({ success: false, response: e.message });
    }
  },

  verifyToken: (req, res) => {
    res.json({
      name: req.user.name,
      url: req.user.url,
      lastname: req.user.lastname,
      _id: req.user._id,
    });
  },
};
module.exports = userControllers;
