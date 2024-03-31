const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require('pg');

const app = express();
const port = 3000;

// PostgreSQL connection configuration
const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'project2',
  password: 'password',
  port: 6555, // Default PostgreSQL port
});
client.connect();

// Middleware to parse JSON body
app.use(bodyParser.json());

// POST request to add an element
app.post('/survey', async (req, res) => {

    console.log(req.params)

    console.log("Survey Entered")
  try {
    const { name, surname, birthdate, educationLevel, city, gender, aiUseCase } = req.body;
    const query = 'INSERT INTO survey (name, surname, birthdate, educationLevel, city, gender, aiUseCase) VALUES ($1, $2, $3, $4, $5, $6, $7)';
    await client.query(query, [name, surname, birthdate, educationLevel, city, gender, aiUseCase]);
    res.send('Element added successfully');
  } catch (err) {
    console.error('Error adding element:', err);
    res.status(500).send('Error adding element');
  }
});

// GET request to retrieve all entities
app.get('/survey', async (req, res) => {
  try {
    const query = 'SELECT * FROM survey';
    const result = await client.query(query);
    res.json(result.rows);
  } catch (err) {
    console.error('Error retrieving entities:', err);
    res.status(500).send('Error retrieving entities');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
