import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";

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
