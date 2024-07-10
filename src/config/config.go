
// src/config/config.go

package config

import (
	"github.com/joho/godotenv"
	"os"
)

// LoadConfig memuat variabel lingkungan dan menginisialisasi konfigurasi
func LoadConfig() {
	// Memuat variabel lingkungan dari file yang sesuai berdasarkan APP_ENV
	env := os.Getenv("APP_ENV")
	if env == "" {
		env = "development"  // Default ke development jika APP_ENV tidak diatur
	}

	var envFile string
	switch env {
	case "production":
		envFile = ".env.production"
	case "development":
		envFile = ".env.development"
	default:
		envFile = ".env.development"
	}

	err := godotenv.Load(envFile)
	if err != nil {
		Logger.Error("Error loading .env file", "error", err)  // Gunakan slog untuk logging kesalahan
		os.Exit(1)  // Keluar dari aplikasi jika tidak bisa memuat .env
	}

	// Mendapatkan level log dari variabel lingkungan, default ke "debug" jika tidak ada
	logLevel := os.Getenv("LOG_LEVEL")
	if logLevel == "" {
		logLevel = "debug"
	}

	InitLogger(logLevel)  // Inisialisasi logger dengan level yang sesuai
	InitDB()	// Inisialisasi koneksi database
}
