import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import React, { useState, useEffect } from "react";
import Legend from "./Legend";
import {
  Col,
  CardTitle,
  Table,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Row,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardSubtitle,
} from "reactstrap";

import "./File-Map/Map.css";
import Chart from "react-apexcharts";
import "leaflet/dist/leaflet.css";
import LeafletRuler from "./File-Map/LeafletRuler";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import TopCards from "../../components/dashboard/TopCards";


import axios from "axios";
import Moment from "moment";
import L from "leaflet";

import statesData from "./File-Map/JsonMap/28-tes.json";
import Bangunan from "./File-Map/JsonMap/bangunan.json";
import Pemukiman from "./File-Map/JsonMap/Pemukiman.json";

const PopupExample = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [modal, setModal] = React.useState(false);
  const navigate = useNavigate();

  //View Dropdown Menu
  const [dropdownOpen, setOpen] = React.useState(false);
  const toggleButton = () => setOpen(!dropdownOpen);

  //View Dropdown Map
  const [dropdownOpenMap, setOpenMap] = React.useState(false);
  const toggleButtonMap = () => setOpenMap(!dropdownOpenMap);

  // View Analyst Recap or Not
  const [isShown, setIsShown] = React.useState(false);

  // View Polygon or Not
  const [isPolygonShow, setPolygonShow] = React.useState(false);

  //View Polygon of Where Virus Spread
  const [isPolygonSpread, setPolygonShowSpread] = React.useState(false);

  //View Marker of Clasification Class
  const [isMarker, setMarker] = React.useState(false);

  //View Using Satelite Map
  const [isSateliteMap, setSateliteMap] = React.useState(false);

  // View Using EPSG Map
  const [isEPSGMap, setEPSGMap] = React.useState(false);

  //Show and Close Menu
  const handleSateliteMap = (event) => {
    setSateliteMap((current) => !current);
  };

  const handleEPSGMap = (event) => {
    setEPSGMap((current) => !current);
  };

  //Show and Close Menu
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //Show and Close Menu
  const handleClickPolygon = (event) => {
    setPolygonShow((current) => !current);
  };

  //Show and Close Menu
  const handleClickMarker = (event) => {
    setMarker((current) => !current);
  };

  const handleClickPolygonSperead = (event) => {
    setPolygonShowSpread((current) => !current);
  };

  const toggle = () => setModal(!modal);
  // Custom Icon on React-Leaflet
  const customIcon = new L.Icon({
    iconUrl: require("./iconPlus.png").default,
    iconSize: new L.Point(25, 25),
  });

  const ripIcon = new L.Icon({
    iconUrl: require("./icons8-death-64.png").default,
    iconSize: new L.Point(20, 20),
  });

  const positifIcon = new L.Icon({
    iconUrl: require("./redCircle.png").default,
    iconSize: new L.Point(25, 25),
  });

  const deathIcon = new L.Icon({
    iconUrl: require("./yellowCircle.png").default,
    iconSize: new L.Point(20, 20),
  });

  useEffect(() => {
    getDataSeptember();
  }, []);

  function getDataSeptember(filteredDate) {
    axios
      .get(
        "http://127.0.0.1:8000/api/septemberDate?tanggal=" +
          Moment(filteredDate).format("YYYY-MM-DD")
      )
      .then((response) => {
        setSeptember(response.data == [] ? [] : response.data);
      });
  }

  function getColorLurah(temp) {
    return temp === "Surabaya Utara" ? (
      "#F38484"
    ) : temp === "Surabaya Pusat" ? (
      "#D597F9"
    ) : temp === "Surabaya Timur" ? (
      "#ACC715"
    ) : temp === "Surabaya Selatan" ? (
      "#EC9949"
    ) : temp === "Surabaya Barat" ? (
      "#4C51EF"
    ) : (
      <div></div>
    );
  }
  //Clasification About Area
  function getColor(temp) {
    return temp === "Utara" ? (
      "#F38484"
    ) : temp === "Pusat" ? (
      "#D597F9"
    ) : temp === "Timur" ? (
      "#ACC715"
    ) : temp === "Selatan" ? (
      "#EC9949"
    ) : temp === "Barat" ? (
      "#4C51EF"
    ) : (
      <div></div>
    );
  }

  function getColorCompare(temp) {
    // PPKM Level 1 (Green)
    if (temp < 1) return "#05b534";
    // PPKM Level 2 (Yellow)
    else if (temp <= 1) return "#eefa02";
    // PPKM Level 3 (Orange)
    else if (temp >= 2 && temp < 5) return "#fad905";
    // PPKM Level 4 (Red)
    else if (temp >= 5) return "#fa0202";
  }

  //Show the Data of Positive Case
  const dataPositif = september.map((row) => {
    return row.positif;
  });

  const arrayNumber = dataPositif.map(Number);
  console.log("Kumpulan Angka", arrayNumber);

  //Summary Data of Positive Case
  const resultPositif = dataPositif.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

  let jumlahBangunan = Bangunan.features.length;
  console.log("Jumlah Bangunan :", jumlahBangunan);

  const temp = parseInt(resultPositif);

  // Find the Max Positive Case
  const maxPositif = Math.max(...dataPositif);

  //Show the Cure Case
  const dataSembuh = september.map((row) => {
    return row.sembuh;
  });

  //Summary the Cure case
  const resultSembuh = dataSembuh.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

  // Find the Max Cure Case
  const maxSembuh = Math.max(...dataSembuh);

  // Show the care case of this day
  const dataRawat = september.map((row) => {
    return row.rawat;
  });

  // Summary the care case
  const resultRawat = dataRawat.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

  // Find the Max On Care Case
  const maxRawat = Math.max(...dataRawat);

  // Show the Deathly case of this day
  const dataMati = september.map((row) => {
    return row.mati;
  });

  // Summary the Deathly case
  const resultMati = dataMati.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

  // Find the Max deathly Case
  const maxMati = Math.max(...dataMati);

  const dataKecamatan = september.map((row) => {
    return row.demografi.kecamatan;
  });

  const chartoptionsGraphics = {
    series: [
      {
        name: "Positif",
        data: dataPositif,
      },
      {
        name: "Sembuh",
        data: dataSembuh,
      },
      {
        name: "Rawat",
        data: dataRawat,
      },
      {
        name: "Mati",
        data: dataMati,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      grid: {
        strokeDashArray: 3,
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        categories: dataKecamatan,
      },
    },
  };

  const chartoptions = {
    series: [
      {
        name: "Positive Case",
        data: dataPositif,
      },
      {
        name: "Death Case",
        data: dataMati,
      },
      {
        name: "Cure Case",
        data: dataSembuh,
      },
      {
        name: "On Treatment",
        data: dataRawat,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: "auto",
      },
      plotOptions: {
        bar: {
          horizontal: true,
          dataLabels: { position: "top" },
        },
      },
      dataLabels: {
        enabled: false,
        offsetX: -6,
        style: {
          fontSize: "12px",
          colors: ["#fff"],
        },
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["#0c0c0d"],
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        categories: dataKecamatan,
      },
    },
  };

  const [map, setMap] = useState(null);
  return (
    <div>
      <Row style={{ margin: "auto" }}>
        <CardTitle
          tag="h6"
          className="border-bottom p-3 mb-0"
          style={{ marginTop: "10px" }}
        >
          <i className="bi bi-card-text me-2"> </i>
          Choice The Date to Show The Covid-19 Spread Using GIS Analysist
          <DatePicker
            selected={date}
            onChange={(tanggal) => {
              getDataSeptember(tanggal);
              setDate(tanggal);
            }}
            dateFormat="dd-MMM-yyyy"
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
        </CardTitle>
      </Row>

      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-link me-2"> </i>
              Welcome To Surabaya Map
            </CardTitle>
            <CardBody className="">
              <Row>
                <Col sm="6" lg="3">
                  <TopCards
                    bg="bg-light-success text-success"
                    subtitle="Positive Case Virus"
                    earning={resultPositif}
                    icon="bi bi-binoculars"
                  />
                </Col>

                <Col sm="6" lg="3">
                  <TopCards
                    bg="bg-light-danger text-danger"
                    subtitle="On Care Case"
                    earning={resultRawat}
                    icon="bi bi-hospital"
                  />
                </Col>

                <Col sm="6" lg="3">
                  <TopCards
                    bg="bg-light-info text-into"
                    subtitle="Deathly Case"
                    earning={resultMati}
                    icon="bi bi-bandaid-fill"
                  />
                </Col>

                <Col sm="6" lg="3">
                  <TopCards
                    bg="bg-light-warning text-warning"
                    subtitle="Cure Case Of The Day"
                    earning={resultSembuh}
                    icon="bi bi-heart-fill"
                  />
                </Col>
              </Row>
              <CardTitle tag="h5">Virus Recap</CardTitle>
              <CardSubtitle className="text-muted" tag="h6">
                Virus Recap Of The Month
              </CardSubtitle>
              <Chart
                type="area"
                width="100%"
                height="390"
                options={chartoptionsGraphics.options}
                series={chartoptionsGraphics.series}
              ></Chart>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <CardBody>
          <CardTitle
            tag="h6"
            className="border-bottom p-3 m-auto"
            style={{ marginTop: "10px" }}
          >
            {" "}
            Choice The Using Map
            <ButtonDropdown
              isOpen={dropdownOpenMap}
              toggle={toggleButtonMap}
              style={{ marginTop: "auto", height: "auto", display: "block" }}
            >
              <DropdownToggle caret color="primary">
                <i class="bi bi-pin-map"></i> Option Menu
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem onClick={handleSateliteMap}>
                  OpenStreetMap
                </DropdownItem>
                <DropdownItem onClick={handleEPSGMap}>EPSG Map</DropdownItem>
              </DropdownMenu>
            </ButtonDropdown>
          </CardTitle>
        </CardBody>
      </Row>
      <Row>
        <Col>
          <CardTitle
            tag="h6"
            className="border-bottom p-3 m-auto"
            style={{ marginTop: "10px" }}
          >
            {" "}
            Choice The Analysist
          </CardTitle>

          <ButtonDropdown
            isOpen={dropdownOpen}
            toggle={toggleButton}
            style={{ marginTop: "10px", height: "auto" }}
          >
            <DropdownToggle caret color="info">
              <i class="bi bi-activity"></i> Item Analysist This map
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={handleClickPolygon}>
                Can Show this District By Area ?
              </DropdownItem>
              <DropdownItem onClick={handleClickMarker}>
                AnyWhere Show The Spread Marker ?
              </DropdownItem>
              <DropdownItem onClick={handleClickPolygonSperead}>
                {" "}
                Where is the Potential Place for the Covid-19 Virus to Spread in
                the City of Surabaya?
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem href="/#/FaskesPage">
                Where Is Facilty on Surabaya ?
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>

          {isPolygonSpread && (
            <Table>
              <thead>
                <tr>
                  <th>Element Map Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bangunan</td>
                  <td>{Bangunan.features.length}</td>
                </tr>
                <tr>
                  <td>Pemukiman</td>
                  <td>{Pemukiman.features.length}</td>
                </tr>
              </tbody>
            </Table>
          )}
        </Col>

        <Col>
          <MapContainer
            center={[-7.253477219308051, 112.7174872482906]}
            zoom={12}
            scrollWheelZoom={true}
            whenCreated={setMap}
          >
            {isSateliteMap && (
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/relation/8225862">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

            {isEPSGMap && (
              <TileLayer
                url="https://api.maptiler.com/maps/jp-mierune-dark/{z}/{x}/{y}.png?key=JyzTa0CeXIgtKP7LpPnB"
                attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
              />
            )}

            <TileLayer
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              maxZoom={20}
              subdomains={["mt1", "mt2", "mt3"]}
            />

            <LeafletRuler />

            {
              statesData.features.map((state) => {
                const coordinates = state.geometry.coordinates[0][0].map(
                  (item) => [item[1], item[0]]
                );
                console.log(coordinates);
                return (
                  <Polygon
                    pathOptions={{
                      fillColor: getColor(state.properties.Wilayah),
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      dashArray: 3,
                      color: "white",
                    }}
                    positions={coordinates}
                  >
                    <Popup>
                      District : {state.properties.KECAMATAN}
                      <br />
                      Area : {state.properties.Wilayah}
                      <br />
                      Zone : {state.properties.PERIMETER} Km / Square
                    </Popup>
                  </Polygon>
                );
              })}

            {
              september.length > 0 &&
              statesData.features.map((state, index) => {
                const coordinatesAll = state.geometry.coordinates[0][0].map(
                  (item) => [item[1], item[0]]
                );
                return (
                  <Polygon
                    pathOptions={{
                      fillColor: getColorCompare(september[index].mati),
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      dashArray: 3,
                      color: "white",
                    }}
                    positions={coordinatesAll}
                  >
                    {september[index].mati < 1 ? (
                      <Popup>
                        District Name : {state.properties.KECAMATAN} <br />
                        Status Level : PPKM level 1
                      </Popup>
                    ) : september[index].mati === 1 ? (
                      <Popup>
                        District Name : {state.properties.KECAMATAN} <br />
                        Status Level : PPKM level 2
                      </Popup>
                    ) : september[index].mati < 5 ? (
                      <Popup>
                        District Name : {state.properties.KECAMATAN} <br />
                        Status Level : PPKM level 3
                      </Popup>
                    ) : (
                      <Popup>
                        District Name : {state.properties.KECAMATAN} <br />
                        Status Level : PPKM level 4
                      </Popup>
                    )}
                  </Polygon>
                );
              })}

            {isPolygonSpread &&
              Pemukiman.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "#e3eb05",
                      fillOpacity: 1.5,
                      weight: 2,
                      opacity: 20,
                      dashArray: 3,
                    }}
                    positions={titik}
                  >
                    <Popup>Build Name : {state.properties.REMARK}</Popup>
                  </Polygon>
                );
              })}

            {isPolygonSpread &&
              Bangunan.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "Red",
                      fillOpacity: 3,
                      weight: 2,
                      opacity: 12,
                      dashArray: 3,
                    }}
                    positions={titik}
                  >
                    <Popup>Build Name : {state.properties.REMARK}</Popup>
                  </Polygon>
                );
              })}

            <Legend map={map} />

            {isMarker &&
              september.map((row) => (
                <div>
                  <Marker
                    position={[
                      row.demografi.latKoordinat,
                      row.demografi.longKoordinat,
                    ]}
                    icon={customIcon}
                  >
                    <Popup>
                      {row.demografi.kecamatan} <br />
                      Area : {row.demografi.bagian_wilayah} <br />
                      Positif Case : {row.positif} <br />
                      On Treatment : {row.rawat} <br />
                      Date Case : {row.Tanggal} <br />
                    </Popup>
                  </Marker>
                  <Marker
                    position={[
                      row.demografi.latKoordinat - 0.01,
                      row.demografi.longKoordinat + 0.01,
                    ]}
                    icon={ripIcon}
                  >
                    <Popup>
                      {row.demografi.kecamatan} <br />
                      Area : {row.demografi.bagian_wilayah} <br />
                      Death Case : {row.mati} <br />
                      Date Case : {row.Tanggal} <br />
                    </Popup>
                  </Marker>
                </div>
              ))}
          </MapContainer>
        </Col>
      </Row>
      <Row>
        <Button
          color="success"
          onClick={toggle}
          style={{ width: "auto", marginTop: "2vw" }}
        >
          View Modal Analysis
        </Button>
        <Button
          color="warning"
          onClick={handleClick}
          style={{ width: "auto", marginTop: "2vw", marginLeft: "10px" }}
        >
          View Analysis Recap
        </Button>

        {isShown &&
          (september.length > 0 ? (
            <Chart
              type="bar"
              height={700}
              options={chartoptions.options}
              series={chartoptions.series}
            ></Chart>
          ) : (
            Swal.fire({
              title: "This data doesnt input , please repeat again",
              text: "Click the Button!",
              icon: "error",
              footer: '<a href="/">Back to Menu</a>',
            })
          ))}

        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Analysis of cases of the spread of the covid-19 virus on that day
          </ModalHeader>
          <ModalBody>
            Analysis of the distribution of Covid-19 virus cases today found
            that for the highest number of cases from sub-districts in the city
            of Surabaya : <br />
            <br />
            Max positive cases : {maxPositif} <br />
            Max cure cases : {maxSembuh} <br />
            Max patients treated : {maxRawat} <br />
            Max death cases : {maxMati} <br />
            <br />
            Details for the total number of cases : <br />
            Positive cases : {resultPositif} <br />
            Cure cases : {resultSembuh} <br />
            Patients treated : {resultRawat} <br />
            Death cases : {resultMati} <br />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={toggle}>
              Back to Menu
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
    </div>
  );
};
export default PopupExample;
