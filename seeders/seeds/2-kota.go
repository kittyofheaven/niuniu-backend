package seeders

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
    "log"
    "os"
)

func RunKotaSeeder() {
    // Get environment variables
    user := os.Getenv("DB_USER")
    password := os.Getenv("DB_PASS")
    dbname := os.Getenv("DB_NAME")
    host := os.Getenv("DB_HOST")
    port := os.Getenv("DB_PORT")

    // Create connection string
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

    // Seeder SQL commands
    seederSQL := `
    INSERT INTO Kota (id, name, location, provinsi_id, createdAt, updatedAt) VALUES
    (1, 'Surabaya', ST_GeomFromText('POINT(112.750833 -7.257472)'), 15, NOW(), NOW()),
    (2, 'Malang', ST_GeomFromText('POINT(112.630372 -7.977801)'), 15, NOW(), NOW()),
    (3, 'Kediri', ST_GeomFromText('POINT(112.015839 -7.824103)'), 15, NOW(), NOW()),
    (4, 'Blitar', ST_GeomFromText('POINT(112.165787 -8.095352)'), 15, NOW(), NOW()),
    (5, 'Madiun', ST_GeomFromText('POINT(111.517331 -7.629463)'), 15, NOW(), NOW()),
    (6, 'Mojokerto', ST_GeomFromText('POINT(112.434937 -7.472409)'), 15, NOW(), NOW()),
    (7, 'Pasuruan', ST_GeomFromText('POINT(112.907500 -7.645000)'), 15, NOW(), NOW()),
    (8, 'Probolinggo', ST_GeomFromText('POINT(113.216667 -7.750000)'), 15, NOW(), NOW()),
    (9, 'Batu', ST_GeomFromText('POINT(112.528473 -7.883056)'), 15, NOW(), NOW()),
    (10, 'Sidoarjo', ST_GeomFromText('POINT(112.718353 -7.447822)'), 15, NOW(), NOW()),
    (11, 'Gresik', ST_GeomFromText('POINT(112.653055 -7.155558)'), 15, NOW(), NOW()),
    (12, 'Semarang', ST_GeomFromText('POINT(110.420333 -6.966667)'), 13, NOW(), NOW()),
    (13, 'Surakarta', ST_GeomFromText('POINT(110.831667 -7.566667)'), 13, NOW(), NOW()),
    (14, 'Magelang', ST_GeomFromText('POINT(110.217686 -7.470477)'), 13, NOW(), NOW()),
    (15, 'Salatiga', ST_GeomFromText('POINT(110.502808 -7.331389)'), 13, NOW(), NOW()),
    (16, 'Pekalongan', ST_GeomFromText('POINT(109.675333 -6.889833)'), 13, NOW(), NOW()),
    (17, 'Tegal', ST_GeomFromText('POINT(109.125000 -6.866667)'), 13, NOW(), NOW()),
    (18, 'Bandung', ST_GeomFromText('POINT(107.619122 -6.917464)'), 12, NOW(), NOW()),
    (19, 'Bekasi', ST_GeomFromText('POINT(106.989666 -6.234897)'), 12, NOW(), NOW()),
    (20, 'Bogor', ST_GeomFromText('POINT(106.798507 -6.595038)'), 12, NOW(), NOW()),
    (21, 'Depok', ST_GeomFromText('POINT(106.828611 -6.402778)'), 12, NOW(), NOW()),
    (22, 'Cimahi', ST_GeomFromText('POINT(107.530502 -6.872142)'), 12, NOW(), NOW()),
    (23, 'Cirebon', ST_GeomFromText('POINT(108.556944 -6.732500)'), 12, NOW(), NOW()),
    (24, 'Sukabumi', ST_GeomFromText('POINT(106.926685 -6.921567)'), 12, NOW(), NOW()),
    (25, 'Tasikmalaya', ST_GeomFromText('POINT(108.220783 -7.350594)'), 12, NOW(), NOW()),
    (26, 'Banjar', ST_GeomFromText('POINT(108.534301 -7.370766)'), 12, NOW(), NOW()),
    (27, 'Jakarta Pusat', ST_GeomFromText('POINT(106.839167 -6.177778)'), 11, NOW(), NOW()),
    (28, 'Jakarta Utara', ST_GeomFromText('POINT(106.895556 -6.138889)'), 11, NOW(), NOW()),
    (29, 'Jakarta Barat', ST_GeomFromText('POINT(106.758056 -6.147500)'), 11, NOW(), NOW()),
    (30, 'Jakarta Selatan', ST_GeomFromText('POINT(106.820833 -6.295000)'), 11, NOW(), NOW()),
    (31, 'Jakarta Timur', ST_GeomFromText('POINT(106.879444 -6.225833)'), 11, NOW(), NOW()),
    (32, 'Kepulauan Seribu', ST_GeomFromText('POINT(106.581667 -5.745000)'), 11, NOW(), NOW());
    `

    // Execute the seeder SQL commands
    _, err = db.Exec(seederSQL)
    if err != nil {
        log.Fatalf("Failed to execute seeder SQL: %v", err)
    }

    fmt.Println("Kota data inserted successfully!")
}
