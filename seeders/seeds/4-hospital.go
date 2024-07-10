package seeders

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"path/filepath"

	_ "github.com/go-sql-driver/mysql"
)

type Hospital struct {
	NamaRS   string `json:"nama_rs"`
	NomorTelp string `json:"nomor_telp"`
	Kelas     string `json:"kelas"`
	Lat       string `json:"lat"`
	Lng       string `json:"lng"`
}

func RunHospitalSeeder() {
	// Get environment variables
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")

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

	// Read the JSON file
	filePath := filepath.Join("scraper", "rs_surabaya_withlocation.json")
	log.Printf("Reading JSON file: %s", filePath)
	fileData, err := os.ReadFile(filePath)
	if err != nil {
		log.Fatalf("Failed to read JSON file: %v", err)
	}

	// Parse the JSON data
	var hospitals []Hospital
	err = json.Unmarshal(fileData, &hospitals)
	if err != nil {
		log.Fatalf("Failed to parse JSON data: %v", err)
	}

	// Prepare the insert statement
	stmt, err := db.Prepare(`
		INSERT INTO Hospitals (id, hospital_name, phone_number, kelas, location, kota_id, createdAt, updatedAt)
		VALUES (?, ?, ?, ?, ST_GeomFromText(?), ?, NOW(), NOW())
	`)
	if err != nil {
		log.Fatalf("Failed to prepare SQL statement: %v", err)
	}
	defer stmt.Close()

	// Insert the data
	startingID := 1
	for _, hospital := range hospitals {
		location := fmt.Sprintf("POINT(%s %s)", hospital.Lat, hospital.Lng)
		_, err := stmt.Exec(startingID, hospital.NamaRS, hospital.NomorTelp, hospital.Kelas, location, 1)
		if err != nil {
			log.Fatalf("Failed to execute SQL statement: %v", err)
		}
		startingID++
	}

	fmt.Println("Hospital data inserted successfully!")
}
