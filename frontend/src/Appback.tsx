import { useEffect } from "react";
import './assets/vendor/tom-select/dist/css/tom-select.bootstrap5.css'
declare const HSCore: any;

function App() {
  useEffect(() => {

    
       HSCore.components.HSSortable.init('.js-sortable')


      // INITIALIZATION OF DATATABLES
      // =======================================================
      HSCore.components.HSDatatables.init('.js-datatable')


      // INITIALIZATION OF DATATABLES
      // =======================================================
      const datatbleWithFilter = HSCore.components.HSDatatables.getItem('datatbleWithFilter')

      document.querySelectorAll('.js-datatable-filter').forEach(function (item) {
        item.addEventListener('change', function(e) {
          const target = e.target as HTMLInputElement | HTMLSelectElement;
          const elVal = target.value,
                targetColumnIndex = target.getAttribute('data-target-column-index'),
                targetTable = target.getAttribute('data-target-table');
      

          HSCore.components.HSDatatables.getItem(targetTable).column(targetColumnIndex).search(elVal !== 'null' ? elVal : '').draw()
        })
      })
      
         // INITIALIZATION OF DATATABLES
      // =======================================================
      const data = [
        {
          "id": "1",
          "name": "Tiger Nixon",
          "position": "System Architect",
          "salary": "$320,800",
          "start_date": "2011/04/25",
          "office": "Edinburgh",
          "extn": "5421"
        },
        {
          "id": "2",
          "name": "Garrett Winters",
          "position": "Accountant",
          "salary": "$170,750",
          "start_date": "2011/07/25",
          "office": "Tokyo",
          "extn": "8422"
        },
        {
          "id": "3",
          "name": "Ashton Cox",
          "position": "Junior Technical Author",
          "salary": "$86,000",
          "start_date": "2009/01/12",
          "office": "San Francisco",
          "extn": "1562"
        },
        {
          "id": "4",
          "name": "Cedric Kelly",
          "position": "Senior Javascript Developer",
          "salary": "$433,060",
          "start_date": "2012/03/29",
          "office": "Edinburgh",
          "extn": "6224"
        },
        {
          "id": "5",
          "name": "Airi Satou",
          "position": "Accountant",
          "salary": "$162,700",
          "start_date": "2008/11/28",
          "office": "Tokyo",
          "extn": "5407"
        }
      ]

      /* Formatting function for row details - modify as you need */
      function format (d: any) {
        // `d` is the original data object for the row
        return '<table>'+
                '<tr>'+
                '<td>Full name:</td>'+
                '<td>'+d.name+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Extension number:</td>'+
                '<td>'+d.extn+'</td>'+
                '</tr>'+
                '<tr>'+
                '<td>Extra info:</td>'+
                '<td>And any further details here (images etc)...</td>'+
                '</tr>'+
                '</table>'
      }

      HSCore.components.HSDatatables.init('#datatableChildRows', {
        "data": data,
        "columns": [
          {
            "className": 'details-control',
            "orderable": false,
            "data": null,
            "defaultContent": ''
          },
          { "data": "name" },
          { "data": "position" },
          { "data": "office" },
          { "data": "salary" }
        ],
        order: []
      })


    //HSCore.components.HSDatatables.init('.js-datatable')
  });
  return (
    <>
  <div className="card">
  <div className="card-header">
    <div className="row justify-content-between align-items-center flex-grow-1">
      <div className="col-12 col-md">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-header-title">Users</h5>
        </div>
      </div>

      <div className="col-md-auto">
        <div className="row align-items-center">
          <div className="col-auto">
            <div className="tom-select-custom">
              <select defaultValue="null" className="js-select js-datatable-filter form-select form-select-sm form-select-borderless" autoComplete="off"
                      data-target-column-index="1"
                      data-target-table="datatbleWithFilter"
                      data-hs-tom-select-options='{
                      "searchInDropdown": false,
                      "hideSearch": true,
                      "dropdownWidth": "10rem"
                    }'>
                <option value="null">Any</option>
                <option value="Accountant">Accountant</option>
                <option value="Co-founder">Co-founder</option>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
                <option value="Director">Director</option>
              </select>
            </div>
          </div>

          <div className="col">
            <form>
    
              <div className="input-group input-group-merge input-group-flush">
                <div className="input-group-prepend input-group-text">
                  <i className="bi-search"></i>
                </div>
                <input id="datatableWithFilterSearch" type="search" className="form-control" placeholder="Search users" aria-label="Search users" />
              </div>
 
            </form>
          </div>
        </div>
     
      </div>
    </div>
  </div>

  <div className="table-responsive datatable-custom">
    <table id="datatbleWithFilter" className="js-datatable table table-borderless table-thead-bordered table-nowrap table-align-middle card-table"
           data-hs-datatables-options='{
                   "columnDefs": [{
                      "targets": [1],
                      "orderable": false
                   }],
                   "order": [],
                   "search": "#datatableWithFilterSearch",
                   "isResponsive": false,
                   "isShowPaging": false,
                   "pagination": "datatableWithFilterPagination"
                 }'>
      <thead className="thead-light">
      <tr>
        <th>Name</th>
        <th>Position</th>
        <th>Country</th>
        <th>Status</th>
      </tr>
      </thead>

      <tbody>
      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img10.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Amanda Harvey <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
          <span className="d-block fs-5 text-body">amanda@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Director</span>
          <span className="d-block fs-5">Human resources</span>
        </td>
        <td>United Kingdom</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">A</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Anne Richard</span>
              <span className="d-block fs-5 text-body">anne@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Seller</span>
          <span className="d-block fs-5">Branding products</span>
        </td>
        <td>United States</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img3.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">David Harrison</span>
          <span className="d-block fs-5 text-body">david@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Unknown</span>
          <span className="d-block fs-5">Unknown</span>
        </td>
        <td>United States</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img5.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Finch Hoot</span>
          <span className="d-block fs-5 text-body">finch@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Designer</span>
          <span className="d-block fs-5">IT department</span>
        </td>
        <td>Argentina</td>
        <td>
          <span className="legend-indicator bg-danger"></span>Suspended
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">B</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Bob Dean</span>
              <span className="d-block fs-5 text-body">bob@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Executive director</span>
          <span className="d-block fs-5">Marketing</span>
        </td>
        <td>Austria</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img9.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Ella Lauda <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
          <span className="d-block fs-5 text-body">ella@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Co-founder</span>
          <span className="d-block fs-5">All departments</span>
        </td>
        <td>United Kingdom</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">L</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Lori Hunter</span>
              <span className="d-block fs-5 text-body">hunter@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Developer</span>
          <span className="d-block fs-5">Mobile app</span>
        </td>
        <td>Estonia</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">M</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Mark Colbert</span>
              <span className="d-block fs-5 text-body">mark@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Executive director</span>
          <span className="d-block fs-5">Human resources</span>
        </td>
        <td>Canada</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img6.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Costa Quinn</span>
          <span className="d-block fs-5 text-body">costa@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Co-founder</span>
          <span className="d-block fs-5">All departments</span>
        </td>
        <td>France</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">R</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Rachel Doe <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
              <span className="d-block fs-5 text-body">rachel@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Accountant</span>
          <span className="d-block fs-5">Finance</span>
        </td>
        <td>United States</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img8.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Linda Bates</span>
          <span className="d-block fs-5 text-body">linda@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Unknown</span>
          <span className="d-block fs-5">Unknown</span>
        </td>
        <td>United Kingdom</td>
        <td>
          <span className="legend-indicator bg-danger"></span>Suspended
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">B</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Brian Halligan</span>
              <span className="d-block fs-5 text-body">brian@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Director</span>
          <span className="d-block fs-5">Accounting</span>
        </td>
        <td>France</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">C</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Chris Mathew</span>
              <span className="d-block fs-5 text-body">chris@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Developer</span>
          <span className="d-block fs-5">Mobile app</span>
        </td>
        <td>Switzerland</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img7.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Clarice Boone <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
          <span className="d-block fs-5 text-body">clarice@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Seller</span>
          <span className="d-block fs-5">Branding products</span>
        </td>
        <td>United Kingdom</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">L</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Lewis Clarke</span>
              <span className="d-block fs-5 text-body">lewis@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Co-founder</span>
          <span className="d-block fs-5">IT department</span>
        </td>
        <td>Switzerland</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img4.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Sam Kart</span>
          <span className="d-block fs-5 text-body">sam@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Designer</span>
          <span className="d-block fs-5">Branding</span>
        </td>
        <td>Canada</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">J</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Johnny Appleseed</span>
              <span className="d-block fs-5 text-body">johnny@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Accountant</span>
          <span className="d-block fs-5">Human resources</span>
        </td>
        <td>United States</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">P</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Phileas Fogg</span>
              <span className="d-block fs-5 text-body">phileas@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Designer</span>
          <span className="d-block fs-5">Branding</span>
        </td>
        <td>Spain</td>
        <td>
          <span className="legend-indicator bg-danger"></span>Suspended
        </td>
      </tr>

      <tr>
        <td>
      <a className="d-flex align-items-center" href="../user-profile.html">
        <div className="avatar avatar-circle">
          <img className="avatar-img" src="../assets/img/160x160/img6.jpg" alt="Image Description" />
        </div>
        <div className="ms-3">
          <span className="d-block h5 text-inherit mb-0">Mark Williams <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
          <span className="d-block fs-5 text-body">mark@example.com</span>
        </div>
      </a>
    </td>
        <td>
          <span className="d-block h5 mb-0">Co-founder</span>
          <span className="d-block fs-5">Branding</span>
        </td>
        <td>United Kingdom</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">T</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Timothy Silva</span>
              <span className="d-block fs-5 text-body">timothy@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Developer</span>
          <span className="d-block fs-5">Mobile app</span>
        </td>
        <td>Italy</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">G</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Gary Bishop <i className="bi-patch-check-fill text-primary" data-toggle="tooltip" data-bs-placement="top" title="Top endorsed"></i></span>
              <span className="d-block fs-5 text-body">gary@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Developer</span>
          <span className="d-block fs-5">Mobile app</span>
        </td>
        <td>Latvia</td>
        <td>
          <span className="legend-indicator bg-success"></span>Active
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">Y</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Yorker Scogings</span>
              <span className="d-block fs-5 text-body">yorker@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Seller</span>
          <span className="d-block fs-5">Branding products</span>
        </td>
        <td>Norway</td>
        <td>
          <span className="legend-indicator bg-danger"></span>Suspended
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">F</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Frank Phillips</span>
              <span className="d-block fs-5 text-body">frank@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Unknown</span>
          <span className="d-block fs-5">Unknown</span>
        </td>
        <td>Norway</td>
        <td>
          <span className="legend-indicator bg-danger"></span>Suspended
        </td>
      </tr>

      <tr>
         <td>
          <a className="d-flex align-items-center" href="../user-profile.html">
            <div className="avatar avatar-soft-primary avatar-circle">
              <span className="avatar-initials">E</span>
            </div>
            <div className="ms-3">
              <span className="d-block h5 text-inherit mb-0">Elizabeth Carter</span>
              <span className="d-block fs-5 text-body">eliz@example.com</span>
            </div>
          </a>
        </td>
        <td>
          <span className="d-block h5 mb-0">Unknown</span>
          <span className="d-block fs-5">Unknown</span>
        </td>
        <td>United States</td>
        <td>
          <span className="legend-indicator bg-warning"></span>Pending
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <div className="card-footer">

    <div className="d-flex justify-content-center justify-content-sm-end">
      <nav id="datatableWithFilterPagination" aria-label="Activity pagination"></nav>
    </div>

  </div>
  
</div>
    </>
  );
}

export default App;
