import React, { useState, useEffect } from "react";
import ProjectTables from "../../components/dashboard/ProjectTable";
import { Row, Col, Card, CardTitle, CardBody } from "reactstrap";
import DatePicker from "react-datepicker";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import Moment from "moment";

const Tables = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());

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

  let districtFilter;
  let areaFilter;

  const columns = [
    {
      dataField: "demografi.kecamatan",
      text: "District",
      filter: textFilter({
        getFilter: (filter) => {
          districtFilter = filter;
        },
      }),
      sort: true,
    },

    {
      dataField: "demografi.bagian_wilayah",
      text: "Area",
      filter: textFilter({
        getFilter: (filter) => {
          areaFilter = filter;
        },
      }),
      sort: true,
    },

    {
      dataField: "positif",
      text: "Positive",
      sort: true,
    },

    { dataField: "sembuh", text: "Cure", sort: true },
    { dataField: "mati", text: "Death", sort: true },
    { dataField: "rawat", text: "On Treatment ", sort: true },
  ];

  return (
    <Row>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-1*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">{/* <ProjectTables /> */}</Col>
      {/* --------------------------------------------------------------------------------*/}
      {/* table-2*/}
      {/* --------------------------------------------------------------------------------*/}
      <Col lg="12">
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-card-text me-2"> </i>
            Choice The Date
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
          <CardBody className="">
            <BootstrapTable
              hover
              keyField="id_tableSep"
              data={september}
              columns={columns}
              filter={filterFactory()}
              pagination={paginationFactory()}
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Tables;
