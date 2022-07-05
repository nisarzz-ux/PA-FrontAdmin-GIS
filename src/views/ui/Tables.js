import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Button,
  CardGroup,
} from "reactstrap";
import DatePicker from "react-datepicker";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import axios from "axios";
import Moment from "moment";
import Swal from "sweetalert2";
import { propTypes } from "react-bootstrap/esm/Image";
import { useNavigate, useParams } from "react-router-dom";
import FormUpdate from "./FormUpdate.js";

const Tables = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  const { id_Sep } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  function getData(filteredDate) {
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

  // const setData = (data) => {
  //   let {id_tableSep, demografi_id, positif, sembuh, mati, rawat, Tanggal} = data;
  //   localStorage.setItem('id_tableSep',id_tableSep);
  //   localStorage.setItem('demografi_id',demografi_id);
  //   localStorage.setItem('positif',positif);
  //   localStorage.setItem('sembuh',sembuh);
  //   localStorage.setItem('mati',mati);
  //   localStorage.setItem('rawat',rawat);
  //   localStorage.setItem('Tanggal',Tanggal);
  //   navigate("/editData")
  // }

  function deleteData(id) {
    console.log(id);
    Swal.fire({
      title: "Data Berhasil di hapus!",
      text: "Click the Button!",
      icon: "success",
      button: "back",
    });
    axios
      .delete("http://127.0.0.1:8000/api/septemberTabel/delete/" + id)
      .then((response) => {
        getData();
      });
  }

  function updateData(id) {
    navigate("/editData/" + id)
  }

  let districtFilter;
  let areaFilter;
  let temp;

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

    {
      dataField: "id_tableSep",
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <CardGroup>
            {console.log("id Tabel", row.id_tableSep)}
            <Button
              color="danger"
              className="mb-1 m-lg-1 w-15"
              onClick={() => deleteData(row.id_tableSep)}
            >
              <i class="bi bi-pen"></i>
              Hapus
            </Button>
            <Button
              color="success"
              className="mb-1 m-lg-1 w-15"
              onClick={() => updateData(row.id_tableSep)}
            >
              <i class="bi bi-cloud-download"></i>
              Update
              {/* <i class="bi bi-cloud-download"></i>
              <a href={"/#/editData/" + row.id_tableSep}
              style={{color:"white"}}>Update</a> */}
            </Button>
          </CardGroup>
        );
      },
    },
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
                getData(tanggal);
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
              keyField={"id_tableSep"}
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
