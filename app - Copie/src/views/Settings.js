import { useState, useEffect } from "react";
import { Col, Row } from "reactstrap";
import {
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  Label,
  NavLink,
  TabContent,
  TabPane,
  Card,
  CardBody,
  Button,
} from "reactstrap";
import classnames from "classnames";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("1");
  const [userDetails, setUserDetails] = useState({
    status: "",
    createdBy: "",
    createdDate: "",
    lastModifiedBy: "",
    lastModifiedDate: "",
    authorities: "",
  });

  useEffect(() => {
    // Retrieve user details from local storage
    const userStored = localStorage.getItem("user");
    if (userStored) {
      const user = JSON.parse(userStored);
      // Update the state with user details
      setUserDetails({
        status: user.activated ? "Activated" : "Deactivated",
        createdBy: user.createdBy,
        createdDate: user.createdDate || "",
        lastModifiedBy: user.lastModifiedBy,
        lastModifiedDate: user.lastModifiedDate || "",
        authorities: user.authorities.join(", "),
      });
    }
  }, []);

  // Toggle between tabs
  const toggle = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  return (
    <Card>
      <Row>
        <Col lg="12">
          <CardBody>
            {/* Navigation tabs */}
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames(
                    { active: activeTab === "1" },
                    "bg-transparent"
                  )}
                  onClick={() => {
                    toggle("1");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Profil Settings
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    { active: activeTab === "2" },
                    "bg-transparent"
                  )}
                  onClick={() => {
                    toggle("2");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Change Password
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames(
                    { active: activeTab === "3" },
                    "bg-transparent"
                  )}
                  onClick={() => {
                    toggle("3");
                  }}
                  style={{ cursor: "pointer" }}
                >
                  Informations
                </NavLink>
              </NavItem>
            </Nav>

            {/* Tab content */}
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1">
                <Row className="align-items-center justify-content-center">
                  <Col lg="8 py-5">
                    <Form /*onSubmit={handleSubmit}*/>
                      <div className="d-flex justify-content-center align-items-center">
                        <FormGroup className="mx-2 w-50">
                          <Label for="firstName">First Name</Label>
                          <Input
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            id="firstName"
                          />
                        </FormGroup>

                        <FormGroup className="mx-2 w-50">
                          <Label for="lastName">Last Name</Label>
                          <Input
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            id="lastName"
                          />
                        </FormGroup>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <FormGroup className="mx-2 w-50">
                          <Label for="email">Email</Label>
                          <Input
                            type="email"
                            placeholder="Email"
                            name="email"
                            id="email"
                          />
                        </FormGroup>

                        <FormGroup className="mx-2 w-50">
                          <Label for="login">Login</Label>
                          <Input
                            type="text"
                            placeholder="Login"
                            name="login"
                            id="login"
                          />
                        </FormGroup>
                      </div>
                      <div className="d-flex justify-content-center align-items-center">
                        <FormGroup className="mx-2 w-50">
                          <Label for="image">Image</Label>
                          <Input
                            type="file"
                            placeholder="Image"
                            name="image"
                            id="image"
                          />
                        </FormGroup>

                        <FormGroup className="mx-2 w-50">
                          <Label for="langKey">Language Key</Label>
                          <Input
                            type="text"
                            placeholder="Language Key"
                            name="langKey"
                            id="langKey"
                          />
                        </FormGroup>
                      </div>
                      <div className="d-flex justify-content-end align-items-center">
                          <Button color='success' className="mx-2">Update</Button>
                          <Button color='danger' className="mx-2">Cancel</Button>
                        </div>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2">
                <Row className="align-items-center justify-content-center">
                  <Col lg="5 py-5 ">
                    <Form /*onSubmit={handleSubmit}*/ >
                      
                        <FormGroup className="mx-2 ">
                          <Label for="currentPassword">Current Password</Label>
                          <Input
                            type="password"
                            placeholder="Current Password"
                            name="currentPassword"
                            id="currentPassword"
                          />
                        </FormGroup>

                        <FormGroup className="mx-2 ">
                          <Label for="newPassword">New Password</Label>
                          <Input
                            type="password"
                            placeholder="New Password"
                            name="newPassword"
                            id="newPassword"
                          />
                        </FormGroup>
                        <FormGroup className="mx-2 ">
                          <Label for="confirmPassword">Confirm Password</Label>
                          <Input
                            type="password"
                            placeholder="Confirm Password"
                            name="confirmPassword"
                            id="confirmPassword"
                          />
                        </FormGroup>
                        <div className="d-flex justify-content-end align-items-center">
                          <Button color='success' className="mx-2">Confirm</Button>
                        </div>
                    </Form>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="3">
                <Row className="align-items-center justify-content-center">
                  <Col lg="6 py-5">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Status:
                        <span className="">{userDetails.status}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Created By:
                        <span className="">{userDetails.createdBy}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Created Date:
                        <span className="">{userDetails.createdDate}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Last Modified By:
                        <span className="">{userDetails.lastModifiedBy}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Last Modified Date:
                        <span className="">{userDetails.lastModifiedDate}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center">
                        Authorities:
                        <span className="">{userDetails.authorities}</span>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default Settings;
