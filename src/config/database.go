package config

import (
	"log"
	"os"

	"github.com/kittyofheaven/niuniu-backend/src/models" // Path ke folder models
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

// InitDB initializes the database connection
func InitDB() {
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASS")
	dbname := os.Getenv("DB_NAME")
	dsn := user + ":" + password + "@tcp(" + host + ":" + port + ")/" + dbname + "?charset=utf8mb4&parseTime=True&loc=Local"

	var err error
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	// Migrasi skema
	err = DB.AutoMigrate(
		&models.AdminAccounts{},
		&models.Provinsi{},
		&models.Kota{},
		&models.AmbulanceProvider{},
		&models.Hospital{},
		&models.DriverAccount{},
		&models.UserAccount{},
		&models.EmergencyEvent{},
		&models.UserOTP{},
	)
	if err != nil {
		log.Fatalf("failed to migrate database: %v", err)
	}
}
