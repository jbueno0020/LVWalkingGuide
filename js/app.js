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
  const waypointsList = document.getElementById("waypoints-list");
  const addStopBtn = document.getElementById("add-stop-btn");
  const locateBtn = document.getElementById("locate-btn");
  const routeActions = document.getElementById("route-actions");
  const shareBtn = document.getElementById("share-btn");
  const saveBtn = document.getElementById("save-btn");
  const savedRoutesSection = document.getElementById("saved-routes-section");
  const savedRoutesList = document.getElementById("saved-routes-list");

  // State
  let waypoints = [];
  let currentRoute = null;
  let currentMultiRoute = null;

  // Initialize interactive Leaflet map
  const interactiveMap = new StripMap("leaflet-map", STRIP_DATA, pathfinder);
  stripMapInstance = interactiveMap;

  // Populate dropdowns with hotels sorted north to south
  const sortedHotels = [...STRIP_DATA.hotels]
    .filter((h) => h.gaming || h.id === "fashion-show" || h.id === "crystals")
    .sort((a, b) => a.position - b.position);

  function populateSelect(select, includeEmpty = true) {
    select.innerHTML = includeEmpty ? '<option value="">-- Select a location --</option>' : "";
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

  // === WAYPOINTS (Multi-Stop) ===
  addStopBtn.addEventListener("click", () => {
    addWaypoint();
  });

  function addWaypoint(value = "") {
    const index = waypoints.length;
    waypoints.push(value);

    const div = document.createElement("div");
    div.className = "waypoint-row";
    div.dataset.index = index;

    const label = document.createElement("label");
    label.textContent = `Stop ${index + 1}`;
    label.className = "waypoint-label";

    const select = document.createElement("select");
    select.className = "waypoint-select";
    populateSelect(select);
    if (value) select.value = value;

    select.addEventListener("change", () => {
      waypoints[index] = select.value;
    });

    const removeBtn = document.createElement("button");
    removeBtn.className = "waypoint-remove";
    removeBtn.textContent = "\u00D7";
    removeBtn.title = "Remove stop";
    removeBtn.addEventListener("click", () => {
      waypoints.splice(index, 1);
      rebuildWaypoints();
    });

    div.appendChild(label);
    div.appendChild(select);
    div.appendChild(removeBtn);
    waypointsList.appendChild(div);
  }

  function rebuildWaypoints() {
    const savedValues = [...waypoints];
    waypointsList.innerHTML = "";
    waypoints = [];
    for (const val of savedValues) {
      addWaypoint(val);
    }
  }

  // === GEOLOCATION ===
  locateBtn.addEventListener("click", () => {
    if (!navigator.geolocation) {
      showNotification("Geolocation is not supported by your browser.");
      return;
    }

    locateBtn.disabled = true;
    locateBtn.textContent = "Locating...";

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = pathfinder.findNearestHotel(latitude, longitude);

        if (nearest) {
          fromSelect.value = nearest.hotel.id;
          const distFt = Math.round(nearest.distanceMiles * 5280);
          showNotification(
            `Nearest: ${nearest.hotel.name} (${distFt < 1000 ? distFt + " ft" : nearest.distanceMiles.toFixed(2) + " mi"} away)`
          );
        } else {
          showNotification("Could not determine nearest hotel.");
        }

        locateBtn.disabled = false;
        locateBtn.innerHTML = '<span class="locate-icon">&#x1F4CD;</span> Near Me';
      },
      () => {
        showNotification("Unable to get your location. Please check permissions.");
        locateBtn.disabled = false;
        locateBtn.innerHTML = '<span class="locate-icon">&#x1F4CD;</span> Near Me';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  });

  // === FIND ROUTE ===
  findRouteBtn.addEventListener("click", () => {
    const fromId = fromSelect.value;
    const toId = toSelect.value;

    if (!fromId || !toId) {
      routeResults.innerHTML =
        '<p class="error">Please select both a starting point and a destination.</p>';
      routeActions.style.display = "none";
      return;
    }

    if (fromId === toId && waypoints.filter((w) => w).length === 0) {
      routeResults.innerHTML =
        '<p class="error">You are already there!</p>';
      routeActions.style.display = "none";
      return;
    }

    const options = {
      useMonorail: optMonorail.checked,
      useTrams: optTrams.checked,
      preferIndoor: optIndoor.checked,
    };

    // Build list of all stops
    const validWaypoints = waypoints.filter((w) => w);
    const allStops = [fromId, ...validWaypoints, toId];

    if (allStops.length > 2) {
      // Multi-stop route
      const multiRoute = pathfinder.findMultiStopRoute(allStops, options);
      if (!multiRoute) {
        routeResults.innerHTML =
          '<p class="error">No route found with current options. Try enabling more transport options.</p>';
        routeActions.style.display = "none";
        return;
      }
      currentMultiRoute = multiRoute;
      currentRoute = null;
      renderMultiStopRoute(multiRoute);

      // Show the first segment on the map, then fit all
      interactiveMap.showMultiStopRoute(multiRoute);
    } else {
      // Single A→B route
      const route = pathfinder.findRoute(fromId, toId, options);
      if (!route) {
        routeResults.innerHTML =
          '<p class="error">No route found with current options. Try enabling more transport options.</p>';
        routeActions.style.display = "none";
        return;
      }
      route.distance = pathfinder._estimateDistance(route);
      currentRoute = route;
      currentMultiRoute = null;
      renderRoute(route);
      highlightRouteOnMap(route);
      interactiveMap.showRoute(route);
    }

    routeActions.style.display = "flex";

    // Switch to interactive map tab
    document.querySelector('[data-tab="tab-interactive-map"]').click();
  });

  function formatDistance(miles) {
    if (miles < 0.1) {
      return Math.round(miles * 5280) + " ft";
    }
    return miles.toFixed(2) + " mi";
  }

  function renderRoute(route) {
    const fromHotel = STRIP_DATA.hotels.find((h) => h.id === route.from);
    const toHotel = STRIP_DATA.hotels.find((h) => h.id === route.to);

    let html = `
      <div class="route-header">
        <h3>${fromHotel.name} &rarr; ${toHotel.name}</h3>
        <div class="route-summary">
          <span class="route-time">${route.totalMinutes} min</span>
          <span class="route-distance">${formatDistance(route.distance)}</span>
          <span class="route-steps">${route.steps.length} step${route.steps.length !== 1 ? "s" : ""}</span>
        </div>
      </div>
      <div class="route-steps-list">
    `;

    const typesUsed = new Set(route.steps.map((s) => s.connection.type));

    route.steps.forEach((step, i) => {
      html += renderStep(step, i);
    });

    html += "</div>";

    html += '<div class="route-legend"><strong>Route uses:</strong> ';
    for (const type of typesUsed) {
      html += `<span class="legend-item connection-${type.replace("_", "-")}">${StripPathfinder.connectionIcon(type)} ${StripPathfinder.connectionLabel(type)}</span> `;
    }
    html += "</div>";

    routeResults.innerHTML = html;
  }

  function renderMultiStopRoute(multiRoute) {
    let html = `
      <div class="route-header multi-route-header">
        <h3>Multi-Stop Itinerary (${multiRoute.stops.length} stops)</h3>
        <div class="route-summary">
          <span class="route-time">${multiRoute.totalMinutes} min total</span>
          <span class="route-distance">${formatDistance(multiRoute.totalDistance)}</span>
          <span class="route-steps">${multiRoute.totalSteps} step${multiRoute.totalSteps !== 1 ? "s" : ""}</span>
        </div>
      </div>
    `;

    multiRoute.segments.forEach((segment, segIdx) => {
      const fromHotel = STRIP_DATA.hotels.find((h) => h.id === segment.from);
      const toHotel = STRIP_DATA.hotels.find((h) => h.id === segment.to);

      html += `
        <div class="segment-header">
          <span class="segment-label">Leg ${segIdx + 1}</span>
          <span class="segment-route">${fromHotel.name} &rarr; ${toHotel.name}</span>
          <span class="segment-stats">${segment.totalMinutes} min &middot; ${formatDistance(segment.distance)}</span>
        </div>
        <div class="route-steps-list">
      `;

      segment.steps.forEach((step, i) => {
        html += renderStep(step, i);
      });

      html += "</div>";
    });

    routeResults.innerHTML = html;
  }

  function renderStep(step, i) {
    const fromName = pathfinder._hotelName(step.from);
    const toName = pathfinder._hotelName(step.to);
    const icon = StripPathfinder.connectionIcon(step.connection.type);
    const label = StripPathfinder.connectionLabel(step.connection.type);
    const typeClass = step.connection.type.replace("_", "-");

    const directionsHtml = step.connection.directions
      ? `<ol class="step-directions">${step.connection.directions.map((d) => `<li>${d}</li>`).join("")}</ol>`
      : "";

    return `
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
  }

  // Tab switching
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");

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

  // Load saved routes
  loadSavedRoutes();

  // Check URL for shared route
  loadRouteFromURL();

  // === SHARE ROUTE ===
  shareBtn.addEventListener("click", () => {
    const params = buildRouteParams();
    if (!params) return;

    const url = window.location.origin + window.location.pathname + "#" + params;

    if (navigator.share) {
      navigator.share({
        title: "Las Vegas Strip Walking Route",
        text: "Check out this walking route on the Las Vegas Strip!",
        url: url,
      }).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        showNotification("Route link copied to clipboard!");
      }).catch(() => {
        showNotification("Could not copy link.");
      });
    } else {
      prompt("Copy this link to share your route:", url);
    }
  });

  // === SAVE ROUTE ===
  saveBtn.addEventListener("click", () => {
    const params = buildRouteParams();
    if (!params) return;

    const saved = getSavedRoutes();
    const fromId = fromSelect.value;
    const toId = toSelect.value;
    const fromName = pathfinder._hotelName(fromId);
    const toName = pathfinder._hotelName(toId);
    const validWaypoints = waypoints.filter((w) => w);

    let name = `${fromName} \u2192 ${toName}`;
    if (validWaypoints.length > 0) {
      name = `${fromName} \u2192 ${validWaypoints.length} stop${validWaypoints.length > 1 ? "s" : ""} \u2192 ${toName}`;
    }

    // Avoid duplicates
    if (saved.some((r) => r.params === params)) {
      showNotification("Route already saved!");
      return;
    }

    saved.push({
      name,
      params,
      totalMinutes: currentMultiRoute ? currentMultiRoute.totalMinutes : currentRoute.totalMinutes,
      savedAt: Date.now(),
    });

    localStorage.setItem("lv-saved-routes", JSON.stringify(saved));
    saveBtn.querySelector("span").textContent = "\u2605";
    showNotification("Route saved!");
    loadSavedRoutes();
  });

  function buildRouteParams() {
    const fromId = fromSelect.value;
    const toId = toSelect.value;
    if (!fromId || !toId) return null;

    const validWaypoints = waypoints.filter((w) => w);
    const parts = [
      `from=${fromId}`,
      `to=${toId}`,
    ];
    if (validWaypoints.length > 0) {
      parts.push(`via=${validWaypoints.join(",")}`);
    }
    if (!optMonorail.checked) parts.push("monorail=0");
    if (!optTrams.checked) parts.push("trams=0");
    if (optIndoor.checked) parts.push("indoor=1");

    return parts.join("&");
  }

  function loadRouteFromURL() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const fromId = params.get("from");
    const toId = params.get("to");
    if (!fromId || !toId) return;

    fromSelect.value = fromId;
    toSelect.value = toId;

    if (params.get("monorail") === "0") optMonorail.checked = false;
    if (params.get("trams") === "0") optTrams.checked = false;
    if (params.get("indoor") === "1") optIndoor.checked = true;

    const via = params.get("via");
    if (via) {
      const stops = via.split(",").filter((s) => s);
      for (const stop of stops) {
        addWaypoint(stop);
      }
    }

    // Auto-search after loading
    setTimeout(() => findRouteBtn.click(), 300);
  }

  function getSavedRoutes() {
    try {
      return JSON.parse(localStorage.getItem("lv-saved-routes") || "[]");
    } catch {
      return [];
    }
  }

  function loadSavedRoutes() {
    const saved = getSavedRoutes();
    if (saved.length === 0) {
      savedRoutesSection.style.display = "none";
      return;
    }

    savedRoutesSection.style.display = "block";
    let html = "";

    for (let i = 0; i < saved.length; i++) {
      const route = saved[i];
      html += `
        <div class="saved-route-card">
          <div class="saved-route-info">
            <a href="#${route.params}" class="saved-route-name" data-params="${route.params}">${route.name}</a>
            <span class="saved-route-time">${route.totalMinutes} min</span>
          </div>
          <button class="saved-route-delete" data-index="${i}" title="Remove saved route">&times;</button>
        </div>
      `;
    }

    savedRoutesList.innerHTML = html;

    // Click handlers for saved route links
    savedRoutesList.querySelectorAll(".saved-route-name").forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.hash = link.dataset.params;
        // Clear existing waypoints
        waypoints = [];
        waypointsList.innerHTML = "";
        loadRouteFromURL();
      });
    });

    // Delete handlers
    savedRoutesList.querySelectorAll(".saved-route-delete").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = parseInt(btn.dataset.index);
        const saved = getSavedRoutes();
        saved.splice(idx, 1);
        localStorage.setItem("lv-saved-routes", JSON.stringify(saved));
        loadSavedRoutes();
        showNotification("Route removed.");
      });
    });
  }

  // === NOTIFICATION ===
  function showNotification(message) {
    let toast = document.getElementById("toast-notification");
    if (!toast) {
      toast = document.createElement("div");
      toast.id = "toast-notification";
      toast.className = "toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }

  // === STRIP MAP (text layout) ===
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

    document.querySelectorAll(".map-hotel").forEach((el) => {
      el.addEventListener("click", (e) => {
        const wasActive = el.classList.contains("active");
        document.querySelectorAll(".map-hotel.active").forEach((h) => h.classList.remove("active"));
        if (!wasActive) {
          el.classList.add("active");
        }
      });
    });
  }

  function highlightRouteOnMap(route) {
    document.querySelectorAll(".map-hotel").forEach((el) => {
      el.classList.remove("route-highlight", "route-start", "route-end");
    });

    const startEl = document.querySelector(`[data-id="${route.from}"]`);
    if (startEl) startEl.classList.add("route-highlight", "route-start");

    const endEl = document.querySelector(`[data-id="${route.to}"]`);
    if (endEl) endEl.classList.add("route-highlight", "route-end");

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
