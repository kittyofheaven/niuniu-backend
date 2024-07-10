package seeders

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"golang.org/x/crypto/bcrypt"
	_ "github.com/go-sql-driver/mysql"
)

func RunAdminSeeder() {
	// Get environment variables
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")

	adminUsername := os.Getenv("SECRET_ADMIN_USERNAME")
	adminPassword := os.Getenv("SECRET_ADMIN_PASSWORD")

	// Create connection string for MySQL
	connStr := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", user, password, host, port, dbname)
	db, err := sql.Open("mysql", connStr)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	defer db.Close()

	// Check the connection
	if err := db.Ping(); err != nil {
		log.Fatal("Error pinging the database: ", err)
	}

	// Hash password for the seeder
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(adminPassword), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash the password: %v", err)
	}

	// Prepare the insert statement
	stmt, err := db.Prepare(`
		INSERT INTO admin_accounts (id, username, password)
		VALUES (?, ?, ?)
	`)
	if err != nil {
		log.Fatalf("Failed to prepare SQL statement: %v", err)
	}
	defer stmt.Close()

	// Execute the insert statement
	_, err = stmt.Exec(1, adminUsername, hashedPassword)
	if err != nil {
		log.Fatalf("Failed to execute SQL statement: %v", err)
	}

	fmt.Println("Admin account inserted successfully!")
}

