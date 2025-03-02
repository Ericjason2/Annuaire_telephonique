let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    if (name && phone) {
        addContact(name, phone);
        document.getElementById('name').value = '';
        document.getElementById('phone').value = '';
    }
});

function renderContacts() {
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    contacts.forEach((contact, index) => {
        const contactItem = document.createElement('tr');
        contactItem.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td class="actions">
                <button class="details-btn" onclick="showDetails(${index})">Détails</button>
                <button class="edit-btn" onclick="editContact(${index})">Modifier</button>
                <button class="delete-btn" onclick="deleteContact(${index})">Supprimer</button>
            </td>
        `;
        contactList.appendChild(contactItem);
    });
}

function addContact(name, phone) {
    contacts.push({ name, phone });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    renderContacts();
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    deleteContact(index);
}

function showDetails(index) {
    const contact = contacts[index];
    document.getElementById('contactDetails').textContent = `Nom: ${contact.name}\nTéléphone: ${contact.phone}`;
    const modal = document.getElementById('detailsModal');
    modal.style.display = 'block';
}

// Gérer la fermeture de la modale
document.querySelector('.close').addEventListener('click', function () {
    document.getElementById('detailsModal').style.display = 'none';
});

window.onclick = function (event) {
    if (event.target == document.getElementById('detailsModal')) {
        document.getElementById('detailsModal').style.display = 'none';
    }
};

// Gérer la sidebar
document.getElementById('sidebarToggle').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    if (sidebar.style.left === '0px') {
        sidebar.style.left = '-250px';
        mainContent.style.marginLeft = '0';
    } else {
        sidebar.style.left = '0';
        mainContent.style.marginLeft = '250px';
    }
});

// Charge les contacts au démarrage de la page
document.addEventListener('DOMContentLoaded', renderContacts);
