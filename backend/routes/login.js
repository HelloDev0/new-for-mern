const router = require('express').Router();
const User = require('../models/User')
const jwt=require('jsonwebtoken')
const verify=require('./verifyToken')


router.post('/register', async (req, res) => {
   
    const user = new User({
        // 
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        let savedUser = await user.save();
        return res.status(200).json(savedUser);
        
    } catch (err) {
        return res.status(400).send(err)
    }

});

//login

router.post('/login', async (req, res) => {

    //validation

    const user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Email wrong');

    const validPass = await User.findOne({ password:req.body.password})
    if (!validPass) return res.status(400).send('Invalid Password!');
    
    const token=jwt.sign({id:user._id, name:user.name,email_id:user.email}, process.env.TOKEN, { expiresIn: 60 * 60 });
    return res.status(200).header('auth-token', token).json({tkn:token,user});

    
})

router.get('/', verify ,async (req, res) => {

    User.find()
    .then(user=>{
        res.send(user)
    })

    
})

module.exports = router;