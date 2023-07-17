import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Col,
  Row,
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
  Badge,
  Table,
} from "reactstrap";
import ImageCarousel from "../components/image-carousel";
import instance from "../data/api";

const TicketDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [ticketItem, setTicketItem] = useState(null);
  const [updatedAlert, setUpdatedAlert] = useState(false);
  const [openDeleteTicket, setOpenDeleteTicket] = useState(false);
  const [openUpdateTicket, setOpenUpdateTicket] = useState(false);

  useEffect(async () => {
    fetchData();
    setImages(
      Array.from(Array(7).keys()).map((id) => ({
        id,
        url: `https://picsum.photos/1000?random=${id}`,
      }))
    );
  }, []);

  const toggleUpdateTicket = () => setOpenUpdateTicket(!openUpdateTicket);
  const toggleDeleteTicket = () => setOpenDeleteTicket(!openDeleteTicket);

  const onDismissUpdatedAlert = () => setUpdatedAlert(!updatedAlert);

  const fetchData = async () => {
    try {
      // Fetch ticket details
      const ticketResponse = await instance.get(`api/tickets/${id}`);
      setTicketItem(ticketResponse.data);

      // Fetch solutions for the ticket
      const response = await instance.get(`api/solutions`);
      setSolutions(response.data.filter((item) => item.ticket.id == id));

      console.log(ticketResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsSolved = async () => {
    console.log("mark as solved");
    try {
      const solvedResponse = await instance.post(`api/solutions`, {
        title: "Solutions for auto reboot",
        description:
          "LLorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed efficitur purus. Cras quis scelerisque mi, non venenatis libero. ",
        ticket: ticketItem,
      });
      console.log(solvedResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const markAsUnSolved = () => {
    console.log("mark as unsolved");
  };

  return (
    <div>
      <Alert
        color="success"
        isOpen={updatedAlert}
        toggle={onDismissUpdatedAlert}
      >
        Changes are applied successfully
      </Alert>

      {/* Update Ticket pop-up */}
      <Modal isOpen={openUpdateTicket} toggle={toggleUpdateTicket} className="">
        <ModalHeader toggle={toggleUpdateTicket}>Update</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Title" />
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                placeholder="Status"
              >
                <option value="Pending">Pending</option>
                <option value="Solved">Solved</option>
                <option value="Unsolved">Unsolved</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="creator">Creator</Label>
              <Input
                type="text"
                name="creator"
                id="creator"
                placeholder="creator"
              />
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="location">Location</Label>
              <Input
                type="select"
                name="location"
                id="location"
                placeholder="location"
              >
                <option value="">Bretigny</option>
                <option value="">Montepolier</option>
                <option value="">Paris</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="createdAt">Created at</Label>
              <Input
                type="date"
                name="createdAt"
                id="createdAt"
                placeholder="created at"
              />
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="cell">Cell</Label>
              <Input type="select" name="cell" id="cell" placeholder="cell">
                <option value="">Bretigny</option>
                <option value="">Montepolier</option>
                <option value="">Paris</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-100 mx-1">
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="description"
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="outline-primary" onClick={toggleUpdateTicket}>
            Update
          </Button>
          <Button color="outline-secondary" onClick={toggleUpdateTicket}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      {/* Delete User pop-up */}
      <Modal isOpen={openDeleteTicket} toggle={toggleDeleteTicket} className="">
        <ModalHeader toggle={toggleDeleteTicket}>Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this ticket from the database??
        </ModalBody>
        <ModalFooter>
          <Button color="outline-danger" onClick={toggleDeleteTicket}>
            Confirm
          </Button>
          <Button color="outline-secondary" onClick={toggleDeleteTicket}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {ticketItem ? (
        <>
          <Row>
            <Button
              color="link"
              className="text-left w-auto"
              onClick={() => navigate("/admin/tickets")}
            >
              {"<< Back"}
            </Button>
            <CardTitle tag="h5" className="text-center mb-4">
              Ticket Details ID: {ticketItem.id}
            </CardTitle>
            <Col lg="6">
              <ImageCarousel images={images} />
            </Col>
            <Col lg="6">
              <div className="bg-white">
                <CardBody>
                  <Row className="justify-content-center bg-white">
                    <Col lg="3" className="text-end">
                      <span>Status : </span>
                    </Col>
                    <Col lg="9" className="">
                      {ticketItem.ticketStatus == "PENDING" ? (
                        <Badge color="info" className="p-1">
                          Pending
                        </Badge>
                      ) : ticketItem.ticketStatus == "SOLVED" ? (
                        <Badge color="success" className="p-1">
                          Solved
                        </Badge>
                      ) : (
                        <Badge color="danger" className="p-1">
                          Unsolved
                        </Badge>
                      )}
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Title : </span>
                    </Col>
                    <Col lg="9">
                      <span>{ticketItem.title}</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Description : </span>
                    </Col>
                    <Col lg="9">
                      <p>{ticketItem.description}</p>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Creator : </span>
                    </Col>
                    <Col lg="9">
                      <span>{ticketItem.createdBy.login}</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Location : </span>
                    </Col>
                    <Col lg="9">
                      <span>{ticketItem.cell.location?.name}</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Cell : </span>
                    </Col>
                    <Col lg="9">
                      <span>{ticketItem.cell.name}</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Solutions : </span>
                    </Col>
                    <Col lg="9">
                      <span>{ticketItem.title}</span>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col lg="3" className="text-end">
                      <span>Create at : </span>
                    </Col>
                    <Col lg="9">
                      <span>
                        {new Date(ticketItem.ticketDate).toLocaleDateString()}{" "}
                        {new Date(ticketItem.ticketDate).toLocaleTimeString()}
                      </span>
                    </Col>
                  </Row>

                  <div className="my-4 text-center">
                    <Button
                      color="link"
                      className="text-left"
                      onClick={toggleUpdateTicket}
                    >
                      Update
                    </Button>
                    <Button
                      color="link"
                      className="text-left"
                      onClick={toggleDeleteTicket}
                    >
                      Delete
                    </Button>
                    <Button
                      color="link"
                      className="text-left"
                      onClick={markAsSolved}
                    >
                      Mark Solved
                    </Button>
                    {/* <input type="file" onChange={handleFileUpload} /> */}
                  </div>
                </CardBody>
              </div>
            </Col>
          </Row>
          <Card className="mt-4 p-4">
            <div className="d-flex justify-content-between align-items-center">
              <CardTitle tag="h5">Solutions managements</CardTitle>
              <div>
                <Button color="outline-primary">Add Solution</Button>
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
                  <th>Titel</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {solutions.map((element) => (
                  <tr key={element.id}>
                    <td>{element.title}</td>
                    <td>{element.description}</td>
                    <td>
                      <div className="d-flex align-items-center p-0">
                        <Button color="link" className="p-0 mr-2 text-dark">
                          <i className="bi bi-gear"></i>
                        </Button>
                        <Button color="link" className="p-0 text-dark">
                          <i className="bi bi-x-circle"></i>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>
        </>
      ) : null}
    </div>
  );
};

export default TicketDetails;
