const express = require("express");
const router = express.Router();
const {getContacts,getContact,createContact,updateContact,deleteContact} = require('../controllers/contactModel');
 
 
router.get('/',getContacts);
router.get('/:id',getContact);
router.post('/',createContact);
router.put('/:id',updateContact)
router.delete('/:id',deleteContact)
 
module.exports = router;  //
