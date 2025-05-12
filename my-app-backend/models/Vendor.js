const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema(
  {
    vendorId: { type: Number, required: true, unique: true },
    vendorName: { type: String, required: true, trim: true },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    status: { type: String, enum: ['cleared', 'in-process'], default: 'in-process' },
    totalAmountPaid: { type: Number, required: true },
    remainingAmount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Vendor', vendorSchema);
