const { BASE_API_URL } = CONFIG;
const container = document.querySelector(".container");
const token = localStorage.getItem("token");
let currentItemId = null
const error = document.querySelector(".error");

const now = new Date();

//add loaded items to DOM
const addItemHandler = (items) => {

    container.innerHTML += `
    <div class="items-header-container">
        <span>Title</span>
        <span>Description</span>
        <span>Duo Date</span>
        <span>Task Completed</span>
        <span class="empty"></span>
    </div>`;

    items.forEach(item => {
        const endDate = new Date(item.end_date);
        const iconSrc = item.completed
            ? "../images/icons/true.svg"
            : endDate < new Date()
                ? "../images/icons/false.svg"
                : "../images/icons/waiting.png";

        const div = document.createElement("div");
        div.id = `item-${item.id}`;
        div.className = `item-container ${item.completed ? "item-container-completed" : ""}`;
        div.innerHTML = `
        <span title="${item.title}">${item.title}</span>
        <span title="${item.description}">${item.description}</span>
        <span title="${item.end_date}">${item.end_date}</span>
        <span><img src="${iconSrc}" alt="status" width="20" height="20"></span>
        <button id=delete-btn-${item.id} class="item-delete-button">delete</button>
    `;


        div.addEventListener("click", (e) => {
            if (e.target.classList.contains("item-delete-button")) return;
            window.location.href = `edit.html?id=${item.id}`;
        });

        container.appendChild(div);


        const deleteBtn = document.getElementById(`delete-btn-${item.id}`);
        deleteBtn.addEventListener("click", (e) => {
            const modal = document.querySelector(".modal")
            const overlay = document.querySelector(".overlay")
            currentItemId = item.id;
            modal.classList.remove('none')
            overlay.classList.remove("none")
        })

    });
}

//delete an item
const modalDeleteBtn = document.getElementById("modal-delete-btn")
modalDeleteBtn.addEventListener("click", async (e) => {
    modalCloseHandler()
    try {
        const response = await fetch(`${BASE_API_URL}/${currentItemId}/delete/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })
        if (response.status == 404) {
            const error = document.querySelector(".error")
            error.classList.remove("none");
            error.textContent = "task not found";
        } else if (response.status == 401) {
            window.location.href = "login.html";
        }
    } catch {
        error.classList.remove("none");
    }
    return;
})


//close modal 
const modalCloseHandler = () => {
    const modal = document.querySelector(".modal")
    const overlay = document.querySelector(".overlay")
    modal.classList.add('none')
    overlay.classList.add("none")
}
//modal close button functionality
const modalClose = document.getElementById("modal-close");
modalClose.addEventListener("click", (e) => {
    modalCloseHandler()
})


//load task when page is loaded
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(`${BASE_API_URL}/todos/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`
            }
        })

        if (response.status == 200) {
            const data = await response.json()
            addItemHandler(data)
        } else if (response.status == 401) {
            window.location.href = "login.html"
        } else {
            error.classList.remove("none")
        }
    } catch {
        error.classList.remove("none")
    }
})
