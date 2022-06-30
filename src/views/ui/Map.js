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
} from "reactstrap";
import "./File-Map/Map.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import Moment from "moment";
import L from "leaflet";
import { GoEye } from "react-icons/go";

import statesData from "./File-Map/JsonMap/28-tes.json";
import Bangunan from "./File-Map/JsonMap/bangunan.json";
import Pemukiman from "./File-Map/JsonMap/Pemukiman.json";

import Chart from "react-apexcharts";
import "leaflet/dist/leaflet.css";
import LeafletRuler from "./File-Map/LeafletRuler";

const PopupExample = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [modal, setModal] = React.useState(false);

  //View Dropdown Menu
  const [dropdownOpen, setOpen] = React.useState(false);
  const toggleButton = () => setOpen(!dropdownOpen);

  // View Analyst Recap or Not
  const [isShown, setIsShown] = React.useState(false);

  // View Polygon or Not
  const [isPolygonShow, setPolygonShow] = React.useState(false);

  //View Polygon of Where Virus Spread
  const [isPolygonSpread, setPolygonShowSpread] = React.useState(false);

  //Show and Close Menu
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

  //Show and Close Menu
  const handleClickPolygon = (event) => {
    setPolygonShow((current) => !current);
  };

  //Show and Close Menu
  const handleClickPolygonSperead = (event) => {
    setPolygonShowSpread((current) => !current);
  };

  const toggle = () => setModal(!modal);
  // Custom Icon on React-Leaflet
  const customIcon = new L.Icon({
    iconUrl: require("./icons8-health-64.png").default,
    iconSize: new L.Point(25, 25),
  });

  const ripIcon = new L.Icon({
    iconUrl: require("./icons8-death-64.png").default,
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
        console.log(response.data);
        setSeptember(response.data == [] ? [] : response.data);
      });
  }

  function getColor(temp) {
    return temp == "Utara" ? (
      "#F38484"
    ) : temp == "Pusat" ? (
      "#D597F9"
    ) : temp == "Timur" ? (
      "#ACC715"
    ) : temp == "Selatan" ? (
      "#EC9949"
    ) : temp == "Barat" ? (
      "#4C51EF"
    ) : (
      <div></div>
    );

    // if (temp >= 1 && temp < 1000) return "#fae102";
    // else if (temp >= 1000 && temp < 3000) return "#D597F9";
    // else if (temp >= 3000 && temp < 5000) return "#59FD02";
    // else if (temp >= 5000 && temp < 7000) return "#faf602";
    // else if (temp >= 7000 && temp < 9000) return "#3080ff";
    // else return "#f0868d";
  }

  // Using Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

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

  // const allCoordinate => { statesData.features.map((state) => {
  //   return state.geometry.coordinates[0][0].map((item) => [item[1],item[0]])
  // })}
  const allCoordinate = statesData.features.map((state) => {
    return state.geometry.coordinates[0][0].map((item) => [item[1], item[0]]);
  });

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
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-link me-2"> </i>
              Basic Breadcrumbs
            </CardTitle>
            <CardBody className="">
              <Breadcrumb>
                <BreadcrumbItem active>Surabaya City Map</BreadcrumbItem>
              </Breadcrumb>
            </CardBody>
          </Card>
        </Col>
      </Row>

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
          <CardTitle
            tag="h6"
            className="border-bottom p-3 m-auto"
            style={{ marginTop: "10px" }}
          >
            {" "}
            Choice The Analysist
          </CardTitle>
          {/* <FormGroup>
            <Input type="select">
              <option>Choice item</option>
              <option onClick={handleClickPolygon} />
           </Input> 
          </FormGroup> */}
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
                Where Is Polygon zone of District on Surabaya ?
              </DropdownItem>
              <DropdownItem onClick={handleClickPolygonSperead}>
                {" "}
                Where is the Potential Place for the Covid-19 Virus to Spread in
                the City of Surabaya?
              </DropdownItem>
              <DropdownItem divider />
            </DropdownMenu>
          </ButtonDropdown>

          {isPolygonSpread && (
            <Table>
              <thead>
                <tr>
                  <th>Legend Name</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Bangunan</td>
                  <td>{Bangunan.features.length}</td>
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
            <TileLayer
              url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=lpeLyfYWXTj0KWkD2Ig6"
              attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

              // attribution='&copy; <a href="https://www.openstreetmap.org/relation/8225862">OpenStreetMap</a> contributors'
              // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LeafletRuler />

            {/* <GeoJSON
              data={statesData}
              style={{
                fillColor: getColor(resultPositif),
                fillOpacity: 0.5,
                weight: 2,
                opacity: 1,
                dashArray: 3,
              }}
            /> */}

            {isPolygonShow &&
              statesData.features.map((state) => {
                const coordinates = state.geometry.coordinates[0][0].map(
                  (item) => [item[1], item[0]]
                );

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

            {/* {statesData.features.map((state) => {
              const coordinates = state.geometry.coordinates[0][0].map(
                (item) => [item[1], item[0]]
              );

              return (
                <Polygon
                  pathOptions={{
                    fillColor: getColor(state.properties.WILAYAH),
                    fillOpacity: 0.7,
                    weight: 2,
                    opacity: 1,
                    dashArray: 3,
                    color: "white",
                  }}
                  positions={coordinates}
                >
                  <Popup>
                    District : {state.properties.LAYER_1}
                    <br />
                    Area : {state.properties.WILAYAH}
                    <br />
                    Zone : {state.properties.LUAS} Km / Square
                  </Popup>
                </Polygon>
              );
            })} */}

            {isPolygonSpread &&
              Pemukiman.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "Blue",
                      fillOpacity: 0.7,
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

            {/* {Bangunan.features.map((state) => {
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
            })} */}

            <Legend map={map} />

            {september.map((row) => (
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
                  Date Case : {row.Tanggal} <br />
                </Popup>
              </Marker>
            ))}

            {september.map((row) => (
              <Marker
                position={[
                  row.demografi.latKoordinat - 0.001,
                  row.demografi.longKoordinat + 0.001,
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

        {/* <Button
          color="warning"
          onClick={handleClickPolygon}
          style={{ width: "auto", marginTop: "2vw", marginLeft: "10px" }}
        >
          View Polygon District
        </Button> */}

        {isShown && (
          <Chart
            type="bar"
            height={700}
            options={chartoptions.options}
            series={chartoptions.series}
          ></Chart>
        )}

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
