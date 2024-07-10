package main

import (
	"fmt"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/kittyofheaven/niuniu-backend/src/config"
	"github.com/kittyofheaven/niuniu-backend/src/routes"
)

func main() {
	config.LoadConfig()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3000"
	}

	fmt.Printf("Log Level: %s\n", os.Getenv("LOG_LEVEL"))

	app := fiber.New(fiber.Config{
		ErrorHandler: func(c *fiber.Ctx, err error) error {
			config.Logger.Error("Request failed", "error", err, "method", c.Method(), "path", c.Path())
			return c.SendStatus(fiber.StatusInternalServerError)
		},
	})

	app.Use(func(c *fiber.Ctx) error {
		config.Logger.Info("Request received", " method:", c.Method(), " path:", c.Path())
		return c.Next()
	})

	routes.SetupRoutes(app)

	config.Logger.Info("Server is running on port " + port)

	err := app.Listen(":" + port)
	if err != nil {
		config.Logger.Error("Error starting server", "error", err)
		os.Exit(1)
	}
}
