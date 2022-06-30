import {
  Card,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";


const Cards = () => {
  useEffect(() => {
    getDemografi();
  }, []);
  const [demografi, setDemografi] = useState([]);

  function getDemografi() {
    axios.get("http://127.0.0.1:8000/api/demografi").then((response) => {
      console.log(response.data);
      setDemografi(response.data);
    });
  }
  return (
    <div>
      <Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-1*/}
        {/* --------------------------------------------------------------------------------*/}
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-2*/}
        {/* --------------------------------------------------------------------------------*/}
        <Row>
          <h5 className="mb-3 mt-3">District of Demografy Table</h5>
          {demografi.map((row) =>
            row.penduduk_laki + row.penduduk_wanita < 70000 ? (
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.penduduk_laki} <br />
                    Women Population = {row.penduduk_wanita} <br />
                    Population Total = {row.penduduk_laki +
                      row.penduduk_wanita}{" "}
                    <br />
                    Area = {row.bagian_wilayah} <br />
                    <i class="bi bi-star-fill"
                    color="succsess"></i>Indication Risk is so low
                  </CardText>
                </Card>
              </Col>
            ) : (
              <Col md="6" lg="4">
                <Card body>
                  <CardTitle tag="h5">{row.kecamatan}</CardTitle>
                  <CardText>
                    Men Population = {row.penduduk_laki} <br />
                    Women Population = {row.penduduk_wanita} <br />
                    Population Total = {row.penduduk_laki +
                      row.penduduk_wanita}{" "}
                    <br />
                    Area = {row.bagian_wilayah} <br />
                    <i class="bi bi-radioactive"></i>Indication Risk is so High
                  </CardText>
                </Card>
              </Col>
            )
          )}
        </Row>
        {/* --------------------------------------------------------------------------------*/}
        {/* Card-2*/}
        {/* --------------------------------------------------------------------------------*/}
        {/* <Row>
        <h5 className="mb-3 mt-3">Colored Card</h5>
        <Col md="6" lg="3">
          <Card body color="primary" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="info" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="success" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="danger" inverse>
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-warning">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-info">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-success">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body color="light-danger">
            <CardTitle tag="h5">Special Title Treatment</CardTitle>
            <CardText>
              With supporting text below as a natural lead-in to additional
              content.
            </CardText>
            <div>
              <Button>Button</Button>
            </div>
          </Card>
        </Col>
      <Row>
        <h5 className="mb-3 mt-3">Card Group</h5>
        <Col>
          <CardGroup>
            <Card>
              <CardImg alt="Card image cap" src={bg1} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg2} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This card has supporting text below as a natural lead-in to
                  additional content.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
            <Card>
              <CardImg alt="Card image cap" src={bg3} top width="100%" />
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle className="mb-2 text-muted" tag="h6">
                  Card subtitle
                </CardSubtitle>
                <CardText>
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This card has even longer
                  content than the first to show that equal height action.
                </CardText>
                <Button>Button</Button>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row> */}
      </Row>
    </div>
  );
};

export default Cards;
