import { useEffect } from "react";
import L from "leaflet";
import { BsFillCircleFill } from "react-icons/bs";
import "./File-Map/Legend.css";

function Legend({ map }) {
  useEffect(() => {
    if (map) {
      function getColor(d) {
        return d == "PPKM Level 1" ? (
          "#05b534"
        ) : d == "PPKM Level 2" ? (
          "#eefa02"
        ) : d == "PPKM Level 3" ? (
          "#fad905"
        ) : d == "PPKM Level 4" ? (
          "#fa0202"
        ) : d == "North Surabaya" ? (
          "#F38484"
        ) : d == "South Surabaya" ? (
          "#EC9949"
        ) : d == "West Surabaya" ? (
          "#4C51EF"
        ) : d == "East Surabaya" ? (
          "#ACC715"
        ) : d == "Center Surabaya" ? (
          "#D597F9"
        ) : (
          <br />
        );
      }
      const legend = L.control({ position: "topright" });
      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        var categories = [
          "PPKM Level 1",
          "PPKM Level 2",
          "PPKM Level 3",
          "PPKM Level 4",
          "kosong",
          "North Surabaya",
          "South Surabaya",
          "West Surabaya",
          "East Surabaya",
          "Center Surabaya",
        ];
        var labels = ["<strong>Legend</strong>"];
        for (var i = 0; i < categories.length; i++) {
          categories[i] != "kosong" ? (
            (div.innerHTML += labels.push(
              '<i class="bi bi-square" style="background:' +
                getColor(categories[i]) +
                '"></i> ' +
                (categories[i] ? categories[i] : "+")
            ))
          ) : (
            div.innerHTML += labels.push(
              ''
            )
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
