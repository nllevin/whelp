const mongoose = require("mongoose");
const db = require('./keys').mongoURI;
const User = require('../models/User');
const Business = require('../models/Business');
const Review = require('../models/Review');
const faker = require('faker');
const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs');

const filePath = path.resolve(__dirname, 'city_of_new_york.csv');

const seed = async function() {
  await mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log("Connected to MongoDB successfully. Ready to seed"))
    .catch(err => console.log(err));

  const data = fs.readFileSync(filePath, { encoding: "utf-8" });
  const NYCAddresses = data.split("\n").slice(1);

  // delete old documents, create new arrays
  await Promise.all([
    User.deleteMany(),
    Business.deleteMany(),
    Review.deleteMany()
  ]);
  const users = [];
  const businesses = [];

  // construct demo user, add to users array
  const demoUser = new User({
    firstName: "Niles",
    lastName: "Mowgli",
    email: "kitty@aol.com",
    zipCode: "10002",
    avatarUrl: `${faker.image.cats()}/3`,
    password: "hunter2"
  });
  demoUser.password = bcrypt.hashSync(demoUser.password, bcrypt.genSaltSync(10));
  users.push(demoUser);

  // construct user seeds, add to users array
  for (let i = 0; i < 5; i++) {
    const newUser = new User({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      zipCode: faker.address.zipCode(),
      avatarUrl: faker.image.avatar(),
      password: "password"
    });
    newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10));
    users.push(newUser);
  }

  // construct business seeds, add to businesses array
  for (let i = 0; i < 10; i++) {
    const addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

    const newBusiness = new Business({
      name: faker.company.companyName(),
      address: `${addressData[2]} ${addressData[3]}, New York, New York ${addressData[addressData.length - 3]}`,
      lat: addressData[1],
      lng: addressData[0],
      phoneNumber: faker.phone.phoneNumber(),
      schedules: [
        { day: "Sunday", startTime: "9:00", endTime: "17:00" },
        { day: "Monday", startTime: "9:00", endTime: "17:00" },
        { day: "Tuesday", startTime: "9:00", endTime: "17:00" },
        { day: "Wednesday", startTime: "9:00", endTime: "17:00" },
        { day: "Thursday", startTime: "9:00", endTime: "17:00" },
        { day: "Friday", startTime: "9:00", endTime: "17:00" },
        { day: "Saturday", startTime: "9:00", endTime: "17:00" },
      ],
      priceRating: Math.floor(Math.random() * 4 + 1),
      imageUrl: `${faker.image.city()}/${Math.floor(Math.random() * 5 + 1)}`
    });
    businesses.push(newBusiness);
  }

  // save all users and businesses; grab saved documents
  let savedUsers;
  let savedBusinesses;
  await Promise.all([
    User.insertMany(users).then(users => savedUsers = users),
    Business.insertMany(businesses).then(businesses => savedBusinesses = businesses)
  ]);

  // construct review seeds for every user and business
  // add to reviews array
  const reviews = [];
  for (let i = 0; i < savedUsers.length; i++) {
    const user = savedUsers[i];
    for (let j = 0; j < savedBusinesses.length; j++) {
      const business = savedBusinesses[j];
      const newReview = new Review({
        authorId: user._id,
        businessId: business._id,
        businessName: business.name,
        body: faker.random.words(100),
        rating: Math.floor(Math.random() * 5 + 1)
      });
      reviews.push(newReview);
    }
  }
  await Review.insertMany(reviews);

  mongoose.disconnect();
}

seed();