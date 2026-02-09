/**
 * Las Vegas Strip Walking Guide - Interactive Map
 *
 * Leaflet-based map showing hotels, connections, and animated routes.
 */

class StripMap {
  constructor(containerId, data, pathfinder) {
    this.data = data;
    this.pathfinder = pathfinder;
    this.markers = {};
    this.connectionLines = [];
    this.routeLines = [];
    this.routeMarkers = [];

    // Center of the Strip (approx Flamingo Rd & LV Blvd)
    this.map = L.map(containerId, {
      center: [36.1155, -115.1725],
      zoom: 15,
      minZoom: 13,
      maxZoom: 18,
      zoomControl: true,
    });

    // Dark-themed tile layer
    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(this.map);

    this._addHotelMarkers();
    this._addConnectionLines();
    this._addLegend();
  }

  _getMarkerColor(hotel) {
    if (!hotel.gaming) return "#7f8c8d";
    switch (hotel.zone) {
      case "north": return "#3498db";
      case "mid": return "#c8a84e";
      case "south": return "#e94560";
      default: return "#c8a84e";
    }
  }

  _createHotelIcon(hotel, isRouteStop) {
    const color = isRouteStop ? "#27ae60" : this._getMarkerColor(hotel);
    const size = isRouteStop ? 12 : 8;
    const borderColor = isRouteStop ? "#fff" : "rgba(255,255,255,0.6)";
    const borderWidth = isRouteStop ? 3 : 2;

    return L.divIcon({
      className: "hotel-map-marker",
      html: `<div style="
        width: ${size * 2}px;
        height: ${size * 2}px;
        background: ${color};
        border: ${borderWidth}px solid ${borderColor};
        border-radius: 50%;
        box-shadow: 0 0 ${isRouteStop ? 12 : 6}px ${color}80;
      "></div>`,
      iconSize: [size * 2, size * 2],
      iconAnchor: [size, size],
    });
  }

  _addHotelMarkers() {
    for (const hotel of this.data.hotels) {
      if (!hotel.lat || !hotel.lng) continue;

      const icon = this._createHotelIcon(hotel, false);
      const marker = L.marker([hotel.lat, hotel.lng], { icon })
        .addTo(this.map);

      // Build popup content
      const connections = this.pathfinder.getConnections(hotel.id);
      const transit = this.pathfinder.getTransitOptions(hotel.id);
      const indoorConns = connections.filter((c) => c.type === "indoor_walkway");

      let popupHtml = `
        <div class="map-popup">
          <h4>${hotel.name}</h4>
          <p class="popup-desc">${hotel.description}</p>
          <p class="popup-meta">
            ${hotel.side.toUpperCase()} side | ${hotel.zone.toUpperCase()} Strip
            ${hotel.gaming ? " | Casino" : ""}
          </p>
      `;

      if (indoorConns.length > 0) {
        popupHtml += `<div class="popup-section"><strong>Indoor walkways:</strong><ul>`;
        for (const c of indoorConns) {
          popupHtml += `<li>${c.toName} (${c.minutes} min)</li>`;
        }
        popupHtml += `</ul></div>`;
      }

      if (transit.length > 0) {
        popupHtml += `<div class="popup-section"><strong>Transit:</strong><ul>`;
        for (const t of transit) {
          popupHtml += `<li>${t.name} ${t.type === "monorail" ? "($)" : "(free)"}</li>`;
        }
        popupHtml += `</ul></div>`;
      }

      popupHtml += `
        <div class="popup-actions">
          <button onclick="stripMapInstance.setAsStart('${hotel.id}')">Set as Start</button>
          <button onclick="stripMapInstance.setAsDestination('${hotel.id}')">Set as Destination</button>
        </div>
      </div>`;

      marker.bindPopup(popupHtml, { maxWidth: 280, className: "dark-popup" });

      // Add permanent label
      marker.bindTooltip(hotel.name, {
        permanent: false,
        direction: hotel.side === "west" ? "left" : "right",
        className: "hotel-tooltip",
        offset: hotel.side === "west" ? [-12, 0] : [12, 0],
      });

      this.markers[hotel.id] = marker;
    }
  }

  _getConnectionLineStyle(type) {
    switch (type) {
      case "indoor_walkway":
        return { color: "#27ae60", weight: 3, opacity: 0.6, dashArray: null };
      case "pedestrian_bridge":
        return { color: "#e67e22", weight: 3, opacity: 0.6, dashArray: "8, 6" };
      case "free_tram":
        return { color: "#8e44ad", weight: 3, opacity: 0.6, dashArray: "4, 8" };
      case "monorail":
        return { color: "#2980b9", weight: 3, opacity: 0.5, dashArray: "12, 6" };
      case "sidewalk":
        return { color: "#555", weight: 1.5, opacity: 0.3, dashArray: "2, 4" };
      default:
        return { color: "#888", weight: 1, opacity: 0.3 };
    }
  }

  _addConnectionLines() {
    // Group connections to avoid duplicates
    const drawn = new Set();

    for (const conn of this.data.connections) {
      const key = [conn.from, conn.to].sort().join("-") + "-" + conn.type;
      if (drawn.has(key)) continue;
      drawn.add(key);

      const fromHotel = this.data.hotels.find((h) => h.id === conn.from);
      const toHotel = this.data.hotels.find((h) => h.id === conn.to);
      if (!fromHotel?.lat || !toHotel?.lat) continue;

      // Skip sidewalk lines by default (too cluttered)
      if (conn.type === "sidewalk") continue;

      const style = this._getConnectionLineStyle(conn.type);
      const line = L.polyline(
        [[fromHotel.lat, fromHotel.lng], [toHotel.lat, toHotel.lng]],
        style
      ).addTo(this.map);

      const label = StripPathfinder.connectionLabel(conn.type);
      line.bindTooltip(`${label}: ${fromHotel.name} ↔ ${toHotel.name}`, {
        sticky: true,
        className: "connection-tooltip",
      });

      this.connectionLines.push(line);
    }
  }

