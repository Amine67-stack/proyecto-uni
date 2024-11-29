const express = require("express");
const router = express.Router();

const profesoresService = require("../service/profesoresService");



//GET FULL LIST DE PROFESORES
router.get("/", async function(req, res){
    let code, msg;    
    try{
        const fullList = await profesoresService.getProfesoresFullList();
        let info=fullList.info;
        code=200;
        msg="Listado de Profesores";
        res.status(200).json({code, msg, info})               //info es un array
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})



//GET LISTA DE LOS DIFERENTES DEPARTAMENTOS QUE HAY EN LA UNIVERSIDAD
router.get("/departamentos", async function(req, res){
    let code, msg;
    try{
        const fullList = await profesoresService.getListaDeDepartamentos();
        let info=fullList.info;
        code=200;
        msg="Listado de Departamentos";
        res.status(200).json({code, msg, info})               //info es un array
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})


//GET POR NOMBRE APELLIDO1 SEXO Y/O DEPARTAMENTO
router.get("/filtro", async function (req, res){
    let code, msg;
    try{
        const {nombre, apellido1, sexo, departamento} = req.query;
        let filtro={};

        filtro.nombre = (nombre !== undefined) ? nombre : undefined;
        filtro.apellido1 = (apellido1 !== undefined) ? apellido1 : undefined;
        filtro.sexo = (sexo !== undefined && sexo !== "placeholder") ? sexo : undefined;
        filtro.departamento = (departamento !== undefined && departamento !== "placeholder") ? departamento : undefined;

        let listaFiltrada = await profesoresService.filtrarProfesores(filtro);       
        let info=listaFiltrada.info;      

        if(info.length>0){
            code=200;
            msg="Lista de profesores filtrados.";
            res.status(200).json({code,msg,info});
        } else {
            code=404;
            msg="No se han encontrado profesores con esos filtros";
            res.status(404).json({code,msg});
        }
    }catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    }
})






module.exports = router;