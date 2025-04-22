import { useEffect, useState } from "react";

declare const HSCore: any;
declare const bootstrap: any;
interface Props<T> {
  tableRef: React.RefObject<HTMLTableElement | null>
  columns: any[],
  data: T[],
}

export const useClientDataTable = <T>({ tableRef, columns, data }: Props<T>) => {
  const [datatable, setDatatable] = useState<any>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    if (!datatable) {
      HSCore.components.HSDatatables.init(tableRef.current, {
        //  dom: 'Bfrtip',
        autoWidth: false,
        columns: columns,
        data: data,
        destroy: true,
        select: {
          style: 'multi',
          selector: 'td:first-child input[type="checkbox"]',
          classMap: {
            checkAll: '#datatableCheckAll',
            counter: '#datatableCounter',
            counterInfo: '#datatableCounterInfo'
          }
        },
        language: {
          zeroRecords: `<div class="text-center p-4">
                     <img class="mb-3" src="../assets/svg/illustrations/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="default">
                     <img class="mb-3" src="../assets/svg/illustrations-light/oc-error.svg" alt="Image Description" style="width: 10rem;" data-hs-theme-appearance="dark">
                   <p class="mb-0">No data to show</p>
                   </div>`
        },
        drawCallback: function () {
          const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
          tooltipTriggerList.map(function (tooltipTriggerEl) {
              return new bootstrap.Tooltip(tooltipTriggerEl)
          })
        }
      });
      setDatatable(HSCore.components.HSDatatables.getItem(0));
    }
    return () => {
      if (datatable) {
        datatable.destroy();
        setDatatable(null);
      }
      HSCore.components.HSDatatables.collection = [];
    }

  }, [])

  useEffect(() => {
    if (datatable && data && Array.isArray(data)) {
      datatable.clear();
      datatable.rows.add(data);
      datatable.draw();
    }
  }, [data, datatable]);

  return { datatable }
}