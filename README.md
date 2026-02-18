# IndexedDB Multi-Result Search Demo

A simple web application that demonstrates how to use **IndexedDB** with an index to search for multiple records by name.

This project creates a local database with sample users and allows you to:

* View all users stored in IndexedDB
* Search users by name using an index
* Return multiple matching results
* Clear search results
* Display operation logs

---

## 📸 Features

* 📦 IndexedDB database creation
* 🧱 Object Store with primary key (`id`)
* 🔎 Secondary index on `name`
* 👥 Preloaded database with 20 sample users
* 📋 Display all stored users
* 🔍 Search by name (returns multiple results)
* 🧹 Clear search functionality
* 📝 Real-time log messages
* 🎨 Clean UI with responsive layout

---

## 🛠️ Technologies Used

* HTML5
* CSS3
* Vanilla JavaScript
* IndexedDB API (Browser Storage)

---

## 🚀 How It Works

1. On first load, the app creates an IndexedDB database.
2. A `users` object store is created with `id` as the key.
3. An index is created on the `name` field.
4. The database is seeded with 20 sample users.
5. Users can search by name using the index.
6. All matching records are displayed in a table.

---

## ▶️ How to Run

No installation required.

Simply open the HTML file in your browser:

```bash
index.html
```

Or host it using any static server.

---

## 📂 Project Structure

```
project-folder/
│
├── index.html
├── style.css
└── index.js
```

---

## 🧪 Example Searches

Try searching for:

* Ahmed
* Omar
* Sara
* Any name that appears multiple times

---

## 📚 Purpose

This project is intended for learning and demonstrating:

* How IndexedDB works
* How to create and use indexes
* Retrieving multiple records using `getAll()`
* Client-side database operations

---

## 📜 License

This project is open-source and free to use for learning purposes.

---

## ✨ Author

GMusabOmar
