const Restaurant = require ("../models/restaurantModel");

exports.addRestaurant = async (req, res) => {
    const {name, address, neighborhood} = req.body;
    const photograph = req.file.path;
    console.log(photograph);
    try {
        const restaurant = await Restaurant.create({
            name,
            address,
            neighborhood,
            photograph
        })
        console.log(restaurant);
        if(!restaurant){
            return res.status(500).json({
                success: false,
                message: 'Regsitration failed!'
            });
        }
        res.status(201).json({
            success: true,
            message: 'Resataurant added successfully!',
            restaurant
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

exports.getRestaurant = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        if(!restaurants){
            return res.status(500).json({
                success: false,
                message: 'Regsitration registration failed!'
            });
        }
        res.status(200).json({
            success: true,
            restaurants
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}