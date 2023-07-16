const User = require('../model/user');
const Chat=require('../model/chats');
module.exports.create = async function (req, res) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      console.log('User created:', newUser);
      return res.status(200).json({ message: 'User Successfully Created!', user: newUser });
    } else {
      return res.status(401).json({ message: 'error in signup' });
    }
  } catch (err) {
    console.log('Error in signing up:', err);
    return res.status(401).json({ message: 'error in signup' });
  }
};
module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } });
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};
module.exports.getCurrentUser = async (req, res) => {
  console.log("entering");
  try {
    const userId = req.user.id;
    console.log(userId);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(501).json({ error: 'Internal server error' });
  }
};
module.exports.createSession = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if(user.password===password)
     return res.status(200).json({ message: 'User Successfully Logged in!', user: user });
    else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}
module.exports.destroySession = async (req, res) => {
  try {
    if (!req.params.id) return res.status(401).json({ message: "User id is required" });
    return res.status(200).json({ message: 'User Successfully Logged Out!' });
  }
  catch (error) {
    console.error(error);
    res.status(501).json({ error: 'Internal server error' });
  }
}
module.exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const chat = new Chat({
      message: message,
      users:[from,to],
      sender:from
    });
    const savedChat = await chat.save();
    res.status(200).json(savedChat);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
module.exports.getMessage = async (req, res) => {
  try {
    const { from, to } = req.query; // Use req.query instead of req.body
    console.log(from, to);
    const messages = await Chat.find({
      users:{
        $all: [from,to]
      }
    }).sort({updatedAt:1});
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message,
      };
    });
    res.json(projectedMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send message' });
  }
};
