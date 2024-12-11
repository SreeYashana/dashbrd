import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Line, Bar } from "react-chartjs-2";
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";
import axios from "axios";

function Dashboard(props) {
  const [chartData, setChartData] = useState("data1");
  const updateChartData = (dataName) => setChartData(dataName);

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const [scanData, setScanData] = useState(null); // To store scan results
  const [vulnerabilities, setVulnerabilities] = useState([]); // To store vulnerability list

  const handleTaskAdd = () => {
    setTasks([...tasks, { ...newTask, completed: false }]);
    setNewTask({ title: "", description: "", deadline: "" });
  };

  useEffect(() => {
    // Fetch data for scan logs and vulnerabilities when component mounts
    axios
      .get("API_URL_TO_FETCH_SCAN_LOGS") // Replace with your API URL
      .then((response) => setScanData(response.data))
      .catch((error) => console.error("Error fetching scan data:", error));

    axios
      .get("API_URL_TO_FETCH_VULNERABILITIES") // Replace with your API URL
      .then((response) => setVulnerabilities(response.data))
      .catch((error) => console.error("Error fetching vulnerabilities:", error));
  }, []);

  return (
    <div className="content">
      <Row>
        <Col xs="12">
          <Card className="card-chart">
            <CardHeader>
              <Row>
                <Col className="text-left" sm="6">
                  <h5 className="card-category">Static Analysis of Android Apps</h5>
                  <CardTitle tag="h2">Vulnerabilities Detection</CardTitle>
                </Col>
                <Col sm="6">
                  <ButtonGroup className="btn-group-toggle float-right">
                    <Button
                      className={classNames("btn-simple", {
                        active: chartData === "data1",
                      })}
                      color="info"
                      size="sm"
                      onClick={() => updateChartData("data1")}
                    >
                      Static Analysis
                    </Button>
                    <Button
                      className={classNames("btn-simple", {
                        active: chartData === "data2",
                      })}
                      color="info"
                      size="sm"
                      onClick={() => updateChartData("data2")}
                    >
                      Vulnerabilities Found
                    </Button>
                    <Button
                      className={classNames("btn-simple", {
                        active: chartData === "data3",
                      })}
                      color="info"
                      size="sm"
                      onClick={() => updateChartData("data3")}
                    >
                      Mitigation Progress
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={chartExample1[chartData]} options={chartExample1.options} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Preparation Phase</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-bell-55 text-info" /> Tool Selection
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={chartExample2.data} options={chartExample2.options} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Code Review</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-delivery-fast text-primary" /> Automated Static Analysis
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Bar data={chartExample3.data} options={chartExample3.options} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="4">
          <Card className="card-chart">
            <CardHeader>
              <h5 className="card-category">Configuration Review</h5>
              <CardTitle tag="h3">
                <i className="tim-icons icon-send text-success" /> Insecure Configurations Detected
              </CardTitle>
            </CardHeader>
            <CardBody>
              <div className="chart-area">
                <Line data={chartExample4.data} options={chartExample4.options} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="12">
          <Card className="card-tasks">
            <CardHeader>
              <h6 className="title d-inline">Tasks ({tasks.length})</h6>
              <p className="card-category d-inline"> for Vulnerability Remediation</p>
            </CardHeader>
            <CardBody>
              <div className="table-full-width table-responsive">
                <Table>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr key={index}>
                        <td>
                          <FormGroup check>
                            <Label check>
                              <Input
                                type="checkbox"
                                checked={task.completed}
                                onChange={() => {
                                  const updatedTasks = [...tasks];
                                  updatedTasks[index].completed = !updatedTasks[index].completed;
                                  setTasks(updatedTasks);
                                }}
                              />
                              <span className="form-check-sign">
                                <span className="check" />
                              </span>
                            </Label>
                          </FormGroup>
                        </td>
                        <td>
                          <p className="title">{task.title}</p>
                          <p className="text-muted">{task.description}</p>
                        </td>
                        <td className="text-right">
                          <Button
                            color="link"
                            title="Delete Task"
                            onClick={() => {
                              const updatedTasks = tasks.filter((_, i) => i !== index);
                              setTasks(updatedTasks);
                            }}
                          >
                            <i className="tim-icons icon-simple-remove" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div>
                  <Input
                    placeholder="Title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                  <Input
                    placeholder="Deadline"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                  />
                  <Button color="info" onClick={handleTaskAdd}>
                    Add Task
                  </Button>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="12">
          <Card>
            <CardHeader>
              <CardTitle tag="h4">Android Vulnerabilities Table</CardTitle>
            </CardHeader>
            <CardBody>
              <Table className="tablesorter" responsive>
                <thead className="text-primary">
                  <tr>
                    <th>Vulnerability</th>
                    <th>Severity</th>
                    <th>Impact</th>
                    <th className="text-center">Fix Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vulnerabilities.map((vul, index) => (
                    <tr key={index}>
                      <td>{vul.name}</td>
                      <td>{vul.severity}</td>
                      <td>{vul.impact}</td>
                      <td className="text-center">
                        <span
                          className={`badge ${
                            vul.status === "fixed" ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {vul.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
