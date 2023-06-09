document.addEventListener('DOMContentLoaded', function() {
  var addButton = document.getElementById('agregar');
  addButton.addEventListener('click', agregarFila);
  // Cargar los datos almacenados al cargar la página
  cargarDatos();
});


function agregarFila() {
  var tabla = document.getElementById('tabla');
  var tbody = tabla.querySelector('tbody');
  
  var nombre = prompt('Ingrese el nombre:');
  var problema = prompt('Ingrese el problema:');
  var tiempo = prompt('Ingrese el tiempo:');
  var estatus = prompt('Ingrese el estatus:');
  
  var row = document.createElement('tr');
  row.innerHTML = `
    <td>${nombre}</td>
    <td>${problema}</td>
    <td>${tiempo}</td>
    <td>${estatus}</td>
    <td><button class="eliminar">Eliminar</button></td>
  `;
  
  tbody.appendChild(row);
  
  var eliminarButton = row.querySelector('.eliminar');
  eliminarButton.addEventListener('click', function() {
    row.remove();
  });


 // Guardar los datos en el almacenamiento local
  guardarDatos();
}


function guardarDatos() {
  var tabla = document.getElementById('tabla').innerHTML;
  localStorage.setItem('datosTabla', tabla);
}

function cargarDatos() {
  var tabla = document.getElementById('tabla');
  var datosGuardados = localStorage.getItem('datosTabla');
  if (datosGuardados) {
    tabla.innerHTML = datosGuardados;
    agregarEventosEliminar();
  }
}

function agregarEventosEliminar() {
  var eliminarButtons = document.querySelectorAll('.eliminar');
  eliminarButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      button.parentNode.parentNode.remove();
      guardarDatos();
    });
  });
}

document.getElementById("sheetjsexport").addEventListener('click', function() {
  /* Create worksheet from HTML DOM TABLE */
  var wb = XLSX.utils.table_to_book(document.getElementById("tabla"));
  /* Export to file (start a download) */
  XLSX.writeFile(wb, "SheetJSTable.xlsx");
});