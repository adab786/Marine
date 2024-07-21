import Globe from "react-globe.gl";
import { useState, useEffect } from "react";

function World() {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    // Load data
    fetch("dataset/ne_110m_populated_places_simple.geojson") // Adjusted URL to fetch from the correct path
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(({ features }) => {
        console.log(features); // Log the fetched data to check if it's correct
        setPlaces(features);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        labelsData={places}
        labelLat={(d) => d.properties.latitude}
        labelLng={(d) => d.properties.longitude}
        labelText={(d) => d.properties.name}
        labelSize={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelDotRadius={(d) => Math.sqrt(d.properties.pop_max) * 4e-4}
        labelColor={() => "rgba(255, 165, 0, 0.75)"}
        labelResolution={2}
      />
    </div>
  );
}

export default World;
