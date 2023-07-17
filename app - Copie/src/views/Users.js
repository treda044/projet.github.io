import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { Card, CardBody, CardTitle, Table, Button } from "reactstrap";
import instance from "../data/api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [openAddUser, setOpenAddUser] = useState(false);

  // Toggle the state of openAddUser
  const toggleAddUser = () => setOpenAddUser(!openAddUser);

  // Dismiss the alert
  const onDismissAlert = () => setAlert(!alert);

  useEffect(async () => {
    await fetchData(); // Call the fetchData function to retrieve users
  }, []);

  const fetchData = async () => {
    try {
      const response = await instance.get("api/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = async () => {
    setLoading(true);
    if (newUser) {
      const response = await instance.post(`api/register`, {
        ...newUser,
      });
      toggleAddUser();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  return (
    <Row>
      <Col lg="12">
        <Card>
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <CardTitle tag="h5">Users Management</CardTitle>
              <div>
                <Button color="outline-primary">Add new user</Button>
              </div>
            </div>

            <Table
              className="no-wrap mt-3 align-middle"
              responsive
              borderless
              hover
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Login</th>
                  <th>Password</th>
                  <th>Firstname</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index} className="border-top">
                    {/* <td>
                      <div className="d-flex align-items-center p-2">
                        <img
                          src={user.avatar}
                          className="rounded-circle"
                          alt="avatar"
                          width="45"
                          height="45"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{user.name}</h6>
                          <span className="text-muted">{user.email}</span>
                        </div>
                      </div> 
                      1
                    </td>*/}
                    <td>{user.id}</td>
                    <td>{user.login}</td>
                    <td>{user.passwordHash}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.activated ? (
                        <span className="p-2 bg-success rounded-circle d-inline-block ms-3"></span>
                      ) : (
                        <span className="p-2 bg-danger rounded-circle d-inline-block ms-3"></span>
                      )}
                    </td>
                    <td>
                      <div className="d-flex align-items-center">
                        <Button color="link" className="p-0 mr-3 text-dark">
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
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Users;
