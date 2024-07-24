const fs=require('fs');
const path=require('path');

const rutaAbsoluta=path.join(__dirname,"../../data/db.json");

function returnErrors(message,status){
    const error=new Error(message);
    error.code=status;
    return error;
}


function readData(){
    return new Promise((resolve,reject)=>{
        fs.readFile(rutaAbsoluta,"utf-8",(err,data)=>{
            if(err) reject(returnErrors("file not found",404));
            else resolve(JSON.parse(data))
        });
    });
}


function writeData(data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(rutaAbsoluta,JSON.stringify(data),(err)=>{
            if(err) reject(returnErrors("it cannot writeFile",400));
            else resolve("MELO");
        });
    });
}



function setId(data){
    let mayor=0;
    for(let x of data){
        if(x.id>mayor) mayor=x.id;
    }
    mayor++;
    return mayor;
}


function createOtherEndpoints(entity,id){
    const links={
        GET:`http://localhost:3001/${entity}?id=${id}`,
        PUT:`http://localhost:3001/${entity}/${id}`,
        DELETE:`http://localhost:3001/${entity}/${id}`
    }
    return links;
}


async function addData(entidad, dataUser) {
    try {
        const data = await readData();

        dataUser.id=setId(data[entidad]);
        
        data[entidad].push(dataUser);
        
        await writeData(data);

        return dataUser;

    } catch (err) {
        throw err;
    }
}

function returnIndexFind(data,id){
    const indexFind=data.findIndex(item=>{
        return item.id==id;
    });
    if(indexFind==-1){
        const error=returnErrors("NOT FOUND",404);
        throw error;
    }else{
        return indexFind; 
    }
}


async function verifyWerehouse(WareHouse){
    if(!WareHouse.warehouseId){
        const err=returnErrors("THAT MUST HAVE A WAREHOUSEID",401);
        throw err;
    }else{
        const data = await readData();
        const index = data.warehouses.findIndex(item => { return item.id == parseInt(WareHouse.warehouseId) });

        if (index == -1) {
            const error = returnErrors("WEREHOUSE NOT FOUND", 404);
            throw error;
        } else {
            return true;
        }
    }
}

module.exports={
    readData,
    writeData,
    addData,
    createOtherEndpoints,
    setId,
    returnIndexFind,
    verifyWerehouse
}