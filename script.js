document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();
    saveContact();
  });
  let contacts = [];
  let editIndex = -1; 
  function saveContact() {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    if (name && phone) {
      if (editIndex >= 0) {
        contacts[editIndex] = { name, phone };
        editIndex = -1;
      } else {
        contacts.push({ name, phone });
      }
      renderContacts();
      document.getElementById("contact-form").reset();
    }
  }
  function renderContacts() {
    const contactList = document.getElementById("contact-list");
    contactList.innerHTML = "";
  
    contacts.forEach((contact, index) => {
      const li = document.createElement("li");
      li.textContent = `${contact.name}: ${contact.phone}`;
      
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Ta bort";
      deleteButton.addEventListener("click", () => deleteContact(index));
  
      const editButton = document.createElement("button");
      editButton.textContent = "Ändra";
      editButton.addEventListener("click", () => editContact(index));
  
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      contactList.appendChild(li);
    });
  }
  function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
  }
  function editContact(index) {
    const contact = contacts[index];
    document.getElementById("name").value = contact.name;
    document.getElementById("phone").value = contact.phone;
    editIndex = index; 
  }
  
