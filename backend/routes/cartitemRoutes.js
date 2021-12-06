const router = require('express').Router();
const Cartitem = require('../models/Cartitem')



router.post('/', async (req, res) => {
   
    const cartitem = new Cartitem({
        // 
        // userid:req.body.userid,
        // description:req.body.description,
        // price:req.body.price,
        // count:req.body.count,
        // imageUrl:req.body.imageUrl
        userid:req.body.userid,
        countInStock:req.body.countInStock,
        imageUrl:req.body.imageUrl,
        name:req.body.name,
        price:req.body.price,
        product:req.body.product,
        qty:req.body.qty
    });
    try {
        let savedcartitem = await cartitem.save();
        return res.status(200).json(savedcartitem);
        
    } catch (err) {
        return res.status(400).send(err)
    }

});

//login

router.get('/:userid', async (req, res) => {
console.log("hit")
    //validation

    const cartitem = await Cartitem.find({ userid: req.params.userid })
    if (cartitem.length==0) return res.status(400).send('No Data!');

    // const validPass = await User.findOne({ password:req.body.password})
    // if (!validPass) return res.status(400).send('Invalid Password!');

    else{
        return res.status(200).send(cartitem)
    }

    
})

module.exports = router;