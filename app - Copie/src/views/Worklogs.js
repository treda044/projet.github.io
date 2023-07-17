import { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, Col, Row, Input } from "reactstrap";
import {
  ViewState,
  EditingState,
  IntegratedEditing,
} from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  WeekView,
  DayView,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
} from "@devexpress/dx-react-scheduler-material-ui";

import instance from "../data/api";

const appointments = [];

const WorkLogs = () => {
  const [data, setDate] = useState(appointments);
  const [currentViewName, setCurrentViewName] = useState("Month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [worklogs, setWorklogs] = useState([]);

  useEffect(async () => {
    await fetchData(); // Call the fetchData function to retrieve worklogs
  }, []);

  const fetchData = async () => {
    try {
      setWorklogs([]);
      const response = await instance.get("api/worklogs");
      const newLogs = response.data.map((item) => ({
        title: "Administrator Administrator",
        startDate: item.startDate,
        endDate: item.endDate,
        id: item.id,
      }));

      console.log(newLogs);

      await Promise.all(
        newLogs.map(async (log) => {
          await setWorklogs((prevLogs) => [...prevLogs, log]);
        })
      );
    } catch (error) {
      console.error(error);
    }
  };

  const commitChanges = ({ added, changed, deleted }) => {
    setDate((state) => {
      let { data } = state;
      if (added) {
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
      }
      if (deleted !== undefined) {
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return { data };
    });
  };

  return (
    <Card>
      <Row>
        <Col lg="12">
          <CardBody>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <CardTitle tag="h5">WorkLogs</CardTitle>
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
            </div>
            <Row>
              <Col lg="12">
                <Scheduler data={worklogs} locale={"fr-FR"}>
                  <ViewState
                    currentViewName={currentViewName}
                    currentDate={currentDate}
                  />
                  <EditingState onCommitChanges={commitChanges} />
                  <IntegratedEditing />
                  <ConfirmationDialog />
                  <WeekView startDayHour={10} endDayHour={19} />
                  <MonthView />
                  <DayView />
                  <Appointments />
                  <AppointmentTooltip showCloseButton />
                </Scheduler>
              </Col>
            </Row>
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
};

export default WorkLogs;
