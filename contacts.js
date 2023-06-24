const fs = require("node:fs/promises");
const crypto = require("node:crypto");
const path = require("node:path");

const filePath = path.join(__dirname, "./db/contacts.json");

async function readContacts()
{
    const data = await fs.readFile(filePath, "utf-8");

    return JSON.parse(data);
}
async function writeContacts (contacts)
{
    await fs.writeFile(filePath, JSON.stringify(contacts));
}
async function listContacts()
{
    const contacts = await readContacts();

    return contacts;
}
async function getContactById (id)
{
    const contacts = await readContacts();

    const contactId = contacts.find((contact) => contact.id === id);

    return contactId;
}
async function addContact (contact)
{
    const contacts = await readContacts();
  
    const newContact = { ...contact, id: crypto.randomUUID() };

    contacts.push(newContact);

    await writeContacts(contacts);

    return newContact;
}
async function removeContact (id)
{
    const contacts = await readContacts();

    const index = contacts.findIndex((contact) => contact.id === id);

    const removeContacts = [...contacts.slice(0, index), ...contacts.slice(index + 1)];

    await writeContacts(removeContacts);

    return "Success";
}
module.exports =
{
    listContacts, getContactById, addContact, removeContact
};