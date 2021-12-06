const jwt=require('jsonwebtoken');


module.exports= function auth(req,res,next){
    const token=req.header('auth-token')
    if(!token) return res.status(401).send('Access not given everybody..');
    try{
        const verified=jwt.verify(token,process.env.TOKEN);
        req.user=verified;
        next();
    }catch(err){
        res.status(400).send('Invalid token please try again')
    }
};