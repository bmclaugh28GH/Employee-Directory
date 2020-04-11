const mongoose = require("mongoose");
const db = require("../models");

// This file empties the employee directory and inserts the employees below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/employeedirectory"
);

const employeeSeed = [
  {
    fname: "Brian",
    lname: "McLaughlin",
    position: "Developer",
    second_language: "German", 
    date_hired: new Date (1998, 05, 15), 
    dependents: 3
  }, 
  {
    fname: "Ellen",
    lname: "McLaughlin",
    position: "Manager",
    second_language: "French", 
    date_hired: new Date (2000, 04, 06), 
    dependents: 2
  }, 
  {
    fname: "Eva",
    lname: "McLaughlin",
    position: "Manager",
    second_language: "French", 
    date_hired: new Date (2002, 07, 13), 
    dependents: 0
  }, 
  {
    fname: "Owen",
    lname: "McLaughlin",
    position: "Consultant",
    second_language: "Spanish", 
    date_hired: new Date (2004, 04, 07), 
    dependents: 0
  }
];

db.Employee
  .remove({})
  .then(() => db.Employee.collection.insertMany(employeeSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
