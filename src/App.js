import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import Places from "./components/Places";
import { sortPlacesByDistance } from "./loc.js";

const storedId = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedId.map((id) => {
  return AVAILABLE_PLACES.find((place) => place.id === id);
});

export default function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prePickedPlaces) => {
      if (prePickedPlaces.some((place) => place.id === id)) {
        return prePickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...pickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPreviousPlace) => {
      return prevPreviousPlace.filter(
        (place) => place.id !== selectedPlace.current
      );
    });
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>
      <Header />
      <Places
        title="I'd like to visit..."
        fallbackText={"Select the places you like to visit below."}
        places={pickedPlaces}
        onSelectPlace={handleStartRemovePlace}
      />
      <Places
        title="Available Places"
        places={availablePlaces}
        fallbackText={"Sorting places by distance..."}
        onSelectPlace={handleSelectPlace}
      />
    </>
  );
}
