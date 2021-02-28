const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');

const User = require('./models/User');

require('./config/db');
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, id) => {
      // console.log(err);
      if (err) throw new Error('No creds stored');
      req.user = id;
      next();
    });
  } catch (err) {
    res.status(403).send(err.message);
  }
}

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 3600 });
}

const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ data: 'Server alive!' }));

router.post('/auth/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email });

    if (!foundUser || !bcrypt.compareSync(password, foundUser.get('password')))
      throw new Error('Bad credentials');

    const payload = {
      username: foundUser.get('username'),
      email: foundUser.get('email'),
      id: foundUser.get('_id'),
    };

    const token = generateAccessToken(payload);

    res.status(200).json({ data: foundUser, token });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/auth/signup', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) throw new Error('Email already in use');

    const newUser = await User.create({
      email,
      password: bcrypt.hashSync(password, 12),
      username: `${email.split('@')[0]} user`,
    });

    const payload = {
      username: newUser.get('username'),
      email: newUser.get('email'),
      id: newUser.get('_id'),
    };

    const token = generateAccessToken(payload);

    res.status(201).json({ data: newUser, token });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message);
  }
});

app.get('/auth/profile', authenticateToken, async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({ data: user });
});

app.use('/', router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
