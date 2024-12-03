/*!
=========================================================
* Black Dashboard React v1.2.2 - Static Analysis for Android Security
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// core components
import RTLNavbar from "components/Navbars/RTLNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import logo from "assets/img/react-logo.png";
import { BackgroundColorContext } from "contexts/BackgroundColorContext";

var ps;

function StaticAnalysis(props) {
  const location = useLocation();
  const mainPanelRef = React.useRef(null);
  const [sidebarOpened, setsidebarOpened] = React.useState(
    document.documentElement.className.indexOf("nav-open") !== -1
  );

  // Static analysis tools: MobSF, SonarQube, Android Lint
  const staticAnalysisTools = [
    "MobSF",
    "SonarQube",
    "Android Lint",
    "FindBugs",
    "PMD"
  ];

  // Security guidelines for Android static analysis
  const analysisGuidelines = {
    preparation: {
      gatherRequirements: "Define the scope and objectives of the static analysis process.",
      selectTools: `Choose appropriate tools: ${staticAnalysisTools.join(", ")}`,
    },
    codeReview: {
      manualReview: "Identify insecure coding practices like hardcoded credentials.",
      automatedScan: "Use automated tools to scan the codebase for vulnerabilities.",
    },
    configurationAnalysis: {
      manifestReview: "Check AndroidManifest.xml for insecure configurations.",
      buildConfigReview: "Examine build.gradle for secure configurations.",
    },
    dependencyAnalysis: "Identify and evaluate third-party libraries for known vulnerabilities.",
    reporting: {
      documentFindings: "Prepare a report outlining vulnerabilities and their impact.",
      prioritizeIssues: "Rank vulnerabilities based on severity.",
    },
    mitigation: {
      proposeFixes: "Recommend secure coding practices and configuration changes.",
      integrateFixes: "Work with the team to integrate fixes into the codebase.",
    },
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      document.documentElement.className += " perfect-scrollbar-on";
      document.documentElement.classList.remove("perfect-scrollbar-off");
      ps = new PerfectScrollbar(mainPanelRef.current, {
        suppressScrollX: true,
      });
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.body.classList.add("rtl", "menu-on-right");

    let head = document.head;
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.id = "rtl-id";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/bootstrap-rtl/3.4.0/css/bootstrap-rtl.css";
    head.appendChild(link);

    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
        document.documentElement.classList.add("perfect-scrollbar-off");
        document.documentElement.classList.remove("perfect-scrollbar-on");
      }
      document.body.classList.remove("rtl", "menu-on-right");
      document.getElementById("rtl-id").remove();
    };
  }, []);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      let tables = document.querySelectorAll(".table-responsive");
      for (let i = 0; i < tables.length; i++) {
        ps = new PerfectScrollbar(tables[i]);
      }
    }
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  const toggleSidebar = () => {
    document.documentElement.classList.toggle("nav-open");
    setsidebarOpened(!sidebarOpened);
  };

  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/rtl") {
        return <Route path={prop.path} element={prop.component} key={key} exact />;
      } else {
        return null;
      }
    });
  };

  const getBrandText = (path) => {
    for (let i = 0; i < routes.length; i++) {
      if (location.pathname.indexOf(routes[i].layout + routes[i].path) !== -1) {
        return routes[i].name;
      }
    }
    return "Static Analysis Framework";
  };

  return (
    <>
      <BackgroundColorContext.Consumer>
        {({ color, changeColor }) => (
          <React.Fragment>
            <div className="wrapper">
              <Sidebar
                routes={routes}
                rtlActive
                logo={{
                  outterLink: "https://www.creative-tim.com/",
                  text: "Static Analysis Framework",
                  imgSrc: logo,
                }}
                toggleSidebar={toggleSidebar}
              />
              <div className="main-panel" ref={mainPanelRef} data={color}>
                <RTLNavbar
                  brandText={getBrandText(location.pathname)}
                  toggleSidebar={toggleSidebar}
                  sidebarOpened={sidebarOpened}
                />
                <Routes>{getRoutes(routes)}</Routes>
                {location.pathname === "/admin/maps" ? null : <Footer fluid />}
              </div>
            </div>
            <FixedPlugin bgColor={color} handleBgClick={changeColor} />
          </React.Fragment>
        )}
      </BackgroundColorContext.Consumer>
    </>
  );
}

export default StaticAnalysis;
