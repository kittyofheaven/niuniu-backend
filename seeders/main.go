package main

import (
	"log"

	"github.com/kittyofheaven/niuniu-backend/seeders/config"
	seeders "github.com/kittyofheaven/niuniu-backend/seeders/seeds" // Ganti dengan path sebenarnya ke folder seeders
)

func main() {
    config.LoadConfig()

		seeders.RunProvinsiSeeder()
    seeders.RunKotaSeeder()
		seeders.RunAmbulanceProviderSeeder()
		seeders.RunHospitalSeeder()
		seeders.RunAdminSeeder()

    
    log.Println("All seeders ran successfully!")
}
