const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

const pool = new Pool({
  user: 'vishnu',
  host: 'localhost',
  database: 'food-ordering-app',
  password: 'password',
  port: 5432,
});

// Get all food items with images
router.get('/', async (req, res) => {
  try {
    const foodItemsResult = await pool.query('SELECT * FROM food_items');
    const foodItems = foodItemsResult.rows;

    for (let item of foodItems) {
      const imagesResult = await pool.query('SELECT image_url FROM food_item_images WHERE food_item_id = $1', [item.id]);
      item.images = imagesResult.rows.map(row => row.image_url);
    }

    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new food item
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO food_items (name, price) VALUES ($1, $2) RETURNING *',
      [name, price]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;