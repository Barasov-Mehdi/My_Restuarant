const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// MongoDB bağlantısı
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Body parser ayarları
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// EJS'i şablon motoru olarak ayarlama
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'sasFile')));
app.use(express.static(path.join(__dirname, 'node_modules')));

// Router'ı yükleme
const homeRouter = require('./routes/home');
app.use('/', homeRouter);

// Sunucuyu başlatma
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});