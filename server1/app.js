const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Phanthanhcong29032002@',
    database: 'demo_ex'
});

db.connect((err) => {
    if (err) {
        console.error('Could not connect to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving data' });
        } else {
            res.json(results);
        }
    });
});

// Thêm một item mới
app.post('/api/items', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO items (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error adding item' });
        } else {
            res.json({ message: 'Item added successfully' });
        }
    });
});

// Lấy danh sách tất cả các items
app.get('/api/items', (req, res) => {
    const query = 'SELECT * FROM items';
    db.query(query, (err, results) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving items' });
        } else {
            res.json(results);
        }
    });
});

// Lấy một item theo ID
app.get('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const query = 'SELECT * FROM items WHERE id = ?';
    db.query(query, [itemId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error retrieving item' });
        } else {
            res.json(result[0]);
        }
    });
});

// Cập nhật một item
app.put('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const { name, description } = req.body;
    const query = 'UPDATE items SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, itemId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error updating item' });
        } else {
            res.json({ message: 'Item updated successfully' });
        }
    });
});

// Xóa một item theo ID
app.delete('/api/items/:id', (req, res) => {
    const itemId = req.params.id;
    const query = 'DELETE FROM items WHERE id = ?';
    db.query(query, [itemId], (err, result) => {
        if (err) {
            res.status(500).json({ error: 'Error deleting item' });
        } else {
            res.json({ message: 'Item deleted successfully' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});