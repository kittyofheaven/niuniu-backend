const router = require('express').Router();
const {getAllProvinsi} = require('../controllers/provinsi.controller');

router.get('/provinsi', getAllProvinsi);

module.exports = router;