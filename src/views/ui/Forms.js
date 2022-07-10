import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Forms = () => {
  const [demografi_id, setDemografiId] = React.useState();
  const [positif, setPositif] = React.useState();
  const [sembuh, setSembuh] = React.useState();
  const [mati, setMati] = React.useState();
  const [rawat, setRawat] = React.useState();
  const [Tanggal, setTanggal] = useState(new Date());
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const TabelCovid = {
    demografi_id,
    positif,
    sembuh,
    mati,
    rawat,
    Tanggal,
  };

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://127.0.0.1:8000/api/demografi").then((response) => {
      setData(response.data);
      console.log(response.data);
    });
  }

  function submit(e) {
    e.preventDefault();
    console.log(TabelCovid);
    axios
      .post("http://127.0.0.1:8000/api/septemberTabel/input", TabelCovid)
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Data Berhasil di masukan!",
          text: "Click the Button!",
          icon: "success",
          button: "back",
          // timer: 10000
        });
        navigate("/forms")
        // window.setTimeout(function(){},10000);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          title: "This data doesnt input , please repeat again",
          text: "Click the Button!",
          icon: "error",
          button: "back",
        });
        window.location.reload();
      });
  }

  return (
    <Row>
      <CardTitle tag="h6" className="border-bottom p-3 mb-0">
        <i className="bi bi-textarea">Add Data</i>
      </CardTitle>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Data</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <AddFormDemografi />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal> */}

      <Col>
        <Card>
          <CardTitle tag="h6" className="border-bottom p-3 mb-0">
            <i className="bi bi-bell me-2"></i>
            Form Input Data of Covid-19 Spread
          </CardTitle>
          <CardBody>
            <Form>
              <FormGroup>
                <Label>Input Positive Case</Label>
                <Input
                  onChange={(e) => setDemografiId(e.target.value)}
                  type="select"
                >
                  <option>Choice Distric Area</option>
                  {data.map((row) => (
                    <option value={row.id_wilayah}>{row.kecamatan}</option>
                  ))}
                </Input>
              </FormGroup>
              <FormGroup>
                <Label>Input Positif Case Summary of covid-19 virus</Label>
                <Input
                  type="text"
                  placeholder="input here"
                  onChange={(e) => setPositif(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Input death Case Summary of covid-19 virus</Label>
                <Input
                  type="text"
                  placeholder="input here"
                  onChange={(e) => setMati(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Input On Treatment Case Summary of covid-19 virus</Label>
                <Input
                  type="text"
                  placeholder="input here"
                  onChange={(e) => setRawat(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Input Cure Case Summary of covid-19 virus</Label>
                <Input
                  type="text"
                  placeholder="input here"
                  onChange={(e) => setSembuh(e.target.value)}
                />
              </FormGroup>

              <FormGroup>
                <Label>Input Date</Label>
                <DatePicker
                  selected={Tanggal}
                  onChange={(tanggal) => setTanggal(tanggal)}
                  dateFormat="dd-MM-yyyy"
                  peekNextMonth
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </FormGroup>

              <Button
                color="success"
                size="sg"
                style={{ width: "10vw" }}
                onClick={submit}
              >
                Submit Data
              </Button>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Forms;
