package seeders

import (
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
    "log"
    "os"
)

func RunProvinsiSeeder() {
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
    INSERT INTO Provinsis (id, name, location, createdAt, updatedAt) VALUES
    (1, 'Aceh', ST_GeomFromText('POINT(95.323753 5.548290)'), NOW(), NOW()),
    (2, 'Sumatera Utara', ST_GeomFromText('POINT(98.678513 3.597031)'), NOW(), NOW()),
    (3, 'Sumatera Barat', ST_GeomFromText('POINT(100.354271 -0.949244)'), NOW(), NOW()),
    (4, 'Riau', ST_GeomFromText('POINT(101.447777 0.507068)'), NOW(), NOW()),
    (5, 'Jambi', ST_GeomFromText('POINT(103.613121 -1.610870)'), NOW(), NOW()),
    (6, 'Sumatera Selatan', ST_GeomFromText('POINT(104.756555 -2.990934)'), NOW(), NOW()),
    (7, 'Bengkulu', ST_GeomFromText('POINT(102.259590 -3.795555)'), NOW(), NOW()),
    (8, 'Lampung', ST_GeomFromText('POINT(105.286276 -5.448839)'), NOW(), NOW()),
    (9, 'Kepulauan Bangka Belitung', ST_GeomFromText('POINT(106.440587 -2.741051)'), NOW(), NOW()),
    (10, 'Kepulauan Riau', ST_GeomFromText('POINT(108.142866 3.945712)'), NOW(), NOW()),
    (11, 'DKI Jakarta', ST_GeomFromText('POINT(106.845599 -6.208763)'), NOW(), NOW()),
    (12, 'Jawa Barat', ST_GeomFromText('POINT(107.609810 -6.914744)'), NOW(), NOW()),
    (13, 'Jawa Tengah', ST_GeomFromText('POINT(110.438125 -7.005145)'), NOW(), NOW()),
    (14, 'DI Yogyakarta', ST_GeomFromText('POINT(110.370529 -7.797068)'), NOW(), NOW()),
    (15, 'Jawa Timur', ST_GeomFromText('POINT(112.768845 -7.250445)'), NOW(), NOW()),
    (16, 'Banten', ST_GeomFromText('POINT(106.163974 -6.110367)'), NOW(), NOW()),
    (17, 'Bali', ST_GeomFromText('POINT(115.092259 -8.340539)'), NOW(), NOW()),
    (18, 'Nusa Tenggara Barat', ST_GeomFromText('POINT(117.361647 -8.652933)'), NOW(), NOW()),
    (19, 'Nusa Tenggara Timur', ST_GeomFromText('POINT(123.607032 -10.177167)'), NOW(), NOW()),
    (20, 'Kalimantan Barat', ST_GeomFromText('POINT(109.334222 -0.022654)'), NOW(), NOW()),
    (21, 'Kalimantan Tengah', ST_GeomFromText('POINT(113.921327 -2.210091)'), NOW(), NOW()),
    (22, 'Kalimantan Selatan', ST_GeomFromText('POINT(115.500000 -3.000000)'), NOW(), NOW()),
    (23, 'Kalimantan Timur', ST_GeomFromText('POINT(116.419389 0.538381)'), NOW(), NOW()),
    (24, 'Kalimantan Utara', ST_GeomFromText('POINT(116.000000 3.000000)'), NOW(), NOW()),
    (25, 'Sulawesi Utara', ST_GeomFromText('POINT(124.841289 1.493056)'), NOW(), NOW()),
    (26, 'Sulawesi Tengah', ST_GeomFromText('POINT(119.859571 -0.882458)'), NOW(), NOW()),
    (27, 'Sulawesi Selatan', ST_GeomFromText('POINT(119.746094 -4.543140)'), NOW(), NOW()),
    (28, 'Sulawesi Tenggara', ST_GeomFromText('POINT(122.168604 -4.129671)'), NOW(), NOW()),
    (29, 'Gorontalo', ST_GeomFromText('POINT(122.446723 0.699889)'), NOW(), NOW()),
    (30, 'Sulawesi Barat', ST_GeomFromText('POINT(119.232077 -2.844900)'), NOW(), NOW()),
    (31, 'Maluku', ST_GeomFromText('POINT(130.145273 -3.238461)'), NOW(), NOW()),
    (32, 'Maluku Utara', ST_GeomFromText('POINT(127.808769 1.570999)'), NOW(), NOW()),
    (33, 'Papua', ST_GeomFromText('POINT(138.080353 -4.269928)'), NOW(), NOW()),
    (34, 'Papua Barat', ST_GeomFromText('POINT(134.064018 -0.891687)'), NOW(), NOW()),
    (35, 'Papua Selatan', ST_GeomFromText('POINT(138.516872 -7.450532)'), NOW(), NOW()),
    (36, 'Papua Pegunungan', ST_GeomFromText('POINT(138.926919 -4.083739)'), NOW(), NOW()),
    (37, 'Papua Tengah', ST_GeomFromText('POINT(137.201264 -3.677161)'), NOW(), NOW()),
    (38, 'Papua Barat Daya', ST_GeomFromText('POINT(131.263193 -0.878030)'), NOW(), NOW());
    `

    // Menjalankan statement SQL seeder
    _, err = db.Exec(seederSQL)
    if err != nil {
        log.Fatalf("Failed to execute seeder SQL: %v", err)
    }

    fmt.Println("Provinsi data inserted successfully!")
}
