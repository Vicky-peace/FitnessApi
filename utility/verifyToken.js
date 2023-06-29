import jwt from 'jsonwebtoken';

 export const verifyToken= async(req,res,next) =>{
    // get from the headers

    const authHeader = req.headers.token;
    console.log(authHeader);
    if(authHeader){
        const token =  authHeader.split(' ')[1];
        console.log(token);
        jwt.verify(token,process.env.SECRET, (err,user)=>{
            if(err){
                console.log(err);
                return res.status(401).json({message:'invalid token'});
            } else{
                req.user = user;
                console.log(user);
                console.log(req.user.isAdmin);
                next();
            }
        })
    } else{
        req.user= undefined;
        res.status(401).json({message:'invalid token'});
    }
    next();
}


// Only for Admins
export const verifyTokenAdmin = async(req,res)=>{
    console.log(req.user.isAdmin);
if(req.user.isAdmin){
    next();
}else{
    res.status(403).json({
        message:"not authorised to do that"
    })
}
}
