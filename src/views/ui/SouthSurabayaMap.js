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
  DropdownItem,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
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
import Swal from "sweetalert2";

const PopupExample = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [modal, setModal] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const [dropdownOpen, setOpen] = React.useState(false);
  const toggleButton = () => setOpen(!dropdownOpen);

  // View Polygon or Not
  const [isPolygonShow, setPolygonShow] = React.useState(false);
  //View Polygon of Where Virus Spread
  const [isPolygonSpread, setPolygonShowSpread] = React.useState(false);
  const toggle = () => setModal(!modal);

  //Show and Close Menu
  const handleClickPolygon = (event) => {
    setPolygonShow((current) => !current);
  };

  //Show and Close Menu
  const handleClickPolygonSperead = (event) => {
    setPolygonShowSpread((current) => !current);
  };

  // Custom Icon on React-Leaflet
  const customIcon = new L.Icon({
    iconUrl: require("./iconPlus.png").default,
    iconSize: new L.Point(15, 15),
  });

  const ripIcon = new L.Icon({
    iconUrl: require("./icons8-death-64.png").default,
    iconSize: new L.Point(15, 15),
  });

  //Show and Close Menu
  const [isShowSouthMap, setShowSouthMap] = React.useState(false);

  const handleClickSouthMap = (event) => {
    setShowSouthMap((current) => !current);
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
        Swal.fire("Hello ", "Welcome to The South Surabaya Map", "success");

      });
  }

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
    if (temp < 5) return "#05b534";
    // PPKM Level 2 (Yellow)
    else if (temp >= 5 && temp < 10) return "#eefa02";
    // PPKM Level 3 (Orange)
    else if (temp >= 10 && temp < 30) return "#fad905";
    // PPKM Level 4 (Red)
    else if (temp >= 30) return "#fa0202";
  }

  // Using Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Show the Data of Positive Case
  const dataPositif = september.map((row) => {
    return row.positif;
  });

  console.log(dataPositif);

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
              Surabaya South Map Analysist
            </CardTitle>
            <CardBody className="">
              <Breadcrumb>
                <ButtonDropdown
                  isOpen={dropdownOpen}
                  toggle={toggleButton}
                  style={{ marginTop: "10px", height: "auto" }}
                >
                  <DropdownToggle caret color="info">
                    <i class="bi bi-activity"></i> Item Analysist This map
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={handleClickSouthMap}>
                      Where Is Polygon zone of District on Surabaya ?
                    </DropdownItem>
                    <DropdownItem onClick={handleClickPolygonSperead}>
                      {" "}
                      Where is the Potential Place for the Covid-19 Virus to
                      Spread in the City of Surabaya?
                    </DropdownItem>
                    <DropdownItem divider />
                  </DropdownMenu>
                </ButtonDropdown>
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
            center={[-7.3490169, 112.6476075]}
            zoom={12}
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

            {isShowSouthMap &&
              september.length > 0 &&
              statesData.features.map((state, index) => {
                console.log(september[index].rawat);
                // console.log(index, september[index])
                const coordinatesAll = state.geometry.coordinates[0][0].map(
                  (item) => [item[1], item[0]]
                );

                return state.properties.Wilayah == "Selatan" ? (
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
                      District Name : {state.properties.KECAMATAN} <br />
                      On Treatment  : {september[index].rawat}
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

              return state.properties.Wilayah == "Selatan" ? (
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

            {isPolygonSpread &&
              Pemukiman.features.map((state) => {
                const titik = state.geometry.coordinates[0][0].map((item) => [
                  item[1],
                  item[0],
                ]);
                return (
                  <Polygon
                    pathOptions={{
                      color: "green",
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

            {september.map((row) =>
              row.demografi.bagian_wilayah == "Surabaya Selatan" ? (
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
              row.demografi.bagian_wilayah == "Surabaya Selatan" ? (
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
      </Row>
      <Row>
        {/* <Button
          color="success"
          onClick={toggle}
          style={{ width: "auto", marginTop: "2vw" }}
        >
          View Modal Analysis
        </Button> */}
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
