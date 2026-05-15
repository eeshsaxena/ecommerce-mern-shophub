const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    console.log('\n⚠️  MongoDB is not running. Please:');
    console.log('   1. Install MongoDB from https://www.mongodb.com/try/download/community');
    console.log('   2. Start MongoDB service');
    console.log('   3. Or use MongoDB Atlas: https://www.mongodb.com/cloud/atlas\n');
  }
};

connectDB();

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/orders', require('./routes/orders'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'E-commerce API is running', timestamp: new Date() });
});

// Seed route for demo data
app.post('/api/seed', async (req, res) => {
  try {
    const Product = require('./models/Product');
    
    // Clear existing products
    await Product.deleteMany({});

    const sampleProducts = [
      {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life',
        price: 199.99,
        category: 'Electronics',
        stock: 50,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300',
        rating: 4.5,
        numReviews: 128,
        featured: true
      },
      {
        name: 'Smart Watch',
        description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
        price: 299.99,
        category: 'Electronics',
        stock: 35,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
        rating: 4.7,
        numReviews: 95,
        featured: true
      },
      {
        name: 'Laptop Backpack',
        description: 'Durable water-resistant backpack with laptop compartment',
        price: 49.99,
        category: 'Other',
        stock: 100,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300',
        rating: 4.3,
        numReviews: 67
      },
      {
        name: 'Running Shoes',
        description: 'Lightweight running shoes with superior cushioning',
        price: 89.99,
        category: 'Sports',
        stock: 75,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300',
        rating: 4.6,
        numReviews: 143,
        featured: true
      },
      {
        name: 'Coffee Maker',
        description: 'Programmable coffee maker with thermal carafe',
        price: 79.99,
        category: 'Home',
        stock: 45,
        image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=300',
        rating: 4.4,
        numReviews: 89
      },
      {
        name: 'Yoga Mat',
        description: 'Non-slip eco-friendly yoga mat with carrying strap',
        price: 29.99,
        category: 'Sports',
        stock: 120,
        image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300',
        rating: 4.5,
        numReviews: 76
      },
      {
        name: 'Desk Lamp',
        description: 'LED desk lamp with adjustable brightness and color temperature',
        price: 39.99,
        category: 'Home',
        stock: 60,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300',
        rating: 4.2,
        numReviews: 54
      },
      {
        name: 'Bluetooth Speaker',
        description: 'Portable waterproof Bluetooth speaker with 360° sound',
        price: 59.99,
        category: 'Electronics',
        stock: 85,
        image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300',
        rating: 4.6,
        numReviews: 112,
        featured: true
      },
      {
        name: 'Cookbook Collection',
        description: 'Set of 3 bestselling cookbooks for home chefs',
        price: 44.99,
        category: 'Books',
        stock: 40,
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300',
        rating: 4.8,
        numReviews: 201
      },
      {
        name: 'Gaming Mouse',
        description: 'RGB gaming mouse with programmable buttons',
        price: 69.99,
        category: 'Electronics',
        stock: 55,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300',
        rating: 4.7,
        numReviews: 134
      },
      {
        name: 'Water Bottle',
        description: 'Insulated stainless steel water bottle keeps drinks cold for 24hrs',
        price: 24.99,
        category: 'Sports',
        stock: 150,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=300',
        rating: 4.5,
        numReviews: 98
      },
      {
        name: 'Board Game',
        description: 'Strategy board game for family game night',
        price: 34.99,
        category: 'Toys',
        stock: 70,
        image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=300',
        rating: 4.6,
        numReviews: 87,
        featured: true
      }
    ];

    const products = await Product.insertMany(sampleProducts);
    res.json({ message: 'Database seeded successfully', count: products.length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 E-commerce server running on port ${PORT}`);
});
