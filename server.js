const express = require("express");

const app = express();

app.use(express.json());

let users = [
    { id: 1, name: "Rushi" },
    { id: 2, name: "Avi" }
];

// GET all users
app.get("/users", (req, res) => {
    res.json(users);
});

// GET user by id
app.get("/users/:id", (req, res) => {
    const user = users.find(u => u.id == req.params.id);

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    res.json(user);
});

// POST new user
app.post("/users", (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({
            error: "Name is required"
        });
    }

    const newUser = {
        id: users.length + 1,
        name
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});