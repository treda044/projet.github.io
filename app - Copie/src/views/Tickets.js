import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Col,
  Row,
  Card,
  CardBody,
  CardTitle,
  Table,
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
} from "reactstrap";
import instance from "../data/api";

const Tickets = () => {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [locations, setLocations] = useState([]);
  const [cells, setCells] = useState([]);
  const [idsToDelete, setIdsToDelete] = useState([]);
  const [alert, setAlert] = useState(false);
  const [openDeleteTicket, setOpenDeleteTicket] = useState(false);
  const [openAddTicket, setOpenAddTicket] = useState(false);

  // Toggle Add Ticket modal
  const toggleAddTicket = () => setOpenAddTicket(!openAddTicket);

  // Toggle Delete Ticket modal
  const toggleDeleteTicket = () => setOpenDeleteTicket(!openDeleteTicket);

  // Dismiss alert
  const onDismissAlert = () => setAlert(!alert);

  // Fetch ticket and location data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Fetch ticket and location data from the server
  const fetchData = async () => {
    try {
      const response = await instance.get("api/tickets");
      setTickets(response.data);

      const locationsResponse = await instance.get("api/locations");
      setLocations(locationsResponse.data);

      setItem(null);
    } catch (error) {
      console.error(error);
    }
  };

  // Add a new ticket
  const addTicket = async () => {
    setLoading(true);
    if (ticketData) {
      const response = await instance.post(`api/tickets`, {
        ...ticketData,
        ticketDate: new Date(),
        solvedBy: null,
        createdBy: { id: 2, login: "user" },
      });
      toggleAddTicket();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  // Delete selected tickets
  const deleteTickets = async () => {
    setLoading(true);
    try {
      for (const id of idsToDelete) {
        const response = await instance.delete(`api/tickets/${id}`);
      }
      fetchData();
      onDismissAlert();
    } catch (error) {
      console.error(error);
    }
    toggleDeleteTicket();
    setIdsToDelete([]);
    setLoading(false);
  };

  // Update a ticket
  const updateTicket = async () => {
    // setLoading(true);
    // if (item) {
    //   const response = await instance.put(`api/tickets/${item.id}`, item);
    //   toggleUpdateLocation();
    //   fetchData();
    //   onDismissAlert();
    // }
    // setLoading(false);
  };

  // Handle location selection
  const handleLocationsSelect = async (id) => {
    try {
      setCells([]);
      const response = await instance.get("api/cells");
      setCells(response.data.filter((item) => item.location.id === id));
    } catch (error) {
      console.error(error);
    }
  };

  // Handle checkbox change
  const handleCheckboxChange = (event, id) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setIdsToDelete((prevIds) => [...prevIds, id]);
    } else {
      setIdsToDelete((prevIds) => prevIds.filter((prevId) => prevId !== id));
    }
  };

  return (
    <>
      <Alert color="success" isOpen={alert} toggle={onDismissAlert}>
        Changes are applied successfully
      </Alert>
      {/* Delete Ticket pop-up */}
      <Modal isOpen={openDeleteTicket} toggle={toggleDeleteTicket} className="">
        <ModalHeader toggle={toggleDeleteTicket}>Delete</ModalHeader>
        <ModalBody>
          Are you sure you want to delete this tickets from the database?
        </ModalBody>
        <ModalFooter>
          <Button color="outline-danger" onClick={deleteTickets}>
            Confirm
          </Button>
          <Button color="outline-secondary" onClick={toggleDeleteTicket}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      {/* Add Ticket pop-up */}
      <Modal isOpen={openAddTicket} toggle={toggleAddTicket} className="">
        <ModalHeader toggle={toggleAddTicket}>Add</ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-100 mx-1">
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                placeholder="Title"
                onChange={(e) =>
                  setTicketData({ ...ticketData, title: e.target.value })
                }
              />
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="status">Status</Label>
              <Input
                type="select"
                name="status"
                id="status"
                placeholder="Status"
                onChange={(e) =>
                  setTicketData({
                    ...ticketData,
                    ticketStatus: e.target.value.toUpperCase(),
                  })
                }
              >
                <option value="Pending">Pending</option>
                <option value="Solved">Solved</option>
                <option value="Unsolved">Unsolved</option>
              </Input>
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="status">Prioirity</Label>
              <Input
                className="mx-2"
                style={{ width: "200px" }}
                type="select"
                name="prioirity"
                id="type"
                onChange={(e) =>
                  setTicketData({
                    ...ticketData,
                    ticketPriority: e.target.value.toUpperCase(),
                  })
                }
              >
                <option value="" disabled>
                  Prioirity
                </option>
                <option value="Moderate">Moderate</option>
                <option value="Low">Low</option>
                <option value="Hight">Hight</option>
              </Input>
            </FormGroup>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-50 mx-1">
              <Label for="location">Location</Label>
              <Input
                type="select"
                name="location"
                id="location"
                placeholder="location"
                onChange={(e) => handleLocationsSelect(e.target.value)}
              >
                {locations.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup className="w-50 mx-1">
              <Label for="cell">Cell</Label>
              <Input
                type="select"
                name="cell"
                id="cell"
                placeholder="cell"
                onChange={(e) =>
                  setTicketData({ ...ticketData, cell: { id: e.target.value } })
                }
              >
                {cells.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <FormGroup className="w-100 mx-1">
              <Label for="description">Description </Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="description"
                onChange={(e) =>
                  setTicketData({ ...ticketData, description: e.target.value })
                }
              />
            </FormGroup>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="outline-primary" onClick={addTicket}>
            Add
          </Button>
          <Button color="outline-secondary" onClick={toggleAddTicket}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <div className="d-flex justify-content-between align-items-center">
                <CardTitle tag="h5">Tickets managements</CardTitle>
                <div className="mb-3">
                  <Button
                    color="outline-primary mr-3"
                    onClick={toggleAddTicket}
                  >
                    New Ticket
                  </Button>
                  <Button color="outline-danger" onClick={toggleDeleteTicket}>
                    Delete
                  </Button>
                </div>
              </div>
              <div className="d-flex  align-items-center justify-content-end">
                <div className="d-flex justify-content-around align-items-center">
                  <i className="bi bi-filter mr-2 my-auto"></i>{" "}
                  <h6 className="my-auto mr-3">Filter</h6>
                </div>
                <Input
                  className="mx-2"
                  style={{ width: "200px" }}
                  type="select"
                  name="location"
                  id="type"
                  // onChange={(e) =>
                  //   setUserToUpdate({ ...userToUpdate, gender: e.target.value })
                  // }
                >
                  <option value="" disabled>
                    Location
                  </option>
                  <option value="">Bretigny</option>
                  <option value="">Montepolier</option>
                  <option value="">Paris</option>
                </Input>

                <Input
                  className="mx-2"
                  style={{ width: "200px" }}
                  type="select"
                  name="status"
                  id="type"
                  // onChange={(e) =>
                  //   setUserToUpdate({ ...userToUpdate, gender: e.target.value })
                  // }
                >
                  <option value="" disabled>
                    Status
                  </option>
                  <option value="">Pending</option>
                  <option value="">Solved</option>
                  <option value="">Unsolved</option>
                </Input>
                <Input
                  type="date"
                  style={{ width: "200px" }}
                  placeholder="createAt"
                  className="mx-2"
                  // onChange={(e) =>
                  //   setUserToAdd({
                  //     ...userToAdd,
                  //     birthday: e.target.value,
                  //   })
                  // }
                />
              </div>
              <Table
                className="no-wrap mt-3 align-middle bg-white"
                responsive
                borderless
                hover
              >
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Creator</th>
                    <th>Title</th>
                    <th>Cell</th>
                    <th>Location</th>
                    <th>Create at</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((tdata, index) => (
                    <tr key={index} className="border-top">
                      <td>
                        <Input
                          type="checkbox"
                          name="select"
                          className="m-auto"
                          onChange={(e) => handleCheckboxChange(e, tdata.id)}
                        />
                      </td>
                      <td>{tdata.createdBy.login}</td>
                      <td
                        className="text-primary underline"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate(`/admin/tickets/${tdata.id}`)}
                      >
                        {tdata.title}
                      </td>
                      <td>{tdata.cell?.name}</td>
                      <td>Montepolier</td>
                      <td>
                        {new Date(tdata.ticketDate).toLocaleDateString()}{" "}
                        {new Date(tdata.ticketDate).toLocaleTimeString()}
                      </td>
                      <td>
                        {tdata.ticketStatus == "pending" ? (
                          <Badge color="info" className="p-1">
                            Pending
                          </Badge>
                        ) : tdata.status == "solved" ? (
                          <Badge color="success" className="p-1">
                            Solved
                          </Badge>
                        ) : (
                          <Badge color="danger" className="p-1">
                            Unsolved
                          </Badge>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Tickets;
