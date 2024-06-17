import json

# Specify the path to your JSON file
json_file = 'rumah_sakit.json'

def load_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    return data

def find_duplicates(data):
    seen = set()
    duplicates = []

    for entry in data:
        rs_kelas = (entry["nama_rs"], entry["kelas"])

        if rs_kelas in seen:
            duplicates.append(rs_kelas)
        else:
            seen.add(rs_kelas)

    return duplicates

# Load JSON data from file
try:
    data = load_json_file(json_file)
except FileNotFoundError:
    print(f"File '{json_file}' not found.")
    exit()

# Find duplicates
duplicate_entries = find_duplicates(data)

# Print duplicates if found
if duplicate_entries:
    print("Duplicates found:")
    for entry in duplicate_entries:
        print(f'Nama RS: {entry[0]}, Kelas: {entry[1]}')
else:
    print("No duplicates found.")
