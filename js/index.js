const saveContact = contact => {
    const form = document.getElementById("uploadForm")
    const initialValue = localStorage.getItem("contacts") || JSON.stringify([])
    const values = JSON.parse(initialValue)
    const contactWithId = {
        id: values.length + 1,
        ...contact
    }
    if (values.length) {
        const newValues = [ ...values, contactWithId ]
        const newValStg = JSON.stringify(newValues)
        localStorage.setItem("contacts", newValStg)
    } else {
        const initialContacts = JSON.stringify([contactWithId])
        localStorage.setItem("contacts", initialContacts)
    }
    form.reset()
    alert("Contacto cargado")
}

const onSubmit = e => {
    e.preventDefault()
    let validForm = true
    const nameInput = document.getElementById("name")
    const mailInput = document.getElementById("mail")
    const dateInput = document.getElementById("date")
    const idInput = document.getElementById("id")

    const nameError = document.getElementById("nameError")
    const mailError = document.getElementById("mailError")
    const dateError = document.getElementById("dateError")
    const idError = document.getElementById("idError")
    
    // Nombre
    if (nameInput.value) {
        nameInput.ariaInvalid = false
        nameError.innerText = ""
        nameError.style.display = "none"
    } else {
        nameInput.ariaInvalid = true
        nameError.innerText = "Debe colocar caracteres alfabéticos."
        nameError.style.display = "block"
        validForm = false
    }
    //Email
    if (validateEmails(mailInput.value)) {
        mailInput.ariaInvalid = false
        mailError.innerText = ""
        mailError.style.display = "none"
    } else {
        mailInput.ariaInvalid = true
        mailError.innerText = "Ingrese un email correcto."
        mailError.style.display = "block"
        validForm = false
    }
    // Fecha de nacimiento
    if (dateInput.value) {
        dateInput.ariaInvalid = false
        dateError.innerText = ""
        dateError.style.display = "none"
    } else {
        dateInput.ariaInvalid = true
        dateError.innerText = "Debe colocar su fecha de nacimiento."
        dateError.style.display = "block"
        validForm = false
    }
    // ID
    if (idInput.value) {
        idInput.ariaInvalid = false
        idError.innerText = ""
        idError.style.display = "none"
    } else {
        idInput.ariaInvalid = true
        idError.innerText = "No existe ese ID."
        idError.style.display = "block"
        validForm = false
    }
    
    if (validForm) {
        const contact = {
            name: nameInput.value,
            mail: mailInput.value,
            date: dateInput.value,
            id: parseInt(idInput.value)
        }
        saveContact(contact)
    }
    
}


const validateEmails = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email)
}