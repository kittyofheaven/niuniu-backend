const { mapFinderOptions } = require("sequelize/lib/utils");

const distanceBetweenTwoPoints = (point1, point2) => {
    const x1 = point1[0];
    const y1 = point1[1];
    const x2 = point2[0];
    const y2 = point2[1];
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    return distance;
}

module.exports = {
    distanceBetweenTwoPoints
}