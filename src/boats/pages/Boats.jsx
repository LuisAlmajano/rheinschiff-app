import React, { useState } from "react";
import axios from "axios";

import SearchAppBarDrawer from "../../shared/components/Navigation/SearchAppBarDrawer";
import SchiffListe from "../components/SchiffListe/SchiffListe";
import Footer from "../../shared/components/Navigation/Footer";

const Boats = () => {
  const [boats_db, setBoats] = useState([]);
  const [loading, setLoading] = useState(false);

  const [boats_dummy, setBoatsDummy] = useState([
    {
      _id: "1",
      name: "Tarragona",
      image: "https://picsum.photos/200",
      timeseen: "2020-09-01",
      countseen: 2,
    },
    {
      _id: "2",
      name: "Veerman",
      image: "https://picsum.photos/400",
      timeseen: "2021-01-11",
      countseen: 1,
    },
    {
      _id: "3",
      name: "Sophie Schwarz",
      image: "https://picsum.photos/300",
      timeseen: "2020-09-01",
      countseen: 1,
    },
  ]);

  const addNewBoatHandler = (newBoat) => {
    const boats = boats_dummy.concat(newBoat);
    setBoatsDummy(boats);
  };

  React.useEffect(() => {
    /* 
      Inspired by https://www.freecodecamp.org/news/javascript-skills-you-need-for-react-practical-examples/
      Section 6: Promises + Async/Await Syntax
      
    */
    setLoading(true);
    axios
      .get("http://localhost:3001/api/boats")
      .then((result) => setBoats(result.data))
      .catch((error) =>
        console.error("Error fetching data with axios: ", error)
      );
    setLoading(false);
  }, []);

  return (
    <React.Fragment>
      <SearchAppBarDrawer onNewBoat={addNewBoatHandler} />
      <SchiffListe loading={loading} boats={boats_db} />
      <Footer />
    </React.Fragment>
  );
};

export default Boats;
