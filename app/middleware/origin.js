const checkOrigin = (req, res, next) => {
    const token = req.headers.authorization.split(' ').pop();
    if(token === '123456'){
        next();
        // TODO: Origin
        //console.log(req.headers);
    }else{
        res.status(409)
        res.send({error:"Tu por aqui no pasas!"});
    }
}

module.exports = checkOrigin;