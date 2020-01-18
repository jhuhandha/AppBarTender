const jwt = require('jsonwebtoken');

let auth = (req, res, next) => {

    let token = req.get("Authorization");

    jwt.verify(token, process.env.SECRET, (err, user)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                men: "Token no valido"
            });
        }

        req.user = user.data;

        next();
    });
}

let auth_image = (req, res, next) => {

    let token = req.query.token;

    jwt.verify(token, process.env.SECRET, (err, user)=>{

        if(err){
            return res.status(500).json({
                ok: false,
                men: "Token no valido"
            });
        }

        req.user = user.data;

        next();
    });
}



module.exports = {
    auth,
    auth_image
}