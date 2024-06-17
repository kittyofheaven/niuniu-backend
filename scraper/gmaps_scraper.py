import json
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time
import re

# Inisialisasi WebDriver
driver = webdriver.Chrome(service=Service(executable_path='chromedriver-mac-arm64/chromedriver'))

driver.get("https://www.google.com") #buat capthca
search_box = driver.find_element(By.NAME, "q")
search_box.send_keys("terserah")
search_box.send_keys(Keys.RETURN)

for i in range(0, 60):
    print(f"Menunggu {60-i} detik...")
    time.sleep(1)

def click_image_with_id_lu_map():
    try:
        image = driver.find_element(By.ID, 'lu_map')
        image.click()
        time.sleep(5)
    except Exception as e:
        print(f"Gambar dengan ID 'lu_map' tidak ditemukan atau gagal ditekan: {e}")

def extract_coordinates_from_maps():
    try:
        # Tunggu hingga URL berubah
        time.sleep(3)
        current_url = driver.current_url
        # Regex untuk menangkap koordinat dari URL
        match = re.search(r'@(-?\d+\.\d+),(-?\d+\.\d+)', current_url)
        if match:
            lat, lng = match.groups()
            print(f"Koordinat ditemukan: Latitude = {lat}, Longitude = {lng}")
            return lat, lng
        else:
            print("Koordinat tidak ditemukan.")
            return None, None
    except Exception as e:
        print(f"Koordinat tidak dapat diekstrak: {e}")
        return None, None

def scrape_phone_number(query):
    # Buka Google
    driver.get("https://www.google.com")

    # Temukan kotak pencarian dan masukkan query
    search_box = driver.find_element(By.NAME, "q")
    search_box.send_keys(query)
    search_box.send_keys(Keys.RETURN)

    # Tunggu halaman hasil pencarian untuk dimuat
    time.sleep(3)

    # Mendapatkan semua elemen dengan class zloOqf
    elements = driver.find_elements(By.CLASS_NAME, 'zloOqf')

    phone_number = None

    # Loop untuk mencari nomor telepon di elemen dengan class zloOqf
    for element in elements:
        text = element.text
        # Menggunakan regex untuk mencari nomor telepon yang dimulai dengan (031)
        match = re.search(r'\(031\) \d{6,9}', text)
        if match:
            phone_number = match.group().replace('(', '').replace(')', '').replace(' ', '')
            print(f"Nomor telepon ditemukan: {phone_number}")
            break  # Hanya ambil nomor telepon pertama yang cocok

    if not phone_number:
        print("Tidak ada nomor telepon yang ditemukan.")

    return phone_number

# Baca data dari file JSON
with open('rumah_sakit.json', 'r') as file:
    data = json.load(file)

# List untuk menyimpan hasil JSON
results = []

# Looping untuk setiap rumah sakit
for rs in data:
    nama_rs = rs['nama_rs'] + " Surabaya"
    print(f"Query pencarian: {nama_rs}")
    
    # Lakukan pencarian nomor telepon
    phone_number = scrape_phone_number(nama_rs)

    # Ekstrak koordinat dari Google Maps
    click_image_with_id_lu_map()
    lat, lng = extract_coordinates_from_maps()

    # Persiapkan data untuk dimasukkan ke dalam JSON
    result = {
        "nama_rs": rs['nama_rs'],
        "nomor_telp": phone_number,
        "kelas": rs['kelas'],
        "lat": lat,
        "lng": lng
    }
    results.append(result)

    # Simpan hasil ke dalam file JSON setiap kali data untuk satu rumah sakit selesai diproses
    with open('hasil_scraping.json', 'w') as outfile:
        json.dump(results, outfile, indent=4)

# Tutup WebDriver
driver.quit()

print("Pencarian dan penyimpanan data selesai.")
