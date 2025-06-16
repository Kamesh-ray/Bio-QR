const db = require('../config/db');
const bcrypt = require('bcryptjs');

class User {
  static async findByEmail(email) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) reject(err);
        resolve(results[0]);
      });
    });
  }

  static async create(userData) {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO users (email, password) VALUES (?, ?)';
      db.query(query, [userData.email, userData.password], (err, results) => {
        if (err) reject(err);
        resolve(results);
      });
    });
  }
}

module.exports = User; 