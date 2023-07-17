import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
} from "reactstrap";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip,
} from "@devexpress/dx-react-scheduler-material-ui";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import instance from "../data/api";
import moment from "moment";
import { selectUser } from "../slices/userSlice";

// CSS class prefix for MUI components
const PREFIX = "Demo";

const classes = {
  icon: `${PREFIX}-icon`,
  textCenter: `${PREFIX}-textCenter`,
  firstRoom: `${PREFIX}-firstRoom`,
  secondRoom: `${PREFIX}-secondRoom`,
  thirdRoom: `${PREFIX}-thirdRoom`,
  header: `${PREFIX}-header`,
  commandButton: `${PREFIX}-commandButton`,
};

// Custom styling for AppointmentTooltip.Header component
const StyledAppointmentTooltipHeader = styled(AppointmentTooltip.Header)(
  () => ({})
);

// Custom styling for IconButton component
const StyledIconButton = styled(IconButton)(() => ({
  [`&.${classes.commandButton}`]: {
    backgroundColor: "rgba(255,255,255,0.65)",
  },
}));

const MyWorklog = () => {
  const [loading, setLoading] = useState(false);
  const [myLogs, setMyLogs] = useState([]);
  const [logToAdd, setLogToAdd] = useState(null);
  const [alert, setAlert] = useState(false);
  const [currentViewName, setCurrentViewName] = useState("Month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openAddLog, setOpenAddLog] = useState(false);
  const userData = useSelector(selectUser);

  const toggleAddLog = () => setOpenAddLog(!openAddLog);
  const onDismissAlert = () => setAlert(!alert);

  useEffect(async () => {
    fetchData();
  }, []);

  // Fetches worklogs data from the server
  const fetchData = async () => {
    try {
      setMyLogs([]);
      const response = await instance.get("api/worklogs");
      const newLogs = response.data.map((item) => ({
        title: userData.firstName + " " + userData.firstName,
        startDate: item.startDate,
        endDate: item.endDate,
        id: item.id,
      }));

      await Promise.all(
        newLogs.map(async (log) => {
          await setMyLogs((prevLogs) => [...prevLogs, log]);
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Adds a new worklog
  const addLog = async () => {
    setLoading(true);
    if (logToAdd) {
      const response = await instance.post(`api/worklogs`, {
        ...logToAdd,
        user: { id: userData.id },
      });
      toggleAddLog();
      fetchData();
      onDismissAlert();
    }
    setLoading(false);
  };

  // Deletes a worklog
  const deleteLog = async (item) => {
    setLoading(true);
    const response = await instance.delete(`api/worklogs/${item.id}`);
    fetchData();
    onDismissAlert();
    setLoading(false);
  };

  // Custom Header component for AppointmentTooltip
  const Header = ({ children, appointmentData, ...restProps }) => (
    <StyledAppointmentTooltipHeader
      {...restProps}
      appointmentData={appointmentData}
    >
      <StyledIconButton
        onClick={() => deleteLog(appointmentData)}
        className={classes.commandButton}
      >
        <DeleteIcon />
      </StyledIconButton>
      {children}
    </StyledAppointmentTooltipHeader>
  );

  return (
    <Card>
      <Row>
        <Alert color="success" isOpen={alert} toggle={onDismissAlert}>
          Changes are applied successfully
        </Alert>
        {/* Add Log pop-up */}
        <Modal isOpen={openAddLog} toggle={toggleAddLog} className="">
          <ModalHeader toggle={toggleAddLog}>Add</ModalHeader>
          <ModalBody>
            <div className="d-flex justify-content-center align-items-center">
              <FormGroup className="w-50 mx-1">
                <Label for="startDate">Start Date</Label>
                <Input
                  type="datetime-local"
                  name="startDate"
                  id="startDate"
                  placeholder="Start Date"
                  onChange={(e) =>
                    setLogToAdd({
                      ...logToAdd,
                      startDate: moment.utc(e.target.value).format(),
                    })
                  }
                />
              </FormGroup>
              <FormGroup className="w-50 mx-1">
                <Label for="endDate">End Date</Label>
                <Input
                  type="datetime-local"
                  name="endDate"
                  id="endDate"
                  placeholder="End Date"
                  onChange={(e) =>
                    setLogToAdd({
                      ...logToAdd,
                      endDate: moment.utc(e.target.value).format(),
                    })
                  }
                />
              </FormGroup>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="outline-primary" onClick={addLog}>
              Add
            </Button>
            <Button color="outline-secondary" onClick={toggleAddLog}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Col lg="12">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <CardTitle tag="h5">MyWorklog</CardTitle>
              <div>
                <Button color="outline-primary" onClick={toggleAddLog}>
                  New Worklog
                </Button>
              </div>
            </div>
            <Row>
              <Col lg="12">
                <div className="d-flex align-items-center justify-content-end mb-3">
                  <Input
                    type="date"
                    style={{ width: "200px" }}
                    placeholder="createAt"
                    className="mx-2"
                    onChange={(e) => setCurrentDate(e.target.value)}
                  />
                  <Input
                    style={{ width: "200px" }}
                    placeholder="currentName"
                    className="mx-2"
                    type="select"
                    onChange={(e) => setCurrentViewName(e.target.value)}
                  >
                    <option value="" disabled>
                      Calender view options
                    </option>
                    <option value="Day">Day</option>
                    <option value="Week">Week</option>
                    <option value="Month">Month</option>
                  </Input>
                </div>
                <Scheduler data={myLogs} locale={"fr-FR"}>
                  <ViewState
                    currentViewName={currentViewName}
                    currentDate={currentDate}
                  />
                  <WeekView startDayHour={10} endDayHour={19} />
                  <MonthView />
                  <DayView />
                  <Appointments />
                  <AppointmentTooltip showCloseButton showDeleteButton />
                </Scheduler>
              </Col>
            </Row>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default MyWorklog;
