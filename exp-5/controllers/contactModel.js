const Contact = require("../models/contactModel");

const getContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during fetch" });
    }
}
const getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "contact not found" });
        }
        res.status(200).json(contact);
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "Invalid contact id" });
    }
}
const createContact = async (req, res) => {
    try {
        const { name, email, phone } = req.body || {};
        if (!name || !email || !phone) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const contact = await Contact.create({
            name,
            email,
            phone
        });
        res.status(201).json(contact);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during creation" });
    }
}
const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id, // ID of the document to update
            req.body,      // Data to update with (sent from the client)
            { new: true, runValidators: true }  // Return the updated document
        );
        if (!updatedContact) {
            return res.status(404).json({ message: "contact not found" });
        }
        res.status(200).json(updatedContact);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during update" });
    }
}
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error during deletion" });
    }
}
module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}
