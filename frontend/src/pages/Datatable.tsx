import { useState, useEffect,useRef } from 'react';

import 'datatables.net';


export const Datatable = () => {
  const tableRef = useRef(null);

  const data = [
    { id: 1, name: 'Juan', age: 28 },
    { id: 2, name: 'María', age: 32 },
    { id: 3, name: 'Carlos', age: 40 },
  ];


  const handleRemove = (id) => {
    alert(id)
  };


  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      destroy: true,  // Asegura que no se inicialice varias veces
      data: data,
      responsive: false,
      //isShowPaging: false,   // Datos que pasamos como prop
      columns: [
        { title: 'ID', data: 'id' },
        { title: 'Nombre', data: 'name' },
        { title: 'Edad', data: 'age' },
        {
          title: 'Acciones',
          data: null,
          render: (data, type, row) => {
            return `<button class="btn btn-primary btn-action" data-id="${row.id}">Acción</button>`;
          },
          orderable: false,
          searchable: false
        },
      ],
    });

    // Delegación de eventos para manejar los clics en los botones
    $(tableRef.current).on('click', '.btn-action', function () {
      const id = $(this).data('id');
      handleRemove(id);
    });

 /*    // Actualizar la tabla si el flag shouldUpdate cambia
    if (shouldUpdate) {
      // Esto es donde forzamos una recarga de los datos
      table.clear();  // Limpiamos los datos actuales
      table.rows.add(data);  // Añadimos los nuevos datos
      table.draw();  // Redibujamos la tabla
    } */

    // Cleanup al desmontar el componente
    return () => {
      if (tableRef.current) {
        $(tableRef.current).DataTable().destroy(true);
      }
    };
  }, []); // Dependemos de data y shouldUpdate

  return (
    <div className="card">
    <div className="datatable-custom">
    <table ref={tableRef} className="table table-lg table-borderless table-thead-bordered table-nowrap table-align-middle card-table">
      <thead className="thead-light">
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Edad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {/* Los datos se inyectarán automáticamente por DataTables */}
      </tbody>
    </table>
  </div>
  </div>
  );
};
