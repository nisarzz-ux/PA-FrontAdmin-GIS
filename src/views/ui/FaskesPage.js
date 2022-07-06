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
import axios from "axios";
import L from "leaflet";
import statesData from "./File-Map/JsonMap/28-tes.json";
import Bangunan from "./File-Map/JsonMap/bangunan.json";
import Pemukiman from "./File-Map/JsonMap/Pemukiman.json";
import Chart from "react-apexcharts";
import "leaflet/dist/leaflet.css";
import LeafletRuler from "./File-Map/LeafletRuler";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";

const PopupExample = () => {
  const [faskes, setFaskes] = useState([]);
  const [modal, setModal] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);
  const toggle = () => setModal(!modal);

  // Custom Icon on React-Leaflet
  const iconSurabayaUtara = new L.Icon({
    iconUrl: require("./Surabaya-Utara.png").default,
    iconSize: new L.Point(30, 30),
  });

  const iconSurabayaSelatan = new L.Icon({
    iconUrl: require("./Surabaya-Selatan.png").default,
    iconSize: new L.Point(30, 30),
  });

  const iconSurabayaBarat = new L.Icon({
    iconUrl: require("./Surabaya-Barat.png").default,
    iconSize: new L.Point(30, 30),
  });

  const iconSurabayaPusat = new L.Icon({
    iconUrl: require("./Surabaya-Pusat.png").default,
    iconSize: new L.Point(30, 30),
  });

  const iconSurabayaTimur = new L.Icon({
    iconUrl: require("./Surabaya-Timur.png").default,
    iconSize: new L.Point(30, 30),
  });

  useEffect(() => {
    getFaskes();
  }, []);

  function getFaskes() {
    axios
      .get("http://127.0.0.1:8000/api/faskesTabelAllData")
      .then((response) => {
        console.log(response.data);
        setFaskes(response.data);
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
      dataField: "nama_faskes",
      text: "Facility Name",
      sort: true,
    },

    {
      dataField: "alamat",
      text: "Address",
      sort: true,
    },

  ]

  const [map, setMap] = useState(null);
  return (
    <div>
      <Row>
        <Col>
          <Card>
            <CardTitle tag="h6" className="border-bottom p-3 mb-0">
              <i className="bi bi-link me-2"> </i>
              Welcome to Map spread of Facility and Hospital in Surabaya
            </CardTitle>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <MapContainer
            center={[-7.2905636, 112.7692647]}
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
            <Legend map={map} />
            {statesData.features.map((state) => {
              const coordinates = state.geometry.coordinates[0][0].map(
                (item) => [item[1], item[0]]
              );
              return (
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
              );
            })}

            {Pemukiman.features.map((state) => {
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

            {faskes.map((row) =>
              row.demografi.bagian_wilayah == "Surabaya Utara" ? (
                <Marker
                  position={[row.latKoordinat, row.longKoordinat]}
                  icon={iconSurabayaUtara}
                >
                  <Popup>
                    Health of Facility Name : {row.nama_faskes} <br />
                    District : {row.demografi.kecamatan} <br />
                    Area : {row.demografi.bagian_wilayah}
                  </Popup>
                </Marker>
              ) : row.demografi.bagian_wilayah == "Surabaya Selatan" ? (
                <Marker
                  position={[row.latKoordinat, row.longKoordinat]}
                  icon={iconSurabayaSelatan}
                >
                  <Popup>
                    Health of Facility Name : {row.nama_faskes} <br />
                    District : {row.demografi.kecamatan} <br />
                    Area : {row.demografi.bagian_wilayah}
                  </Popup>
                </Marker>
              ) : row.demografi.bagian_wilayah == "Surabaya Barat" ? (
                <Marker
                  position={[row.latKoordinat, row.longKoordinat]}
                  icon={iconSurabayaBarat}
                >
                  <Popup>
                    Health of Facility Name : {row.nama_faskes} <br />
                    District : {row.demografi.kecamatan} <br />
                    Area : {row.demografi.bagian_wilayah}
                  </Popup>
                </Marker>
              ) : row.demografi.bagian_wilayah == "Surabaya Timur" ? (
                <Marker
                  position={[row.latKoordinat, row.longKoordinat]}
                  icon={iconSurabayaTimur}
                >
                  <Popup>
                    Health of Facility Name : {row.nama_faskes} <br />
                    District : {row.demografi.kecamatan} <br />
                    Area : {row.demografi.bagian_wilayah}
                  </Popup>
                </Marker>
              ) : (
                <Marker
                  position={[row.latKoordinat, row.longKoordinat]}
                  icon={iconSurabayaPusat}
                >
                  <Popup>
                    Health of Facility Name : {row.nama_faskes} <br />
                    District : {row.demografi.kecamatan} <br />
                    Area : {row.demografi.bagian_wilayah}
                  </Popup>
                </Marker>
              )
            )}
          </MapContainer>
        </Col>
      </Row>
      
      <Row>
        <Card>
        <CardBody className="">
            <BootstrapTable
              hover
              keyField={"id_faskes"}
              data={faskes}
              columns={columns}
              filter={filterFactory()}
              pagination={paginationFactory()}
            />
          </CardBody>
        </Card>
      </Row>
    </div>
  );
};
export default PopupExample;
