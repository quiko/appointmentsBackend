const Appointment = require("../models/Appointment");

module.exports = {
  list: async (req, res, next) => {
    //list all appointments
    const appointment = await Appointment.find();
    res.status(200).json({ appointment });
  },
  add: async (req, res, next) => {
    //save apointment to db
    const appointment = await new Appointment(req.body);
    console.log(req.body);
    appointment.save();
    return res.status(200).json({ message: "cool saved to the db !" });
  },
  show: async (req, res, next) => {
    //show particular appointment
    const appointment = await Appointment.findById(req.params.id);
    res.json({appointment});
  },
  edit: async(req,res,next) =>{
    //save edited appointment
    const { id } = req.params;
    await Appointment.update({_id: id}, req.body);
    res.status(200).json({ message: "saved to db !" });
  },
  delete: async (req, res, next) => {
    //delete particular appointment
    let { id } = req.params;
    await Appointment.remove({_id: id});
    res.status(200).json({ message: "appointment removed !" });;
  }
};
