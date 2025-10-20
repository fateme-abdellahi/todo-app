const form = document.getElementById("form");

const htmlError = document.getElementById("error");

const { BASE_API_URL } = CONFIG;

const BACKEND_URL = `${BASE_API_URL}/auth/login/`;


setError = (error) => {
    htmlError.textContent = error
}
validateData = (username, password) => {
    if (!username) {
        return "username cannot be empty";
    }
    if (!password || !password.trim()) {
        return "password cannot be empty";
    }
    if (password.length < 8) {
        return "password length is less than 8 characters";
    }
    return null
}

const errorHandler = (error) => {
    if (error.username) {
        setError(error.username?.join(" "));
        return;
    }
    if (error.password) {
        setError("password must be an string more than 8 characters");
        return;
    }
    if (error.non_field_errors) {
        setError(error.non_field_errors.join(" "));
        return;
    }
    if (error) {
        setError(error);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    error = validateData(username, password);

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
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (response.status == 200) {
            localStorage.setItem("token", data.token);
            window.location.href = "index.html";
        } else if (response.status == 400) {
            errorHandler(data);
        } else {
            setError("something went wrong....");
        }
    }
    catch {
        setError("something went wrong");
    }
})