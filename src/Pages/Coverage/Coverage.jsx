import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useLoaderData } from "react-router";

// Fix Leaflet default icon issues
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Coverage = () => {
  const position = [23.685, 90.3563];
  const serviceCenter = useLoaderData();
  const mapref = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value;
    const district = serviceCenter.find((c) =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district) {
      const coord = [district.latitude, district.longitude];
      mapref.current.flyTo(coord, 15);
    }
  };

  return (
    <div className="px-4 md:px-10 my-10">
      <h2 className="text-3xl md:text-4xl text-secondary font-bold mb-8 text-center">
        We are available in 64 districts
      </h2>

      {/* Search Bar */}
      <form
        onSubmit={handleSearch}
        className="max-w-md mx-auto mb-6 relative shadow-lg rounded-full"
      >
        <input
          type="search"
          name="location"
          placeholder="Search district..."
          className="w-full py-3 pl-12 pr-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-400 text-gray-800 placeholder-gray-400"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </form>

      {/* Map */}
      <div className="w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-xl overflow-hidden shadow-xl border border-gray-200">
        <MapContainer
          center={position}
          zoom={8}
          scrollWheelZoom={true}
          className="h-full w-full"
          ref={mapref}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {serviceCenter.map((center, index) => (
            <Marker key={index} position={[center.latitude, center.longitude]}>
              <Popup>
                <strong>{center.district}</strong> <br />
                Service Area: {center.covered_area.join(", ")}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
