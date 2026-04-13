import { User } from '../models/user.model.js';

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // basic validation

    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // check if user already exists

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    // create user

    const newUser = await User.create({ username, password, email: email.toLowerCase(), loggedIn: false });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, email: newUser.email, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

export default { registerUser };