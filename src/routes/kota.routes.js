const router = require('express').Router();
const {getAllKotaByProvinsi} = require('../controllers/kota.controller');

router.get('/kota', getAllKotaByProvinsi);

module.exports = router;