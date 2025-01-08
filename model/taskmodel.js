const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  task_no: { type: String, required: true },
  truck_no: { type: String, required: true },
  item: { type: String, required: true },
  cubic_meter: { type: Number, required: true },
  driver_id: { type: String, required: true },
  assistant_id: { type: String, required: true },
  driver_name: { type: String, required: true },
  assistant_name: { type: String, required: true },
  company_name: { type: String, required: true },
  estimated_time: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: Number, required: true }
});

// Correctly create and export the model
const Task = mongoose.model('Task', taskSchema, "task");
module.exports = Task;
