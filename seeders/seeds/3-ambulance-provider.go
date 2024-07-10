package seeders

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	_ "github.com/go-sql-driver/mysql"
	"golang.org/x/crypto/bcrypt"
)

func RunAmbulanceProviderSeeder() {
	// Get environment variables
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	host := os.Getenv("DB_HOST") // Add this if not already present
	port := os.Getenv("DB_PORT") // Add this if not already present

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
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte("niuniuambulance_providertest"), bcrypt.DefaultCost)
	if err != nil {
		log.Fatalf("Failed to hash the password: %v", err)
	}

	// Seeder SQL commands
	seederSQL := `
	INSERT INTO ambulance_providers (id, email, phone_number, ambulance_provider_name, password, location, kota_id, createdAt, updatedAt) VALUES
	(1, 'drsoetomo@test.com', '085788897671', 'RSUD Dr Soetomo', ?, ST_GeomFromText('POINT(-7.26820381224195 112.75806642569326)', 4326), 1, NOW(), NOW()),
	(2, 'husadautama@test.com', '085788897672', 'RS Husada Utama', ?, ST_GeomFromText('POINT(-7.265335536486964 112.75611590120036)', 4326), 1, NOW(), NOW()),
	(3, 'rsdarmosurabaya@test.com', '085788897673', 'RSU Darmo', ?, ST_GeomFromText('POINT(-7.287402250547901 112.73850015433082)', 4326), 1, NOW(), NOW()),
	(4, 'gotongroyong@test.com', '085788897674', 'RS Gotong Royong', ?, ST_GeomFromText('POINT(-7.307039333797904 112.78748946674773)', 4326), 1, NOW(), NOW()),
	(5, 'pusatkesehatankeputih@test.com', '085788897675', 'Puskesmas Keputih', ?, ST_GeomFromText('POINT(-7.294032341579099 112.80174314593188)', 4326), 1, NOW(), NOW()),
	(6, 'rsudsidoarjobarat@test.com', '085788897675', 'RSUD Sidoarjo Barat', ?, ST_GeomFromText('POINT(-7.406545813965696 112.58488933898717)', 4326), 10, NOW(), NOW()),
	(7, 'deltasuryasidoarjo@test.com', '085788897675', 'RS Delta Surya Sidoarjo', ?, ST_GeomFromText('POINT(-7.447134230900902 112.70157036782365)', 4326), 10, NOW(), NOW()),
	(8, 'ciptomangunkusumo@test.com', '085788897675', 'RSUPN Dr. Cipto Mangunkusumo', ?, ST_GeomFromText('POINT(-6.197559440585179 106.84686978871808)', 4326), 27, NOW(), NOW()),
	(9, 'abdiwaluyo@test.com', '085788897675', 'RS Abdi Waluyo', ?, ST_GeomFromText('POINT(-6.189851660085455 106.82905851199544)', 4326), 27, NOW(), NOW()),
	(10, 'rsupkariadi@test.com', '085788897675', 'RSUP Dr. Kariadi', ?, ST_GeomFromText('POINT(-6.994201144009988 110.40751115432857)', 4326), 12, NOW(), NOW()),
	(11, 'rsudtugurejo@test.com', '085788897675', 'RSUD Tugurejo', ?, ST_GeomFromText('POINT(-6.984092686665531 110.35484254109745)', 4326), 12, NOW(), NOW())
	`

	// Execute the seeder SQL commands
	_, err = db.Exec(seederSQL, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword, hashedPassword)
	if err != nil {
		log.Fatalf("Failed to execute seeder SQL: %v", err)
	}

	fmt.Println("AmbulanceProvider data inserted successfully!")
}
