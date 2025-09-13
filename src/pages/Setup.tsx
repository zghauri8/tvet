import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Database, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";

export default function Setup() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const sqlSchema = `-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'TVET_STUDENT',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies for RLS
-- Allow users to read their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid()::text = id::text);

-- Allow users to update their own data
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid()::text = id::text);

-- Allow users to insert their own data (for signup)
CREATE POLICY "Users can insert own profile" ON users
  FOR INSERT WITH CHECK (true);

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_users_updated_at 
  BEFORE UPDATE ON users 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Insert some demo users (optional - for testing)
-- Note: These passwords are hashed with bcrypt for "password"
INSERT INTO users (name, email, password_hash, role) VALUES
  ('John Doe', 'john@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'TVET_STUDENT'),
  ('Jane Smith', 'jane@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'WORKING_ADOF')
ON CONFLICT (email) DO NOTHING;`;

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-gradient-primary text-white">
            <Database className="w-4 h-4 mr-2" />
            Database Setup
          </Badge>
          <h1 className="text-4xl font-bold mb-4">Supabase Database Setup</h1>
          <p className="text-xl text-muted-foreground">
            Follow these steps to set up your authentication database
          </p>
        </div>

        <div className="space-y-6">
          {/* Step 1 */}
          <Card className="p-6 shadow-card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Access Supabase Dashboard
                </h3>
                <p className="text-muted-foreground mb-4">
                  Go to your Supabase project dashboard and navigate to the SQL
                  Editor.
                </p>
                <Button
                  variant="outline"
                  onClick={() =>
                    window.open("https://supabase.com/dashboard", "_blank")
                  }
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Open Supabase Dashboard
                </Button>
              </div>
            </div>
          </Card>

          {/* Step 2 */}
          <Card className="p-6 shadow-card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Run the Database Schema
                </h3>
                <p className="text-muted-foreground mb-4">
                  Copy the SQL schema below and run it in your Supabase SQL
                  Editor.
                </p>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => copyToClipboard(sqlSchema)}
                  >
                    {copied ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <pre className="text-sm overflow-x-auto">
                    <code>{sqlSchema}</code>
                  </pre>
                </div>

                <p className="text-sm text-muted-foreground">
                  This will create the users table with proper security policies
                  and demo users for testing.
                </p>
              </div>
            </div>
          </Card>

          {/* Step 3 */}
          <Card className="p-6 shadow-card">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Verify Setup</h3>
                <p className="text-muted-foreground mb-4">
                  Check that the users table was created successfully and
                  contains the demo users.
                </p>

                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
                  <pre className="text-sm">
                    <code>{`-- Verify table creation
SELECT * FROM users;

-- Check demo users
SELECT name, email, role FROM users WHERE email IN ('john@example.com', 'jane@example.com');`}</code>
                  </pre>
                </div>
              </div>
            </div>
          </Card>

          {/* Demo Credentials */}
          <Card className="p-6 shadow-card border-green-200 bg-green-50">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-green-600 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-green-800">
                  Demo Credentials
                </h3>
                <p className="text-green-700 mb-4">
                  Use these credentials to test the authentication system:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">
                      TVET Student
                    </h4>
                    <p className="text-sm text-green-700">
                      <strong>Email:</strong> john@example.com
                      <br />
                      <strong>Password:</strong> password
                    </p>
                  </div>

                  <div className="bg-white p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">
                      Working Professional
                    </h4>
                    <p className="text-sm text-green-700">
                      <strong>Email:</strong> jane@example.com
                      <br />
                      <strong>Password:</strong> password
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Next Steps */}
          <Card className="p-6 shadow-card">
            <div className="flex items-start space-x-4">
              <CheckCircle className="w-8 h-8 text-primary mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">Next Steps</h3>
                <p className="text-muted-foreground mb-4">
                  Once the database is set up, you can:
                </p>

                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Start the development server with{" "}
                    <code className="bg-gray-100 px-2 py-1 rounded">
                      npm run dev:full
                    </code>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Test the signup and login functionality
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    Access the dashboard after authentication
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
