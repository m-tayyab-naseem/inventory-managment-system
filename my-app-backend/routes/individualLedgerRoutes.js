const express = require('express');
const router = express.Router();
const individualLedgerController = require('../controllers/individualLedgerController');

// Individual Ledger Routes
router.post('/ledger', individualLedgerController.createIndividualLedger); // Create ledger with first installment
router.get('/ledgers', individualLedgerController.getAllIndividualLedgers); // Get all ledgers
router.put('/ledger/:id', individualLedgerController.updateIndividualLedger); // Update ledger
router.delete('/ledger/:id', individualLedgerController.deleteIndividualLedger); // Delete ledger

// Installment Routes
router.post('/ledger/:ledgerId/installment', individualLedgerController.addInstallment); // Add installment
router.put('/ledger/:ledgerId/installment/:installmentId', individualLedgerController.updateInstallment); // Update installment
router.delete('/ledger/:ledgerId/installment/:installmentId', individualLedgerController.deleteInstallment); // Delete installment

module.exports = router;
