import User from "../models/user.model.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    if (!name || !email || !password || !phone || !address) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Passward length atleast 6 character",
      });
    }

    function validataEmail(email) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    }

    if (!validataEmail(email)) {
      return res.status(400).json({ message: "Please send a vaild email" });
    }

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(400).json({
        message: "User already existed",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      phone,
      address,
    });
    const createUser = user.toObject();
    delete createUser.password;

    if (!createUser) {
      console.log("User is not created");
      return res.status(400).json({ message: "User not created" });
    }

    return res.status(201).json({
      success: true,
      message: "User create successfully",
      user: createUser,
    });
  } catch (error) {
    console.log("Error in the register controller", error.message);
    return res.status(500).json({
      message: "Error occur in register controller",
      error: error.message,
    });
  }
};
