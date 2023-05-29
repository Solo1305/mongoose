const express = require('express');
const app = express();
require('dotenv').config(); // Load environment variables from .env file
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Middleware to verify working hours
const workingHoursMiddleware = (req, res, next) => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next(); // Continue to the next middleware or route handler
  } else {
    res.send('This web application is only available during working hours (Monday to Friday, 9 to 17).');
  }
};

// Middleware to set up common data for all views
app.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files from the "public" directory
app.use(express.static('public'));

// Home page
app.get('/', workingHoursMiddleware, (req, res) => {
  res.render('home');
});

// Our Services page
app.get('/services', workingHoursMiddleware, (req, res) => {
  res.render('services');
});

// Contact us page
app.get('/contact', workingHoursMiddleware, (req, res) => {
  res.render('contact');
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const { Schema } = mongoose;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

const Person = mongoose.model('Person', personSchema);
const person = new Person({
  name: 'John Doe',
  age: 25,
  favoriteFoods: ['pizza', 'burger']
});

person.save(function(err, data) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person saved:', data);
  }
});
const arrayOfPeople = [
  { name: 'Alice', age: 30, favoriteFoods: ['sushi'] },
  { name: 'Bob', age: 35, favoriteFoods: ['steak', 'pasta'] },
  { name: 'Charlie', age: 40, favoriteFoods: ['burrito'] }
];

Person.create(arrayOfPeople, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log('People created:', people);
  }
});
Person.find({ name: 'Alice' }, function(err, people) {
  if (err) {
    console.error(err);
  } else {
    console.log('People found:', people);
  }
});
const food = 'pizza';

Person.findOne({ favoriteFoods: food }, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found:', person);
  }
});
const personId = 'your-person-id';

Person.findById(personId, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person found:', person);
  }
});
const personId = 'your-person-id';

Person.findByIdAndUpdate(
  personId,
  { $push: { favoriteFoods: 'hamburger' } },
  { new: true },
  function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person updated:', person);
    }
  }
);
const personName = 'John Doe';

Person.findOneAndUpdate(
  { name: personName },
  { age: 20 },
  { new: true },
  function(err, person) {
    if (err) {
      console.error(err);
    } else {
      console.log('Person updated:', person);
    }
  }
);
const personId = 'your-person-id';

Person.findByIdAndRemove(personId, function(err, person) {
  if (err) {
    console.error(err);
  } else {
    console.log('Person removed:', person);
  }
});
const name = 'Mary';

Person.remove({ name: name }, function(err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log('People removed:', result);
  }
});
Person.find({ favoriteFoods: 'burritos' })
  .sort('name')
  .limit(2)
  .select('-age')
  .exec(function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log('Query result:', data);
    }
  });

