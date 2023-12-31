import React, {useCallback, useEffect, useState, useMemo, useRef} from 'react';
import axios from 'axios';

import { createRoot } from 'react-dom/client';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import ExcelJS from 'exceljs';

export default function ShopVisitDetailsFVGrid(props) {
    const EMPID = props.empId;
    const EMPName = props.employee;
    const ApiPort = props.apiPort;

    console.log(EMPID, EMPName)

    const [overlayImageUrl, setOverlayImageUrl] = useState(null);

  const openOverlay = (imageUrl) => {
    setOverlayImageUrl(imageUrl);
  };

  const closeOverlay = () => {
    setOverlayImageUrl(null);
  };

  // const [productData, setProductData] = useState({ products: [] });
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: '100%', height: '100%' }), []);
  const gridStyle = useMemo(() => ({ height: '100%',  width: '100%' }), []);
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row

  // Each Column Definition results in one Column.
  const [columnDefs, setColumnDefs] = useState([
    { field: 'ShopName', filter: true, autoHeight: true, floatingFilter: true},
    { field: 'Address', filter: 'agTextColumnFilter', autoHeight: true, floatingFilter: true },
    { field: 'ShopMobile', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Type', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'VisitedDateTime', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'DurationSpent', filter: true, autoHeight: true, floatingFilter: true },
    { field: 'Image', 
    filter: true, 
    autoHeight: true, 
    floatingFilter: true,
    cellRenderer: params => {
      const imageName = params.value; 
      if (imageName) {
        return (
          <div>
          <img
            src={`http://3.7.30.86:8072/CommonFolder/${imageName}`}
            alt=''
            height='42'
            width='42'
            onClick={() => openOverlay(`http://3.7.30.86:8072/CommonFolder/${imageName}`)}
          />
          {overlayImageUrl === `http://3.7.30.86:8072/CommonFolder/${imageName}` && (
            <div className="image-overlay">
              <img
                src={`http://3.7.30.86:8072/CommonFolder/${imageName}`}
                alt=''
                height='auto'
                width='auto'
              />
              <button className="close-button" onClick={closeOverlay}>Close</button>
            </div>
          )}
        </div>
        )
      } else {
        return <p>No Image Found</p>;
      }
    }
   },
    { field: 'PartyStatus', filter: true, autoHeight: true, floatingFilter: true }
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
    const filterName = "AT_WORK";
    const type = "Attendance";
    const userId= "378"
    // axios.post('http://localhost:5738/DashboardMenu/DashboardGridViewDetails?EMPCODE=EMG0000001&branchid=1,118,119,120,121,122,123,124,125,127,128&stateid=15,3,35,1,24,19,16,2,28,8&FilterName=AT_WORK&Type=Attendance&userid=378')
    axios.post(`${ApiPort}/DashboardMenu/DashboardGridViewDetails?EMPCODE=${EMPID}&branchid=${branchIds}&stateid=${stateIds}&FilterName=${filterName}&Type=${type}&userid=${userId}`)
      .then(function (response) {
        // handle success
        // const dataArray = Array.isArray(response.data) ? response.data : [];
        
        setRowData(response.data);
        console.log('Shop Visit Details Grid:', response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, []);

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
      a.download = `Todays visit of ${EMPName}.xlsx`;
      a.click();
  
      // Release the object URL to free up memory
      window.URL.revokeObjectURL(url);
    });
  };


  return (
    <>
    <div style={containerStyle}>

    <div className='grid-header-title'>
       {/* <h4 className='mb-4'>Employee Attendance details - Employees At Work</h4> */}
              <button onClick={exportToExcel} style={{ marginBottom: '5px', fontWeight: 'bold' }}>
               Export to Excel
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
                  '<span class="ag-overlay-loading-center">Data loading...</span>'
                }
                onGridReady={onGridReady}
                
            />
          </div>
        </div>

      </div>
    </div>

    {overlayImageUrl && (
        <div className="image-overlay">
          <img
            src={overlayImageUrl}
            alt=''
            height='auto'
            width='auto'
          />
          <button className="close-button" onClick={closeOverlay}>Close</button>
        </div>
      )}
    </>
  )
}
