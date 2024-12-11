import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";

function Tables({ jsonReport }) {
  // Extract data from the JSON report for initial table population
  const initialTableData = jsonReport.manifest_analysis.manifest_findings.map((finding) => ({
    tool: "MobSF",
    type: "Manifest Analysis",
    issue: finding.name,
    status: finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1),
  }));

  const [tableData, setTableData] = useState(initialTableData);

  const [newRow, setNewRow] = useState({
    tool: "",
    type: "",
    issue: "",
    status: "",
  });

  const handleChange = (e) => {
    setNewRow({ ...newRow, [e.target.name]: e.target.value });
  };

  const addRow = () => {
    if (newRow.tool && newRow.type && newRow.issue && newRow.status) {
      setTableData([...tableData, newRow]);
      setNewRow({ tool: "", type: "", issue: "", status: "" });
    }
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Static Analysis Tools and Results</CardTitle>
                <p className="category">Details of tools, issues found, and their statuses</p>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Tool</th>
                      <th>Type</th>
                      <th>Issue</th>
                      <th className="text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableData.map((row, index) => (
                      <tr key={index}>
                        <td>{row.tool}</td>
                        <td>{row.type}</td>
                        <td>{row.issue}</td>
                        <td className="text-center">{row.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Add New Entry</CardTitle>
                <p className="category">Enter details of new tool or analysis result</p>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col md="3">
                      <FormGroup>
                        <Label>Tool</Label>
                        <Input
                          type="text"
                          name="tool"
                          value={newRow.tool}
                          onChange={handleChange}
                          placeholder="e.g., MobSF"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Type</Label>
                        <Input
                          type="text"
                          name="type"
                          value={newRow.type}
                          onChange={handleChange}
                          placeholder="e.g., Static Analysis"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Issue</Label>
                        <Input
                          type="text"
                          name="issue"
                          value={newRow.issue}
                          onChange={handleChange}
                          placeholder="e.g., Hardcoded Keys"
                        />
                      </FormGroup>
                    </Col>
                    <Col md="3">
                      <FormGroup>
                        <Label>Status</Label>
                        <Input
                          type="text"
                          name="status"
                          value={newRow.status}
                          onChange={handleChange}
                          placeholder="e.g., Detected"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Button color="primary" onClick={addRow}>
                    Add Entry
                  </Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
