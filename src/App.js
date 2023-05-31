import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Box } from "@chakra-ui/react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const center1 = { lat: 12.839977, lng: 77.6644473 };
const center2 = { lat: 14.1525735, lng: 79.0871005 };

function App() {
  const [users, setUsers] = useState([]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    Axios.get("https://project-1-client-backend.vercel.app/admin")
      .then((res) => {
        const usersData = res.data;
        console.log(usersData);
        setUsers(usersData);
      })
      .catch((error) => {
        console.log("Error fetching users:", error);
      });
  }, []);

  if (!isLoaded) {
    return <div>Loading....</div>;
  }

  return (
    <Box position="absolute" left={0} top={0} h="100%" w="100%">
      {isLoaded && (
        <GoogleMap center={center1} zoom={15} mapContainerStyle={{ width: "100%", height: "100%" }}>
          {users.map((user) => (
            <Marker
              key={user._id}
              position={{ lat: user.latitude, lng: user.longitude }}
              title={user._id}
            />
          ))}
        </GoogleMap>
      )}
    </Box>
  );
}

export default App;