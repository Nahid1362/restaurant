import { useState, useEffect } from "react";
import { Card, CardDeck, Container } from "react-bootstrap";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

function Restaurant(props) {
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`https://web422nahid.herokuapp.com/api/restaurants/${props.id}`).then(
      (response) => {
        response.json().then((restaurant) => {
          setRestaurant(restaurant);
          setLoading(false);
        });
      }
    );
  }, []);

  function date(date){
    var dd = date.getDate();
    var mm = date.getMonth()+1; 
    var yyyy = date.getFullYear();
    return mm+'/'+dd+'/'+yyyy; 
  }
  if (!loading) {
    if (restaurant.hasOwnProperty("_id")) {
      return (
        <div>
          <Container>
            <Card>
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>
                  {restaurant.address.building} {restaurant.address.street}
                </Card.Text>
              </Card.Body>
            </Card>
            <br />
            <MapContainer
              style={{ height: "400px" }}
              center={[
                restaurant.address.coord[1],
                restaurant.address.coord[0],
              ]}
              zoom={13}
              scrollWheelZoom={false}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  restaurant.address.coord[1],
                  restaurant.address.coord[0],
                ]}
              ></Marker>
            </MapContainer>
            <hr />
            <h3>Ratings</h3>
            <CardDeck>
              {restaurant.grades.map((grade, i ) => {
                return (
                  <Card key={i}>
                    <Card.Header>Grade: {grade.grade}</Card.Header>
                    <Card.Body>
                      <Card.Text>Completed: {date(new Date(restaurant.grades[0].date))} </Card.Text>
                    </Card.Body>
                  </Card>
                );
              })}
            </CardDeck>
          </Container>
        </div>
      );
    } else {
      return (
        <Container>
          <Card>
            <Card.Body>
            <Card.Text><h5>Restaurant with id: {props.id} does not exist</h5></Card.Text>
            </Card.Body>
          </Card>
        </Container>
      );
      
    }
  } else {
    return (
      <Container>
        <p>Restaurant is loading</p>
      </Container>
    );
  }
}

export default Restaurant;
