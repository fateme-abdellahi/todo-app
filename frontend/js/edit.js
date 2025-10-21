const form = document.getElementById("form")
const token = localStorage.getItem("token")
const error = document.getElementById("error");

const { BASE_API_URL } = CONFIG;

const params = new URLSearchParams(window.location.search)
const id = params.get("id")
const BACKEND_URL = `${BASE_API_URL}/${id}/update/`;


//add error message to DOM
setError = (err) => {
    error.textContent = err
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
    const title = document.getElementById("title")?.value.trim();
    const description = document.getElementById("description")?.value.trim();
    const datetime = document.getElementById("datetime")?.value;
    const completed = document.getElementById("completed")?.checked;

    const requestData = {}

    title ? requestData["title"] = title : ''
    description ? requestData["description"] = description : ''
    datetime ? requestData["end_date"] = datetime : ''
    completed ? requestData["completed"] = completed : ''

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'PATCH',
            body: JSON.stringify(requestData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`,
            },
        });

        const data = await response.json();

        if (response.status == 200) {
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