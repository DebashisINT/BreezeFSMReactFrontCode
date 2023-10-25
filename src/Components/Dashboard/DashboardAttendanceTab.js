import React, { useState } from 'react';
import Images from '../Images';
import axios from 'axios';
// import $ from 'jquery';

export default function DashboardAttendanceTab(props) {
  const ApiPort = props.apiPort;

  const [totalEmployee, setTotalEmployee] = useState("");
  const [onTimePercentage, setOnTimePercentage] = useState("");
  const [onTimeToday, setOnTimeToday] = useState("");
  const [lateToday, setLateToday] = useState("");
  const [absentToday, setAbsentToday] = useState("");


  const ShowAttendanceData = () => {

        // $('#a4tvH').addClass('zoom');
        // $('#a1tvH').addClass('zoom');
        // $('#a2tvH').addClass('zoom');
        // $('#a3tvH').addClass('zoom');

        setTotalEmployee(<img src={Images.LoaderSpinner} alt=''/>);
        setOnTimePercentage(<img src={Images.LoaderSpinner} alt=''/>);
        setOnTimeToday(<img src={Images.LoaderSpinner} alt=''/>);
        setLateToday(<img src={Images.LoaderSpinner} alt=''/>);
        setAbsentToday(<img src={Images.LoaderSpinner} alt=''/>);

        //  const branchIds = "1,118,119,120,121,122,123,124,125,127,128";
        //  const stateIds = "15,3,35,1,24,19,16,2,28,8";
        const userId = "378";
    
        axios.post(`${ApiPort}/DashboardMenu/GetAttendanceResults?userid=${userId}`)
        .then(response => {
            console.log(response.data);
            setTotalEmployee(response.data.TOTAL_EMPLOYEE);
            setOnTimePercentage(response.data.TOTAL_ONTIME_PERCENTAGE);
            setOnTimeToday(response.data.TOTAL_ONTIME);
            setLateToday(response.data.TOTAL_LATETODAY);
            setAbsentToday(response.data.TOTAL_ABSENT)
        })

        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1;
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();

        console.log(userId, month, year)
    }

  return (
    <>
        <div className="row">
            <div className="col-md-12">
                <ul className="nopad">
                    <li>
                        <div className="colorBox" id="getTotalA" title="Click here to get detail report" data-toggle="tooltip">
                            <div className="infoWrp">
                                <div className="icon-box-left">
                                    {/* <img src="/assests/images/employees.png" /> */}
                                    <img src={Images.DashboardAttendance_TotalEmployee} alt=''/>
                                </div>
                                
                                <div className="nums" id="Total_Emp">{totalEmployee}</div>
                                <div className="txts">Total Employees</div>
                            </div>
                            <div className="mrLinks hide">
                                More info
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="colorBox c1">
                            <div className="infoWrp">
                                <div className="icon-box-left">
                                    {/* <img src="/assests/images/percentage.png" /> */}
                                    <img src={Images.DashboardAttendance_OnTimePercentage} alt=''/>
                                </div>
                                <div className="nums"><span id="TOTAL_ONTIME_PERCENTAGE">{onTimePercentage}</span> <span>%</span></div>
                                <div className="txts">On Time Percentage</div>
                            </div>
                            <div className="mrLinks hide">
                                More info
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="colorBox c2" id="getOnTimeToday" title="Click here to get detail report" data-toggle="tooltip">
                            <div className="infoWrp">
                                <div className="icon-box-left">
                                    {/* <img src="/assests/images/on-time.png" /> */}
                                    <img src={Images.DashboardAttendance_OnTimeToday} alt=''/>
                                </div>
                                <div className="nums" id="TOTAL_ONTIME">{onTimeToday}</div>
                                <div className="txts">On Time Today</div>
                            </div>
                            <div className="mrLinks hide">
                                More info
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="colorBox c3" id="getLateToday" title="Click here to get detail report" data-toggle="tooltip">
                            <div className="infoWrp">
                                <div className="icon-box-left">
                                    {/* <img src="/assests/images/late-ent.png" /> */}
                                    <img src={Images.DashboardAttendance_LateToday} alt=''/>
                                </div>
                                <div className="nums" id="TOTAL_LATETODAY">{lateToday}</div>
                                <div className="txts">Late Today</div>
                            </div>
                            <div className="mrLinks hide">
                                More info
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="colorBox c4" id="getAbsentToday" title="Click here to get detail report" data-toggle="tooltip">
                            <div className="infoWrp">
                                <div className="icon-box-left">
                                    {/* <img src="/assests/images/absent.png" /> */}
                                    <img src={Images.DashboardAttendance_AbsentToday} alt=''/>
                                </div>
                                <div className="nums" id="TOTAL_ABSENT">{absentToday}</div>
                                <div className="txts">Absent Today</div>
                            </div>
                            <div className="mrLinks hide">
                                More info
                                <i className="fa fa-arrow-circle-o-right" aria-hidden="true"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className="row">
            <div className="col-md-12 text-left clearfix py-0 pl-50">
                <button type="button" className="btn details-btn" id="summary-show-btn" onClick={ShowAttendanceData} title="">
                    <img src={Images.ShowDataButtonIcon} alt='' /> click here to show data
                </button>  
            </div>
        </div>

        <div className="row">
            <div className="col-md-5">
                <div className="box-holder mTop10">

                    <div className="clearfix">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="hdd-rp">
                                    Calendar
                                </div>
                            </div>
                            <div className="col-md-8">
                                <table>
                                    <tr>
                                        <td className="emp-dropdown-title"><span className="font-normal">Employee</span></td>
                                        <td className="sltemp">
                                            <select id="userID">
                                                <option></option>
                                            </select>
                                        </td>

                                    </tr>
                                </table>


                            </div>
                        </div>
                    </div>
                    <div className="bxd-cont">
                        <div className="calendar"></div>
                        <div className="lagendInfo">
                            <span><span className="dot Present"></span>Present</span> <i className="separt">|</i> <span><span className="dot Absent"></span>Absent</span><i className="separt">|</i> <span><span className="dot Leave"></span>On Leave</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div className="box-holder mTop10 box-full">
                    <span className="toggleFullScreen" data-toggle="tooltip" data-placement="bottom" title="Maximize">
                        {/* <img src="/assests/images/maximize.png" /> */}
                        <img src={Images.Maximize_Icon} alt=''/>
                    </span>
                    <div className="clearfix">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="hdd-rp">
                                    Monthly Attendance Summary
                                </div>
                            </div>
                            <div className="col-md-5"></div>
                        </div>
                    </div>
                    <div className="bxd-cont">
                        <div className="att-chart" id="chartdiv"></div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
