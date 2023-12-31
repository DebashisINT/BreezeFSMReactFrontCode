import React, { useState } from 'react';
import Images from '../Images';
import axios from 'axios';
import $ from 'jquery';

import EmployeeNotLoggedInTVHGrid from './TeamVisitHierarchyTabGrid/EmployeeNotLoggedInTVHGrid';
import EmployeeOnLeaveTVHGrid from './TeamVisitHierarchyTabGrid/EmployeeOnLeaveTVHGrid';
import EmployeeAtWorkTVHGrid from './TeamVisitHierarchyTabGrid/EmployeeAtWorkTVHGrid';
import TotalEmployeesTVHGrid from './TeamVisitHierarchyTabGrid/TotalEmployeesTVHGrid';

export default function DashboardTeamVisitHTab(props) {
  const ApiPort = props.apiPort;

    const [totalEmployee, setTotalEmployee] = useState("***");
    const [employeeAtWork, setEmployeeAtWork] = useState("***");
    const [employeeOnLeave, setEmployeeOnLeave] = useState("***");
    const [employeeNotLoggedIn, setEmployeeNotLoggedIn] = useState("***");

    const [showTotalEmployeesGrid, setShowTotalEmployeesGrid] = useState(false);
    const [showEmployeeAtWorkGrid, setShowEmployeeAtWorkGrid] = useState(false);
    const [showEmployeeOnLeaveGrid, setShowEmployeeOnLeaveGrid] = useState(false);
    const [showNotLoggedInGrid, setShowEmployeeNotLoggedInGrid] = useState(false);
    

    const ShowVisitData = () => {

        $('#a4tvH').addClass('zoom');
        $('#a1tvH').addClass('zoom');
        $('#a2tvH').addClass('zoom');
        $('#a3tvH').addClass('zoom');

        setTotalEmployee(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeAtWork(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeOnLeave(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeNotLoggedIn(<img src={Images.LoaderSpinner} alt=''/>)

         const branchIds = "1,118,119,120,121,122,123,124,125,127,128";
         const stateIds = "15,3,35,1,24,19,16,2,28,8";
        
        axios.post(`${ApiPort}/DashboardMenu/GetDashboardDataVisitH`, {
            stateid: stateIds,
            branchid: branchIds
          })
        .then(response => {
            console.log(response.data);
            setTotalEmployee(response.data.lblTotal);
            setEmployeeAtWork(response.data.lblAtWork);
            setEmployeeOnLeave(response.data.lblOnLeave);
            setEmployeeNotLoggedIn(response.data.lblNotLoggedIn)
          })
    }

    const VisitEmployeeStrengthBox = () => {

        $('.widgBox').removeClass('active');
        $('#a4tvH').addClass('active');

        setShowTotalEmployeesGrid(true);
        setShowEmployeeAtWorkGrid(false);
        setShowEmployeeOnLeaveGrid(false);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeAtWorkBox = () => {

        $('.widgBox').removeClass('active');
        $('#a1tvH').addClass('active');

        setShowTotalEmployeesGrid(false);
        setShowEmployeeAtWorkGrid(true);
        setShowEmployeeOnLeaveGrid(false);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeOnLeaveBox = () => {
        $('.widgBox').removeClass('active');
        $('#a2tvH').addClass('active');

        setShowTotalEmployeesGrid(false);
        setShowEmployeeAtWorkGrid(false);
        setShowEmployeeOnLeaveGrid(true);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeNotLoggedInBox = () => {
        $('.widgBox').removeClass('active');
        $('#a3tvH').addClass('active');

        setShowTotalEmployeesGrid(false);
        setShowEmployeeAtWorkGrid(false);
        setShowEmployeeOnLeaveGrid(false);
        setShowEmployeeNotLoggedInGrid(true);
    }

  return (
    <>
    <div className="">
        <div className="row">
            <div className="clearfix mb-3">
                <div className="d-flex justify-content-center mainDashBoxes newStyleMN">
                    <div className="flex-itm scr " data-scroll="accordion">
                        <div className="widgBox c2" id="a4tvH" onClick={VisitEmployeeStrengthBox}>
                            <div className="d-flex  align-items-center">
                                <div className="icon">
                                      {/* <img src="/assests/images/employees.png" /> */}
                                    <img src={Images.Visit_EmployeeStrength} alt=''/>
                                </div>

                            </div>
                            <div className="lspacer">
                                {/* <div className="Numb" id="lblTotal">***</div> */}
                                <div className="Numb" id="lblTotal">{totalEmployee}</div>
                                <div className="flex-grow-1 txt">Employee Strength</div>
                                <div className="dtday">As of Today</div>
                                <div className="text-right hide"><span className="lnr lnr-arrow-down dwn arrD"></span></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-itm scr " data-scroll="accordion">
                        <div className="widgBox c3" id="a1tvH" onClick={VisitEmployeeAtWorkBox}>
                            <div className="d-flex  align-items-center">
                                <div className="icon">
                                        
                                        {/* <img src="/assests/images/at-work.png" /> */}
                                        <img src={Images.Visit_AtWork} alt=''/>
                                </div>

                            </div>
                            <div className="lspacer">
                                    {/* <div className="Numb" id="lblAtWork">***</div> */}
                                    <div className="Numb" id="lblAtWork">{employeeAtWork}</div>
                                    <div className="flex-grow-1 txt">Employees At Work</div>
                                    <div className="dtday">Today</div>
                                    <div className="text-right hide"><span className="lnr lnr-arrow-down dwn arrD"></span></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-itm scr " data-scroll="accordion">
                        <div className="widgBox c5" id="a2tvH" onClick={VisitEmployeeOnLeaveBox}>
                            <div className="d-flex  align-items-center">
                                    <div className="icon">
                                        {/* <img src="/assests/images/on-leave.png" /> */}
                                        <img src={Images.Visit_OnLeave} alt=''/>
                                    </div>

                                </div>
                                <div className="lspacer">
                                    <div className="Numb" id="lblOnLeave">{employeeOnLeave}</div>
                                    <div className="flex-grow-1 txt">Employees On Leave</div>
                                    <div className="dtday"> Today</div>
                                    <div className="text-right hide"><span className="lnr lnr-arrow-down dwn arrD"></span></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex-itm scr " data-scroll="accordion">
                            <div className="widgBox c4" id="a3tvH" onClick={VisitEmployeeNotLoggedInBox}>
                                <div className="d-flex  align-items-center">
                                    <div className="icon">
                                        {/* <img src="/assests/images/not-loggedin.png" /> */}
                                        <img src={Images.Visit_NotLoggedIn} alt=''/>
                                    </div>

                                </div>
                                <div className="lspacer">
                                    <div className="Numb" id="lblNotLoggedIn">{employeeNotLoggedIn}</div>
                                    <div className="flex-grow-1 txt">Not Logged In</div>
                                    <div className="dtday">Today</div>
                                    <div className="text-right hide"><span className="lnr lnr-arrow-down dwn arrD"></span></div>
                                </div>
                            </div>
                        </div>

                </div>
            </div>
        </div>
    </div>
    <div className="row">
        <div className="col-md-12 text-left clearfix py-0 pl-50">
            <button type="button" className="btn details-btn" id="summary-show-btn" onClick={ShowVisitData} title="">
                <img src={Images.ShowDataButtonIcon} alt='' /> click here to show data
            </button>  
        </div>
    </div>

    {showTotalEmployeesGrid && (
                <div className='mt-5'>
                
                    {/* <TotalEmployeesTVGrid key="TotalEmployeesTVGrid" apiPort={ApiPort}/> */}
                    <TotalEmployeesTVHGrid key="TotalEmployeesTVHGrid" apiPort={ApiPort}/>

                </div>
            )}

    {showEmployeeAtWorkGrid && (
                <div className='mt-5'>

                    {/* <EmployeeAtWorkTVGrid key="EmployeeAtWorkTVGrid" apiPort={ApiPort}/> */}
                    <EmployeeAtWorkTVHGrid key="EmployeeAtWorkTVHGrid" apiPort={ApiPort}/>
                    
                </div>
            )}

    {showEmployeeOnLeaveGrid && (
                <div className='mt-5'>

                    {/* <EmployeeOnLeaveTVGrid key="EmployeeOnLeaveTVGrid" apiPort={ApiPort}/> */}
                    <EmployeeOnLeaveTVHGrid key="EmployeeOnLeaveTVHGrid" apiPort={ApiPort}/>

                </div>
            )}

    {showNotLoggedInGrid && (
                <div className='mt-5'>

                    <EmployeeNotLoggedInTVHGrid key="EmployeeNotLoggedInTVHGrid" apiPort={ApiPort}/>

                </div>
            )}
    </>
  )
}
