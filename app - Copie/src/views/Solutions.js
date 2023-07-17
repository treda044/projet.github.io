import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, Button } from "reactstrap";
import instance from "../data/api";

const Solutions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [solutions, setSolutions] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(async () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get(`api/solutions`);
      setSolutions(response.data.filter((item) => item.ticket.id == id));
      setImages(
        Array.from(Array(3).keys()).map((id) => ({
          id,
          url: `https://picsum.photos/1000?random=${id}`,
        }))
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <CardTitle tag="h5">Solutions Mangement</CardTitle>
              <div>
                <Button color="outline-primary">Add new user</Button>
              </div>
            </div>

            {solutions.map((solution, index) => (
              <Row>
                {/* <Col lg="4" className=''>
                  <ImageCarousel images={images} />
                </Col> */}
                <Col lang="7">
                  <h5>{solution.title}</h5>
                  <span></span>
                  <p>{solution.description}</p>
                  <div className="d-flex justify-content-around align-items-start text-info">
                    <Button color="info">
                      <i className="bi bi-gear"></i> Update
                    </Button>
                    <Button color="danger">
                      <i className="bi bi-x-circle"></i> Delete
                    </Button>
                  </div>
                </Col>
              </Row>
            ))}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Solutions;
