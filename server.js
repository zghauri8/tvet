import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createClient } from "@supabase/supabase-js";

const app = express();
const PORT = process.env.PORT || 3001;

// Supabase configuration
const supabaseUrl = "https://qzgzfcmdoqgwppjzskhs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Z3pmY21kb3Fnd3Bwanpza2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjI5MzEsImV4cCI6MjA3MzE5ODkzMX0.fvKyWPWPtjhXilG72RpBW0xAaGC8OMwAUTDP_v_cMYU";
const supabase = createClient(supabaseUrl, supabaseKey);

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Middleware
app.use(cors());
app.use(express.json());

// Login endpoint
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user by email in Supabase
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, name, email, password_hash, role")
      .eq("email", email)
      .single();

    if (userError || !user) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response with token
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Signup endpoint
app.post("/api/auth/signup", async (req, res) => {
  try {
    console.log("Signup API called");
    const { name, email, password, role } = req.body;
    console.log("Request data:", {
      name,
      email,
      password: password ? "***" : "missing",
      role,
    });

    // Validate required fields
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        error: "Name, email, password, and role are required",
      });
    }

    console.log("Checking if user exists...");
    // Check if user already exists in Supabase
    const { data: existingUser, error: checkError } = await supabase
      .from("users")
      .select("id, email")
      .eq("email", email)
      .single();

    console.log("Check user result:", { existingUser, checkError });

    if (checkError && checkError.code !== "PGRST116") {
      // PGRST116 is "not found" error, which is expected for new users
      console.error("Error checking existing user:", checkError);

      // If table doesn't exist, provide helpful error message
      if (checkError.message.includes('relation "users" does not exist')) {
        return res.status(500).json({
          error: "Database table not found. Please set up the database first.",
          details:
            "The 'users' table doesn't exist in your Supabase database. Please follow the setup instructions.",
          setupUrl: "/setup.html",
        });
      }

      return res.status(500).json({
        error: "Database error",
        details: checkError.message,
        code: checkError.code,
      });
    }

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // Hash password
    console.log("Hashing password...");
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user in Supabase
    console.log("Creating user in database...");
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword,
          role,
        },
      ])
      .select("id, name, email, role, created_at")
      .single();

    console.log("Insert result:", { newUser, insertError });

    if (insertError) {
      console.error("Error creating user:", insertError);
      return res.status(500).json({
        error: "Failed to create user",
        details: insertError.message,
        code: insertError.code,
        hint: insertError.hint,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Return success response with token
    return res.status(201).json({
      message: "User created successfully",
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Verify token endpoint
app.post("/api/auth/verify", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        error: "Token is required",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, JWT_SECRET);

    // Get user from database to ensure they still exist
    const { data: user, error } = await supabase
      .from("users")
      .select("id, name, email, role")
      .eq("id", decoded.userId)
      .single();

    if (error || !user) {
      return res.status(401).json({
        error: "Invalid token",
      });
    }

    return res.status(200).json({
      message: "Token is valid",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      error: "Invalid token",
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Authentication server is running" });
});

app.listen(PORT, () => {
  console.log(`Authentication server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});
