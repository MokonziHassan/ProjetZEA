import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";

@Component({
  selector: "app-layer",
  templateUrl: "./layer.component.html",
  styleUrls: ["./layer.component.css"]
})
export class LayerComponent implements OnInit {
  coordMaison = L.latLng(43.1201256, 5.9359619);
  coordEcole = L.latLng(43.1205669, 5.9369513);
  coordMayol = L.latLng(43.1189859, 5.9343043);
  coordLycee = L.latLng(43.1163689, 5.9371478);
  coordGare = L.latLng(43.1283184, 5.9272719);

  ngOnInit() {
    const iconMarker = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
    });
    const littleton = L.marker([39.61, -105.02], {
        icon: iconMarker
      }).bindPopup("This is Littleton, CO."),
      denver = L.marker([39.74, -104.99], { icon: iconMarker }).bindPopup(
        "This is Denver, CO."
      ),
      aurora = L.marker([39.73, -104.8], { icon: iconMarker }).bindPopup(
        "This is Aurora, CO."
      ),
      golden = L.marker([39.77, -105.23], { icon: iconMarker }).bindPopup(
        "This is Golden, CO."
      );

    const cities = L.layerGroup([littleton, denver, aurora, golden]);

    const grayscale = L.tileLayer(
        "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",
        {
          attribution:
            // tslint:disable-next-line:quotemark
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
      ),
      streets = L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        attribution: "My Map"
      });

    const map = L.map("frugalmap", {
      center: [39.73, -104.99],
      zoom: 10,
      layers: [grayscale, cities]
    });

    const baseMaps = {
      "<span style='color: gray'>Grayscale</span>": grayscale,
      Streets: streets
    };

    const overlayMaps = {
      Cities: cities
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);
  }
}

// doc : http://leafletjs.com/examples/layers-control/
// Pour changer le style de la map : Leaflet Providers -> http://leaflet-extras.github.io/leaflet-providers/preview/
