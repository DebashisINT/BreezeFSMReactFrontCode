import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';
import Images from '../../Images';

import ExcelJS from 'exceljs';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component


export default function TotalEmployeesGrid(props) {

  const ApiPort = props.apiPort;
  console.log("TotalEmployeesGrid:", ApiPort);

     // const [productData, setProductData] = useState({ products: [] });
  const gridRef = useRef();

  const [loading, setLoading] = useState(true);

  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%',  width: '100%' }), []);
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

//   const [currentPage, setCurrentPage] = useState(1);
// const [totalPages, setTotalPages] = useState(1);

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'Employee', filter: true, autoHeight: true, floatingFilter: true},
    { field: 'Designation', filter: 'agTextColumnFilter', autoHeight: true, floatingFilter: true },
    { field: 'Branch', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Department', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Supervisor', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'ContactNo', filter: true, autoHeight: true, floatingFilter: true }
  ]);

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo( ()=> ({
    sortable: true,
    // editable: true,
    resizable: true,
    wrapText: true,
  }));

  const onGridReady = useCallback((params) => {
    params.api.sizeColumnsToFit();
    window.addEventListener('resize', function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      });
    });

    gridRef.current.api.sizeColumnsToFit();
  }, []);

  // enables pagination in the grid
  const pagination = true;

  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;

  // Example of consuming Grid Event
  // const cellClickedListener = useCallback( event => {
  //   console.log('cellClicked', event);
  // }, []);
  useEffect(() => {
    const branchIds = "1,118,119,120,121,122,123,124,125,127,128";
    const stateIds = "15,3,35,1,24,19,16,2,28,8";
    const filterName = "EMP";
    const type = "Attendance";
    const userId = "378";
    
  
    axios.post(`${ApiPort}/DashboardMenu/DashboardGridView?branchid=${branchIds}&stateid=${stateIds}&FilterName=${filterName}&Type=${type}&userid=${userId}`)
    .then(function (response) {
      // handle success
      // const dataArray = Array.isArray(response.data) ? response.data : [];
      setRowData(response.data);
      // console.log('EMP-data', response.data);
      setLoading(false);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
  }, []); // Add currentPage to the dependency array



  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Employee Data');
  
    // Define the Excel column headers based on your columnDefs
    const headers = columnDefs.map((colDef) => ({ header: colDef.field, key: colDef.field }));
    worksheet.columns = headers;
  
    // Set the same width for all columns (adjust this value as needed)
    const columnWidth = 20; // Set the desired width
    worksheet.columns.forEach((column) => {
      column.width = columnWidth;
    });
  
    // Add rowData to the worksheet
    rowData.forEach((rowDataItem) => {
      worksheet.addRow(rowDataItem);
    });
  
    // Create a blob from the Excel workbook
    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  
      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Employee Attendance details - Total Employees.xlsx';
      a.click();
  
      // Release the object URL to free up memory
      window.URL.revokeObjectURL(url);
    });
  };

  return (
    <>
    <div style={containerStyle}>

    {loading && ( 
          <div className="loader-gif">
            
              <img src={Images.LoaderGif} alt=""/>
            
          </div>
        )}

          <div className='grid-header-title'>
              <h4 className='mb-4'>Employee Attendance details - Total Employees</h4>
              <button className='icn' data-toggle="tooltip" title="Export To Excel" onClick={exportToExcel} style={{ marginBottom: '5px', fontWeight: 'bold' }}>
              <img src={Images.ExportExcel} alt=""/>
              </button>
           </div>
        <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <div style={{ overflow: 'hidden', flexGrow: '1' }}>
        <div style={gridStyle} className="ag-theme-alpine">
            <AgGridReact
                ref={gridRef}
                rowData={rowData} // Row Data for Rows
                columnDefs={columnDefs} // Column Defs for Columns
                defaultColDef={defaultColDef} // Default Column Properties
                animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                rowSelection='multiple' // Options - allows click selection of rows
                // onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                pagination={pagination}
                paginationPageSize={paginationPageSize}
                cacheBlockSize={10}
                domLayout={'autoHeight'}
                overlayLoadingTemplate={
                  '<span className="ag-overlay-loading-center">Data loading...</span>'
                }
                onGridReady={onGridReady}
                
            />
          </div>
        </div>

      </div>
    </div>
    </>
  )
}
