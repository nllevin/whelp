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
  for (let i = 0; i < 9; i++) {
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
  let addressData;

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business1 = new Business({
    name: "Golden Clippers Grooming",
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
  businesses.push(business1);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business2 = new Business({
    name: "Sally’s Doggie Salon",
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
  businesses.push(business2);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business3 = new Business({
    name: "Gentle Groomers",
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
  businesses.push(business3);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business4 = new Business({
    name: "The Handsome Pup",
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
  businesses.push(business4);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business5 = new Business({
    name: "SuperPups Grooming",
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
  businesses.push(business5);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business6 = new Business({
    name: "Silver Spoon Dog Provisions",
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
  businesses.push(business6);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business7 = new Business({
    name: "Woof World",
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
  businesses.push(business7);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business8 = new Business({
    name: "Persnickety Poodle Provisions",
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
  businesses.push(business8);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business9 = new Business({
    name: "The Modern Dog",
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
  businesses.push(business9);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business10 = new Business({
    name: "City Canine",
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
  businesses.push(business10);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business11 = new Business({
    name: "Metro Animal Hospital",
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
  businesses.push(business11);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business12 = new Business({
    name: "Precious Paws Veterinarians",
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
  businesses.push(business12);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business13 = new Business({
    name: "Harry Houndstooth, DVM",
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
  businesses.push(business13);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business14 = new Business({
    name: "City Animal Hospital",
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
  businesses.push(business14);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business15 = new Business({
    name: "Lisa Labrador, DVM",
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
  businesses.push(business15);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business16 = new Business({
    name: "The Hound Hotel",
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
  businesses.push(business16);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business17 = new Business({
    name: "Karing Kennel",
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
  businesses.push(business17);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business18 = new Business({
    name: "The Doggie Den",
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
  businesses.push(business18);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business19 = new Business({
    name: "Man’s Best Friend Boarding",
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
  businesses.push(business19);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business20 = new Business({
    name: "Elite Boarding Services",
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
  businesses.push(business20);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business21 = new Business({
    name: "Ollie’s Obedience School",
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
  businesses.push(business21);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business22 = new Business({
    name: "Quicksilver Agility",
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
  businesses.push(business22);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business23 = new Business({
    name: "PawsFit",
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
  businesses.push(business23);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business24 = new Business({
    name: "Miss Barkington’s School for Dogs",
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
  businesses.push(business24);

  addressData = NYCAddresses[Math.floor(Math.random() * 961807 + 1)].split(",");

  const business25 = new Business({
    name: "Proper Pup Obedience Training",
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
  businesses.push(business25);



  // save all users and businesses; grab saved documents
  let savedUsers;
  let savedBusinesses;
  await Promise.all([
    User.insertMany(users).then(users => savedUsers = users),
    Business.insertMany(businesses).then(businesses => savedBusinesses = businesses)
  ]);

  // add null business to account for numbering of Review seed data
  savedBusinesses.unshift(null);

  // construct review seeds for every user and business
  // add to reviews array
  const reviews = [];
  let business;

  business = savedBusinesses[1];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "They are hands down the best groomers in the state. As a poodle owner with exceedingly high expectations, I have become jaded about grooming over the years. It seems no one knows how to groom to breed standards any more. Well not here, thankfully! I highly recommend.",
    rating: 5
  });
  reviews.push(newReview);
 
  business = savedBusinesses[1];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I was pretty impressed with the grooming services offered here. Our pup came back sparkling clean and smelling lovely. Plus, they sent her back with a super cute bandana!",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[1];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am not sure what all the hype is about at this place. First of all, they are overpriced. Second, I thought that my little Max’s shave left a lot to be desired in terms of length and evenness. The bandana was cute, though. I doubt I will return.",
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[1];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I have been coming here for years, and they are the only place I would entrust to groom my precious Penelope. They always use top of the line products that smell great, and the staff are very skilled at handling even the most difficult dogs.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[1];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We came to this place after our dog got skunked. We tried an at-home remedy that got some of the smell out, but our Marcy still smelled pretty strongly of skunk. After her trip to the groomers, she smelled as fresh as a daisy. We are so thankful for the expert service here.", 
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[2];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We are not usually the type to spring for a professional groomer, but we got one of their coupons in the mail. They washed her, shaved her down and clipped her toenails. They have a nice area where the owners can sit and still see the dog. That really helped our dog settle down.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[2];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were not thrilled with the hair cut here. They sent home our dog with a well shaved body, but the ears were left very shaggy and large. The poor thing looked ridiculous. We had to go to another groomer to correct the problem. I don’t recommend this place." ,
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[2];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I have been coming here for years. The owners are so nice and are very involved in the day-to-day operations, which keeps the quality very high. The staff are skilled and very friendly. They also use all hypoallergenic products, which is great for our sensitive pup." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[2];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We recently moved to the area and this place is just around the corner from our new apartment. The staff is very friendly and our dog always comes back happy. They are a bit pricey, though, so be prepared to shell out." ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[2];
  user = savedUsers[9]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is just okay. I think that the staff is really nice, but the outcome of the grooming is inconsistent. We have learned to request Maria, who is the most skilled groomer. They also sell hypoallergenic dog products at their shop, which is convenient.",
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[3];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We took Bettina in for a trim, and it was such a lovely experience. The facility is clean and they use the highest quality products. They also offer dyeing, which is so much fun for a special occasion.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[3];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is gorgeous and offers a full range of grooming and even spa services for your furry friend. It is a great place to pamper your pup. The staff are very warm and helpful, and my dog always comes back very happy.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[3];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Be prepared to shell out at this pricey pup salon and spa. They offer basic grooming services along with an array of high-end treatments that beggar belief. If you’re after basic grooming, you’ll find better value elsewhere.",
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[3];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We just can’t get enough of this puppy pleasure palace! They have everything that your precious companion could want. It’s the only dog grooming place that feels like a civilized salon instead of a grimy kennel. Two paws way, way up.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[3];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I thought that everyone here was so needlessly snobby. Why do I need an appointment a month in advance to get a simple dog grooming? The place wasn’t even busy when I got there. These people need to take themselves less seriously." ,
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[4];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a wonderful neighborhood place that has become very popular in recent years--and deservedly so! They offer the best grooming in town, with groomers who really know their stuff. I highly recommend them!" ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[4];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is always busy, which can lead to a chaotic atmosphere, but you can tell why it’s busy once your pup is done with her grooming. They do an amazing job, and they use all-natural products." ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[4];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "As someone who isn’t a fan of crowds or loud noises, this place is hell on earth. The grooming job that my dog got was good, but it wasn’t worth the long wait or terrible atmosphere. I won’t be going back.",
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[4];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "They are the only groomers that I will use. Their staff are so helpful and knowledgeable, and know just how to calm Rusty down so that he can have his bath. They also use all natural products, which is important to me.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[4];
  user = savedUsers[9]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is big, loud and a little chaotic, but they offer the best cuts in the business. They tout their all-natural products and even sell hand crafted dog treats. The wait can be long, even with an appointment, which isn’t ideal. But still, we’ll keep coming back." ,
    rating: 4
  });
  reviews.push(newReview);

 
  business = savedBusinesses[5];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is great—they always seem to be able to us in at the last minute, and they do really great work. They are a little pricier than some other places, but they are well worth it.",
    rating: 5
  });
  reviews.push(newReview);
 
  business = savedBusinesses[5];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The staff are so friendly here that they are like members of our family. They always remember our dog Rufus and seem to genuinely enjoy the work that they are doing. On Mondays they run a special for 25% off grooming, and that’s when we usually go.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[5];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The staff here are so, so lovely. We really love bringing little Max here, and know that he will be well taken care of. The services are pretty basic, but that’s all we need. They are a bit pricey, though.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[5];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a wonderful neighborhood institution. The owners, Dot and Jan, are some of the nicest people you’ll ever meet. They always take their time and our dog comes back looking great every time. Skip the bargain basement joints and spring for true quality.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[5];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "There is so much buzz about this place that I had to try it. They did a good job with our dog’s grooming. But the price was definitely higher than I have come to expect. I don’t think it’s worth the additional money." ,
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[5];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is one of my favorite places on earth, and our dog, Jack, absolutely loves it here. I used to go shop and run errands while he was being groomed, but I love to stay and chat with the owners while I wait for Jack to be groomed. A gem.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[6];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place has everything you could need for your dog. The selection is staggering. We have found some really great toys here to keep our dog entertained. The service is friendly and helpful. We always look forward to our trips here." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[6];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "They definitely stand out for their huge selection. But sometimes it feels like a little too much—after all, what dog really needs twenty kinds of tennis balls? But it’s the perfect place to buy for the dog who has everything.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[6];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We could wander the aisles for hours here. A true dog lover’s paradise. You’ll find things for less at the big box stores, so don’t come here looking for the deal of the century. A treasure.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[6];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I was looking for a particular style of leash and their staff led me straight to it. Their staff was very knowledgeable and friendly. Plus they carry the organic dog food that my dog has come to prefer. A fun place to stroll the aisles!" ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[6];
  user = savedUsers[9]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I found this place a little bewildering. They pride themselves on selection, but that makes it hard to run in for a bag of food and a toy to bring home after work. I could see myself coming back some day when I have more time to explore." ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[7];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I really like this neighborhood shop for its good selection and very competitive prices. They update their toy selection frequently, which is great for those of us who can’t stop spoiling our pups.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[7];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This shop has been an institution for years. We love that we’re allowed to take Junior in (on a leash, of course!) to browse with us. And if you don’t see what you like, they are happy to order it for you. That’s how we get Junior’s Siberian yak nuggets." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[7];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I was happy to discover this shop near my work. It’s not the biggest store in the world, but they have a solid selection. The staff are very friendly and knowledgeable. I spoke to one person, I think the owner, and he told me about these great new Siberian yak nuggets that are the new doggy superfood.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[7];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "It’s a great place to grab a bag of food or a new toy for man’s best friend. Although the owner does keep pushing these expensive Siberian yak nuggets that I’m not sure my dog even likes. But it’s definitely a treasure, especially in an area with few choices for dog owners.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[7];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am always happy to stop by and chat with the owner, Chet, about the latest and greatest in food, toys and treats for my dog, Sam. The store is clean and well stocked while maintaining a friendly, neighborhood vibe unlike the big box stores.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[8];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a great place to shop for your dog, as they offer a wide range of customizable products. We bought a leash here and got it custom fit to be safe and comfortable for our dog. We highly recommend this wonderful store.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[8];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is the only place I have found with a brick and mortar store where you can customize products like leashes, bandanas, and dishes for your dog. We love to spoil our pup, and this is a great place to do just that. Their customer service is exceptional.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[8];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a solid shop with very friendly staff. I am not quite sure why I need to get my dog a customized product when, as far as I know, my dog can’t read. I guess the appeal is just lost on me. That being said, you don’t have to customize any of their products, and they have a decent selection.",
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[8];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We love shopping here as the service is unparalleled. They will also let your pet sample food and treats so that you can be assured that they will like it before buying a 50-pound bag. We got our little Bijou a customized collar here, and it’s the only collar we’ve gotten that she hasn’t tried to take off.",
    rating: 5
  });
  reviews.push(newReview);

 
  business = savedBusinesses[8];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I came here and the staff seemed more interested in selling me some customized trinkets than in helping me find what I actually needed. I was trying to just pop in and out after work, but that is not really this store’s forte.",
    rating: 2
  });
  reviews.push(newReview);
 
  business = savedBusinesses[9];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "They have really made a name for themselves as the place for all-natural, vegetarian and vegan, hypoallergenic and homeopathic foods. I come here for my dog’s favorite blueberry and chia seed treats. The staff and clientele are very down to earth, and the atmosphere is warm and friendly. Just don’t mention that you feed your dog a big name-brand food!" ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[9];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is the only store where you can find food that is healthy for your pup and for the planet. They make going green so easy. Their staff is really knowledgeable about different diets and health concerns. They even have homeopathic remedies for dogs!",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[9];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I  don’t get what the appeal is of this crunchy, hipster hot spot. I am pretty sure that dogs aren’t that picky about the food they eat. And does Fido really need a hemp fiber leash? I will say that this place has products I have never seen before, so that was a plus. But overall, I would say skip this place.",
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[9];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place is such a savior. When I lived in the suburbs, I could never find the kind of quality, organic dog food that my dog, Beau, deserves. I can also find a huge array of earth-friendly dog products here. The staff are so welcoming to Beau and me that it feels like a home away from home.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[9];
  user = savedUsers[9]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am going to try not to judge just how hippy-dippy this place is. I get dog food for my dog’s sensitive stomach here, and it has really been a lifesaver to find something that works for her. Let’s just say that some of the staff and clientele are a little out there. Whatever works for you.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[10];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a great place to find fun, healthy snacks and treats for your dog. Don’t be grossed out by the weird combinations—your dog won’t! My pup loves the peanutbutter and tuna biscuits the best. You can bring your dog in for a taste test, too!",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[10];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I really love the creativity of the products that you will find here. The store is also very pretty on the inside, which isn’t something I would say of most pet supply stores. They also allow pets in the store, which makes for a fun afternoon with your dog wandering the aisles." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[10];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I brought my dog into this store, and another customer’s dog bit him! I couldn’t believe that the owner of the store doesn’t do anything to ensure that out-of-control dogs are not allowed in the shop. We will not be coming back." ,
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[10];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The treats that they make in-house have to be seen to be believed, with a range of flavors and combinations that truly boggle the mind. I am always excited to pop in and pick up a new treat for my little chihuahua, Carmen, to taste. The owner is very friendly and can answer any questions about the products since they are made on the premises." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[10];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "While this place is somewhat fussy for a pet store, they really do earn their reputation as the place for creative dog treats. They are even safe for humans to eat, if you dare! I have found that my dog begs for these homemade treats more than the store bought.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[11];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This vet’s office is very caring and thorough. They recommended some pricy bloodwork, and we were hesitant at first, but we actually caught a serious issue in advance thanks to the test. We won’t entrust our pet to anyone else."  ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[11];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We have been going to this vet for years, and everyone at the office is very caring and knowledgeable. They offer a broad range of tests so that we can stay on top of any health issues our little Trixie may be developing.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[11];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We recently moved to the area and decided to try this vet based upon the high reviews. We found the vet to be very thorough and knowledgeable, but we found that he recommended such a large number of tests that our vet bills were going through the roof. I am not willing to spend that kind of money.",
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[11];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We have loved this vet for years. He has taken great care of the two dogs that we have had in that time, and even caught the onset of diabetes in one so that we had time to be proactive and extend his life. We would highly recommend this office.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[12];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This vet’s office is conveniently located for me, so I decided to try to switch over my dog, Bruno, to this office. We were given an appointment time within a couple of weeks. But the day before, we were called and asked to reschedule for a week later. And then the day before that, we were asked to reschedule again. It was completely absurd and unprofessional.",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[12];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "It is so easy to recommend this veterinary practice. We are very impressed with how knowledgeable and friendly the staff is. And our dog, Luna, always loves her visit with the doctor. That never used to happen with other vets.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[12];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The vet here is really good, but the office staff leave something to be desired. I am frequently asked to reschedule my appointment, which is unprofessional and a waste of my time." ,
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[12];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We look forward to our visits to this vet! The office staff and the vet are very friendly. The vet makes sure that we have all of the medications we need to manage our pets’ conditions, and performs the necessary tests to monitor them.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[13];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am very happy to recommend this veterinary practice. The office is very clean and smells great—such a rarity at a vet’s office—and the staff are very professional. They also have an online scheduling system that works really well for our busy schedules instead of playing phone tag with the doctor.",
    rating: 5
  });
  reviews.push(newReview);

 
  business = savedBusinesses[13];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am very pleased with the quality of the doctoring at this practice. The vet identified that one of my dog’s teeth was infected and causing a noticeable increase in drooling. We are very grateful to the veterinarian for taking such good care of our pet.", 
    rating: 5
  });
  reviews.push(newReview);
 
  business = savedBusinesses[13];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I DO NOT WANT TO BE ASKED TO SCHEDULE AN APPOINTMENT ONLINE!!!!1! MY GRANDSON IS HELPING ME FIGURE OUT HOW TO USE WHELP. THIS DOCTOR NEEDS TO FIGURE OUT THAT NOT EVERYONE IN THE WORLD IS SO KEEN ON THE ‘INTERNET’!!!!",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[13];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I love this veterinary practice. We have been taking our dog, Lucy, there for years. The vet has a very warm and friendly demeanor, and a very keen eye for observing anything that may be off with Lucy. Highly recommend.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[14];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This veterinarian killed our beloved pup, Maybell! She was just 21 years old. We took her in to her scheduled appointment, and the doctor right away said she ‘didn’t look right.’ Then what do you know, 5 minutes later, Maybell drops dead and the doctor couldn’t do one blessed thing about it. So much for this ‘vet’!!!",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[14];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Not the warmest vet in the world, but definitely smart and conservative on meds and tests. We have really enjoyed bringing our dog in. The office also features on-site boarding, which is very convenient when we travel. We feel safe knowing that if anything happens with our dog, they are right there at the vet’s office." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[14];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We have been impressed with the vet here as the years have gone by. Not exactly the type that you’d want to grab a beer with, but a very steady hand and a practical outlook. We unfortunately had to put our dog down, and the doctor and the staff were very patient and compassionate with us." ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[14];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We are so impressed with this vet. Always following the latest protocols for evidence based medicine, which has saved us lots of money in unnecessary medications and tests. The fee is somewhat higher than our last vet, but nothing outrageous." ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[15];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is the worst vet I have ever been to. Right away, something major is supposedly wrong with our dog, Charlie. He looks fine to me! I am not sure where some of these so-called veterinarians get off telling people such rubbish. We will be finding a new vet.",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[15];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We feel really safe and secure knowing that we can bring our pup to this practice. The offices are incredibly dog friendly and are designed with the dog’s comfort and mental wellbeing in mind. And we respect the doctor so much.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[15];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is the coolest vet’s office you will ever go to. They have really thought about everything from the perspective of a dog so that your dog’s trip to the vet isn’t traumatizing. Our dog actually likes the vet’s office now! We find the vet to be very professional and kind." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[15];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Beware doctors with fancy offices—who do you think is paying for all of that? Our dog has never minded a normal vet’s office so much anyway. My wallet still hurts from the huge bill we were charged for a routine checkup. We have since switched doctors." ,
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[15];
  user = savedUsers[8]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is one of the best vets I have ever seen, and I was a vet tech for years. Their office is state of the art, and the doctor has sterling credentials. We feel so comforted knowing that our little Poopsie is well taken care of."  ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[16];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were so worried about leaving our dog, Charles, for a week while we went to Aruba on vacation. We did so much research on which kennel would be best, and a friend highly recommended this one. I am so glad we went with it—our dog was so happy, and they provided daily text and photo updates.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[16];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place really lets you know that your pet is okay. They send you a daily digest of what your pet was doing, plus a cutie picture to let you know that your darling pet is okay. We use them whenever we go away, even for  long weekend." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[16];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place was recommended by a friend. I’ve got to say that the updates they send are so cute, and melted my heart in a way that I didn’t expect. It seems like our dog Frank really liked it there. We will use them in the future." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[16];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Our dog Francine came back with a big scratch on her nose from this place. I am not sure what kind of operation they are running here, but ensuring the safety of the pets should be of paramount importance. Do not under any circumstances entrust your dog to these butchers!",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[17];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place offers a mind-boggling array of attractions, from a doggie water park to a homemade dinner buffet. If your pooch is as spoiled as ours is, this is the only kennel worth considering. Plus one daily skype session is included in the VIP package.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[17];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We absolutely adore this kennel so much. When we were in the Seychelles last winter for three weeks, we were absolutely heartbroken that the resort didn’t take pets. But we ended up being jealous of our dog’s swanky digs! You won’t regret putting your pet in the lap of luxury." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[17];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I tried this place because so many friends said it was ‘the’ place to board your dog, but holy cow—what a ripoff! I think my dog is just as happy eating french fries out of the dumpster as he is eating pâté and foie gras. Don’t waste your money on stuff your pet doesn’t care about.",
    rating: 2
  });
  reviews.push(newReview);

  business = savedBusinesses[17];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is the absolute, the premier, the preeminent boarding facility on the eastern seabord, nay, the entire world. We will accept nothing less. We used to feel badly for our busy international travel schedule, but now we know that our pup is being pampered just as much as we are.",
    rating: 5
  });
  reviews.push(newReview);

 
  business = savedBusinesses[18];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This place doesn’t look like much, but you can tell that the husband and husband team who own it are dog lovers at heart. They give the dogs opportunities to socialize and play, to exercise, and plenty of pets and treats. Plus you can check out the 24/7 doggie cam in the play area." ,
    rating: 5
  });
  reviews.push(newReview);
 
  business = savedBusinesses[18];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We are now completely sold on this kennel. We watch our dog on the Doggie Cam and see that he is being treated well. And the prices aren’t outrageous like some of the other options in the area.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[18];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We trust Tim and Chris completely with our dogs. The facilities have everything a dog need without prioritizing things that dogs don’t care about. We go away every Christmas, and we feel secure knowing that we have a good place to take our dogs.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[18];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I don’t think that they have as many bells and whistles as some of the other outfits, but they charge moderate prices and it seems like the folks here really care. I plan to use them again on an upcoming trp.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[19];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The staff here seem to genuinely love dogs, and the dog experience is all about fun, fun, fun. I think that our dog Pete probably got more exercise here than he has ever had at home.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[19];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Our dog came back from here with a nip missing from his ear. I understand that dogs can be aggressive, but are we really supposed to entrust our precious pup to this establishment again after he was injured like this?",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[19];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Our dog is so rambunctious that we were worried about putting him with just any old kennel. He has tired out plenty of vets, groomers and babysitters before. This place really understands a dog’s need to exercise and play, with 4 daily runs and daily socialization." ,
    rating: 1-5
  });
  reviews.push(newReview);

  business = savedBusinesses[19];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Our dog loves it here. He is a large breed with a lot of energy, so we wanted somewhere that he wouldn’t be too cooped up. If he is cooped up for too long, he starts having accidents for weeks after. A friend recommended this place to us, and we were very happy. Our dog came back happy and healthy, and no accidents.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[20];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This was a great kennel. Our flight home got delayed, so we had to extend our dog’s stay by a day, and they were really friendly and accommodating about that. The facility is nice and surprisingly clean for a place that regularly hosts dozens of dogs." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[20];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were pretty happy with this kennel. The price is very competitive, but it’s somewhat barebones as a result. However, they do seem to be giving the dogs socialization and exercise, as well as proper meals, so what else can you ask for?" ,
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[20];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We needed a kennel on very short notice because of a death in the family, and we selected this one. Were we thrilled with the amenities? No. Did they keep our dog safe? Yes. Did they cost an exorbitant amount of money? Thankfully, no. You get what you pay for." ,
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[20];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We love this kennel. The owners are very nice and we have gotten to know them over the years. They truly love dogs. They haven’t even raised their prices since the early 90’s.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[21];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Our dog Abby was having accidents in the house and not playing nice with other dogs. We finally admitted that we needed professional help. The trainers here helped get Abby back on track. We even do agility training with her now!" ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[21];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The trainers here are very strict, like a drill sergeant. That being said, their work speaks for itself. We rescued a golden lab puppy who was not housebroken and would bite at our hands. After working with these trainers, we have a pup we are proud of.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[21];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We couldn’t get our dog, Chester, to so much as sit, let alone roll over or play dead. We feel that there are certain things a dog just ought to be able to do, so we took Chester in for training. His skills are the envy of the neighborhood!",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[21];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were really desperate, our Pomeranian, PomPom, kept chewing our couch. Before we bought a replacement, we needed to break his chewing habit. This trainer was just what the doctor ordered, and PomPom seems even happier than before." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[22];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I had always wanted to see how our dog would stack up against the show dogs you see on TV. So I took him down to the agility gym, and I was really amazed at what he could do! My dog seemed to really enjoy the experience. Now I come here weekly for a session with the trainer." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[22];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I thought that this would be a fun activity to do with my dog. Wrong. My dog was completely traumatized, peeing and pooping everywhere. The trainer seemed more upset about the equipment than about my dog being completely freaked out. We will never come back.",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[22];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "If you want to give your dog a little additional challenge in her daily routine, definitely consider adding agility. The trainers here are really great, and they help to ease your dog into the unfamiliar exercises. We both enjoy these sessions so much!",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[22];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "If you had told me a year ago that my couch potato dog would be nationally ranked in agility competitions, I would have told you that you were out of your mind. But my dog, Percy, started training here about a year ago and now we are in dog shows with the professionals. This is still his home gym." ,
    rating: 5
  });
  reviews.push(newReview);

 
  business = savedBusinesses[23];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I went here with my dog, Princess, because we got a flyer in the mail with a coupon, and I am so glad that I did! Princess really seems to love the challenges of the different exercises, and I get a kick out of seeing how smart and agile she is!",
    rating: 5
  });
  reviews.push(newReview);
 
  business = savedBusinesses[23];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "Agility training has been so good for my dog—his energy is more focused, and he behaves better at home. It’s also a lot of fun! You may need to start slow, but this place has the best trainers who will work with your dog (and you) to get you started on the right track.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[23];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were on vacation and I wanted to keep my dog’s weekly agility training up. We came here, and it was a nice facility. It was clean, and they had all of the obstacles we were used to working with. The trainers were knowledgeable.",
    rating: 4
  });
  reviews.push(newReview);

  business = savedBusinesses[23];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a really fun place, but I think that the trainers need to lighten up a bit. Like, I’m here for fun, my dog doesn’t know what’s going on in the first place, just let us learn and have fun. They do have nice equipment, though." ,
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[24];
  user = savedUsers[0]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I am FIGHTING MAD about this so called ‘TRAINER.’ My dog was having obedience issues, so I called them up, and after four sessions, MY DOG IS STILL MISBEHAVING! HOW LONG AM I EXPECTED TO POUR MONEY INTO THIS DARN THING BEFORE I START SEEING SOME RESULTS?!?!",
    rating: 1
  });
  reviews.push(newReview);

  business = savedBusinesses[24];
  user = savedUsers[1]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This was a really great obedience school for our pup, Zippy. He has a lot of energy, but it was all very unfocused. The trainers seemed to get Zippy not just to behave, but to genuinely enjoy behaving and following commands. Worth every penny." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[24];
  user = savedUsers[2]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We got decent results from this trainer. Our dog had several obedience issues, and they fixed most of them, but he still growls at young children and other dogs, so I am giving them partial credit. Perhaps if we had stayed for many more weeks, but the cost was getting prohibitive." ,
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[24];
  user = savedUsers[3]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We are so happy with our dog after this obedience training. We were considering giving him up for adoption because life with him had become so unmanageable. But when we started obedience training, we noticed an immediate improvement, and he kept on improving as he stayed in the program. Now he is a well behaved dog.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[25];
  user = savedUsers[4]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "We were in total crisis mode when we came to the obedience school. Our dog was hostile to people, damaging to property, and seemed pretty miserable. Our dog learned how to follow commands, and we learned how to give commands and provide structure. We are so thrilled with this trainer.",
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[25];
  user = savedUsers[5]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "The trainers here are very skilled. I wish that we had taken our dog, Millie, in sooner. For years we had let her get away with bad behavior because, frankly, we didn’t know what we were doing. But these trainers helped us to change all that, and now we have a better relationship with our dog." ,
    rating: 5
  });
  reviews.push(newReview);

  business = savedBusinesses[25];
  user = savedUsers[6]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "I was pleased with the results we were seeing early on, but the trainers were pushing us to go further and further into obedience, teaching tricks and things, and I just didn’t want to keep spending the money. The obedience lessons already aren’t cheap." ,
    rating: 3
  });
  reviews.push(newReview);

  business = savedBusinesses[25];
  user = savedUsers[7]
  newReview = new Review({
    authorId: user._id,
    businessId: business._id,
    businessName: business.name,
    body: "This is a great obedience school. They achieved the results they promised in the beginning, and you can tell tht the trainers really love and understand dogs. I think that this was a good value for the money.",
    rating: 4
  });
  reviews.push(newReview);
    



  await Review.insertMany(reviews);

  mongoose.disconnect();
}

seed();