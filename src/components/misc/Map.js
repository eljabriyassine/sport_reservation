import {
  MapContainer,
  TileLayer,
  Marker,
  CircleMarker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Map() {
  const lat = 34.2644;
  const lng = -6.5779;
  const position = [lat, lng];

  return (
    <main className="d w-[100%] h-[10vh] z-0">
      {/*leaflet and react-leaflet*/}
      <div>
        <MapContainer center={position} zoom={20}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <CircleMarker
            className="n w-[150px] h-[150px]"
            center={[lat, lng]}
            radius={10}
            color="transparent"
            fillColor="green"
            fillOpacity={0.5}
          >
            {/* <Marker position={position}> */}
            <Popup className="w-[460px] h-[150px]">
              <p className="text-[25px]">My Location</p>
              {/* Add a link to open location in Google Maps */}
              <a
                href={`https://www.google.com/maps?q=${lat},${lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500"
              >
                Open in Google Maps
              </a>
            </Popup>
            {/* </Marker> */}
          </CircleMarker>
        </MapContainer>
      </div>
    </main>
  );
}

export default Map;
