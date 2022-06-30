import { Button, CardTitle, Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  {
    title: "Main Menu",
    href: "/starter",
    icon: "bi bi-map",
  },

  {
    title: "North Surabaya Map",
    href: "/NorthSurabaya",
    icon: "bi bi-map",
  },
  
  {
    title: "District Information",
    href: "/cards",
    icon: "bi bi-card-text",
  },
  
  {
    title: "Table",
    href: "/table",
    icon: "bi bi-layout-split",
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },

  // {
  //   title: "Form-Update",
  //   href: "/editData/",
  //   icon: "bi bi-textarea-resize",
  // },
  // {
  //   title: "Breadcrumbs",
  //   href: "/breadcrumbs",
  //   icon: "bi bi-link",
  // },
  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },

  {
    title: "Line Chart Analysist",
    href: "/LineChart",
    icon: "bi bi-speedometer2",
  },

  // {
  //   title: "AddDemografiForm",
  //   href: "/AddForm",
  //   icon: "bi bi-textarea",
  // icon: "bi bi-speedometer2",

  // }
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <CardTitle tag="h6" className="border-bottom p-5 mb-0">
        <i 
        class="bi bi-calendar3-week-fill"
        ></i>  System Analysis
        </CardTitle>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2" color="#6f9ee8">
        <Nav vertical className="sidebarNav"
        >
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
              >
                <i className={navi.icon}></i>
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
          {/* <Button
            color="danger"
            tag="a"
            target="_blank"
            className="mt-3"
            href="https://www.wrappixel.com/templates/xtreme-react-redux-admin/?ref=33"
          >
            Upgrade To Pro
          </Button> */}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
