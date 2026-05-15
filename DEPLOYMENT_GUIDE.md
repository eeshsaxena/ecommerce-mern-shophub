# 🚀 Deployment Guide - ShopHub E-Commerce

Complete guide to deploy your MERN e-commerce application to Vercel.

## 📋 Prerequisites

- Node.js installed
- Git installed
- Vercel account (free)
- MongoDB Atlas account (free)

---

## 🗄️ Step 1: Set Up MongoDB Atlas

### 1.1 Create Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with email or Google

### 1.2 Create Cluster
1. Choose "Shared" (Free tier)
2. Select cloud provider (AWS recommended)
3. Choose region closest to you
4. Click "Create Cluster"
5. Wait 3-5 minutes for cluster creation

### 1.3 Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `admin`
5. Password: Generate secure password (save it!)
6. User Privileges: "Atlas admin"
7. Click "Add User"

### 1.4 Whitelist IP Address
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `ecommerce`

Example:
```
mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/ecommerce?retryWrites=true&w=majority
```

---

## 🌱 Step 2: Seed Database

### 2.1 Update Local .env
```bash
# Edit ecommerce-server/.env
MONGODB_URI=your_mongodb_atlas_connection_string
```

### 2.2 Start Server and Seed
```bash
# Terminal 1: Start server
npm run server

# Terminal 2: Seed database
curl -X POST http://localhost:5000/api/seed
```

You should see:
```json
{
  "message": "Database seeded successfully",
  "count": 12
}
```

---

## 🚀 Step 3: Deploy to Vercel

### 3.1 Install Vercel CLI
```bash
npm install -g vercel
```

### 3.2 Login to Vercel
```bash
vercel login
```

Choose your preferred login method (Email, GitHub, GitLab, or Bitbucket).

### 3.3 Initialize Git Repository
```bash
git init
git add .
git commit -m "Initial commit - E-commerce MERN app"
```

### 3.4 Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- Project name? **shophub-ecommerce** (or your choice)
- In which directory is your code located? **./**
- Want to override settings? **N**

### 3.5 Add Environment Variables
```bash
vercel env add MONGODB_URI
```
Paste your MongoDB Atlas connection string

```bash
vercel env add JWT_SECRET
```
Enter a secure random string (e.g., `your-super-secret-jwt-key-12345`)

```bash
vercel env add NODE_ENV
```
Enter: `production`

### 3.6 Deploy to Production
```bash
vercel --prod
```

---

## ✅ Step 4: Verify Deployment

### 4.1 Check URLs
Vercel will provide URLs like:
- **Production**: https://shophub-ecommerce.vercel.app
- **API**: https://shophub-ecommerce.vercel.app/api/health

### 4.2 Test API
```bash
curl https://your-app.vercel.app/api/health
```

Should return:
```json
{
  "status": "E-commerce API is running",
  "timestamp": "2026-05-15T..."
}
```

### 4.3 Test Frontend
1. Open your Vercel URL in browser
2. You should see the ShopHub homepage
3. Browse products
4. Try adding to cart
5. Register/Login
6. Place a test order

---

## 🔧 Alternative: Deploy via GitHub

### Option A: GitHub Integration

1. **Push to GitHub:**
```bash
git remote add origin https://github.com/yourusername/shophub-ecommerce.git
git branch -M main
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `NODE_ENV`
   - Click "Deploy"

---

## 🛠️ Troubleshooting

### Issue: MongoDB Connection Failed
**Solution:**
- Verify connection string is correct
- Check IP whitelist in MongoDB Atlas
- Ensure database user has correct permissions

### Issue: Vercel Build Failed
**Solution:**
```bash
# Test build locally first
cd ecommerce-client
npm run build
```

### Issue: API Routes Not Working
**Solution:**
- Check `vercel.json` configuration
- Verify routes are correctly defined
- Check Vercel function logs

### Issue: Environment Variables Not Working
**Solution:**
```bash
# Re-add environment variables
vercel env rm MONGODB_URI
vercel env add MONGODB_URI

# Redeploy
vercel --prod
```

---

## 📊 Post-Deployment Checklist

- [ ] MongoDB Atlas cluster is running
- [ ] Database is seeded with products
- [ ] Environment variables are set in Vercel
- [ ] Frontend loads correctly
- [ ] API endpoints respond
- [ ] User registration works
- [ ] Login/Logout works
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Checkout process works
- [ ] Orders are saved to database

---

## 🔄 Continuous Deployment

### Automatic Deployments
Once connected to GitHub, Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you create a pull request

### Manual Deployments
```bash
# Deploy latest changes
git add .
git commit -m "Update features"
git push

# Or use Vercel CLI
vercel --prod
```

---

## 📈 Monitoring

### Vercel Dashboard
- View deployment logs
- Monitor function execution
- Check analytics
- View error logs

### MongoDB Atlas
- Monitor database performance
- View connection metrics
- Check query performance
- Set up alerts

---

## 🎉 Success!

Your e-commerce application is now live!

**Share your deployment:**
- Production URL: `https://your-app.vercel.app`
- API Health: `https://your-app.vercel.app/api/health`

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review this guide
4. Check the main README.md

**Happy Deploying! 🚀**
