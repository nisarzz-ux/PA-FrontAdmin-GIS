import { Card, CardText, CardTitle, Row, Col, CardBody } from "reactstrap";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, Polygon } from "react-leaflet";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import L from "leaflet";


const Cards = () => {
  useEffect(() => {
    getFaskes();
  }, []);

  const [faskes, setFaskes] = useState([]);

  function getFaskes() {
    axios
      .get("http://127.0.0.1:8000/api/faskesTabelAllData")
      .then((response) => {
        console.log(response.data);
        setFaskes(response.data);
      });
  }

  const customIcon = new L.Icon({
    iconUrl: require("./iconPlus.png").default,
    iconSize: new L.Point(30, 30),
  });

  let districtFilter;
  let areaFilter;

  const columns = [
    {
      dataField: "nama_faskes",
      text: "Kecamatan",
      filter: textFilter({
        getFilter: (filter) => {
          districtFilter = filter;
        },
      }),
      sort: true,
    },
    {
      dataField: "jenis_faskes",
      text: "Facility Type",
      sort: true,
    },
    {
      dataField: "alamat",
      text: "Facility Type",
      sort: true,
    },
  ];
  const [map, setMap] = useState(null);

  return (
    <div>
      <Row>
        <Row>
          <Card>
            <CardBody>
              <CardTitle tag="h4" style={{ fontFamily: "monospace" }}>
                FaskesMap
              </CardTitle>
            </CardBody>
          </Card>
        </Row>
        {/* <Row>
          <Card>
            <CardBody>
              <MapContainer
                center={[-7.2754438, 112.6426424]}
                zoom={12}
                scrollWheelZoom={true}
                whenCreated={setMap}
              >
                <TileLayer
                  url="https://api.maptiler.com/maps/bright/256/{z}/{x}/{y}.png?key=lpeLyfYWXTj0KWkD2Ig6"
                  attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
                >
                  {faskes.map((row) => (
                    <Marker
                      position={[
                        row.latKoordinat,
                        row.longKoordinat,
                      ]}
                      icon={customIcon}
                    >
                    </Marker>
                  ))}
                </TileLayer>
              </MapContainer>
            </CardBody>
          </Card>
        </Row> */}
        <Row>
          <BootstrapTable
            hover
            keyField={"id_faskes"}
            data={faskes}
            columns={columns}
            filter={filterFactory()}
            pagination={paginationFactory()}
          />
        </Row>
      </Row>
    </div>
  );
};

export default Cards;
