const pool = require('../config/db');

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT id, name, email, role, status, created_at FROM users ORDER BY id ASC');
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('Error getAllUsers:', err);
    res.status(500).json({ success: false, message: 'Gagal mengambil data user dari server.' });
  }
};

// Register / Create user
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role = 'Pelanggan', status = 'Aktif' } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Nama, email, dan password wajib diisi.' });
    }

    // Cek duplikat
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Email sudah terdaftar di sistem.' });
    }

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role, status) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, role, status]
    );

    res.status(201).json({
      success: true,
      message: 'User berhasil didaftarkan!',
      data: { id: result.insertId, name, email, role, status }
    });
  } catch (err) {
    console.error('Error registerUser:', err);
    res.status(500).json({ success: false, message: 'Gagal mendaftarkan user di database.' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi.' });
    }

    const [rows] = await pool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Email atau password salah.' });
    }

    const user = rows[0];
    res.json({
      success: true,
      message: 'Login berhasil!',
      data: { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status }
    });
  } catch (err) {
    console.error('Error loginUser:', err);
    res.status(500).json({ success: false, message: 'Gagal melakukan login di server.' });
  }
};

// Update role user
exports.updateUserRole = async (req, res) => {
  try {
    const { email } = req.params;
    const { role } = req.body;

    if (email === 'admin@bangibshop.com') {
      return res.status(400).json({ success: false, message: 'Administrator Utama tidak dapat diubah rolenya.' });
    }

    await pool.query('UPDATE users SET role = ? WHERE email = ?', [role, email]);
    res.json({ success: true, message: `Role user berhasil diubah menjadi ${role}.` });
  } catch (err) {
    console.error('Error updateUserRole:', err);
    res.status(500).json({ success: false, message: 'Gagal mengubah role user di server.' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const { email } = req.params;

    if (email === 'admin@bangibshop.com') {
      return res.status(400).json({ success: false, message: 'Administrator Utama tidak dapat dihapus.' });
    }

    await pool.query('DELETE FROM users WHERE email = ?', [email]);
    res.json({ success: true, message: 'User berhasil dihapus dari database.' });
  } catch (err) {
    console.error('Error deleteUser:', err);
    res.status(500).json({ success: false, message: 'Gagal menghapus user di server.' });
  }
};
