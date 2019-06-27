const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create schema
const appointmentSchema = new Schema({
  Neurologist: {type: String, required: true},
  Remarks: String,
  Date: { type: Date, required: true },
  Hour: { type: Number, required: true },
  Type: {
    FollowUp:{
       type: Boolean,
       default: false
    },
    EEG:{
        type: Boolean,
        default: false
    },
    MRI:{
        type: Boolean,
        default: false
    },
    FirstVisit:{
        type: Boolean,
        default: false
    }
  }
});

//create  model
const Appointment = mongoose.model("appointment", appointmentSchema);

//export model
module.exports = Appointment;
