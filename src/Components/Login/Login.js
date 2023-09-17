import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './Login.css';
import Images from '../Images';
import $ from 'jquery';
import axios from 'axios';

export default function Login(props) {

    const ApiPort = props.apiPort;
    

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    // const usenavigate=useNavigate();

    localStorage.setItem("theme", "screenLight");

    // For theme change
    const ThemeChange = () => {

        var input = $(".switch input").is(':checked');
            var bodyClass = $("#themeClass").hasClass("screenDark");
            var theme = localStorage.getItem('theme');

            //alert(bodyClass)
            if (bodyClass) {
                $("#themeClass").removeClass("screenDark").addClass("screenLight");
                localStorage.setItem('theme', 'screenLight');
            } else {
                $("#themeClass").removeClass("screenLight").addClass("screenDark");
                localStorage.setItem('theme', 'screenDark');
            }
    }
    
    window.addEventListener('load', function (event) {
        var theme = localStorage.getItem('theme');
        console.log(theme)
        if (theme !== '' || theme !== undefined) {
            $("#themeClass").attr('class', '').addClass(theme);
        } else {
            $("#themeClass").addClass('screenDark');
        }

    });

    // $(document).ready(function () {
    //     $(".secToggler").on("click", function () {
    //         $(".droper").toggleClass("active");
    //     });
    //     $("#clCr").click(function () {
    //         $(".droper").removeClass("active");
    //     });
    // });
    // For Team members
    const secToggler = () => {
        $(".droper").toggleClass("active");
    }

    const TeamHide = () => {
        $(".droper").removeClass("active");
    }


    const passWordEye = () => {
        $(".passWordView").toggleClass("shActive");
        var icon = $(".passWordView").find(".fa");
        if (icon.hasClass("fa-eye")) {
            icon.removeClass("fa-eye").addClass("fa-eye-slash");
        } else {
            icon.removeClass("fa-eye-slash").addClass("fa-eye");
        }
        var x = document.getElementById("txtPassword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }


    // const LoginSubmit = (e) => {
    //     e.preventDefault();
    //     if (Validate()) {
    //         console.log(username, password)
    //         fetch('http://localhost:5738/Login/SubmitForm', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({
    //         username: username,
    //         password: password
    //       }),
      
    // })
    //     .then(res => res.json())
    //     .then((result) => {
    //       if(result.Validuser === "Y"){
    //         console.log(result);
    //         navigate('/dashboard');
    //         toast.success('Login Successfully.');
    //        } else {
    //         //    alert("Please check your login information.");
    //            toast.error('Please check your login information!');
    //        }
    //     })
    //     .catch(err => console.log(err))
    //     }
        
    //   }

    const LoginSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (Validate()) {
          console.log({ username: username, password: password });

          const formData = new FormData();
            formData.append('username', username);
            formData.append('password', password);
            console.log('formData', formData);
          axios.post(`${ApiPort}/Login/SubmitForm`, formData)
            .then((response) => {
              const result = response.data;
            //   console.log('data:', result);
            setLoading(false);
              if (result.Validuser === "Y") {
                navigate('/dashboard');
                toast.success('Login Successfully.');
              } else {
                toast.error('Please check your login information!');
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      };
      

    const Validate = () => {
        let result = true;
        if (username === '' || username === null) {
            result = false;
            toast.warning('Please Enter Username');
        }
        if (password === '' || password === null) {
            result = false;
            toast.warning('Please Enter Password');
        }
        return result;
    }


  return (
    <>
    {loading && ( 
     <div className="loader-gif">
         <img src={Images.LoaderGif} alt=""/>
     </div>
   )}

    <div id="switchArea" className="">
        <label className="switch">
          <input type="checkbox" onClick={ThemeChange} defaultChecked />
          <span className="slider round"></span>
        </label>
    </div>

    <div id="themeClass" className="mainLogin screenLight">
         <div className="flexArea">
             <div className="contentArea img-wrapper">
                 
                 <img src={Images.LoginLeftDesign} className="left-top-image light-design"  alt=''/>
             </div>
            
             <div className="formArea">
                
                     <div><img src={Images.Logo} className="mlogos" alt=''/></div>
                 <div className="login-part">
                    {/* <div className="event-img">
                         <img id="EV1" runat="server" src="" />
                     </div> */}
                     <div className='login-form-heading'>Login to your Account</div>
                    <form action="" method="post" runat="server" noValidate="novalidate" onSubmit={(e) => LoginSubmit(e)}>
                    <input id="rurl" name="rurl" runat="server" type="hidden" value="" />
                     <div className="formBox">

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <img src={Images.UserIcon} className="inputIcons" alt='' />
                            {/* <input type="text" className="form-control" id="txtUserName" value={username} onChange={e=>setUsername(e.target.value)}></input> */}
                            <input type="text" className="form-control" id="txtUserName" value={username} onChange={e=>setUsername(e.target.value)}></input>
                         </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <img src={Images.PasswordIcon} className="inputIcons" alt='' />
                            {/* <input type="password" className="form-control" id="txtPassword" value={password} onChange={e=>setPassword(e.target.value)}></input> */}
                            <input type="password" className="form-control" id="txtPassword" value={password} onChange={e=>setPassword(e.target.value)}></input>
                            <span onClick={passWordEye} className="passWordView"><i className="fa fa-eye-slash"></i></span>
                        </div>

                         <div className='app-best-view-text'>Application best viewed at <a href="/">1280 x 720</a> resolution in <a href="/">Google Chrome</a> 59 or above</div>
                         <input type="submit" value="Sign in"  className="btn btn-block loginbtn" />
						{/* <asp:LinkButton ID="LinkButton1" runat="server" CausesValidation="False" TabIndex="4" CssclassName="compemail hide" OnClick="LinkButton1_Click1">Forgot  Password?</asp:LinkButton> */}

                         <div className="ftFooter">
                             {/* © Copyright <span id="yearCP"></span> Indus Net Technologies */}
                             {/* <asp:Label ID="lblVersion" runat="server" Text="1.0.4" />  */}
                             <div className="ftFooter">
                                    © Copyright 2023 Indus Net Technologies.<br />
                                    [BreezeERP Version <span id="lblVersion">2.0.29]</span>
                                </div>
                            
                         </div>
                     </div>
                    </form>
                     </div>
                </div>
         </div>


         <div className="creditsSec " id="rc_app_1562">
            <div className="secToggler" onClick={secToggler} id="rc_app_15652"><img src={Images.TeamIcon} alt='' /></div>
            <div className="droper">
                <div className="mnHeader">Team Behind <span id="clCr" onClick={TeamHide}><i className="fa fa-close"></i></span></div>
                <div className="scrCnter" id="rc_app_156655">
                    <ul className="tc_s5621f_fg">
                        
                        <li><span className="nameCR">Abhinav Dahiwade</span></li>
                        <li><span className="nameCR">Abhishek Munshi</span></li>
                        <li><span className="nameCR">Ananya Deb</span></li>
                        <li><span className="nameCR">Ankan Das</span></li>
                        <li><span className="nameCR">Arindam Ghosal</span></li>
                        <li><span className="nameCR">Arunabha Saha</span></li>
                        <li><span className="nameCR">Ashmita Roy Chowdhury</span></li>
                        <li><span className="nameCR">Avijit Bonu</span></li>
                        <li><span className="nameCR">Bapi Dutta</span></li> 
                        <li><span className="nameCR">Bhaskar Chatterjee</span></li>
                        <li><span className="nameCR">Chinmoy Maiti</span></li>
                        <li className="tc_sfsf_fg"><span className="nameCR">Debashis Talukder</span></li>
                        <li><span className="nameCR">Debjyoti Dhar</span></li>
                        <li><span className="nameCR">Deep Narayan Mahajan</span></li>
                        <li><span className="nameCR">Goutam Kumar Das</span></li>
                        <li><span className="nameCR">Indranil Dey</span></li>
                        <li><span className="nameCR">Jitendra Jha</span></li>
                        <li><span className="nameCR">Kaushik Gupta</span></li>
                        <li><span className="nameCR">Maynak Nandi</span></li>
                        <li><span className="nameCR">Pallab Mukherjee</span></li>
                        <li><span className="nameCR">Pijush Kumar Bhattacharya</span></li>
                         <li><span className="nameCR">Pratik Ghosh</span></li>
                        <li className="tc_s5221f_fg"><span className="nameCR">Priti Ghosh</span></li>
                        <li><span className="nameCR">Priyanka</span></li>
                        <li><span className="nameCR">Rajdip Mukherjee</span></li>
                        <li><span className="nameCR">Saheli Bhattacharya</span></li>
                        <li><span className="nameCR">Saikat Das</span></li> 
                        <li><span className="nameCR">Sanchita Saha</span></li>
                        <li><span className="nameCR">Sanjoy Ganguly</span></li>
                        <li><span className="nameCR">Santanu Mukherjee</span></li>
                        <li><span className="nameCR">Sayantani Mandal</span></li>
                        <li><span className="nameCR">Shantanu Saha</span></li>
                        <li><span className="nameCR">Sneha das</span></li>
                        <li><span className="nameCR">Sourav Goswami</span></li>
                        <li><span className="nameCR">Subhra Mukherjee</span></li>
                        <li><span className="nameCR">Sudip Biswas</span></li>
                        <li><span className="nameCR">Sudip Kumar Pal</span></li>
                        <li><span className="nameCR">Suman Bachar</span></li>
                        <li><span className="nameCR">Suman Roy</span></li>  
                        <li><span className="nameCR">Surojit Chatterjee</span></li>
                        <li><span className="nameCR">Susanta Kundu</span></li>
                        <li><span className="nameCR">Suvankar Dey</span></li> 
                        <li><span className="nameCR">Swatilekha Mukherjee</span></li>   
                        <li><span className="nameCR">Tanmoy Ghosh</span></li>
                        
                        
                    </ul>
                </div>
            </div>
        </div>

     </div>

        <div className="fts">
             <div className="container">
                 <h2 className="">
                     Automate Processes. Manage Teams. <br/>Acquire Leads. Close Sales.
                     <span>All-in-One Platform</span>
                 </h2>
             <div className="row spaceColumn">
                 
                 <div className="col-md-4 wow slideInLeft" data-wow-duration="2s" data-wow-delay="5s">
                     <div className="login-about-box">
                        <div className="icon-img"><img src={Images.TrackingRouteIcon}  alt=''/></div>
                        <div className="hdn">Geo-Tracking & Route  <br /> Optimization</div>
                        <p>System will intelligently capture geolocation at attendance, and will be allowed if it falls in Distribution or first visit location.</p>
                     </div>
                 </div>
                 <div className="col-md-4 wow slideInLeft" data-wow-duration="2s" data-wow-delay="7s">
                     <div className="login-about-box">
                        <div className="icon-img"><img src={Images.IMEIOtpIcon}  alt=''/></div>
                        <div className="hdn">IMEI/OTP based  <br /> authentication</div>
                        <p>Each user will be locked with this phone IMEI and will not be able to login on another device without admin action.</p>
                     </div>
                 </div>
                 <div className="col-md-4 wow slideInLeft" data-wow-duration="2s" data-wow-delay="9s">
                     <div className="login-about-box">
                         <div className="icon-img"><img src={Images.IntuitiveDashboardIcon}  alt=''/></div>
                         <div className="hdn">Intuitive Dashboard & <br /> Auto-Reporting</div>
                         <p>A single dashboard to manage all your team members with real time updates and notifications for updates and voilations.</p>
                     </div>
                 </div>
             </div>
         </div>
     </div>

     <div className="app-section">
        
            <div className="row">
                <div className="col-md-6 mobile-image-part"> 
                   {/* <img src="/assests/images/NLogin/loginPh.png" className="responsiveImg" />
                    <img src="/assests/images/NLogin/mobile-app-mockup.jpg" className="responsiveImg image-fluid" /> */}
                </div>
                <div className="col-md-6 right-text-part">
                    <h2 className="mkHd"> Make Your Field Agents FUTURE READY!</h2>
                    <h4 className="mkHs">Accelerate Sales. Escalate Revenue.</h4>

                    <div className="row mkBoxes">
                        <div className="col-sm-12 mb-5">
                            <h5>Smart Route Management</h5>
                            <p>Stop worrying about planning .Automated route suggestion as per locations to be visited. Time saved is revenue earned.</p>
                        </div>
                        <div className="col-sm-12 mb-5">
                            <h5>One-Click OrderManagement</h5>
                            <p>Hassle-free order creation through a single click. Eliminates onsite visits for order acquisition & saves time real time.</p>
                        </div>
                        <div className="col-sm-12 mb-5">
                            <h5>Automated Reporting</h5>
                            <p>Automatically generate reports periodically to know what is going on and take decisions real time.</p>
                        </div>
                        <div className="col-sm-12 mb-5">
                            <h5>Travel Reimbursement Management</h5>
                            <p>No more hassles of having multiple portals for filling reimbursements. Single interface for all kinds of updates with status tracking.</p>
                        </div>
                    </div>
                </div>
            </div>
       
    </div>


    <section>
            <div className="container text-center pd-80">
                <h3 className='ftr-title'>Log in to Start Your Digital Journey with Breeze .</h3>
                <a href="/" className="cta" id="toLogin">
                    <span>Login Now</span>
                    <svg width="13px" height="10px" viewBox="0 0 13 10">
                        <path d="M1,5 L11,5"></path>
                        <polyline points="8 1 12 5 8 9"></polyline>
                    </svg>
                </a>
                <div></div>
                <div className="socialArea">
                    <div className="effect egeon">
                        <div className="buttons">
                            <a href="/" className="fb" title="Join us on Facebook"><i className="fa fa-facebook" aria-hidden="true"></i> </a>
                            <a href="/" className="g-plus" title="Join us on Google+"><i className="fa fa-google-plus" aria-hidden="true"></i> </a>
                            <a href="/" className="in" title="Join us on Linked In"><i className="fa fa-linkedin" aria-hidden="true"></i> </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    </>
  )
}
