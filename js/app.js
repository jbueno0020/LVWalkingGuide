/**
 * Las Vegas Strip Walking Guide - Application
 */

document.addEventListener("DOMContentLoaded", () => {
  const pathfinder = new StripPathfinder(STRIP_DATA);

  // DOM references
  const fromSelect = document.getElementById("from-select");
  const toSelect = document.getElementById("to-select");
  const swapBtn = document.getElementById("swap-btn");
  const findRouteBtn = document.getElementById("find-route-btn");
  const optMonorail = document.getElementById("opt-monorail");
  const optTrams = document.getElementById("opt-trams");
  const optIndoor = document.getElementById("opt-indoor");
  const routeResults = document.getElementById("route-results");
  const stripMap = document.getElementById("strip-map");
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".tab-panel");

  // Initialize interactive Leaflet map
  const interactiveMap = new StripMap("leaflet-map", STRIP_DATA, pathfinder);
  stripMapInstance = interactiveMap;

  // Populate dropdowns with hotels sorted north to south
  const sortedHotels = [...STRIP_DATA.hotels]
    .filter((h) => h.gaming || h.id === "fashion-show" || h.id === "crystals")
    .sort((a, b) => a.position - b.position);

  function populateSelect(select) {
    select.innerHTML = '<option value="">-- Select a location --</option>';
    let currentZone = "";
    for (const hotel of sortedHotels) {
      if (hotel.zone !== currentZone) {
        if (currentZone) {
          const endOpt = document.createElement("option");
          endOpt.disabled = true;
          endOpt.textContent = "";
          select.appendChild(endOpt);
        }
        currentZone = hotel.zone;
        const groupLabel = document.createElement("option");
        groupLabel.disabled = true;
        groupLabel.textContent = `\u2501\u2501 ${currentZone.toUpperCase()} STRIP \u2501\u2501`;
        groupLabel.style.fontWeight = "bold";
        select.appendChild(groupLabel);
      }
      const opt = document.createElement("option");
      opt.value = hotel.id;
      opt.textContent = `${hotel.name} (${hotel.side === "west" ? "W" : "E"})`;
      select.appendChild(opt);
    }
  }

  populateSelect(fromSelect);
  populateSelect(toSelect);

  // Swap button
  swapBtn.addEventListener("click", () => {
    const temp = fromSelect.value;
    fromSelect.value = toSelect.value;
    toSelect.value = temp;
  });

  // Find route
  findRouteBtn.addEventListener("click", () => {
    const fromId = fromSelect.value;
    const toId = toSelect.value;

    if (!fromId || !toId) {
      routeResults.innerHTML =
        '<p class="error">Please select both a starting point and a destination.</p>';
      return;
    }

    if (fromId === toId) {
      routeResults.innerHTML =
        '<p class="error">You are already there!</p>';
      return;
    }

    const route = pathfinder.findRoute(fromId, toId, {
      useMonorail: optMonorail.checked,
      useTrams: optTrams.checked,
      preferIndoor: optIndoor.checked,
    });

    if (!route) {
      routeResults.innerHTML =
        '<p class="error">No route found with current options. Try enabling more transport options.</p>';
      return;
    }

    renderRoute(route);
    highlightRouteOnMap(route);

    // Show route on interactive map
    interactiveMap.showRoute(route);

    // Switch to interactive map tab and scroll to it
    document.querySelector('[data-tab="tab-interactive-map"]').click();
  });

  function renderRoute(route) {
    const fromHotel = STRIP_DATA.hotels.find((h) => h.id === route.from);
    const toHotel = STRIP_DATA.hotels.find((h) => h.id === route.to);

    let html = `
      <div class="route-header">
        <h3>${fromHotel.name} &rarr; ${toHotel.name}</h3>
        <div class="route-summary">
          <span class="route-time">${route.totalMinutes} min</span>
          <span class="route-steps">${route.steps.length} step${route.steps.length !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <div class="route-steps-list">
    `;

    // Count connection types used
    const typesUsed = new Set(route.steps.map((s) => s.connection.type));

    route.steps.forEach((step, i) => {
      const fromName = pathfinder._hotelName(step.from);
      const toName = pathfinder._hotelName(step.to);
      const icon = StripPathfinder.connectionIcon(step.connection.type);
      const label = StripPathfinder.connectionLabel(step.connection.type);
      const typeClass = step.connection.type.replace("_", "-");

      const directionsHtml = step.connection.directions
        ? `<ol class="step-directions">${step.connection.directions.map((d) => `<li>${d}</li>`).join("")}</ol>`
        : "";

      html += `
        <div class="route-step connection-${typeClass}">
          <div class="step-number">${i + 1}</div>
          <div class="step-details">
            <div class="step-header">
              <span class="step-icon">${icon}</span>
              <span class="step-label">${label}</span>
              <span class="step-time">${step.connection.walkMinutes} min</span>
            </div>
            <div class="step-from-to">${fromName} &rarr; ${toName}</div>
            <div class="step-description">${step.connection.description}</div>
            ${directionsHtml}
            ${step.connection.cost ? `<div class="step-cost">Cost: $${step.connection.cost}</div>` : ""}
            ${step.connection.hours ? `<div class="step-hours">Hours: ${step.connection.hours}</div>` : ""}
          </div>
        </div>
      `;
    });

    html += "</div>";

    // Legend of connection types used
    html += '<div class="route-legend"><strong>Route uses:</strong> ';
    for (const type of typesUsed) {
      html += `<span class="legend-item connection-${type.replace("_", "-")}">${StripPathfinder.connectionIcon(type)} ${StripPathfinder.connectionLabel(type)}</span> `;
    }
    html += "</div>";

    routeResults.innerHTML = html;
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");

      // Leaflet needs a resize when its container becomes visible
      if (btn.dataset.tab === "tab-interactive-map") {
        setTimeout(() => interactiveMap.invalidateSize(), 100);
      }
    });
  });

  // Build the visual strip map
  buildStripMap();

  // Build transit info panels
  buildTransitInfo();

  // Build tips section
  buildTips();

  function buildStripMap() {
    const allHotels = [...STRIP_DATA.hotels].sort(
      (a, b) => a.position - b.position
    );

    let currentZone = "";
    let html = "";

    for (const hotel of allHotels) {
      if (hotel.zone !== currentZone) {
        if (currentZone) html += "</div>";
        currentZone = hotel.zone;
        html += `<div class="map-zone"><div class="zone-label">${currentZone.toUpperCase()} STRIP</div>`;
      }

      const sideClass = hotel.side;
      const gamingClass = hotel.gaming ? "gaming" : "non-gaming";
      const connections = pathfinder.getConnections(hotel.id);
      const transit = pathfinder.getTransitOptions(hotel.id);
      const indoorConnections = connections.filter(
        (c) => c.type === "indoor_walkway"
      );
      const hasTransit = transit.length > 0;

      html += `
        <div class="map-hotel ${sideClass} ${gamingClass}" data-id="${hotel.id}" title="${hotel.name}">
          <div class="hotel-marker">
            <span class="hotel-name">${hotel.name}</span>
            <span class="hotel-side-badge">${hotel.side === "west" ? "W" : "E"}</span>
            ${hasTransit ? '<span class="transit-badge" title="Transit available">T</span>' : ""}
          </div>
          <div class="hotel-details-popup">
            <h4>${hotel.name}</h4>
            <p>${hotel.description}</p>
            <p class="hotel-meta">
              <span>${hotel.side.toUpperCase()} side</span> |
              <span>${hotel.zone.toUpperCase()} Strip</span>
              ${hotel.gaming ? ' | <span>Casino</span>' : ""}
            </p>
            ${
              indoorConnections.length > 0
                ? `<div class="hotel-connections">
                <strong>Indoor walkways to:</strong>
                <ul>${indoorConnections.map((c) => `<li>${c.toName} (${c.minutes} min)</li>`).join("")}</ul>
              </div>`
                : ""
            }
            ${
              transit.length > 0
                ? `<div class="hotel-transit">
                <strong>Transit:</strong>
                <ul>${transit.map((t) => `<li>${t.name}${t.station ? ` - ${t.station}` : ""} ${t.type === "monorail" ? "($)" : "(free)"}</li>`).join("")}</ul>
              </div>`
                : ""
            }
          </div>
        </div>
      `;
    }
    html += "</div>";

    stripMap.innerHTML = html;

    // Click handlers for hotel cards
    document.querySelectorAll(".map-hotel").forEach((el) => {
      el.addEventListener("click", (e) => {
        // Toggle popup
        const wasActive = el.classList.contains("active");
        document.querySelectorAll(".map-hotel.active").forEach((h) => h.classList.remove("active"));
        if (!wasActive) {
          el.classList.add("active");
        }
      });
    });
  }

  function highlightRouteOnMap(route) {
    // Clear previous highlights on text layout
    document.querySelectorAll(".map-hotel").forEach((el) => {
      el.classList.remove("route-highlight", "route-start", "route-end");
    });

    // Highlight start
    const startEl = document.querySelector(`[data-id="${route.from}"]`);
    if (startEl) startEl.classList.add("route-highlight", "route-start");

    // Highlight end
    const endEl = document.querySelector(`[data-id="${route.to}"]`);
    if (endEl) endEl.classList.add("route-highlight", "route-end");

    // Highlight intermediate stops
    for (const step of route.steps) {
      const fromEl = document.querySelector(`[data-id="${step.from}"]`);
      const toEl = document.querySelector(`[data-id="${step.to}"]`);
      if (fromEl) fromEl.classList.add("route-highlight");
      if (toEl) toEl.classList.add("route-highlight");
    }
  }

  function buildTransitInfo() {
    const panel = document.getElementById("tab-transit");
    let html = "";

    // Monorail section
    html += `
      <div class="transit-section">
        <h3>\u{1F69D} Las Vegas Monorail (Paid)</h3>
        <p class="transit-meta">${STRIP_DATA.monorail.cost}</p>
        <p class="transit-meta">${STRIP_DATA.monorail.hours}</p>
        <p>Runs on the <strong>EAST</strong> side of the Strip. Stations are behind the hotels, not on Las Vegas Blvd.</p>
        <div class="transit-stops">
          <strong>Stations (north to south):</strong>
          <ol reversed>
    `;
    for (const station of [...STRIP_DATA.monorail.stations].reverse()) {
      html += `<li><strong>${station.name}</strong>${station.boarding ? `<p class="boarding-info">${station.boarding}</p>` : ""}</li>`;
    }
    html += `
          </ol>
        </div>
      </div>
    `;

    // Free trams section
    html += '<div class="transit-section"><h3>\u{1F68B} Free Trams</h3>';
    for (const tram of STRIP_DATA.freeTrams) {
      const isClosed = tram.hours.includes("CLOSED");
      let boardingHtml = "";
      if (tram.boarding) {
        boardingHtml = '<div class="boarding-details"><strong>Boarding Instructions:</strong><ul>';
        for (const [stopId, instructions] of Object.entries(tram.boarding)) {
          boardingHtml += `<li><strong>${pathfinder._hotelName(stopId)}:</strong> ${instructions}</li>`;
        }
        boardingHtml += "</ul></div>";
      }
      html += `
        <div class="tram-card ${isClosed ? "closed" : ""}">
          <h4>${tram.name} ${isClosed ? "(CLOSED)" : ""}</h4>
          <p><strong>Hours:</strong> ${tram.hours}</p>
          <p><strong>Stops:</strong> ${tram.stops.map((s) => pathfinder._hotelName(s)).join(" \u2192 ")}</p>
          ${tram.note ? `<p class="tram-note">${tram.note}</p>` : ""}
          ${boardingHtml}
        </div>
      `;
    }
    html += "</div>";

    // Pedestrian bridges section
    html += '<div class="transit-section"><h3>\u{1F309} Pedestrian Bridges</h3>';
    html +=
      "<p>Overhead walkways crossing Las Vegas Blvd. Accessible via escalators and elevators.</p>";
    for (const bridge of STRIP_DATA.pedestrianBridges) {
      html += `
        <div class="bridge-card">
          <h4>${bridge.name}</h4>
          <p><strong>Location:</strong> ${bridge.location}</p>
          <p><strong>Type:</strong> ${bridge.type === "four-corner" ? "Four-corner intersection" : "Direct bridge"}</p>
          <p><strong>Connects:</strong> ${bridge.connects.map((id) => pathfinder._hotelName(id)).join(", ")}</p>
          <p>${bridge.description}</p>
          ${bridge.landmarks ? `<p class="bridge-landmarks"><strong>How to find it:</strong> ${bridge.landmarks}</p>` : ""}
        </div>
      `;
    }
    html += "</div>";

    panel.innerHTML = html;
  }

  function buildTips() {
    const panel = document.getElementById("tab-tips");
    let html = "<h3>Tips for Walking the Strip</h3><ul class='tips-list'>";
    for (const tip of STRIP_DATA.tips) {
      html += `<li>${tip}</li>`;
    }
    html += "</ul>";
    panel.innerHTML = html;
  }
});
