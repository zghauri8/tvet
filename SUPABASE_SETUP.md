# Supabase Database Setup Guide

This guide will help you set up your Supabase database for the authentication system.

## 🗄️ Database Setup

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com](https://supabase.com)
2. Sign in to your account
3. Navigate to your project: `qzgzfcmdoqgwppjzskhs`

### Step 2: Create Database Schema
1. Go to the **SQL Editor** in your Supabase dashboard
2. Copy and paste the contents of `database-schema.sql` file
3. Click **Run** to execute the SQL commands

### Step 3: Verify Table Creation
1. Go to **Table Editor** in your Supabase dashboard
2. You should see a `users` table with the following columns:
   - `id` (UUID, Primary Key)
   - `name` (VARCHAR)
   - `email` (VARCHAR, Unique)
   - `password_hash` (VARCHAR)
   - `role` (VARCHAR)
   - `created_at` (TIMESTAMP)
   - `updated_at` (TIMESTAMP)

### Step 4: Check Demo Data
The schema includes demo users for testing:
- **Email:** `john@example.com` | **Password:** `password` | **Role:** `TVET_STUDENT`
- **Email:** `jane@example.com` | **Password:** `password` | **Role:** `WORKING_ADOF`

## 🔧 Configuration

### Environment Variables (Optional)
Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://qzgzfcmdoqgwppjzskhs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Z3pmY21kb3Fnd3Bwanpza2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjI5MzEsImV4cCI6MjA3MzE5ODkzMX0.fvKyWPWPtjhXilG72RpBW0xAaGC8OMwAUTDP_v_cMYU
JWT_SECRET=your-secret-key-change-in-production
```

## 🚀 Testing the Integration

### 1. Start the Development Server
```bash
# Install dependencies
npm install

# Start the authentication server
npm run server

# In another terminal, start the frontend
npm run dev

# Or run both together
npm run dev:full
```

### 2. Test Signup
- Go to `/signup`
- Create a new account
- Check your Supabase dashboard to see the new user in the `users` table

### 3. Test Login
- Go to `/login`
- Use the demo credentials or your newly created account
- Verify you can access the dashboard

### 4. Test Token Verification
- Login and check that the JWT token is stored in localStorage
- Refresh the page to test automatic token verification

## 📊 Database Schema Details

### Users Table
```sql
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'TVET_STUDENT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Security Features
- **Row Level Security (RLS)** enabled
- **Password hashing** with bcrypt
- **JWT token verification** with database validation
- **Automatic timestamp updates**

## 🔍 Troubleshooting

### Common Issues

1. **Connection Error**
   - Verify your Supabase URL and API key
   - Check if your project is active

2. **Table Not Found**
   - Run the SQL schema in Supabase SQL Editor
   - Check if the table was created successfully

3. **Authentication Failed**
   - Verify demo users were inserted
   - Check password hashing in the database

4. **CORS Issues**
   - Supabase handles CORS automatically
   - Check browser console for specific errors

### Database Queries for Testing

```sql
-- View all users
SELECT * FROM users;

-- Check specific user
SELECT * FROM users WHERE email = 'john@example.com';

-- Count total users
SELECT COUNT(*) FROM users;
```

## 🎯 Next Steps

1. **Run the database schema** in Supabase
2. **Test the authentication flow**
3. **Verify data persistence** in the database
4. **Customize the schema** as needed for your application

Your authentication system is now fully integrated with Supabase! 🎉
