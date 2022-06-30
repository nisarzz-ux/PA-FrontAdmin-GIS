import { useEffect } from "react";
import L from "leaflet";
import {BsFillCircleFill} from "react-icons/bs";
import "./File-Map/Legend.css";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      function getColor(d) {
        return d == "Surabaya Utara"
          ? "#de2d26"
          : d == "Surabaya Pusat"
          ? "#377eb8"
          : d == "Surabaya Timur"
          ? "#4daf4a"
          : d == "Surabaya Selatan"
          ? "#984ea3"
          : "#ff7f00";
      }
      const legend = L.control({ position: "topright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        var categories = [
          "Surabaya Barat",
          "Surabaya Pusat",
          "Surabaya Timur",
          "Surabaya Selatan",
          "Surabaya Utara"
          
        ];
        var labels = ["<strong>Categories</strong>"];
        for (var i = 0; i < categories.length; i++) {
          div.innerHTML += labels.push(
            '<i class="bi bi-circle" style="background-color:' +
              getColor(categories[i]) +
              '"></i> ' +
              (categories[i] ? categories[i] : "+")
          );
        }
        div.innerHTML = labels.join("<br>");
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}

export default Legend;
