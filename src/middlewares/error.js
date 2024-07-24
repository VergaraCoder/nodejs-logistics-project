function erroHandler(err,req,res,next){
    if(err){
        console.log("no puedes pasar porque hay un error");
    }
    else{
        next();
    }
}


function verifyParams(req,res,next){
    const id=req.params.id;
    if(!id) res.status(401).json({message:"NO PUEDES ACCEDER AL RECURSO SIN UN ID"});
    else next();
}

module.exports={verifyParams,erroHandler}