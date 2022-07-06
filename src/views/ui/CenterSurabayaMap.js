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
  Card,
  CardBody,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import "./File-Map/Map.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import Moment from "moment";
import L from "leaflet";
import { GoEye } from "react-icons/go";
import statesData from "./File-Map/JsonMap/28-tes.json";
import Bangunan from "./File-Map/JsonMap/bangunan.json";
import Pelabuhan from "./File-Map/JsonMap/Pelabuhan.json";
import Pemukiman from "./File-Map/JsonMap/Pemukiman.json";
import Chart from "react-apexcharts";
import "leaflet/dist/leaflet.css";
import LeafletRuler from "./File-Map/LeafletRuler";

const PopupExample = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [modal, setModal] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const toggle = () => setModal(!modal);

  // Custom Icon on React-Leaflet
  const customIcon = new L.Icon({
    iconUrl: require("./iconPlus.png").default,
    iconSize: new L.Point(30, 30),
  });

  const ripIcon = new L.Icon({
    iconUrl: require("./icons8-death-64.png").default,
    iconSize: new L.Point(30, 30),
  });

  //Show and Close Menu
  const [isShowNorthMap, setShowNorthMap] = React.useState(false);

  const handleClickNorthMap = (event) => {
    setShowNorthMap((current) => !current);
  };

  useEffect(() => {
    getDataSeptember();
  }, []);

  //Show and Close Menu
  const handleClick = (event) => {
    setIsShown((current) => !current);
  };

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
  }

  const selectOption = {
    0: "good",
    1: "Bad",
    2: "unknown",
  };

  // Using Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Show the Data of Positive Case
  const dataPositif = september.map((row) => {
    return row.positif;
  });

  function getColorCompare(temp) {
    // Green Color
    if (temp < 5) return "#05b534";
    else if (temp >= 5 && temp < 10) return "#eefa02";
    else if (temp >= 10 && temp < 30) return "#fad905";
    else if (temp >= 30) return "#faac05";
    
  }

  //Summary Data of Positive Case
  const resultPositif = dataPositif.reduce(
    (total, currentValue) => (total = total + currentValue),
    0
  );

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

  console.log("kecamatan",dataKecamatan)

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
              Welcome to Map of Northern Surabaya
            </CardTitle>
            <CardBody className="">
              <Breadcrumb>
                <BreadcrumbItem active>
                  <Button color="info" onClick={handleClickNorthMap}>
                    Where Is Probabilty About Potential Contact
                  </Button>
                </BreadcrumbItem>
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
          <MapContainer
            center={[-7.214467, 112.731291314]}
            zoom={13}
            scrollWheelZoom={true}
            whenCreated={setMap}
          >
            <TileLayer
              // url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=lpeLyfYWXTj0KWkD2Ig6"
              // attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

              attribution='&copy; <a href="https://www.openstreetmap.org/relation/8225862">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LeafletRuler />

            {september.length > 0 &&
              statesData.features.map((state, index) => {
                console.log(september[index].rawat);
                // console.log(index, september[index])
                const coordinatesAll = state.geometry.coordinates[0][0].map(
                  (item) => [item[1], item[0]]
                );

                return state.properties.Wilayah == "Pusat" ? (
                  <Polygon
                    pathOptions={{
                      fillColor: getColorCompare(september[index].rawat),
                      fillOpacity: 0.7,
                      weight: 2,
                      opacity: 1,
                      dashArray: 3,
                      color: "white",
                    }}
                    positions={coordinatesAll}
                  >
                    <Popup>
                      District Name     : {state.properties.KECAMATAN} <br />
                      On Treatment Case : {september[index].rawat} <br />
                      Death Case        : {september[index].mati}
                    </Popup>
                  </Polygon>
                ) : (
                  <div></div>
                );
              })}

            {statesData.features.map((state) => {
              const coordinates = state.geometry.coordinates[0][0].map(
                (item) => [item[1], item[0]]
              );
              return state.properties.Wilayah == "Pusat" ? (
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
                    Zone : {state.properties.AREA} Km / Square
                  </Popup>
                </Polygon>
              ) : (
                <div></div>
              );
            })}

            {isShowNorthMap &&
              Pemukiman.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "yellow",
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

            {isShowNorthMap &&
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

            {isShowNorthMap &&
              Pelabuhan.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "grey",
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

            {september.map((row) =>
              row.demografi.bagian_wilayah == "Surabaya Pusat" ? (
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
              ) : (
                <div></div>
              )
            )}

            {september.map((row) =>
              row.demografi.bagian_wilayah == "Surabaya Pusat" ? (
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
              ) : (
                <div></div>
              )
            )}
          </MapContainer>
        </Col>

        <Col>
          <Table striped style={{ height: "auto", width: "50vw" }}>
            <thead>
              <tr>
                <th>District Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody style={{ marginBottom: "auto" }}>
              {september.map((row) =>
                row.demografi.bagian_wilayah == "Surabaya Pusat" ? (
                  row.rawat < 5 ? (
                    <tr>
                      <td>{row.demografi.kecamatan}</td>
                      <td>This Area of Level 1 of PPKM</td>
                    </tr>
                  ) : row.rawat < 10 ? (
                    <tr>
                      <td>{row.demografi.kecamatan}</td>
                      <td>This Area of Level 2 of PPKM</td>
                    </tr>
                  ) : row.rawat < 30 ? (
                    <tr>
                      <td>{row.demografi.kecamatan}</td>
                      <td>This Area of Level 3 of PPKM</td>
                    </tr>
                  ) : (
                    <tr>
                      <td>{row.demografi.kecamatan}</td>
                      <td>This Area of Level 4 of PPKM</td>
                    </tr>
                  )
                ) : (
                  <div></div>
                )
              )}
            </tbody>
          </Table>
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
            Max positive cases : {Math.max(...dataPositif)} <br />
            Max cure cases : {Math.max(...dataSembuh)} <br />
            Max patients treated : {Math.max(...dataRawat)} <br />
            Max death cases : {Math.max(...dataMati)} <br />
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
