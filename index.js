const express=require("express");
const {router}=require("./src/router/routing");
const {erroHandler}=require("./src/middlewares/error");
const app=express();

app.use(express.json());
app.set("PORT",3001);

app.use(router);
app.use(erroHandler);


app.listen(app.get("PORT"),()=>{
    console.log("Server in port "+app.get("PORT"));
});