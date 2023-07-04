const express = require('express');
const app = express();

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejs',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database');
  }
});
app.get('/load', (req, res) => {
    connection.query('SELECT * FROM registration', (err, results) => {
      if (err) {
        console.error('Error querying database:', err);
        res.status(500).json({ error: 'Error querying database' });
      } else {
        res.json(results);
      }
    });
  });
  
app.use(express.json());

app.post('/let', (req, res) => {
  const { name,phoneNumber,province,district,ward,address } = req.body;
  // Xử lý dữ liệu đăng ký ở đây
  console.log('Tên:', name);
  console.log('Số Điện Thoại:', phoneNumber);
  console.log('Tỉnh:', province);
  console.log('Quận/Huyện:', district);
  console.log('Phường/Xã:', ward);
  console.log('Số Nhà:', address);
  const query = `INSERT INTO registration (name, phoneNumber, province, district, ward, address)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  const values = [name, phoneNumber, province, district, ward, address];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
    } else {
      console.log('Data inserted successfully');
      res.json({ success: true });
    }
  });
});
const ip = '192.168.2.6';
app.listen(3000,ip, () => {
  console.log('Server is running on port 3000');
});
