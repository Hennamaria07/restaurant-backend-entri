// SEPARATING THE HANDLER FUNCTIONS
const bcrypt = require('bcrypt');
const User = require('../models/userModels');
const { getToken } = require('../utils/jwtToken');



const saltRound = 10; 


exports.postRegister = async (req, res) => {
    console.log("inside register API");
    // destructing the data from req.body
    const {id, fullname, email, password} = req.body;

    // hashing
    const hashedPassword = await bcrypt.hash(password, saltRound);
    try {
        const user = await User.create({
            id,
            fullname,
            email,
            password: hashedPassword
        })
        if(!user) {
            return res.status(500).json({
                success: false,
                message: 'user not found'
            });
        }
        res.status(201).json({
            success: true,
            message: 'registration successfully completed!',
            user
        })
        console.log(user);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
    console.log(hashedPassword);

}

// login

exports.userLogin = async (req, res, next) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        console.log('user :', user);
        if(!user) {
            return res.status(500).json({
                success: false,
                message: 'user not found'
            });
        }
        const isValid = await bcrypt.compare(password, user.password);
        console.log(`isvalid: ${isValid}`);
        
        if(!isValid){
            // 401 ---> invalid
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials!'
            });
        }
        req.user = user;
        getToken(req, res, next);

        // res.status(200).json({
        //     success: true,
        //     message: 'login successfully!',
        //     isAuthenticated: true,
        //     user
        // });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// protected router
exports.getAllUsers = async (req, res) => {
    // console.log(req.cookies);
    // const {token} = req.cookies
    try {
        const users = await User.find();
        // console.log(users);
        if(!users) {
            return res.status(500).json({
                success: false,
                message: 'users not found!'
            });
        }
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// update
exports.updateUserDetails = async (req, res) => {
    const userId = req.params.id;
    const {fullname, email} = req.body
    // console.log(userId);
    try {
        const user = await User.findById(userId);
        // console.log(`before--------->${user}`);

        if(!user) {
           return res.status(404).json({
                success: false,
                message: "User not found",
                user
            })
        }
        // console.log(user);
        user.fullname = fullname;
        user.email = email;
        user.save();
        res.status(200).json({
            success: true,
            message: "User details updated successfully",
            user
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

exports.getUserDetails = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({
                 success: false,
                 message: "User not found",
                 user
             })
         }
         res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}

// delete

exports.deleteUser = async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({
                 success: false,
                 message: "User not found",
             });
            }
            res.status(200).json({
                success: true,
                message: "User deleted successfully!"
            })
    } catch (error) {
        res.status(500).json({
            success: true,
            message: error.message
        })
    }
}