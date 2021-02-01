const jwt=require('jsonwebtoken')
const {User}=require('../db/models/')

const auth=async(req,res,next)=>{

try {
  
    const token=req.header('Authorization').replace('Bearer ','')
    const decoded=jwt.verify(token,'secret_key')   
    const user=await User.findOne({ where: {email:decoded.email,token}})

    if(!user){
        throw new Error()
    }
    req.token=token
    req.user=user
    next()
} catch (e) {
    res.status(401).send({error:'Please authenticate'})
}
}

module.exports=auth