import { Component, OnInit } from "@angular/core";
import * as L from "leaflet";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-quick-start",
  templateUrl: "./quick-start.component.html",
  styleUrls: ["./quick-start.component.css"]
})
export class QuickStartComponent implements OnInit {
  coordMaison = L.latLng(43.1201256, 5.9359619);
  coordEcole = L.latLng(43.1205669, 5.9369513);
  coordMayol = L.latLng(43.1189859, 5.9343043);
  coordLycee = L.latLng(43.1163689, 5.9371478);
  coordGare = L.latLng(43.1283184, 5.9272719);

  myMap: any;

  crassiers: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Déclaration de la carte avec les coordonnées du centre et le niveau de zoom. Laissez "frugalmap" dans la fonction map
    this.myMap = L.map("frugalmap").setView([43.205068, 5.513651], 15);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: "My Map"
    }).addTo(this.myMap);

    // ajouter un marqueur
    const iconMarker = L.icon({
      iconUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
    });

    /*  const marker = L.marker(this.coordEcole, {
      icon: iconMarker
    }).addTo(this.myMap);
    marker.bindPopup("<b>Yo!</b><br>C'est ma maison");

    // ajouter un cercle
    const circle = L.circle(this.coordMaison, {
      color: "red",
      fillColor: "red",
      fillOpacity: 0.5,
      radius: 200
    }).addTo(this.myMap);

    // ajouter un polygone
    const polygone = L.polygon([
      this.coordGare,
      this.coordEcole,
      this.coordLycee,
      this.coordMayol
    ]).addTo(this.myMap); */

    // gestion événement : au click

    /* const popup = new L.Popup();
    
    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.myMap);
    }

    this.myMap.on("click", onMapClick); */

    this.getConduite();
    this.getCrassiers();
  }

  public getCrassiers() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      let crassiers = result.crassiers;
      this.crassiers = crassiers;

      for (let crassier of crassiers) {
        // ajouter un marker pour chaque crassier
        const iconMarker = L.icon({
          iconUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-icon.png"
        });

        /* let marker = L.marker(crassier.pos, {
          icon: iconMarker
        }).addTo(this.myMap);
        marker.bindPopup(crassier.nom); */

        let circle = L.circle(crassier.pos, {
          color: "red",
          fillColor: "red",
          fillOpacity: 0.5,
          radius: crassier.radius ? crassier.radius : 300
        }).addTo(this.myMap);
        circle.bindTooltip(crassier.nom);
      }
    });
  }

  public debutConduite() {
    this.myMap.setView(new L.LatLng(43.45267, 5.46163), 11);
  }

  public finConduite() {
    this.myMap.setView(new L.LatLng(43.192163, 5.51527), 11);
  }

  public centerOn(crassier: any) {
    this.myMap.setView(new L.LatLng(crassier.pos[0], crassier.pos[1]), 12);
  }

  public getConduite() {
    this.http.get<any>("/assets/data.json").subscribe(result => {
      let latlngs = result.conduite;

      // ajouter un polygone
      const conduite = L.polyline(latlngs, { color: "red" }).addTo(this.myMap);
      conduite.bindTooltip("Conduite Alteo");
    });
  }
}

// doc : http://leafletjs.com/examples/quick-start/
