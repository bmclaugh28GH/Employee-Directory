const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  position: { type: String, required: true },
  second_language: { type: String },
  date_hired: { type: Date, default: Date.now },
  dependents: { type: Number } 
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
