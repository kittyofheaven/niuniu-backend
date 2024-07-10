// src/config/logger.go

package config

import (
	"fmt"
	"os"
	"path/filepath"
	"runtime"

	"github.com/sirupsen/logrus"
)

// Logger global
var Logger *logrus.Logger

// InitLogger menginisialisasi logger dengan log level yang ditentukan
func InitLogger(logLevel string) {
	Logger = logrus.New()
	Logger.SetOutput(os.Stderr)

	Logger.SetFormatter(&logrus.TextFormatter{
		FullTimestamp:   true,
		CallerPrettyfier: func(frame *runtime.Frame) (string, string) {
			// Menampilkan nama file dan nomor baris
			return filepath.Base(frame.File), fmt.Sprintf("%d", frame.Line)
		},
		DisableColors:   false,
		ForceColors:     true,
		DisableTimestamp: false,
		TimestampFormat: "2006-01-02 15:04:05",
		// Format log dengan Level dan pesan
		// Menambahkan spasi di antara informasi log dan pesan
		QuoteEmptyFields: true,
	})
	
	switch logLevel {
	case "debug":
		Logger.SetLevel(logrus.DebugLevel)
	case "info":
		Logger.SetLevel(logrus.InfoLevel)
	case "warn":
		Logger.SetLevel(logrus.WarnLevel)
	case "error":
		Logger.SetLevel(logrus.ErrorLevel)
	default:
		Logger.SetLevel(logrus.DebugLevel)  // Default ke debug jika tidak ada level yang cocok
	}
}
