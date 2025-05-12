const IndividualLedger = require('../models/IndividualLedger');
const Installment = require('../models/Installment');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

// Create a new individual ledger (with first installment)
exports.createIndividualLedger = async (req, res) => {
  try {
    const {id,  customerId, customerName, phoneNumber , modelNumber,installmentId,  firstInstallmentAmount } = req.body;
    // Validate customer and product existence
    var customer = await Customer.findOne({customerId});
    if(!customer){
        customer = new Customer ({
            customerId,
            name:customerName,
            phoneNumber
        })
        await customer.save();
    }
    const product = await Product.findOne({modelNumber});
    if (!product) return res.status(404).json({ error: 'Product not found' });
    console.log('Product: ' + product + ' Customer: ' + customer)
    // Create first installment
    const firstInstallment = new Installment({
      customerId:customer._id,
      installmentId,
      productModelNumber: product._id,
      installmentPaid: firstInstallmentAmount
    });
    await firstInstallment.save();
    // Create individual ledger with the first installment
    const newLedger = new IndividualLedger({
      id,
      customer: customer._id,
      product: product._id,
      installments: [firstInstallment._id],
      dueAmount: product.price - firstInstallmentAmount,
      totalAmountPaid: firstInstallmentAmount,
      status: firstInstallmentAmount >= product.price ? 'clear' : 'pending'
    });
    await newLedger.save();
    console.log('Ledger' + newLedger)
    res.status(201).json(newLedger);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Get all individual ledgers
exports.getAllIndividualLedgers = async (req, res) => {
  try {
    const ledgers = await IndividualLedger.find()
      .populate('customer')
      .populate('product')
      .populate('installments');
      // console.log(ledgers)
    res.json(ledgers);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Update individual ledger
exports.updateIndividualLedger = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedLedger = await IndividualLedger.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedLedger) return res.status(404).json({ error: 'Ledger not found' });

    res.json(updatedLedger);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Delete individual ledger (and related installments)
exports.deleteIndividualLedger = async (req, res) => {
  try {
    const { id } = req.params;

    const ledger = await IndividualLedger.findOne({id});
    if (!ledger) return res.status(404).json({ error: 'Ledger not found' });

    // Delete associated installments
    await Installment.deleteMany({ _id: { $in: ledger.installments } });

    await IndividualLedger.findOneAndDelete({id});
    res.json({ message: 'Ledger deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Add installment to an individual ledger
exports.addInstallment = async (req, res) => {
  try {
    const { ledgerId } = req.params;
    const { localInstallment } = req.body;  
    const ledger = await IndividualLedger.findById(ledgerId)
    // console.log(ledger)
    if (!ledger) return res.status(404).json({ error: 'Ledger not found' });

    // Create and save new installment
    const newInstallment = new Installment({
      installmentId: localInstallment.installmentId, 
      customerId: ledger.customer._id,
      productModelNumber: ledger.product._id,
      installmentPaid:localInstallment.installmentPaid
    });
    await newInstallment.save();

    // Update ledger amounts
    ledger.installments.push(newInstallment._id);
    ledger.totalAmountPaid += Number(localInstallment.installmentPaid);
    ledger.dueAmount -= Number(localInstallment.installmentPaid);
    ledger.status = ledger.dueAmount <= 0 ? 'clear' : 'pending';

    await ledger.save();
    const ledgers = await IndividualLedger.find({id:ledger.id})
    .populate('customer')
    .populate('product')
    .populate('installments');

    res.json({ message: 'Installment added successfully', ledger:ledgers });
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Update an installment in an individual ledger
exports.updateInstallment = async (req, res) => {
  try {
    const { ledgerId, installmentId } = req.params;
    const { newAmount } = req.body;

    const ledger = await IndividualLedger.findById(ledgerId);
    if (!ledger) return res.status(404).json({ error: 'Ledger not found' });

    const installment = await Installment.findById(installmentId);
    if (!installment) return res.status(404).json({ error: 'Installment not found' });

    // Adjust the ledger amounts
    const amountDifference = newAmount - installment.installmentPaid;
    installment.installmentPaid = newAmount;
    await installment.save();

    ledger.totalAmountPaid += amountDifference;
    ledger.dueAmount -= amountDifference;
    ledger.status = ledger.dueAmount <= 0 ? 'clear' : 'pending';

    await ledger.save();
    res.json({ message: 'Installment updated successfully', ledger });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};

// Delete an installment from an individual ledger
exports.deleteInstallment = async (req, res) => {
  try {
    const { ledgerId, installmentId } = req.params;

    const ledger = await IndividualLedger.findById(ledgerId)
    if (!ledger) return res.status(404).json({ error: 'Ledger not found' });

    const installment = await Installment.findById(installmentId);
    if (!installment) return res.status(404).json({ error: 'Installment not found' });

    // Remove installment and update ledger amounts
    ledger.installments.pull(installmentId);
    ledger.totalAmountPaid -= installment.installmentPaid;
    ledger.dueAmount += installment.installmentPaid;
    ledger.status = ledger.dueAmount > 0 ? 'pending' : 'clear';

    await installment.deleteOne();
    await ledger.save();
    res.json({ message: 'Installment deleted successfully', ledger });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
