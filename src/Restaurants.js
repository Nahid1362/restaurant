import { useState, useEffect } from "react";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import Pagination from "react-bootstrap/Pagination";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

function Restaurants(props) {
  const [restaurants, setRestaurants] = useState(null);
  const [page, setPage] = useState(1);
  const history = useHistory();
  let query = queryString.parse(props.query);
  let borough = "";
  if(query.borough){
      borough = query.borough;
  }
  useEffect(() => {
    fetch(
      `https://web422nahid.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${borough}`
    ).then((response) => {
      response.json().then((restaurants) => {
        setRestaurants(restaurants);
      });
    });
  }, [props.query, page]);
  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }
  function nextPage() {
    setPage(page + 1);
  }
  
  if (restaurants) {
     if(restaurants==0){
    return (
      <Card>
        <Card.Body>
          <Card.Text>
          <h5>No Restaurants Found</h5>
          </Card.Text>
        </Card.Body>
      </Card>
    );
      }

    return (
      <div>
        <Card>
          <Card.Body>
            <Card.Title>Restaurant List</Card.Title>
            <Card.Text>
              Full list of restaurants. Optionally sorted by borough
            </Card.Text>
          </Card.Body>
        </Card>
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Borough</th>
              <th>Cuisine</th>
            </tr>
          </thead>
          <tbody>
            {restaurants.map((restaurant, i) => {
              return (
                <tr
                  key={i}
                  onClick={() => {
                    history.push(`/restaurant/${restaurant._id}`);
                  }}
                >
                  <td>{restaurant.name}</td>
                  <td>
                    {restaurant.address.building} {restaurant.address.street}
                  </td>
                  <td>{restaurant.borough}</td>
                  <td>{restaurant.cuisine}</td>
                </tr>
              );
            })}
          </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={previousPage} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={nextPage} />
          </Pagination>

      </div>
    );
  } 
  else{
    return <p>Loading</p>;
  }
}

export default Restaurants;
