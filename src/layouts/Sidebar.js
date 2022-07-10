import { Button, CardTitle, Nav, NavItem, ButtonDropdown, DropdownItem } from "reactstrap";
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
    title: "South Surabaya Map",
    href: "/SouthSurabaya",
    icon: "bi bi-map",
  },

  {
    title: "West Surabaya Map",
    href: "/WestSurabaya",
    icon: "bi bi-map",
  },

  {
    title: "East Surabaya Map",
    href: "/EastSurabaya",
    icon: "bi bi-map",
  },

  {
    title: "Center Surabaya Map",
    href: "/CenterSurabaya",
    icon: "bi bi-map",
  },

  {
    title: "District Information",
    href: "/cards",
    icon: "bi bi-card-text",
  },

  {
    title: "Spread Table",
    href: "/table",
    icon: "bi bi-table",
    
  },
  {
    title: "Forms",
    href: "/forms",
    icon: "bi bi-textarea-resize",
  },

  {
    title: "About",
    href: "/about",
    icon: "bi bi-people",
  },

 

  {
    title: "Health of Facility",
    href: "/FaskesPage",
    icon: "bi bi-textarea",
    icon: "bi bi-speedometer2",
  },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3" >
      <div className="d-flex align-items-center">
        <CardTitle tag="h6" className="border-bottom p-5 mb-0" color="#095ded">
          <i  class="bi bi-calendar3-week-fill" style={{width:"auto"}}>System Analysist</i> 
        </CardTitle>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={() => showMobilemenu()}
        ></Button>
      </div>
      <div className="pt-4 mt-2" style={{color:"#095ded"}}>
        <Nav vertical className="sidebarNav">
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
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
