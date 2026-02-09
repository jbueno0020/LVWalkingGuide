/**
 * Las Vegas Strip Walking Guide - Pathfinder
 *
 * Uses Dijkstra's algorithm to find the best walking route between
 * any two locations on the Strip. Supports filtering by connection
 * type (e.g., avoid paid monorail, prefer indoor routes).
 */

class StripPathfinder {
  constructor(data) {
    this.data = data;
    this.graph = this._buildGraph();
  }

  _buildGraph() {
    const graph = {};

    for (const hotel of this.data.hotels) {
      graph[hotel.id] = [];
    }

    for (const conn of this.data.connections) {
      // Add bidirectional edges (unless it's a one-way tram)
      if (graph[conn.from]) {
        graph[conn.from].push({
          to: conn.to,
          weight: conn.walkMinutes,
          connection: conn,
        });
      }
      if (graph[conn.to]) {
        graph[conn.to].push({
          to: conn.from,
          weight: conn.walkMinutes,
          connection: conn,
        });
      }
    }

    return graph;
  }

  /**
   * Find the shortest path between two locations.
   *
   * @param {string} fromId - Starting hotel ID
   * @param {string} toId - Destination hotel ID
   * @param {object} options - Route preferences
   * @param {boolean} options.useMonorail - Include monorail connections (default: true)
   * @param {boolean} options.useTrams - Include free tram connections (default: true)
   * @param {boolean} options.preferIndoor - Weight outdoor routes higher (default: false)
   * @returns {object} Route with steps, total time, and connection details
   */
  findRoute(fromId, toId, options = {}) {
    const {
      useMonorail = true,
      useTrams = true,
      preferIndoor = false,
    } = options;

    if (fromId === toId) {
      return { steps: [], totalMinutes: 0, from: fromId, to: toId };
    }

    // Dijkstra's algorithm
    const distances = {};
    const previous = {};
    const previousEdge = {};
    const visited = new Set();
    const queue = [];

    for (const id of Object.keys(this.graph)) {
      distances[id] = Infinity;
    }
    distances[fromId] = 0;
    queue.push({ id: fromId, distance: 0 });

    while (queue.length > 0) {
      // Get node with smallest distance
      queue.sort((a, b) => a.distance - b.distance);
      const current = queue.shift();

      if (visited.has(current.id)) continue;
      visited.add(current.id);

      if (current.id === toId) break;

      const neighbors = this.graph[current.id] || [];
      for (const edge of neighbors) {
        if (visited.has(edge.to)) continue;

        // Filter by transport preferences
        if (!useMonorail && edge.connection.type === "monorail") continue;
        if (!useTrams && edge.connection.type === "free_tram") continue;

        let weight = edge.weight;

        // If preferring indoor, penalize outdoor sidewalk connections
        if (preferIndoor && edge.connection.type === "sidewalk") {
          weight = weight * 1.5;
        }

        const newDist = distances[current.id] + weight;
        if (newDist < distances[edge.to]) {
          distances[edge.to] = newDist;
          previous[edge.to] = current.id;
          previousEdge[edge.to] = edge.connection;
          queue.push({ id: edge.to, distance: newDist });
        }
      }
    }

    // Reconstruct path
    if (distances[toId] === Infinity) {
      return null; // No route found
    }

    const steps = [];
    let currentId = toId;
    while (currentId !== fromId) {
      steps.unshift({
        from: previous[currentId],
        to: currentId,
        connection: previousEdge[currentId],
      });
      currentId = previous[currentId];
    }

    return {
      steps,
      totalMinutes: Math.round(distances[toId]),
      from: fromId,
      to: toId,
    };
  }

  /**
   * Get all direct connections from a hotel.
   */
  getConnections(hotelId) {
    return (this.graph[hotelId] || []).map((edge) => ({
      to: edge.to,
      toName: this._hotelName(edge.to),
      type: edge.connection.type,
      minutes: edge.weight,
      description: edge.connection.description,
    }));
  }

  /**
   * Find which tram/monorail routes serve a hotel.
   */
  getTransitOptions(hotelId) {
    const options = [];

    // Check monorail stations
    for (const station of this.data.monorail.stations) {
      if (
        station.id === hotelId ||
        station.nearbyHotels.includes(hotelId)
      ) {
        options.push({
          type: "monorail",
          name: "Las Vegas Monorail",
          station: station.name,
          cost: this.data.monorail.cost,
          hours: this.data.monorail.hours,
        });
        break;
      }
    }

    // Check free trams
    for (const tram of this.data.freeTrams) {
      if (tram.stops.includes(hotelId)) {
        options.push({
          type: "free_tram",
          name: tram.name,
          stops: tram.stops.map((s) => this._hotelName(s)),
          hours: tram.hours,
          note: tram.note,
        });
      }
    }

    return options;
  }

  _hotelName(id) {
    const hotel = this.data.hotels.find((h) => h.id === id);
    return hotel ? hotel.name : id;
  }

  /**
   * Get a human-readable label for a connection type.
   */
  static connectionLabel(type) {
    const labels = {
      indoor_walkway: "Indoor Walkway",
      pedestrian_bridge: "Pedestrian Bridge",
      free_tram: "Free Tram",
      monorail: "Monorail",
      sidewalk: "Sidewalk",
    };
    return labels[type] || type;
  }

  /**
   * Get an icon/emoji for a connection type.
   */
  static connectionIcon(type) {
    const icons = {
      indoor_walkway: "\u{1F3E2}",
      pedestrian_bridge: "\u{1F309}",
      free_tram: "\u{1F68B}",
      monorail: "\u{1F69D}",
      sidewalk: "\u{1F6B6}",
    };
    return icons[type] || "";
  }
}
