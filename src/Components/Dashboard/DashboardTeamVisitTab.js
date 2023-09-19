import React, { useState } from 'react';
import Images from '../Images';
import axios from 'axios';
import $ from 'jquery';
import EmployeeAtWorkFVGrid from './FieldVisitTabGrid/EmployeeAtWorkFVGrid';
import TotalEmployeesTVGrid from './TeamVisitTabGrid/TotalEmployeesTVGrid';
import EmployeeNotLoggedInTVGrid from './TeamVisitTabGrid/EmployeeNotLoggedInTVGrid';
import EmployeeOnLeaveTVGrid from './TeamVisitTabGrid/EmployeeOnLeaveTVGrid';
import EmployeeAtWorkTVGrid from './TeamVisitTabGrid/EmployeeAtWorkTVGrid';

export default function DashboardTeamVisitTab(props) {
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

        $('#a4tv').addClass('zoom');
        $('#a1tv').addClass('zoom');
        $('#a2tv').addClass('zoom');
        $('#a3tv').addClass('zoom');

        setTotalEmployee(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeAtWork(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeOnLeave(<img src={Images.LoaderSpinner} alt=''/>);
        setEmployeeNotLoggedIn(<img src={Images.LoaderSpinner} alt=''/>)

         const branchIds = "1,118,119,120,121,122,123,124,125,127,128";
         const stateIds = "15,3,35,1,24,19,16,2,28,8";
        
        axios.post(`${ApiPort}/DashboardMenu/GetDashboardDataVisit`, {
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
        $('#a4tv').addClass('active');

        setShowTotalEmployeesGrid(true);
        setShowEmployeeAtWorkGrid(false);
        setShowEmployeeOnLeaveGrid(false);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeAtWorkBox = () => {

        $('.widgBox').removeClass('active');
        $('#a1tv').addClass('active');

        setShowTotalEmployeesGrid(false);
        setShowEmployeeAtWorkGrid(true);
        setShowEmployeeOnLeaveGrid(false);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeOnLeaveBox = () => {
        $('.widgBox').removeClass('active');
        $('#a2tv').addClass('active');

        setShowTotalEmployeesGrid(false);
        setShowEmployeeAtWorkGrid(false);
        setShowEmployeeOnLeaveGrid(true);
        setShowEmployeeNotLoggedInGrid(false);
    }

    const VisitEmployeeNotLoggedInBox = () => {
        $('.widgBox').removeClass('active');
        $('#a3tv').addClass('active');

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
                        <div className="widgBox c2" id="a4tv" onClick={VisitEmployeeStrengthBox}>
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
                        <div className="widgBox c3" id="a1tv" onClick={VisitEmployeeAtWorkBox}>
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
                        <div className="widgBox c5" id="a2tv" onClick={VisitEmployeeOnLeaveBox}>
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
                            <div className="widgBox c4" id="a3tv" onClick={VisitEmployeeNotLoggedInBox}>
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
                
                    <TotalEmployeesTVGrid key="TotalEmployeesTVGrid" apiPort={ApiPort}/>

                </div>
            )}

    {showEmployeeAtWorkGrid && (
                <div className='mt-5'>

                    <EmployeeAtWorkTVGrid key="EmployeeAtWorkTVGrid" apiPort={ApiPort}/>
                    
                </div>
            )}

    {showEmployeeOnLeaveGrid && (
                <div className='mt-5'>

                    <EmployeeOnLeaveTVGrid key="EmployeeOnLeaveTVGrid" apiPort={ApiPort}/>

                </div>
            )}

    {showNotLoggedInGrid && (
                <div className='mt-5'>

                    <EmployeeNotLoggedInTVGrid key="EmployeeNotLoggedInTVGrid" apiPort={ApiPort}/>

                </div>
            )}
    </>
  )
}
