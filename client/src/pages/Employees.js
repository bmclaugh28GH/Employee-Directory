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
  const [filterFormObject, setFilterFormObject] = useState({})

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
  function handleFSInputChange(event) {
    const { name, value } = event.target;
    console.log ('name ' + name + ' value ' + value); 
    setFilterFormObject({...filterFormObject, [name]: value})
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  function handleFormSubmit(event) {
    event.preventDefault();
    if (formObject.fname && formObject.lname) {
      API.saveEmployee({
        fname: formObject.fname,
        lname: formObject.lname,
        position: formObject.position,
        second_language: formObject.second_language,
        dependents: formObject.dependents
      })
        .then(res => {
          loadEmployees();
        })
        .catch(err => console.log(err));
    }
  };

    return (
      <Container fluid>
        <Row>
          <Col size="md-4">
            <Jumbotron>
              <h3>Employee Entry</h3>
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
                disabled={!(formObject.fname && formObject.lname)}
                onClick={handleFormSubmit}
              >
                Submit
              </FormBtn>
            </form>
          </Col>

          <Col size="md-8 sm-12">
            <Jumbotron>
              <h3>Employees</h3>
            </Jumbotron>
            <form>
              <h6>Filter</h6>
              <div className="radio">
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="filter1" checked={false}/>
                    First Name
                </label>
                 
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="filter2" checked={false} />
                    Last Name
                </label>
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="filter3" checked={false} />
                    Position
                </label>
              </div>
              <h6>Sort</h6>
              <div className="radio">
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="sort1" checked={false}/>
                    First Name
                </label>
                 
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="sort2" checked={false} />
                    Last Name
                </label>
                <label>
                  <input onChange={handleFSInputChange} type="radio" value="sort3" checked={false} />
                    Position
                </label>
              </div>
              <p>{filterFormObject.filter_fname}</p>
              <Input
                onChange={handleFSInputChange}
                name="filter_fname"
                placeholder="Filter"
              />
            </form>

            <hr></hr>
            {employees.length ? (
              <List>
                {employees.map(employee => (
                  <ListItem key={employee._id}>
                    <Link to={"/employees/" + employee._id}>
                      <strong>
                        {employee.fname} {employee.lname}, {employee.position}
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
