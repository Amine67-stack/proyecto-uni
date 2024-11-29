const express = require("express");
const router = express.Router();

const cursosService = require("../service/cursosService");



//GET LISTA DE LOS DIFERENTES GRADOS QUE HAY EN LA UNIVERSIDAD
router.get("/grados", async function(req, res){
    let code, msg;
    try{
        const fullList = await cursosService.getListaDeGrados();
        let info=fullList.info;
        code=200;
        msg="Listado de Grados.";
        res.status(200).json({code, msg, info})               //info es un array
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})


//GET LISTA DE ASIGNATURAS SEGUN EL ID DEL GRADO
router.get("/asignaturas", async function(req, res){
    let code, msg;
    let id=req.query.id;
    try{
        let listaAsignaturas = await cursosService.getListaDeAsignaturasPorGrado(id);
        let info=listaAsignaturas.info;
        if(info.length>0){
            code=200;
            msg="Listado de Asignaturas.";
            res.status(200).json({code, msg, info})               //info es un array
        } else {
            code=404;
            msg="Este grado no tiene asignaturas.";
            res.status(404).json({code, msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    } 
})















module.exports = router;