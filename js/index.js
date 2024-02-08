document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const contactList = document.getElementById('contact-list');

    let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

    function displayContacts() {
        contactList.innerHTML = '';
        contacts.forEach(function(contact, index) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${contact.name}</strong> - ${contact.email} - ${contact.birthdate}
                            <button class="edit-btn" onclick="editContact(${index})">Edit</button>
                            <button class="delete-btn" onclick="deleteContact(${index})">Delete</button>`;
            contactList.appendChild(li);
        });
    }

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const birthdate = document.getElementById('birthdate').value;
        const contactId = document.getElementById('contactId').value;

		const nameError = document.getElementById("nameError")
		const emailError = document.getElementById("emailError")
		const birthdateError = document.getElementById("birthdateError")
	
		const validateEmails = (email) => {
			const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
			return regex.test(email)
		}

		// Nombre
		if (name) {
			name.ariaInvalid = false
			nameError.innerText = ""
			nameError.style.display = "none"
		} else {
			name.ariaInvalid = true
			nameError.innerText = "Complete su nombre"
			nameError.style.display = "block"
		}
		//Email
		if (validateEmails(email)) {
			email.ariaInvalid = false
			emailError.innerText = ""
			emailError.style.display = "none"
		} else {
			email.ariaInvalid = true
			emailError.innerText = "Email incorrecto"
			emailError.style.display = "block"
		}
		// Fecha de nacimiento
		if (birthdate) {
			birthdate.ariaInvalid = false
			birthdateError.innerText = ""
			birthdateError.style.display = "none"
		} else {
			birthdate.ariaInvalid = true
			birthdateError.innerText = "Complete su fecha"
			birthdateError.style.display = "block"
		}

        if (name && email && birthdate) {
            if (contactId) {
                contacts[contactId] = { name, email, birthdate };
            } else {
                contacts.push({ name, email, birthdate });
            }

            localStorage.setItem('contacts', JSON.stringify(contacts));
            contactForm.reset();
            displayContacts();
        } else {
            alert('Complete todos los datos');
        }
    });

    window.deleteContact = function(index) {
        if (confirm('Quiere eliminar el contacto?')) {
            contacts.splice(index, 1);
            localStorage.setItem('contacts', JSON.stringify(contacts));
            displayContacts();
        }
    };

    window.editContact = function(index) {
        const contact = contacts[index];
        document.getElementById('name').value = contact.name;
        document.getElementById('email').value = contact.email;
        document.getElementById('birthdate').value = contact.birthdate;
        document.getElementById('contactId').value = index;
        document.getElementById('submit-btn').innerText = 'Actualizar';
    };

    displayContacts();
});