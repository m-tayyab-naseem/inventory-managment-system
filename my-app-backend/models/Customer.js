const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    customerId: { type: Number, required: true, unique: true },
    date: { type: Date, default: Date.now },
    phoneNumber:{type:String, required:true}
  },
  { timestamps: true }
);

module.exports = mongoose.model('Customer', customerSchema);
