
# Todo App Frontend

This is the static frontend for the Todo App. It is written in HTML, CSS, and JavaScript, and communicates with the Django backend in the `backend/` directory.

---

## How to Preview

**Static preview (no backend):**

```powershell
Set-Location -Path .\frontend
python -m http.server 8000
```
Open index.html in your browser.

**Live reload:**
Use the VS Code Live Server extension and open `html/index.html`.

**Full stack (with backend):**

```powershell
Set-Location -Path .\backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python manage.py runserver
```

---

## File Structure

- `html/` — Main pages: `index.html`, `create.html`, `edit.html`, `login.html`, `register.html`, `about.html`, `404.html` (for next steps).
- `css/` — Page styles; `css/utils/` for shared styles
- `js/` — Scripts: `config.js` (contains the backend base url), `index.js`, `create.js`, `edit.js`, `login.js`, `register.js`, `navbar.js`
- `images/` — Icons and images (including `images/icons/true.svg`, `false.svg`, `waiting.png`)

---

## API Endpoints Used by the Frontend

The frontend expects the following endpoints (relative to `CONFIG.BASE_API_URL` in `js/config.js`):

- `GET    /todos/` — List todos (returns array of todos)
- `POST   /create/` — Create todo (expects `{ title, description, end_date, completed }`)
- `PATCH  /{id}/update/` — Update todo (expects any of `{ title, description, end_date, completed }`)
- `DELETE /{id}/delete/` — Delete todo
- `POST   /auth/login/` — Login (expects `{ username, password }`, returns `{ token }`)
- `POST   /auth/register/` — Register (expects `{ username, password, password2, email }`, returns `{ token }`)

If your backend uses different paths, update the frontend JS or adapt your backend URLs.

---

## License

MIT — see `../LICENSE`.

---

## Contact

You can open an issue for frontend bugs or mismatches.