  _addLegend() {
    const legend = L.control({ position: "bottomright" });

    legend.onAdd = () => {
      const div = L.DomUtil.create("div", "map-legend");
      div.innerHTML = `
        <h4>Connections</h4>
        <div class="legend-row"><span class="legend-line" style="background:#27ae60"></span> Indoor Walkway</div>
        <div class="legend-row"><span class="legend-line dashed" style="background:#e67e22"></span> Pedestrian Bridge</div>
        <div class="legend-row"><span class="legend-line dashed-short" style="background:#8e44ad"></span> Free Tram</div>
        <div class="legend-row"><span class="legend-line dashed-long" style="background:#2980b9"></span> Monorail ($)</div>
        <h4>Zones</h4>
        <div class="legend-row"><span class="legend-dot" style="background:#3498db"></span> North Strip</div>
        <div class="legend-row"><span class="legend-dot" style="background:#c8a84e"></span> Mid Strip</div>
        <div class="legend-row"><span class="legend-dot" style="background:#e94560"></span> South Strip</div>
      `;
      return div;
    };

    legend.addTo(this.map);
  }

  /**
   * Display a route on the map with animated step-by-step segments.
   */
  showRoute(route) {
    this.clearRoute();

    if (!route || route.steps.length === 0) return;

    const allPoints = [];

    // Collect all hotel IDs in the route
    const routeHotelIds = new Set();
    routeHotelIds.add(route.from);
    routeHotelIds.add(route.to);
    for (const step of route.steps) {
      routeHotelIds.add(step.from);
      routeHotelIds.add(step.to);
    }

    // Draw each step as a colored line
    route.steps.forEach((step, index) => {
      const fromHotel = this.data.hotels.find((h) => h.id === step.from);
      const toHotel = this.data.hotels.find((h) => h.id === step.to);
      if (!fromHotel?.lat || !toHotel?.lat) return;

      const from = [fromHotel.lat, fromHotel.lng];
      const to = [toHotel.lat, toHotel.lng];

      if (index === 0) allPoints.push(from);
      allPoints.push(to);

      // White outline for visibility
      const outline = L.polyline([from, to], {
        color: "#ffffff",
        weight: 8,
        opacity: 0.3,
      }).addTo(this.map);
      this.routeLines.push(outline);

      // Colored route line
      const style = this._getConnectionLineStyle(step.connection.type);
      const routeLine = L.polyline([from, to], {
        color: style.color,
        weight: 6,
        opacity: 0.9,
        dashArray: style.dashArray,
      }).addTo(this.map);

      const label = StripPathfinder.connectionLabel(step.connection.type);
      routeLine.bindTooltip(
        `Step ${index + 1}: ${label} (${step.connection.walkMinutes} min)`,
        { sticky: true, className: "route-tooltip" }
      );

      this.routeLines.push(routeLine);

      // Step number marker at midpoint
      const midLat = (fromHotel.lat + toHotel.lat) / 2;
      const midLng = (fromHotel.lng + toHotel.lng) / 2;
      const stepMarker = L.marker([midLat, midLng], {
        icon: L.divIcon({
          className: "step-number-marker",
          html: `<div class="step-num">${index + 1}</div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        }),
      }).addTo(this.map);
      this.routeMarkers.push(stepMarker);
    });

    // Highlight start and end with special markers
    const startHotel = this.data.hotels.find((h) => h.id === route.from);
    const endHotel = this.data.hotels.find((h) => h.id === route.to);

    if (startHotel?.lat) {
      const startMarker = L.marker([startHotel.lat, startHotel.lng], {
        icon: L.divIcon({
          className: "route-endpoint-marker",
          html: `<div class="endpoint start-marker">START</div>`,
          iconSize: [50, 20],
          iconAnchor: [25, 30],
        }),
      }).addTo(this.map);
      this.routeMarkers.push(startMarker);
    }

    if (endHotel?.lat) {
      const endMarker = L.marker([endHotel.lat, endHotel.lng], {
        icon: L.divIcon({
          className: "route-endpoint-marker",
          html: `<div class="endpoint end-marker">END</div>`,
          iconSize: [50, 20],
          iconAnchor: [25, 30],
        }),
      }).addTo(this.map);
      this.routeMarkers.push(endMarker);
    }

    // Fit map to show entire route
    if (allPoints.length > 0) {
      const bounds = L.latLngBounds(allPoints);
      this.map.fitBounds(bounds, { padding: [60, 60], maxZoom: 16 });
    }
  }

  clearRoute() {
    for (const line of this.routeLines) {
      this.map.removeLayer(line);
    }
    for (const marker of this.routeMarkers) {
      this.map.removeLayer(marker);
    }
    this.routeLines = [];
    this.routeMarkers = [];
  }

  setAsStart(hotelId) {
    const select = document.getElementById("from-select");
    if (select) {
      select.value = hotelId;
      this.map.closePopup();
    }
  }

  setAsDestination(hotelId) {
    const select = document.getElementById("to-select");
    if (select) {
      select.value = hotelId;
      this.map.closePopup();
    }
  }

  /**
   * Pan and zoom to a specific hotel.
   */
  focusHotel(hotelId) {
    const marker = this.markers[hotelId];
    if (marker) {
      this.map.setView(marker.getLatLng(), 17, { animate: true });
      marker.openPopup();
    }
  }

  /**
   * Resize map when container becomes visible (needed for tabs).
   */
  invalidateSize() {
    this.map.invalidateSize();
  }
}

// Global reference for popup button callbacks
let stripMapInstance = null;
