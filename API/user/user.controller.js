const {User}=require('../../db/models/')


 


const signUp= async (req, res) => {
    

    try {
        const user = new User(req.body)
        const token=await user.generateAuthToken()
        await user.save()
        res.status(201).send({user,token})
     
       
    }
    catch (e) {
       res.status(400).send()
    }
   
}


const login=async(req,res)=>{

    try {
        const user= await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateAuthToken()
        res.send({user,token})
        
    } catch (e) {
        res.status(400).send()
    }


}



const logout=async(req,res)=>{

    try {
        
        req.user.token=null
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }


}




const update=async (req, res) => {
    const updateKeys = Object.keys(req.body)
    const allowedUpdates = ['username', 'email', 'password','status','image']
    const isValidOperation = updateKeys.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates keys!' })
    }

    try {
        const user =req.user
        updateKeys.forEach((update)=>user[update]=req.body[update])
        await user.save()
        res.send(user)
        
    }
    catch (e) {
        res.status(400).send()
       
    }

}


module.exports={
    signUp,
    login,
    logout,
    update
}