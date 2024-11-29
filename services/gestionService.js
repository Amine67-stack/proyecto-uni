/**
 * Service Gestión
 * @namespace gestionService
 */


const db = require('./db');
const helper = require('../helper');




//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Lista de Grados que hay en la Universidad.
 * @function getListaDeGrados
 * @memberof gestionService
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
 * @memberof gestionService
 * @param {number} idGrado 
 * @returns {object} Un JSON con el listado de asignaturas y su información.
 */
async function getListaDeAsignaturasPorGrado(idGrado){
  let sql = "SELECT id, nombre FROM asignatura where id_grado=" + idGrado + ";";

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Matricular a un Alumno en Asignaturas.
 * @function matricularAlumno
 * @memberof gestionService
 * @param {object} datos - Contiene el Id del Alumno, el Id de las Asignaturas seleccionadas y el curso elegido.
 * @returns {object} No se que devuelve jijiji
 */
async function matricularAlumno(datos) {
  let sql = 'INSERT INTO alumno_se_matricula_asignatura (id_alumno, id_asignatura, id_curso_escolar) VALUES ("' + datos.idAlumno + '", "' + datos.idAsignatura + '", "' + datos.idCurso + '")';

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}



//Funciones a exportar
module.exports = {
  getListaDeGrados,
  getListaDeAsignaturasPorGrado,
  matricularAlumno
  }

