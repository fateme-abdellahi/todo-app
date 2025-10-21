const form = document.getElementById("register-form");

const htmlError = document.getElementById("error");

const { BASE_API_URL } = CONFIG;

const BACKEND_URL = `${BASE_API_URL}/auth/register/`;


setError = (error) => {
    htmlError.textContent = error
}
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
        return "password length is less than 8 characters";
    }
    if (password !== password2) {
        return "passwords are not the same";
    }
    return null
}

const errorHandler = (data) => {
    if (data.username) {
        setError(data.username.join(" "));
        return;
    }
    if (data.password) {
        setError("password must be an string more than 8 characters");
        return;
    }
    if (data.email) {
        setError("please enter your email correctly");
        return;
    }
    if (error.non_field_errors) {
        setError(error.non_field_errors.join(" "));
        return;
    }
    if (error) {
        setError(String(data));
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value;
    const password2 = document.getElementById("password2")?.value;
    const email = document.getElementById("email")?.value.trim();

    error = validateData(username, password, password2, email);

    if (error) {
        setError(error)
        return;
    }

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                password2,
                email
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.status == 201) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else if (response.status == 400) {
            errorHandler(data);
        } else {
            setError("something went wrong");
        }
    } catch {
        setError("something went wrong");
    }
})