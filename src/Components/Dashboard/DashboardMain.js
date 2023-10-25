import React from 'react';

import { Tooltip } from 'react-tooltip';

// import Images from '../Images';
import './DashboardMain.css';
import DashboardVisitTab from './DashboardVisitTab';
import DashboardFieldVisitTab from './DashboardFieldVisitTab';
import DashboardTeamVisitTab from './DashboardTeamVisitTab';
import DashboardTeamVisitHTab from './DashboardTeamVisitHTab';
import DashboardAttendanceTab from './DashboardAttendanceTab';

export default function DashboardMain(props) {

  const ApiPort = props.apiPort;
  console.log("DashboardMain:", ApiPort);

  
  return (
    <section className="content-wraper">
      <div className="dashboardHighlightWrap">
        <div className="breadCumb">
            <span>Dashboard</span>
        </div>

        <div className="container">
          <svg className="hidden">
            <defs>
              <path id="tabshape" d="M80,60C34,53.5,64.417,0,0,0v60H80z" />
            </defs>
          </svg>
          <section className="">
            <div className="tabs tabs-style-shape">
              <nav>
                <ul role="tablist" className="tabItemsLI">
                  <li role="presentation" id="tbsalesman" className="active">
                    <a href="#profile" aria-controls="profile" role="tab" data-toggle="tab" data-tooltip-id="tooltip-1" data-tooltip-content="Get the Details of Total Employee, working or on leave and if anyone not using the app">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Visit</span>
                    </a>
                  </li>
                  <Tooltip id="tooltip-1" place="top-start" style={{ backgroundColor: "#0a9b72", color: "#fff", opacity: "1" }}/>

                  <li role="presentation" id="tbFieldVisit" className="">
                    <a href="#FieldVisit" aria-controls="FieldVisit" role="tab" data-toggle="tab" data-tooltip-id="tooltip-2" data-tooltip-content="Get the Details of Total Employee, working or on leave and if anyone not using the app">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Field  Visit</span>
                    </a>
                  </li>
                  <Tooltip id="tooltip-2" style={{ backgroundColor: "#0a9b72", color: "#fff", opacity: "1" }}/>

                  <li role="presentation" id="tbteamVisit" className="">
                    <a href="#teamVisit" aria-controls="teamVisit" role="tab" data-toggle="tab" data-tooltip-id="tooltip-3" data-tooltip-content="Get the Details of Total Employee, working or on leave and if anyone not using the app">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Team Visit</span>
                    </a>
                  </li>
                  <Tooltip id="tooltip-3" style={{ backgroundColor: "#0a9b72", color: "#fff", opacity: "1" }}/>

                  <li role="presentation" id="tbteamVisitHierarchy" className="">
                    <a href="#teamVisitHierarchy" aria-controls="teamVisitHierarchy" role="tab" data-toggle="tab" data-tooltip-id="tooltip-4" data-tooltip-content="Get the Details of Total Employee, working or on leave and if anyone not using the app">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Team Visit - Hierarchy</span>
                    </a>
                  </li>
                  <Tooltip id="tooltip-4" style={{ backgroundColor: "#0a9b72", color: "#fff", opacity: "1" }}/>

                  <li role="presentation" id="tbAttendance" className="">
                    <a href="#Attendance" aria-controls="Attendance" role="tab" data-toggle="tab" data-tooltip-id="tooltip-5" data-tooltip-content="Get the Details of Total Employee, working or on leave and if anyone not using the app">
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <svg viewBox="0 0 80 60" preserveAspectRatio="none"><use xlinkHref="#tabshape"></use></svg>
                      <span>Attendance</span>
                    </a>
                  </li>
                  <Tooltip id="tooltip-5" style={{ backgroundColor: "#0a9b72", color: "#fff", opacity: "1" }}/>

                </ul>
              </nav>

              <div className="tab-content mainAreaTAb">
                <div role="tabpanel" className="tab-pane active" id="profile">

                  <DashboardVisitTab apiPort={ApiPort}/>
                  
                </div>

                <div role="tabpanel" className="tab-pane" id="FieldVisit">

                  <DashboardFieldVisitTab apiPort={ApiPort}/>
                  
                </div>

                <div role="tabpanel" className="tab-pane" id="teamVisit">

                  <DashboardTeamVisitTab apiPort={ApiPort}/>
                  
                </div>

                <div role="tabpanel" className="tab-pane" id="teamVisitHierarchy">

                  <DashboardTeamVisitHTab apiPort={ApiPort}/>
                  
                </div>

                <div role="tabpanel" className="tab-pane" id="Attendance">

                  <DashboardAttendanceTab apiPort={ApiPort}/>
                  
                </div>

              </div>
              
            </div>
          </section>
        </div>
      </div>
    </section>
  )
}
