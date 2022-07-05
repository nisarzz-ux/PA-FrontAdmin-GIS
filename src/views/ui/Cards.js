import { Card, CardText, CardTitle, Row, Col } from "reactstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import Moment from "moment";


const Cards = () => {
  const [september, setSeptember] = useState([]);
  const [date, setDate] = React.useState(new Date());
  
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
  return (
    <div>
      <Row>
        <Row>
          <h5 className="mb-3 mt-3">District of Demografy Table</h5>
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

          {september.map((row) =>
            // PPKM Level 1 
            row.mati < 1 || row.rawat < 5 ? (
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.demografi.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.demografi.penduduk_laki} <br />
                    Women Population = {row.demografi.penduduk_wanita} <br />
                    Population Total = {row.demografi.penduduk_laki +
                      row.demografi.penduduk_wanita}{" "}
                    <br />
                    Area = {row.demografi.bagian_wilayah} <br />
                    Death Case = {row.mati} <br />
                    Cure case = {row.rawat} <br />
                    <i class="bi bi-star-fill" color="succsess"></i>
                    PPKM Level 1
                  </CardText>
                </Card>
              </Col>
            ) :  
            //PPKM Level 2 
            row.mati < 2 || row.rawat < 10 ?(
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.demografi.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.demografi.penduduk_laki} <br />
                    Women Population = {row.demografi.penduduk_wanita} <br />
                    Population Total = {row.demografi.penduduk_laki +
                      row.demografi.penduduk_wanita}{" "}
                    <br />
                    Area = {row.demografi.bagian_wilayah} <br />
                    Death Case = {row.mati} <br />
                    Cure case = {row.rawat} <br />
                    <i class="bi bi-radioactive"></i>
                    PPKM Level 2
                  </CardText>
                </Card>
              </Col>
            ) : row.mati < 5 || row.rawat <30 ?(
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.demografi.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.demografi.penduduk_laki} <br />
                    Women Population = {row.demografi.penduduk_wanita} <br />
                    Population Total = {row.demografi.penduduk_laki +
                      row.demografi.penduduk_wanita}{" "}
                    <br />
                    Area = {row.demografi.bagian_wilayah} <br />
                    Death Case = {row.mati} <br />
                    Cure case = {row.rawat} <br />
                    <i class="bi bi-radioactive"></i>
                    PPKM Level 3
                  </CardText>
                </Card>
              </Col>
            ) : row.mati > 5 || row.rawat > 30 ?(
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.demografi.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.demografi.penduduk_laki} <br />
                    Women Population = {row.demografi.penduduk_wanita} <br />
                    Population Total = {row.demografi.penduduk_laki +
                      row.demografi.penduduk_wanita}{" "}
                    <br />
                    Area = {row.demografi.bagian_wilayah} <br />
                    Death Case = {row.mati} <br />
                    Cure case = {row.rawat} <br />
                    <i class="bi bi-radioactive"></i>
                    PPKM Level 4 
                  </CardText>
                </Card>
              </Col>
            ) : (
              <div></div>
            )

          )}
        </Row>
      </Row>
    </div>
  );
};

export default Cards;
