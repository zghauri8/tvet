# Authentication System Integration

This project now includes a complete authentication system integrated from the `authentiction` folder, featuring JWT tokens, form validation with Formik and Yup, and Supabase integration.

## Features

- ✅ **User Registration** - Signup with form validation
- ✅ **User Login** - Login with form validation  
- ✅ **JWT Token Management** - Secure token storage in localStorage
- ✅ **Form Validation** - Using Formik and Yup for robust validation
- ✅ **Protected Routes** - Dashboard access requires authentication
- ✅ **Session Management** - Automatic token verification and refresh
- ✅ **Responsive UI** - Modern, mobile-friendly design with Tailwind CSS
- ✅ **Role-based Access** - Support for TVET_STUDENT and WORKING_ADOF roles

## API Endpoints

### POST /api/auth/signup
Creates a new user account
```json
{
  "name": "John Doe",
  "email": "john@example.com", 
  "password": "password123",
  "role": "TVET_STUDENT"
}
```

### POST /api/auth/login
Authenticates a user
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### POST /api/auth/verify
Verifies JWT token validity
```json
{
  "token": "jwt_token_here"
}
```

## Demo Credentials

For testing purposes, the following demo accounts are available:

**Account 1:**
- Email: `john@example.com`
- Password: `password`
- Role: `TVET_STUDENT`

**Account 2:**
- Email: `jane@example.com`
- Password: `password`
- Role: `WORKING_ADOF`

## Pages

- `/` - Home page with role selection
- `/signup` - User registration form
- `/login` - User login form  
- `/dashboard` - Protected dashboard (requires authentication)

## Technologies Used

- **Vite + React + TypeScript** - Frontend framework
- **Formik** - Form handling
- **Yup** - Form validation
- **JWT** - Token-based authentication
- **bcryptjs** - Password hashing
- **Supabase** - Database and backend services
- **Tailwind CSS** - Styling
- **localStorage** - Client-side token storage
- **Express.js** - Authentication server

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up Supabase database:
   - Follow the instructions in `SUPABASE_SETUP.md`
   - Run the SQL schema in your Supabase dashboard

3. Start the development servers:
```bash
# Start both frontend and backend
npm run dev:full

# Or start them separately:
npm run server  # Backend on port 3001
npm run dev     # Frontend on port 5173
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Authentication Flow

1. **Role Selection** - User chooses between TVET Student or Working Professional
2. **Signup/Login** - User enters credentials
3. **Validation** - Formik + Yup validate input
4. **API Call** - Credentials sent to backend
5. **Database Check** - Supabase validates user data
6. **Token Generation** - JWT token created on successful auth
7. **Storage** - Token stored in localStorage
8. **Session Management** - Token automatically verified on app load
9. **Protected Access** - Dashboard and other protected routes check authentication

## Security Features

- Passwords are hashed using bcryptjs
- JWT tokens expire after 7 days
- Token verification on every protected route access
- Automatic token cleanup on logout
- Form validation prevents malicious input
- Supabase Row Level Security (RLS) enabled
- Database-level user validation

## File Structure

```
src/
├── contexts/
│   └── AuthContext.tsx          # Authentication context and hooks
├── views/
│   ├── LoginView.tsx            # Login form component
│   ├── SignupView.tsx           # Signup form component
│   └── DashboardView.tsx        # Protected dashboard
├── lib/
│   └── supabase.ts              # Supabase client configuration
├── components/
│   └── Authentication.tsx       # Role selection component
└── App.tsx                      # Main app with routing

server.js                        # Express authentication server
database-schema.sql              # Database schema for Supabase
SUPABASE_SETUP.md               # Database setup instructions
```

## Architecture

The application follows a clean architecture pattern:

- **`contexts/`** - React contexts for global state management
- **`views/`** - Authentication view components
- **`lib/`** - Utility libraries (Supabase client)
- **`server.js`** - Backend API routes for authentication
- **`components/`** - Reusable UI components

## Database Integration

The system uses **Supabase** as the backend database:

- **Real-time database** with PostgreSQL
- **Row Level Security (RLS)** for data protection
- **Automatic user management** and validation
- **Scalable and secure** authentication system

## Setup Files

- **`database-schema.sql`** - SQL schema to create tables in Supabase
- **`SUPABASE_SETUP.md`** - Detailed setup instructions
- **`AUTH_README.md`** - This comprehensive guide

## Development Commands

```bash
# Install dependencies
npm install

# Start authentication server only
npm run server

# Start frontend only
npm run dev

# Start both frontend and backend
npm run dev:full

# Build for production
npm run build

# Preview production build
npm run preview
```

The authentication system is now fully functional with Supabase integration and ready to use! 🚀
