import { useState, useEffect } from "react";
import { Button, Nav, NavItem, NavbarBrand } from "reactstrap";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [navigations, setNavigations] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const isAdmin = userData.authorities.includes("ROLE_ADMIN");

    let nav = [
      {
        title: "My worklog",
        href: "/admin/my_worklog",
        icon: "bi bi-bar-chart-line",
      },
      {
        title: "Locations",
        href: "/admin/locations",
        icon: "bi bi-geo-alt-fill",
      },
      {
        title: "Tickets",
        href: "/admin/tickets",
        icon: "bi bi-files",
      },
    ];

    if (isAdmin) {
      nav.push(
        {
          title: "WorkLogs",
          href: "/admin/worklogs",
          icon: "bi bi-calendar-week",
        },
        {
          title: "Users",
          href: "/admin/users",
          icon: "bi bi-people-fill",
        }
      );
    }

    nav.push({
      title: "Settings",
      href: "/admin/settings",
      icon: "bi bi-gear-fill",
    });

    setNavigations(nav);
  }, []);

  const showMobileMenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };

  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <NavbarBrand href="/admin">FB Support</NavbarBrand>
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobileMenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigations.map((navi, index) => (
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
