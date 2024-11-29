const express = require("express");
const router = express.Router();

const alumnosService = require("../service/alumnosService");



//GET POR FILTRO (ID/NIF O NOMBRE)
router.get("/identificador", async function (req, res){
    let code, msg;
    try{
        let {identificador, nombre} = req.query;
        let filtro = {};

        filtro.identificador = (identificador !== undefined) ? identificador.slice(0,8) : undefined;
        filtro.nombre = (nombre !== undefined) ? nombre : undefined; 

        let finded = await alumnosService.getAlumnoPorIdentificador(filtro);

        let info=finded.info;

        if(info.length>0){
            code=200;
            msg="Lista de alumnos filtrados por id/nif.";
            res.status(200).json({code,msg,info});
        } else {
            code=404;
            msg="No se han encontrado alumnos con ese id/nif.";
            res.status(404).json({code,msg});
        }
    } catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    }
});



//GET LISTA DE ASIGNATURAS POR ID ALUMNO
router.get("/asignaturas", async function(req, res){
    let code, msg;
    try{
        let id =req.query.id;
        let finded = await alumnosService.getAsignaturas(id);
        let info=finded.info;

         if(info.length>0){
            code=200;
            msg="Lista de asignaturas en las que está matriculado el alumno con id: " + id;
            res.status(200).json({code, msg, info});
        } else {
            code=404;
            msg="El alumno con id " + id + " no está matriculado en ninguna asignatura.";
            res.status(404).json({code, msg});
        }
    }  catch(err){
        code=501;
        msg="Error en la base de datos";
        res.status(501).json({code, msg});
    }    
})












module.exports = router;