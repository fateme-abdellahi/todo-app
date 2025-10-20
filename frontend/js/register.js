const form = document.getElementById("register-form")
// const button = document.getElementById("submit-button")
const BASE_API_URL = '127.0.0.1:8000'

validateData = (username, password, password2, email) => {
    if (!username) {
        return "username cannot be empty";
    }
    if (!password || !password.trim()) {
        return "password cannot be empty";
    }
    if (password2 !== password) {
        return "passwords are not the same";
    }
    if (!email) {
        return "email cannot be empty";
    }
    if (password.length < 8) {
        return "password length is less than 8 characters"
    }
    if (password !== password2) {
        return "passwords are not the same"
    }
    return null
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value.trim()
    const password = document.getElementById("password").value
    const password2 = document.getElementById("password2").value
    const email = document.getElementById("email").value.trim()
    // console.log(username)

    error = validateData(username, password, password2, email)

    if (error) {
        console.log(error)
        return;
    }

    await fetch(BASE_API_URL + "/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            password,
            password2,
            email
        })
    })

    // console.log("success", username, password, form);
})

