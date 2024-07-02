// Enum untuk keadaan darurat
const EmergencyLevel = {
    MERAH: 'MERAH',
    KUNING: 'KUNING',
    HIJAU: 'HIJAU',
    PUTIH: 'PUTIH',
    HITAM: 'HITAM'
};

// Klasifikasi rumah sakit berdasarkan tingkat keadaan darurat
const hospitalClassification = {
    [EmergencyLevel.MERAH]: ['A', 'B', 'C'],
    [EmergencyLevel.KUNING]: ['A', 'B', 'C', 'D'],
    [EmergencyLevel.HIJAU]: ['A', 'B', 'C', 'D'],
    [EmergencyLevel.PUTIH]: ['A', 'B', 'C', 'D', 'E'],
    [EmergencyLevel.HITAM]: ['A', 'B', 'C', 'D', 'E']
};

// Fungsi untuk mendapatkan klasifikasi rumah sakit
function getHospitalClassification(emergencyLevel) {
    return hospitalClassification[emergencyLevel] || [];
}

module.exports = {
    getHospitalClassification
}