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
import Chart from "react-apexcharts";
import axios from "axios";
import Moment from "moment";
import DatePicker from "react-datepicker";
import React, { useState, useEffect } from "react";
import TopCards from "./TopCards.js";

const SalesChart = () => {
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
        "http://103.183.74.242:8000/api/septemberDate?tanggal=" +
          Moment(filteredDate).format("YYYY-MM-DD")
      )
      .then((response) => {
        console.log(response.data);
        setSeptember(response.data == [] ? [] : response.data);
      });
  }

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
  return (
    <Card style={{ width: "76vw", marginRight: "1vw" }}>
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

      <CardBody>
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

      <CardBody>
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
      </CardBody>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Analysis of cases of the spread of the covid-19 virus on that day
        </ModalHeader>
        <ModalBody>
            
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
          Back to Menu
          </Button>
        </ModalFooter>
      </Modal>
    </Card>
  );
};

export default SalesChart;
