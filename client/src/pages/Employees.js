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
  const [filterFormObject, setFilterFormObject] = useState({
    filter_criteria:""
  })
  const [filterRadioButtons, setFilterRadioButtons]=useState ({
    filter1:false,
    filter2:false,
    filter3:false
  })
  const [sortRadioButtons, setSortRadioButtons]=useState ({
    sort1:false,
    sort2:false,
    sort3:false
  })

  // Load all books and store them with setBooks
  useEffect(() => {
    loadEmployees()
  }, [])

  // Loads all employees
  function loadEmployees() {
    API.getEmployees()
      .then(res => 
        setEmployees(res.data)
      )
      .catch(err => console.log(err));
  };

  // Deletes a employee from the database with a given id, then reloads employees from the db
  function deleteEmployee(id) {
    API.deleteEmployee(id)
      .then(res => loadEmployees())
      .catch(err => console.log(err));
  }

  // Handles updating component state when the user types into the input field
  function handleFSInputChange(event) {
    const { name, value } = event.target;
    if (name == "filter_criteria"){
      console.log ('name ' + name + ' value ' + value); 
      setFilterFormObject({...filterFormObject, [name]: value})
    }; 
    if (name == 'filter1' 
      || name == 'filter2' 
      || name == 'filter3'){
      console.log(name); 
      //loadEmployees();
      if (!filterFormObject.filter_criteria){
        return;
      } else {
        console.log ('filter ' + name + ' by ' + filterFormObject.filter_criteria);

        var filterEmployees;  
        if (name == 'filter1'){
          filterEmployees = employees.filter(employee => employee.fname == filterFormObject.filter_criteria); 
          console.log (filterEmployees); 
        } else if (name == 'filter2'){
          filterEmployees = employees.filter(employee => employee.lname == filterFormObject.filter_criteria); 
          console.log (filterEmployees); 
        } else if (name == 'filter3'){
          filterEmployees = employees.filter(employee => employee.position == filterFormObject.filter_criteria); 
          console.log (filterEmployees); 
        }
        setEmployees (filterEmployees); 

      }
      setFilterRadioButtons ({[name]:value});
      } 
    if (name == 'sort1' 
      || name == 'sort2' 
      || name == 'sort3'){
      console.log(name); 

      var sortEmployees;  
      if (name == 'sort1'){
        sortEmployees = employees.sort((a, b) => {
          if (a.fname < b.fname) {
            return -1;
          } else {
            return 1;
          }
        });
        console.log (sortEmployees); 
      }
      if (name == 'sort2'){
        sortEmployees = employees.sort((a, b) => {
          if (a.lname < b.lname) {
            return -1;
          } else {
            return 1;
          }
        });
        console.log (sortEmployees); 
      }
      if (name == 'sort3'){
        sortEmployees = employees.sort((a, b) => {
          if (a.position < b.position) {
            return -1;
          } else {
            return 1;
          }
        });
        console.log (sortEmployees); 
      }
      setSortRadioButtons ({[name]:value});
    }; 
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  function handleFilterReset(event) {
    event.preventDefault();
    loadEmployees();
  }

  // When the form is submitted, use the API.saveEmployee method to save the employee data
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
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="filter1" 
                    value="filter1" 
                    checked={filterRadioButtons.filter1} />
                    First Name
                </label>
                 
                <label>
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="filter2" 
                    value="filter2"
                    checked={filterRadioButtons.filter2} />
                    Last Name
                </label>
                <label>
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="filter3" 
                    value="filter3"
                    checked={filterRadioButtons.filter3} />
                    Position
                </label>
              </div>
              <FormBtn
                onClick={handleFilterReset} >
                Undo Filter
              </FormBtn>

              <h6>Sort</h6>
              <div className="radio">
                <label>
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="sort1" 
                    value="sort1"
                    checked={sortRadioButtons.sort1} />
                    First Name
                </label>
                 
                <label>
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="sort2" 
                    value="sort2"
                    checked={sortRadioButtons.sort2} />
                    Last Name
                </label>
                <label>
                  <input 
                    onChange={handleFSInputChange} 
                    type="radio" 
                    name="sort3" 
                    value="sort3"
                    checked={sortRadioButtons.sort3} />
                    Position
                </label>
              </div>
              <p>{filterFormObject.filter_criteria}</p>
              <Input
                onChange={handleFSInputChange}
                name="filter_criteria"
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
