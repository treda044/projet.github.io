import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Badge,
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
import img3 from "../assets/images/bg/img3.jpg";
import instance from "../data/api";

const Locations = () => {
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationData, setLocationData] = useState(null);
  const [alert, setAlert] = useState(false);
  const [openDeleteLocation, setOpenDeleteLocation] = useState(false);
  const [openUpdateLocation, setOpenUpdateLocation] = useState(false);
  const [openAddLocation, setOpenAddLocation] = useState(false);

  const toggleAddLocation = () => setOpenAddLocation(!openAddLocation);
  const toggleUpdateLocation = () => setOpenUpdateLocation(!openUpdateLocation);
  const toggleDeleteLocation = () => setOpenDeleteLocation(!openDeleteLocation);

  const onDismissAlert = () => setAlert(!alert);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get("api/locations");
      setLocations(response.data);
      setItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  const addLocation = async () => {
    setLoading(true);
    if (locationData) {
      const response = await instance.post(`api/locations`, locationData);
      toggleAddLocation();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  const deleteLocation = async () => {
    setLoading(true);
    if (item) {
      const response = await instance.delete(`api/locations/${item.id}`);
      toggleDeleteLocation();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  const updateLocation = async () => {
    setLoading(true);
    if (item) {
      const response = await instance.put(`api/locations/${item.id}`, item);
      toggleUpdateLocation();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  return (
    <Row>
      <Alert color="success" isOpen={alert} toggle={onDismissAlert}>
        Changes have been applied successfully
      </Alert>
      {/* Delete Location pop-up */}
      <Modal
        isOpen={openDeleteLocation}
        toggle={toggleDeleteLocation}
        className=""
      >
        <ModalHeader toggle={toggleDeleteLocation}>Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this Location from the database?
        </ModalBody>
        <ModalFooter>
          <Button color="outline-danger" onClick={deleteLocation}>
            Confirm
          </Button>
          <Button color="outline-secondary" onClick={toggleDeleteLocation}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Update Location pop-up */}
      <Modal
        isOpen={openUpdateLocation}
        toggle={toggleUpdateLocation}
        className=""
      >
        <ModalHeader toggle={toggleUpdateLocation}>Update</ModalHeader>
        {item ? (
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center">
              <FormGroup className="w-50 mx-1">
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  defaultValue={item.name}
                  id="name"
                  placeholder="Name"
                  onChange={(e) => setItem({ ...item, name: e.target.value })}
                />
              </FormGroup>
              <FormGroup className="w-50 mx-1">
                <Label for="city">City</Label>
                <Input
                  type="select"
                  name="city"
                  id="city"
                  placeholder="City"
                  defaultValue={item.city.id}
                  onChange={(e) =>
                    setItem({ ...item, city: { id: e.target.value } })
                  }
                >
                  <option value="1">Brétigny</option>
                  <option value="2">Montpellier</option>
                  {/* <option value="3">Paris</option> */}
                </Input>
              </FormGroup>
            </div>

            <div className="d-flex justify-content-center align-items-center">
              <FormGroup className="w-100 mx-1">
                <Label for="description">Address</Label>
                <Input
                  type="textarea"
                  name="address"
                  id="address"
                  placeholder="Address"
                  defaultValue={item.address}
                  onChange={(e) =>
                    setItem({ ...item, address: e.target.value })
                  }
                />
              </FormGroup>
            </div>
          </ModalBody>
        ) : null}
        <ModalFooter>
          <Button color="outline-primary" onClick={updateLocation}>
            Update
          </Button>
          <Button color="outline-secondary" onClick={toggleUpdateLocation}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Add Location pop-up */}
      <Modal isOpen={openAddLocation} toggle={toggleAddLocation} className="">
        <ModalHeader toggle={toggleAddLocation}>Add</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                onChange={(e) =>
                  setLocationData({ ...locationData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="city">City</Label>
              <Input
                type="select"
                name="city"
                id="city"
                placeholder="City"
                onChange={(e) =>
                  setLocationData({
                    ...locationData,
                    city: { id: e.target.value },
                  })
                }
              >
                <option value="1">Brétigny</option>
                <option value="2">Montpellier</option>
                {/* <option value="3">Paris</option> */}
              </Input>
            </FormGroup>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-100 mx-1">
              <Label for="description">Address</Label>
              <Input
                type="textarea"
                name="address"
                id="address"
                placeholder="Address"
                onChange={(e) =>
                  setLocationData({
                    ...locationData,
                    address: e.target.value,
                  })
                }
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="outline-primary" onClick={addLocation}>
            Add
          </Button>
          <Button color="outline-secondary" onClick={toggleAddLocation}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Col lg="12">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h5">Locations managements</CardTitle>
              <div>
                <Button color="outline-primary" onClick={toggleAddLocation}>
                  New Locations
                </Button>
              </div>
            </div>
            <Row className="mt-4">
              {locations.map((element) => (
                <Col lg="4" key={element.id}>
                  <Card>
                    <CardImg
                      alt="image"
                      src={img3}
                      width="100%"
                      height={"200px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate(`/admin/locations/${element.id}`)}
                    />
                    <CardBody>
                      <CardTitle tag="h5">{element.name}</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        {element.address}
                      </CardSubtitle>

                      <div className="d-flex">
                        <div className="text-info">
                          Pending{" "}
                          <Badge color="info" className="p-1">
                            5
                          </Badge>
                        </div>
                        <div className="ml-3 text-success">
                          Solved{" "}
                          <Badge color="success" className="p-1">
                            13
                          </Badge>
                        </div>
                        <div className="ml-3 text-danger">
                          Unsolved{" "}
                          <Badge color="danger" className="p-1">
                            2
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right mt-3">
                        <Button
                          color="outline-danger mr-2"
                          onClick={() => {
                            setItem(element);
                            toggleDeleteLocation();
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          color="outline-primary"
                          onClick={() => {
                            setItem(element);
                            toggleUpdateLocation();
                          }}
                        >
                          Update
                        </Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
              ))}

              {/* <Col lg="4">
                  <Card>
                    <CardImg
                      alt="Card image cap"
                      src={img2}
                      width="100%"
                      height={"200px"}
                      style={{ cursor: "pointer" }}
                      onClick={() => navigate("/admin/locations/1")}
                    />
                    <CardBody>
                      <CardTitle tag="h5">Paris</CardTitle>
                      <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Centre commercial Odysseum, Pôle Ludique, 34000
                        Montpellier
                      </CardSubtitle>
                      <div className="d-flex">
                        <div className="text-info">
                          Pending{" "}
                          <Badge color="info" className="p-1">
                            5
                          </Badge>
                        </div>
                        <div className="ml-3 text-success">
                          Solved{" "}
                          <Badge color="success" className="p-1">
                            13
                          </Badge>
                        </div>
                        <div className="ml-3 text-danger">
                          Unsolved{" "}
                          <Badge color="danger" className="p-1">
                            2
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <Button color="link">Update</Button>
                        <Button color="link">Delete</Button>
                      </div>
                    </CardBody>
                  </Card>
                </Col> */}
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Locations;
