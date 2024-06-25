const distanceBetweenTwoPoints = (point1, point2) => { // point must be an array of [x, y]
    const x1 = point1[0];
    const y1 = point1[1];
    const x2 = point2[0];
    const y2 = point2[1];
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
}

const distanceBetweenTwoPointsInKm = (point1, point2) => { // point must be an array of [latitude, longitude]
    const [lat1, lon1] = point1;
    const [lat2, lon2] = point2;

    const earthRadiusKm = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude from degrees to radians
    const toRadians = (degrees) => {
        return degrees * (Math.PI / 180);
    };

    const φ1 = toRadians(lat1);
    const φ2 = toRadians(lat2);
    const Δφ = toRadians(lat2 - lat1);
    const Δλ = toRadians(lon2 - lon1);

    // Haversine formula
    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Distance in kilometers
    const distance = earthRadiusKm * c;

    return distance;
};

module.exports = {
    distanceBetweenTwoPoints,
    distanceBetweenTwoPointsInKm
}