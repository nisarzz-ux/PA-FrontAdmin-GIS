import { Circle, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Table,
  CardText,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import "./Map.css";
import DatePicker from "react-datepicker";
import axios from "axios";
import Moment from "moment";
import { GoEye } from "react-icons/go";

function PopupExample() {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const [modal, setModal] = React.useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    getDataSeptember();
  }, []);

  function getDataSeptember(filteredDate) {
    axios
      .get(
        "http://127.0.0.1:8000/api/septemberTabel?tanggal=" +
          Moment(filteredDate).format("YYYY-MM-DD")
      )
      .then((response) => {
        console.log(response.data);
        setSeptember(response.data == [] ? [] : response.data);
      });
  }

  // Using Modal
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  //Show the Data of Positive Case
  const dataPositif = september.map((row) => {
    return row.positif;
  });

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

  // Coloring The Circle
  const fillYellowOptions = { Color: "blue" };
  const fillRedOptions = { fillColor: "red" };
  const greenOptions = { color: "green", fillColor: "green" };

  return (
    // <div id="map">
    <Col lg="12">
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-card-text me-2"> </i>
        Choice The Date to Show The Covid-19 Spread Using GIS
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
      <MapContainer
        center={[-7.22369, 112.775]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=lpeLyfYWXTj0KWkD2Ig6"
          attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'

          // attribution='&copy; <a href="https://www.openstreetmap.org/relation/8225862">OpenStreetMap</a> contributors'
          // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {september.map((row) =>
          (row.positif >= 1000) & (row.positif <= 2000) ? (
            <Circle
              center={[row.demografi.latKoordinat, row.demografi.longKoordinat]}
              pathOptions={fillYellowOptions}
              radius={1000}
            >
              <Marker
                position={[
                  row.demografi.latKoordinat,
                  row.demografi.longKoordinat,
                ]}
              >
                <Popup>
                  {row.demografi.kecamatan} <br />
                  Area : {row.demografi.bagian_wilayah} <br />
                  Population :{" "}
                  {[
                    row.demografi.penduduk_laki + row.demografi.penduduk_wanita,
                  ]}{" "}
                  <br />
                  Positif Case : {row.positif} <br />
                  Cure Case : {row.sembuh} <br />
                  Death Case : {row.mati} <br />
                  <Button variant="success" size="sm" onClick={handleShow}>
                    <GoEye style={{ marginRight: "3px" }} />
                    Show The Analysis
                  </Button>
                </Popup>
              </Marker>
            </Circle>
          ) : (row.positif >= 500) & (row.positif < 1000) ? (
            <Circle
              center={[row.demografi.latKoordinat, row.demografi.longKoordinat]}
              pathOptions={greenOptions}
              radius={1000}
            >
              <Marker
                position={[
                  row.demografi.latKoordinat,
                  row.demografi.longKoordinat,
                ]}
              >
                <Popup>
                  {row.demografi.kecamatan} <br />
                  Area : {row.demografi.bagian_wilayah} <br />
                  Population :{" "}
                  {[
                    row.demografi.penduduk_laki + row.demografi.penduduk_wanita,
                  ]}{" "}
                  <br />
                  Positif Case : {row.positif} <br />
                  Cure Case : {row.sembuh} <br />
                  Death Case : {row.mati} <br />
                  <Button variant="success" size="sm" onClick={handleShow}>
                    <GoEye style={{ marginRight: "3px" }} />
                    Show The Analysis
                  </Button>
                </Popup>
              </Marker>
            </Circle>
          ) : (
            <Circle
              center={[row.demografi.latKoordinat, row.demografi.longKoordinat]}
              pathOptions={fillRedOptions}
              radius={1000}
            >
              <Marker
                position={[
                  row.demografi.latKoordinat,
                  row.demografi.longKoordinat,
                ]}
              >
                <Popup>
                  {row.demografi.kecamatan} <br />
                  Area : {row.demografi.bagian_wilayah} <br />
                  Population :{" "}
                  {[
                    row.demografi.penduduk_laki + row.demografi.penduduk_wanita,
                  ]}{" "}
                  <br />
                  Positif Case : {row.positif} <br />
                  Cure Case : {row.sembuh} <br />
                  Death Case : {row.mati} <br />
                  <Button variant="success" size="sm" onClick={handleShow}>
                    <GoEye style={{ marginRight: "3px" }} />
                    Show The Analysis
                  </Button>
                </Popup>
              </Marker>
            </Circle>
          )
        )}
      </MapContainer>

      <Button color="success" onClick={toggle}>
        View Analysis
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Analysis of cases of the spread of the covid-19 virus on that day
        </ModalHeader>
        <ModalBody>
          Analysis of the distribution of Covid-19 virus cases today found that
          for the highest number of cases from sub-districts in the city of
          Surabaya, for positive cases a number of {maxPositif}, then for cure
          cases a number of {maxSembuh}, while the number of patients being
          treated was {maxRawat}, while for cases number of patients who died
          was {maxMati} <br />
          Details for the total number of cases , the total number of positive
          cases is {resultPositif} , while the number of those treated is{" "}
          {resultRawat} , for those cure are {resultSembuh} , while the total
          who died are {resultMati}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Back to Menu
          </Button>
        </ModalFooter>
      </Modal>
    </Col>
  );
}
export default PopupExample;
