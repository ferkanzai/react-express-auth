const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const users = [
  {
    email: 'pepito@gmail.com',
    password: '1234asd',
    username: 'pepe el user',
    id: 1,
  },
  {
    email: 'juanito@gmail.com',
    password: '1234asd',
    username: 'juan el user',
    id: 2,
  },
  {
    email: 'maria@gmail.com',
    password: '1234asd',
    username: 'maria la user',
    id: 3,
  },
];

// Metemos el router aquí porque es un server mock
const router = express.Router();

router.get('/', (req, res) => res.status(200).json({ data: 'Server alive!' }));

router.post('/auth/login', (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = users.find((user) => {
      return user.password === password && user.email === email;
    });

    if (!foundUser) throw new Error('Bad credentials');

    res.status(200).json({ data: foundUser });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/auth/signup', (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (users.find((user) => user.email === email)) throw new Error('Email already in use');

    const newUser = {
      email,
      password,
      username: `${email.split('@')[0]} user`,
      id: users.length + 1,
    };

    const addUser = users.push(newUser);

    res.status(201).json({ data: newUser });
  } catch (err) {
    console.error(err);
    res.status(400).send(err.message );
  }
});

app.use('/', router);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
