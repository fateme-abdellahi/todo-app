const form = document.getElementById("form")
const token = localStorage.getItem("token")
const error = document.getElementById("error");

const { BASE_API_URL } = CONFIG;

const BACKEND_URL = `${BASE_API_URL}/create/`;

//add error message to DOM
setError = (err) => {
    error.textContent = err
}

// validate input data
validateData = (title, description, datetime) => {
    if (!title || !description || !datetime) {
        return "please fill all the fields";
    }
    return null
}

// handle input validation
const errorHandler = (error) => {
    if (error.title) {
        setError(error.title?.join(" "));
        return;
    }
    if (error.description) {
        setError(error.description?.join(" "));
        return;
    }
    if (error.end_date) {
        setError(error.end_date?.join(" "));
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


// handle sumbit form
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const datetime = document.getElementById("datetime").value

    err = validateData(title, description, datetime);

    if (err) {
        setError(err)
        return;
    }

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            body: JSON.stringify({
                title,
                description,
                completed: false,
                end_date: datetime,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        const data = await response.json();

        if (response.status == 201) {
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