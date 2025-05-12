const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    size: { type: String, trim: true },
    type: { type: String, required: true},
    date: { type: Date, default: Date.now },
    modelNumber: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    status: { type: String, enum: ['not-available', 'available'], default: 'available' },
    imgPath: { type: String, trim: true }, // Path to the product's image
  },
  { timestamps: true }
);

productSchema.pre('save',async function(next){
  if(this.quantity == 0){
    this.status = 'not-available'
  }
  next();
})

module.exports = mongoose.model('Product', productSchema);
