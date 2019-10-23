const mongoose = require("mongoose");
const db = require('./keys').mongoURI;
const User = require('../models/User');
const faker = require('faker');
const bcrypt = require('bcryptjs');

const seed = async function() {
  await mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB successfully. Ready to seed"))
    .catch(err => console.log(err));

  await User.deleteMany();

  const demoUser = new User({
    firstName: "Niles",
    lastName: "Mowgli",
    email: "kitty@aol.com",
    zipCode: "94016",
    password: "hunter2"
  });

  demoUser.password = bcrypt.hashSync(demoUser.password, bcrypt.genSaltSync(10));
  await demoUser.save();

  for (let i = 0; i < 5; i++) {
    const newUser = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      zipCode: faker.address.zipCode(),
      password: "password"
    });

    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
    await newUser.save();
  }

  mongoose.disconnect();
}

seed();