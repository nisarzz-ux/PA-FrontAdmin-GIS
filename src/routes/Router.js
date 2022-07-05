import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Map = lazy(() => import("../views/ui/Map"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const SurabayaNorthMap =  lazy(() => import("../views/ui/NorthSurabaya"));
const SurabayaSouthMap =  lazy(() => import("../views/ui/SouthSurabayaMap"));
const FormsUpdate = lazy(() => import("../views/ui/FormUpdate"));
const FaskesPage = lazy(() => import("../views/ui/FaskesPage"));


/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/starter" /> },
      { path: "/starter", exact: true, element: <Map /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: '/editData/:id', element: <FormsUpdate /> },
      { path: "/LineChart", exact:true, element: <Starter /> },
      { path: "/NorthSurabaya", exact: true, element: <SurabayaNorthMap /> },
      { path: "/SouthSurabaya", exact: true, element: <SurabayaSouthMap /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
      { path: "/FaskesPage", exact: true, element: <FaskesPage /> },
    ],
  },
];

export default ThemeRoutes;
