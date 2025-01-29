import { useState } from "react";
import Places from "./Places.jsx";
import { useEffect } from "react";
import ErrorPage from "./ErrorPage.jsx";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {

  const [isFetching, setFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState();

  // useEffect(() => {
  //   fetch("http://localhost:3000/places")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((resData) => {
  //       setAvailablePlaces(resData.places);
  //     });
  // }, []);

  useEffect(()=>{
    async function fetchPlaces() {
      setFetching(true);
      try{
        const places = await fetchAvailablePlaces();
        setAvailablePlaces(places);
      }catch(error){
        setError(error);
       
      }
      
      setFetching(false);
    }
    fetchPlaces();
  },[]);

  if(error){
    return <ErrorPage title="An error occured !" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Places are loading..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
