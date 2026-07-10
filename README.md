# 🛍️ ShopHub - Full-Stack E-Commerce MERN Application

A complete e-commerce platform built with MongoDB, Express.js, React, and Node.js.

## 🌟 Features

### Customer Features
- 🏠 **Home Page** with featured products
- 🛒 **Product Catalog** with search and category filters
- 📦 **Product Details** with ratings and reviews
- 🛍️ **Shopping Cart** with quantity management
- 💳 **Checkout Process** with shipping address
- 📋 **Order History** and tracking
- 👤 **User Authentication** (Register/Login)
- 💰 **Multiple Payment Methods**

### Technical Features
- ✅ RESTful API architecture
- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ MongoDB database with Mongoose ODM
- ✅ React Context API for state management
- ✅ React Router for navigation
- ✅ Responsive design (mobile-friendly)
- ✅ Real-time cart updates
- ✅ Order management system
- ✅ Stock management

## 📁 Project Structure

```
ecommerce-mern/
├── ecommerce-client/          # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductCard.js
│   │   │   └── *.css
│   │   ├── context/
│   │   │   ├── AuthContext.js
│   │   │   └── CartContext.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Products.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Checkout.js
│   │   │   ├── Orders.js
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   └── *.css
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── ecommerce-server/          # Express Backend
│   ├── models/
│   │   ├── Product.js
│   │   ├── User.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── products.js
│   │   ├── auth.js
│   │   └── orders.js
│   ├── index.js
│   ├── .env
│   └── package.json
│
├── package.json              # Root scripts
├── vercel.json              # Vercel deployment config
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (free tier available)
- npm or yarn

### Installation

1. **Clone and install dependencies:**
```bash
npm run install-all
```

2. **Set up MongoDB Atlas:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Create a free account
   - Create a new cluster
   - Get your connection string
   - Update `ecommerce-server/.env`:
     ```
     MONGODB_URI=your_mongodb_atlas_connection_string
     ```

3. **Seed the database with sample products:**

   `POST /api/seed` **deletes every existing product** before inserting the
   samples, so it is disabled unless `SEED_TOKEN` is set and presented as the
   `x-seed-token` header.

```bash
# Start the server first (with SEED_TOKEN set in your .env)
npm run server

# Then in another terminal, seed the database:
curl -X POST http://localhost:5000/api/seed -H "x-seed-token: $SEED_TOKEN"
```

4. **Run the application:**
```bash
npm run dev
```

This starts:
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

## 📦 API Endpoints

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders/:userId` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `GET /api/orders` - Get all orders (admin)

### Utility
- `GET /api/health` - Health check
- `POST /api/seed` - Reseed sample products (requires `x-seed-token`; wipes existing products)

## 🌐 Deployment

The only value you must supply is a **MongoDB Atlas connection string**
(free tier at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)).

### Environment Variables

| Variable | Required | Notes |
|---|---|---|
| `MONGODB_URI` | yes | Atlas connection string |
| `JWT_SECRET` | yes | Token signing key. Render generates one automatically. |
| `SEED_TOKEN` | no | Enables `POST /api/seed`. Leave unset to disable seeding. |
| `NODE_ENV` | yes | `production` |

In production the server **refuses to boot** if `MONGODB_URI` or `JWT_SECRET`
is missing, rather than falling back to an insecure default.

### Render (recommended)

`render.yaml` is a ready blueprint. Point Render at this repo and set
`MONGODB_URI`; `JWT_SECRET` and `SEED_TOKEN` are generated for you. Express
serves the built React client and the API from one origin.

### Vercel

```bash
npm install -g vercel && vercel login && vercel --prod
```

Then set the environment variables above in the Vercel dashboard.

### Docker

```bash
docker build -t shophub .
docker run -p 5000:5000 --env-file .env shophub
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Navigation
- **Axios** - HTTP client
- **Context API** - State management
- **CSS3** - Styling

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📱 Features Walkthrough

### 1. Browse Products
- View all products with beautiful cards
- Filter by category (Electronics, Clothing, Books, etc.)
- Search products by name
- See ratings and reviews

### 2. Product Details
- View detailed product information
- See high-quality images
- Check stock availability
- Select quantity
- Add to cart

### 3. Shopping Cart
- View all cart items
- Update quantities
- Remove items
- See order summary with tax and shipping
- Free shipping on orders over $50

### 4. Checkout
- Enter shipping address
- Select payment method
- Review order summary
- Place order

### 5. Order Management
- View order history
- Track order status
- See order details
- Payment confirmation

### 6. User Authentication
- Register new account
- Login/Logout
- Secure password storage
- JWT token authentication

## 🎨 UI/UX Features

- **Responsive Design** - Works on all devices
- **Modern Gradient UI** - Beautiful color schemes
- **Smooth Animations** - Hover effects and transitions
- **Loading States** - User feedback during operations
- **Error Handling** - Clear error messages
- **Empty States** - Helpful messages when no data

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Protected routes
- Input validation
- CORS enabled
- Environment variables for secrets

## 📊 Sample Data

The application includes 12 sample products across categories:
- Electronics (Headphones, Smart Watch, Bluetooth Speaker, Gaming Mouse)
- Sports (Running Shoes, Yoga Mat, Water Bottle)
- Home (Coffee Maker, Desk Lamp)
- Books (Cookbook Collection)
- Toys (Board Game)
- Other (Laptop Backpack)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB Atlas cluster is running
- Check connection string in `.env`
- Whitelist your IP address in MongoDB Atlas
- Verify network access settings

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Environment Variables

### Server (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

ISC License

## 👨‍💻 Author

Built with ❤️ using MERN Stack

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons from Unicode Emoji
- Inspiration from modern e-commerce platforms

---

**Happy Shopping! 🛍️**
