import React from 'react';
import Layout from './Layout';
import DashboardMain from './DashboardMain';
import '../../Assets/css/ftsNewScreen.css';
import '../../Assets/css/FsmDashboard.css';


// import Images from '../Images';
// import $ from 'jquery';
// import axios from 'axios';

export default function Dashboard(props) {

  const ApiPort = props.apiPort;

  return (
    <>
    <Layout/>
    <DashboardMain apiPort={ApiPort}/>
    </>
  )
}
