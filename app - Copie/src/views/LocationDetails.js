import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink,
  Card,
  CardBody,
  CardTitle,
  Button,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Alert,
  FormGroup,
  Label,
} from "reactstrap";
import img1 from "../assets/images/bg/img1.jpg";
import TopCards from "../components/TopCards";

import instance from "../data/api";

const LocationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cells, setCells] = useState([]);
  const [cellData, setCellData] = useState(null);
  const [locationItem, setLocationItem] = useState(null);
  const [alert, setAlert] = useState(false);
  const [openDeleteCell, setOpenDeleteCell] = useState(false);
  const [openUpdateCell, setOpenUpdateCell] = useState(false);
  const [openAddCell, setOpenAddCell] = useState(false);

  const toggleAddCell = () => setOpenAddCell(!openAddCell);
  const toggleUpdateCell = () => setOpenUpdateCell(!openUpdateCell);
  const toggleDeleteCell = () => setOpenDeleteCell(!openDeleteCell);

  const onDismissAlert = () => setAlert(!alert);

  useEffect(async () => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setCells([]);
      const locationResponse = await instance.get(`api/locations/${id}`);
      setLocationItem(locationResponse.data);
      const response = await instance.get("api/cells");
      setCells(response.data.filter((item) => item.location.id == id));
      setItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addCell = async () => {
    setLoading(true);
    if (cellData) {
      const response = await instance.post(`api/cells`, {
        ...cellData,
        location: { id: locationItem.id },
      });
      toggleAddCell();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  const deleteCell = async () => {
    setLoading(true);
    if (item) {
      const response = await instance.delete(`api/cells/${item.id}`);
      toggleDeleteCell();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  const updateCell = async () => {
    setLoading(true);
    if (item) {
      const response = await instance.put(`api/cells/${item.id}`, item);
      toggleUpdateCell();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  return (
    <>
      {locationItem ? (
        <div>
          <Alert color="success" isOpen={alert} toggle={onDismissAlert}>
            Changes are applied successfully
          </Alert>

          {/* Delete Cell pop-up */}
          <Modal isOpen={openDeleteCell} toggle={toggleDeleteCell} className="">
            <ModalHeader toggle={toggleDeleteCell}>Delete</ModalHeader>
            <ModalBody>
              Are you sure you want to delete this Cell from the database?
            </ModalBody>
            <ModalFooter>
              <Button color="outline-danger" onClick={deleteCell}>
                Confirm
              </Button>
              <Button color="outline-secondary" onClick={toggleDeleteCell}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Update Cell pop-up */}
          <Modal isOpen={openUpdateCell} toggle={toggleUpdateCell} className="">
            <ModalHeader toggle={toggleUpdateCell}>Update</ModalHeader>
            {item ? (
              <ModalBody>
                <div className="d-flex justify-content-center align-items-center">
                  <FormGroup className="w-100 mx-1">
                    <Label for="name">Name</Label>
                    <Input
                      type="text"
                      name="name"
                      defaultValue={item.name}
                      id="name"
                      placeholder="Name"
                      onChange={(e) =>
                        setItem({ ...item, name: e.target.value })
                      }
                    />
                  </FormGroup>
                </div>
              </ModalBody>
            ) : null}
            <ModalFooter>
              <Button color="outline-primary" onClick={updateCell}>
                Update
              </Button>
              <Button color="outline-secondary" onClick={toggleUpdateCell}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          {/* Add Cell pop-up */}
          <Modal isOpen={openAddCell} toggle={toggleAddCell} className="">
            <ModalHeader toggle={toggleAddCell}>Add</ModalHeader>
            <ModalBody>
              <div className="d-flex justify-content-center align-items-center">
                <FormGroup className="w-100 mx-1">
                  <Label for="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Name"
                    onChange={(e) =>
                      setCellData({ ...cellData, name: e.target.value })
                    }
                  />
                </FormGroup>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="outline-primary" onClick={addCell}>
                Add
              </Button>
              <Button color="outline-secondary" onClick={toggleAddCell}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>

          <Row>
            <Button
              color="link"
              className="text-left w-auto"
              onClick={() => navigate("/admin/locations")}
            >
              {"<< Back"}
            </Button>
            <CardTitle tag="h5"></CardTitle>
            <Col lg="4">
              <img
                alt="Card image cap"
                src={img1}
                width="100%"
                height="100%"
                style={{ cursor: "pointer" }}
                onClick={() => navigate("/admin/locations/1")}
              />
            </Col>
            <Col lg="8">
              <div className="bg-white">
                <CardBody>
                  <Row className="justify-content-center bg-white">
                    <Col className="text-end">
                      <span>Location : </span>
                    </Col>
                    <Col lg="10" className="">
                      <h6>{locationItem.name}</h6>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col className="text-end">
                      <span>Addresse : </span>
                    </Col>
                    <Col lg="10">
                      <p>{locationItem.address}</p>
                    </Col>
                  </Row>

                  <Row className="justify-content-center">
                    <Col sm="6" lg="4">
                      <TopCards
                        bg="bg-info text-white"
                        title="Pending"
                        subtitle="Pending Tickets"
                        earning="1"
                        icon="bi bi-file-earmark-lock2-fill"
                      />
                    </Col>
                    <Col sm="6" lg="4">
                      <TopCards
                        bg="bg-success text-white"
                        title="Solved"
                        subtitle="Solved Tickets"
                        earning="456"
                        icon="bi bi-file-earmark-check-fill"
                      />
                    </Col>
                    <Col sm="6" lg="4">
                      <TopCards
                        bg="bg-danger text-white"
                        title="Unsolved"
                        subtitle="Unsolved Tickets"
                        earning="210"
                        icon="bi bi-file-earmark-excel-fill"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </div>
            </Col>
          </Row>
          <Card className="mt-4 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h5">Cells managements</CardTitle>
              <div>
                <Button color="outline-primary" onClick={toggleAddCell}>
                  New Cell
                </Button>
              </div>
            </div>
            <Table
              className="no-wrap mt-3 align-middle bg-white"
              responsive
              borderless
              hover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cell</th>
                  <th>Location</th>
                  <th>Total Tickets</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cells.map((element) => (
                  <tr key={element.id}>
                    <td>{element.id}</td>
                    <td>{element.name}</td>
                    <td>{element.location.name}</td>
                    <td>5</td>
                    <td>
                      <div className="d-flex align-items-center p-0">
                        <Button
                          color="link"
                          className="p-0 mr-2 text-dark"
                          onClick={() => {
                            setItem(element);
                            toggleUpdateCell();
                          }}
                        >
                          <i className="bi bi-gear"></i>
                        </Button>
                        <Button
                          color="link"
                          className="p-0 text-dark"
                          onClick={() => {
                            setItem(element);
                            toggleDeleteCell();
                          }}
                        >
                          <i className="bi bi-x-circle"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination
              className="d-flex justify-content-end"
              aria-label="Page navigation example"
            >
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
            </Pagination>
          </Card>
        </div>
      ) : (
        "Loading..."
      )}
    </>
  );
};

export default LocationDetails;
