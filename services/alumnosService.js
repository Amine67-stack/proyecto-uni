/**
 * Service Alumnos
 * @namespace alumnosService
 */



const db = require('./db');
const helper = require('../helper');


//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Filtrar alumnos por id, nif o nombre.
 * @function getAlumnoPorIdentificador
 * @memberof alumnosService
 * @param {Object} filtro - Tiene identificador y nombre y se utilizan para filtrar.
 * @returns {object} Un JSON con toda la información de los alumnos que cumplan con ese filtro.
 */

async function getAlumnoPorIdentificador(filtro){
  let sql = 'SELECT id, nif, nombre, apellido1, apellido2, ciudad, sexo FROM alumno WHERE ';
  
  if(filtro.identificador != undefined){
    console.debug("length de identif : " + filtro.identificador.length)

    if(filtro.identificador.length==8){
      sql += 'nif LIKE "' + filtro.identificador + '%"';
    } else {
      sql += 'id=' + filtro.identificador;
    }
  } else if(filtro.identificador==undefined && filtro.nombre != undefined){
    sql += 'nombre LIKE "%' + filtro.nombre + '%"';
  }

  sql += ';';     

  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}




//🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺🌺
/**
 * Lista de todas las asignaturas en las que esté inscripto un alumno.
 * @function getAsignaturas
 * @memberof alumnosService
 * @param {number} id 
 * @returns {object} Un JSON con una lista de asignaturas y la información de las mismas.
 */

async function getAsignaturas(id){
  let sql = 'SELECT a.Id, a.nombre, a.creditos, a.curso, a.cuatrimestre FROM asignatura a JOIN alumno_se_matricula_asignatura m ON a.Id = m.id_asignatura WHERE m.id_alumno = '+ id + ';';


  console.debug("Consulta en SQL: " + sql);
  const rows = await db.query(sql);
  const info = helper.emptyOrRows(rows);
  return{info};
}




module.exports = {
      getAlumnoPorIdentificador,
      getAsignaturas
  }