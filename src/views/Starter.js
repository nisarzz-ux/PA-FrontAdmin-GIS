import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import TopCards from "../components/dashboard/TopCards";

const dataJumlah = [
  { judul: "satu", hasil: 1000 },
  { judul: "dua", hasil: 2000 },
  { judul: "tiga", hasil: 3000 },
];

const result = dataJumlah.reduce(
  (jumlah, currentValue) => (jumlah = jumlah + currentValue.hasil),
  0
);

const Starter = () => {
  return (
    <div>
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
      </Row>
    </div>
  );
};

export default Starter;
