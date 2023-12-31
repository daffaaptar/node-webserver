const fs =  require('fs');

const dirPath = './data';
if(!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = './data/contacts.json'
if(!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8')
}

const loadContact = () => {
  const fileBuffer = fs.readFileSync('data/contacts.json', 'utf-8')
  const contacts = JSON.parse(fileBuffer);
  return contacts;
}

  const findContact = (nama) => {
    const contacts = loadContact();
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase())
    return contact
}

//menuliskan file contacts.json data yang baru
const saveContact = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
}
//menambahkan data contact baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContact(contacts);
}

// cek duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact()
  return contacts.find((contact) => contact.nama === nama)
}

//hapus kontak
const deleteContact = (nama) => {
  const contacts = loadContact ()
  const filteredContacts = contacts.filter((contact) => contact.nama !== nama)
  saveContact(filteredContacts)
}

//mengubah contacts
const updateContacts =(contactBaru) => {
  const contacts = loadContact()
    //hilangka nama lama yg ama dgn oldnama
    const filteredContacts = contacts.filter((contact) => contact.nama !==
    contactBaru.oldNama)
    filteredContacts.push(contactBaru)
    saveContact(filteredContacts)
}

module.exports = { loadContact, findContact, addContact , cekDuplikat, deleteContact, updateContacts }
