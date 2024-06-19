const getTimeInUTCOffset = (offset) => {
    let now = new Date();

    let timeInOffset = new Date(now.getTime() + (offset * 60 * 60 * 1000));
    let year = timeInOffset.getUTCFullYear();
    let month = ("0" + (timeInOffset.getUTCMonth() + 1)).slice(-2);
    let day = ("0" + timeInOffset.getUTCDate()).slice(-2);
    let hours = ("0" + timeInOffset.getUTCHours()).slice(-2);
    let minutes = ("0" + timeInOffset.getUTCMinutes()).slice(-2);
    let seconds = ("0" + timeInOffset.getUTCSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

module.exports = {
    getTimeInUTCOffset
}