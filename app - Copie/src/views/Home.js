import { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
} from "reactstrap";

import TopCards from "../components/TopCards";
import instance from "../data/api";

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get("api/tickets");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <CardTitle className="text-center" tag="h4">
              Total Tickets
            </CardTitle>
            <CardSubtitle className="mb-4 text-muted text-center" tag="h6">
              Overview
            </CardSubtitle>

            {/* Cards for ticket statuses */}
            <Row className="justify-content-center">
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-info text-white"
                  title="Pending"
                  subtitle="Pending Tickets"
                  earning="1"
                  icon="bi bi-file-earmark-lock2-fill"
                />
              </Col>
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-success text-white"
                  title="Solved"
                  subtitle="Solved Tickets"
                  earning="456"
                  icon="bi bi-file-earmark-check-fill"
                />
              </Col>
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-danger text-white"
                  title="Unsolved"
                  subtitle="Unsolved Tickets"
                  earning="210"
                  icon="bi bi-file-earmark-excel-fill"
                />
              </Col>
            </Row>

            {/* Dropdown for location selection */}
            <div className="d-flex align-items-center justify-content-center my-4">
              <h5 className="my-auto">Locations : </h5>
              <Input
                className="ml-3 w-25"
                type="select"
                name="type"
                id="type"
                // onChange={(e) =>
                //   setUserToUpdate({ ...userToUpdate, gender: e.target.value })
                // }
              >
                <option value="" disabled>
                  Choose any location...
                </option>
                <option value="">Bretigny</option>
                <option value="">Montepolier</option>
                <option value="">Paris</option>
              </Input>
            </div>

            {/* Cards for ticket statuses (placeholder) */}
            <Row className="justify-content-center">
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-info text-white"
                  title="Pending"
                  subtitle="Pending Tickets"
                  earning="-"
                  icon="bi bi-file-earmark-lock2-fill"
                />
              </Col>
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-success text-white"
                  title="Solved"
                  subtitle="Solved Tickets"
                  earning="-"
                  icon="bi bi-file-earmark-check-fill"
                />
              </Col>
              <Col sm="6" lg="3">
                <TopCards
                  bg="bg-danger text-white"
                  title="Unsolved"
                  subtitle="Unsolved Tickets"
                  earning="-"
                  icon="bi bi-file-earmark-excel-fill"
                />
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Home;
