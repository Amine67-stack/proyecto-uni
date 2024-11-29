/**
 * Service Cursos
 * @namespace cursosService
 */



const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Lista de Grados que hay en la Universidad.
 * @function getListaDeGrados
 * @memberof cursosService
 * @returns {object} Un JSON con el listado de Grados, cada uno con su id y nombre.
 */
async function getListaDeGrados(){
  let sql = 'SELECT * FROM grado;';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Lista de Asignaturas en de un Grado en particular.
 * @function getListaDeAsignaturasPorGrado
 * @memberof cursosService
 * @param {number} idGrado 
 * @returns {object} Un JSON con el listado de asignaturas y su información.
 */
async function getListaDeAsignaturasPorGrado(idGrado){
  let sql = "SELECT a.id, a.nombre, a.creditos, a.curso, a.cuatrimestre, p.nombre as 'NombreProfesor', p.apellido1 as 'ApellidoProfesor'  FROM asignatura a LEFT JOIN profesor p ON a.id_profesor=p.id WHERE id_grado=" + idGrado + ";";

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}



//cambiar nombres de las funciones
module.exports = {
    getListaDeGrados,
    getListaDeAsignaturasPorGrado
  }
