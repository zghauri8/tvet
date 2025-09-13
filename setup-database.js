const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Supabase configuration
const supabaseUrl = "https://qzgzfcmdoqgwppjzskhs.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6Z3pmY21kb3Fnd3Bwanpza2hzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2MjI5MzEsImV4cCI6MjA3MzE5ODkzMX0.fvKyWPWPtjhXilG72RpBW0xAaGC8OMwAUTDP_v_cMYU";

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupDatabase() {
  try {
    console.log("🚀 Setting up database...");

    // Read the SQL schema file
    const schemaPath = path.join(__dirname, "database-schema.sql");
    const schema = fs.readFileSync(schemaPath, "utf8");

    // Split the schema into individual statements
    const statements = schema
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);

        const { data, error } = await supabase.rpc("exec_sql", {
          sql: statement,
        });

        if (error) {
          console.error(
            `❌ Error executing statement ${i + 1}:`,
            error.message
          );
          // Continue with other statements
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`);
        }
      }
    }

    console.log("🎉 Database setup completed!");
    console.log("\n📋 Next steps:");
    console.log("1. Start the authentication server: npm run server");
    console.log("2. Start the frontend: npm run dev");
    console.log("3. Or run both: npm run dev:full");
    console.log("\n🔑 Demo credentials:");
    console.log(
      "Email: john@example.com | Password: password | Role: TVET_STUDENT"
    );
    console.log(
      "Email: jane@example.com | Password: password | Role: WORKING_ADOF"
    );
  } catch (error) {
    console.error("❌ Setup failed:", error.message);
    console.log("\n📖 Manual setup instructions:");
    console.log("1. Go to your Supabase dashboard");
    console.log("2. Navigate to SQL Editor");
    console.log("3. Copy and paste the contents of database-schema.sql");
    console.log("4. Click Run to execute the SQL");
  }
}

// Check if we're running this script directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };
