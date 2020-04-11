import React, { useState, useEffect } from "react";
import DeleteBtn from "../components/DeleteBtn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, TextArea, FormBtn } from "../components/Form";

function Employees() {
  // Setting our component's initial state
  const [employees, setEmployees] = useState([])
  const [formObject, setFormObject] = useState({})

  // Load all books and store them with setBooks
  useEffect(() => {
    loadEmployees()
  }, [])

  // Loads all books and sets them to books
  function loadEmployees() {
    API.getEmployees()
      .then(res => 
        setEmployees(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  function deleteEmployee(id) {
    API.deleteEmployee(id)
      .then(res => loadEmployees())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.title && formObject.author) {
      API.saveEmployee({
        fname: formObject.fname,
        lname: formObject.lname,
        position: formObject.position,
        second_language: formObject.second_language,
        dependents: formObject.dependents
      })
        .then(res => loadEmployees())
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Employee Entry</h1>
            </Jumbotron>
            <form>
              <Input
                onChange={handleInputChange}
                name="fname"
                placeholder="First Name (required)"
              />
              <Input
                onChange={handleInputChange}
                name="lname"
                placeholder="Last Name (required)"
              />
              <Input
                onChange={handleInputChange}
                name="position"
                placeholder="Position (Required)"
              />
              <Input
                onChange={handleInputChange}
                name="dependents"
                placeholder="# of Dependents (Required)"
              />
              <FormBtn
                disabled={!(formObject.author && formObject.title)}
                onClick={handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Employees</h1>
            </Jumbotron>
            {employees.length ? (
              <List>
                {employees.map(employee => (
                  <ListItem key={employee._id}>
                    <Link to={"/employees/" + employee._id}>
                      <strong>
                        {employee.fname}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => deleteEmployee(employee._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Employees;
