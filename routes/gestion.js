const express = require("express");
const router = express.Router();

const gestionService = require("../service/gestionService");


//GET LISTA DE LOS DIFERENTES GRADOS QUE HAY EN LA UNIVERSIDAD
router.get("/grados", async function(req, res){
    let code, msg;
    try{
        const fullList = await gestionService.getListaDeGrados();
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
        let listaAsignaturas = await gestionService.getListaDeAsignaturasPorGrado(id);
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



//MATRICULAR ALUMNO
router.post("/", async function(req, res){
    let code, msg;
    let {idAlumno, idAsignatura, idCurso}=req.body;
    let datos={};
    let contador=0;
    let noSePuede=[];        //mete los id de asignatura en los que no se puede matricular

    for(let i=0; i<idAsignatura.length; i++){
        datos={
            idAlumno: idAlumno,
            idAsignatura: idAsignatura[i],
            idCurso: idCurso
        }

        let matricular = await gestionService.matricularAlumno(datos);
        if(matricular.info.affectedRows>0){
            contador++;
        } else {
            noSePuede.push(i);
        }
    }

    if(contador>0){
        code=200;
        msg="El alummno se ha matriculado en " + contador + " asignaturas.";
        if(noSePuede.length>0){
            msg += " Y no se ha podido generar la matrícula de " + noSePuede.length + " asignaturas.";
        }
        res.status(200).json({code, msg})
    } else {
        code=404;
        msg="No se ha podido matricular al alumno en ninguna asignatura.";
        res.status(200).json({code, msg})
    }

    

})


module.exports = router;


