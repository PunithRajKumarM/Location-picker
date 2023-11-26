import React from "react";

export default function Places({ title, places, fallbackText, onSelectPlace }) {
  return (
    <section className="places">
      <h2>{title}</h2>
      {places.length === 0 && <p>{fallbackText}</p>}
      {places.length > 0 && (
        <ul className="places-list">
          {places.map((place) => {
            return (
              <li className="place-detail" key={place.id}>
                <button onClick={() => onSelectPlace(place.id)}>
                  <img src={place.image.src} alt={place.image.alt} />
                  <h3>{place.title}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
