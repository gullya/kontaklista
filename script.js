document.getElementById("contact-form").addEventListener("submit", function(event) {
  event.preventDefault();
  addContact();
});

document.getElementById("delete-all").addEventListener("click", deleteAllContacts);

let contacts = [];
let editIndex = -1;

function saveContact(index) {
  const name = document.querySelector(`[data-name="${index}"]`).value;
  const phone = document.querySelector(`[data-phone="${index}"]`).value;
  contacts[editIndex] = { name, phone };
  editIndex = -1;
  renderContacts();
}

function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  contacts.push({ name, phone });
  editIndex = -1;
  renderContacts();
  document.getElementById("contact-form").reset();
}

function deleteAllContacts() {
  contacts = [];
  editIndex = -1;
  renderContacts();
}

function renderContacts() {
  const contactList = document.getElementById("contact-list");
  contactList.innerHTML = "";

  contacts.forEach((contact, index) => {
    const li = document.createElement("li");

    const nameInput = document.createElement('input');
    nameInput.value = contact.name;
    nameInput.disabled = true;
    nameInput.setAttribute('data-name', index);
    li.appendChild(nameInput);

    const phoneInput = document.createElement('input');
    phoneInput.value = contact.phone;
    phoneInput.disabled = true;
    phoneInput.setAttribute('data-phone', index);
    li.appendChild(phoneInput);

    if (index === editIndex) {
      nameInput.disabled = false;
      phoneInput.disabled = false;
    }
    
    const editButton = document.createElement("button");  
    li.appendChild(editButton);

    if (index === editIndex) {
      editButton.textContent = "Spara";
      editButton.addEventListener("click", () => saveContact(index));
    } else {
      editButton.textContent = "Ändra";
      editButton.addEventListener("click", () => editContact(index));
    }

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Ta bort";
    deleteButton.addEventListener("click", () => deleteContact(index));
    li.appendChild(deleteButton);
    
    contactList.appendChild(li);
  });
}

function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

function editContact(index) {
  editIndex = index;
  renderContacts();
}

