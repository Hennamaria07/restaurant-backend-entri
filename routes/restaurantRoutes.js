const express = require('express');
const { verifyToken } = require('../middlewares/auth');
const { addRestaurant, getRestaurant } = require('../controllers/restaurantController');
const upload = require("../middlewares/fileUpload")

const router = express.Router();
router.route('/restaurant').post(verifyToken, upload.single('photograph'), addRestaurant);
router.route('/restaurants').get(getRestaurant);

module.exports = router;