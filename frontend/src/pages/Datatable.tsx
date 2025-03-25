import { useState } from 'react';
import DataTable from 'react-data-table-component';

export const Datatable = () => {

    const users = [
        { id: 1, name: 'John Doe', personType: 'Admin', identification: '12345', status: 'Active' },
        { id: 2, name: 'Jane Smith', personType: 'User', identification: '67890', status: 'Inactive' }
      ];

   
      // Columnas de la tabla
      const columns =[
        {
          name: 'Name',
          selector: row => row.name,
          sortable: true,
        },
        {
          name: 'Person Type',
          selector: row => row.personType,
          sortable: true,
        },
        {
          name: 'Identification',
          selector: row => row.identification,
        },
        {
          name: 'Status',
          selector: row => row.status,
        },
        {
            name: 'Actions',
            cell: (row) => (
              <button onClick={() => handleView(row.id)} className="btn btn-custom">
                View
              </button>
            ),
          },
  
      ];

      const handleView = (id: number) => {
        alert(`Viewing user with ID: ${id}`);
      };
      
      const [searchText, setSearchText] = useState(''); // Estado para manejar la búsqueda

      const handleSearch = (e) => {
        setSearchText(e.target.value); // Actualiza el texto de búsqueda
      };
      return (
        <div>
          <h1>User List</h1>
                <input
                type="text"
                placeholder="Search"
                value={searchText}
                onChange={handleSearch}
                className="search-input"
            />
          <DataTable
            columns={columns}
            data={users.filter((user) => 
                user.name.toLowerCase().includes(searchText.toLowerCase()) || 
                user.personType.toLowerCase().includes(searchText.toLowerCase()) || 
                user.identification.includes(searchText) ||
                user.status.toLowerCase().includes(searchText.toLowerCase())
              )}
            pagination
            highlightOnHover
            pointerOnHover
           // customStyles={customStyles} // Aplicar estilos personalizados
          />
        </div>
      );
}