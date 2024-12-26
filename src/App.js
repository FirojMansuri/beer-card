import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import UserCard from "./components/UserCard";
const App = () => {
  const [beers, setBeers] = useState([]);
  const [selectedBeer, setSelectedBeer] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("https://api.sampleapis.com/beers/ale")
      .then((response) => response.json())
      .then((data) => setBeers(data))
      .catch((error) => console.error("Error fetching beers:", error));
  }, []);

  const handleImageClick = (beer) => {
    setSelectedBeer(beer);
  };

  // Filter beers based on the search term
  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ }}>
      {/* Header and Search Bar */}
      <div className="bg-blue-100 shadow-lg rounded-lg p-6 grid grid-cols-2">
        <h1 style={{ textAlign: "center", fontSize: "40px" }}>BEER CARD</h1>
        <input
          type="text"
          placeholder="Search beers..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            margin: "0px 0 10px 10px",
            width: "100%",
            fontSize: "16px",
          }}
        />
      </div>

      {/* Display selected beer details */}
      {selectedBeer ? (
        <div
          style={{
            border: "1px solid #ff5332",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "300px",
            margin: "20px auto",
            textAlign: "center",
            backgroundColor: "#f785",
          }}
        >
          <LazyLoadImage
            src={selectedBeer.image || "https://via.placeholder.com/150"}
            alt={selectedBeer.name}
            effect="blur"
            style={{ width: "100%", borderRadius: "10px" }}
          />
          <h2>{selectedBeer.name}</h2>
          <p>Price: {selectedBeer.price || "N/A"}</p>
          <button
            onClick={() => setSelectedBeer(null)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#007BFF",
              color: "burlywood",
              border: "none",
              borderRadius: "0px",
              cursor: "pointer",
            }}
          >
            Back
          </button>
        </div>
      ) : (
        // Conditional rendering for filtered beers
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "space-between",
            padding: "30px",
          }}
        >
          {filteredBeers.length > 0 ? (
            filteredBeers.map((beer) => (
              <div
                key={beer.id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "8px",
                  padding: "10px",
                  width: "200px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                {/* Rating at the top */}
                <div
                  style={{
                    position: "absolute",
                    top: "8px",
                    left: "8px",
                    backgroundColor: "#FF3432",
                    padding: "5px 10px",
                    borderRadius: "5px",
                    fontWeight: "bold",
                    fontSize: "14px",
                  }}
                >
                  ⭐ {beer.rating?.average.toFixed(1)}
                </div>

                {/* Image */}
                <LazyLoadImage
                  src={beer.image || "https://via.placeholder.com/150"}
                  alt={beer.name}
                  effect="blur"
                  style={{ width: "100%", borderRadius: "8px" }}
                  onClick={() => handleImageClick(beer)}
                />
{/* reviews */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "25%",
                    right: "0px",
                    backgroundColor: "#FFF",
                    padding: "5px 10px ",
                    borderRadius: "5px",
                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-50%)",
                    fontSize: "14px",
                    color:"#288775"
                  }}
                >
                  Reviews: {beer.rating?.reviews || 0}
                </div>

                {/* Name */}
                <h3 style={{ marginTop: "20px" }}>{beer.name}</h3>
              </div>
            ))
          ) : (
            // message for search data
            <p style={{ textAlign: "center", fontSize: "18px", color: "#ff5332" }}>
              No beers found matching your search.
            </p>
          )}
        </div>
      )}
      {/* <UserCard/> */}
    </div>
  );
};

export default App;
