const jwt = require(`jsonwebtoken`)


async function authArtist(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized User auth Artist"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded.role === "artist"){
            return res.status(403).json({
                message:"You don't have the access to create new music"
            })}

        req.user = decoded
        // console.log(req.user)
        next()
    }
    catch(err){
        console.log(`Artist middleware Error :: ${err}`);
    }

}

async function authUser(req,res,next) {
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Unauthorized User auth Artist"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        if(!decoded.role === "user"){
            return res.status(403).json({
                message:"You don't have the access to create new music"
            })}

        req.user = decoded
        // console.log(req.user)
        next()
    }
    catch(err){
        console.log(`Artist middleware Error :: ${err}`);
    }

}


module.exports = {authArtist , authUser}