// src/routes/healthcheck.go

package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/kittyofheaven/niuniu-backend/src/config"
)

// Fungsi Healthcheck untuk rute /healthcheck
func Healthcheck(c *fiber.Ctx) error {
	config.Logger.Info("Healthcheck endpoint called, Server is runningz")
	return c.SendString("Server is running")
}

// SetupRoutes mendefinisikan rute aplikasi
func SetupRoutes(app *fiber.App) {
	app.Get("/healthcheck", Healthcheck)
}
