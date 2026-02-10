/**
 * Las Vegas Strip Walking Guide - Data Layer
 *
 * All hotels are ordered north to south along the Strip.
 * Position values represent approximate relative position (0 = north end, 100 = south end).
 * Side: "west" = left/west side of Las Vegas Blvd, "east" = right/east side.
 */

const STRIP_DATA = {
  hotels: [
    // === NORTH STRIP ===
    { id: "strat", name: "The STRAT", side: "east", zone: "north", position: 2, gaming: true,
      lat: 36.1465, lng: -115.1558,
      description: "Northern anchor of the Strip. Known for its observation tower and thrill rides." },
    { id: "sahara", name: "Sahara Las Vegas", side: "east", zone: "north", position: 6, gaming: true,
      lat: 36.1437, lng: -115.1569,
      description: "Home to a Monorail station. Recently renovated with modern rooms and restaurants." },
    { id: "fontainebleau", name: "Fontainebleau Las Vegas", side: "east", zone: "north", position: 9, gaming: true,
      lat: 36.1382, lng: -115.1578,
      description: "Luxury megaresort with 3,700+ rooms. Opened in 2023." },
    { id: "circus-circus", name: "Circus Circus", side: "west", zone: "north", position: 10, gaming: true,
      lat: 36.1367, lng: -115.1630,
      description: "Family-friendly classic with the Adventuredome theme park." },
    { id: "resorts-world", name: "Resorts World", side: "west", zone: "north", position: 14, gaming: true,
      lat: 36.1333, lng: -115.1665,
      description: "Massive resort complex featuring Hilton, Conrad, and Crockfords brands." },
    { id: "encore", name: "Encore at Wynn", side: "east", zone: "north", position: 18, gaming: true,
      lat: 36.1286, lng: -115.1652,
      description: "Luxury sister property to Wynn with its own pool deck and nightlife." },
    { id: "wynn", name: "Wynn Las Vegas", side: "east", zone: "north", position: 20, gaming: true,
      lat: 36.1265, lng: -115.1657,
      description: "Five-star luxury resort known for impeccable service and a championship golf course." },
    { id: "fashion-show", name: "Fashion Show Mall", side: "west", zone: "north", position: 21, gaming: false,
      lat: 36.1268, lng: -115.1715,
      description: "Major shopping destination with runway shows. Not a hotel but a key landmark." },

    // === MID STRIP ===
    { id: "treasure-island", name: "Treasure Island (TI)", side: "west", zone: "mid", position: 24, gaming: true,
      lat: 36.1245, lng: -115.1723,
      description: "Independently owned resort on the west side with a prime mid-Strip location." },
    { id: "venetian", name: "The Venetian", side: "east", zone: "mid", position: 25, gaming: true,
      lat: 36.1211, lng: -115.1693,
      description: "Italian-themed all-suite resort. Connected to The Palazzo via Grand Canal Shoppes." },
    { id: "palazzo", name: "The Palazzo", side: "east", zone: "mid", position: 27, gaming: true,
      lat: 36.1230, lng: -115.1682,
      description: "Luxury all-suite tower connected to The Venetian." },
    { id: "mirage", name: "The Mirage (Hard Rock - under renovation)", side: "west", zone: "mid", position: 28, gaming: false,
      lat: 36.1215, lng: -115.1745,
      description: "Currently closed for conversion to Hard Rock Hotel & Casino. Expected to reopen as a guitar-shaped tower." },
    { id: "harrahs", name: "Harrah's Las Vegas", side: "east", zone: "mid", position: 31, gaming: true,
      lat: 36.1191, lng: -115.1701,
      description: "Classic Caesars Entertainment property in the heart of the mid-Strip." },
    { id: "linq", name: "The LINQ Hotel + Experience", side: "east", zone: "mid", position: 33, gaming: true,
      lat: 36.1178, lng: -115.1702,
      description: "Home to the High Roller observation wheel and the LINQ Promenade." },
    { id: "flamingo", name: "Flamingo Las Vegas", side: "east", zone: "mid", position: 35, gaming: true,
      lat: 36.1161, lng: -115.1706,
      description: "Historic Bugsy Siegel property. Famous for its wildlife habitat with Chilean flamingos." },
    { id: "cromwell", name: "The Cromwell", side: "east", zone: "mid", position: 36, gaming: true,
      lat: 36.1155, lng: -115.1716,
      description: "Boutique hotel at the corner of Flamingo Rd and Las Vegas Blvd. Home to Drai's." },
    { id: "caesars", name: "Caesars Palace", side: "west", zone: "mid", position: 35, gaming: true,
      lat: 36.1162, lng: -115.1745,
      description: "Iconic Roman-themed mega-resort. Home to The Forum Shops and the Colosseum." },
    { id: "bellagio", name: "Bellagio", side: "west", zone: "mid", position: 39, gaming: true,
      lat: 36.1126, lng: -115.1767,
      description: "Famous for its fountain show, conservatory, and fine art gallery." },
    { id: "paris", name: "Paris Las Vegas", side: "east", zone: "mid", position: 39, gaming: true,
      lat: 36.1126, lng: -115.1712,
      description: "French-themed resort with a half-scale Eiffel Tower replica." },
    { id: "horseshoe", name: "Horseshoe Las Vegas", side: "east", zone: "mid", position: 40, gaming: true,
      lat: 36.1135, lng: -115.1705,
      description: "Formerly Bally's. Home of the World Series of Poker." },
    { id: "cosmopolitan", name: "The Cosmopolitan", side: "west", zone: "mid", position: 42, gaming: true,
      lat: 36.1098, lng: -115.1741,
      description: "Trendy luxury resort known for its speakeasies, art, and Marquee nightclub." },
    { id: "planet-hollywood", name: "Planet Hollywood", side: "east", zone: "mid", position: 43, gaming: true,
      lat: 36.1097, lng: -115.1712,
      description: "Entertainment-themed resort featuring the Miracle Mile Shops." },

    // === SOUTH STRIP ===
    { id: "waldorf", name: "Waldorf Astoria", side: "west", zone: "south", position: 47, gaming: false,
      lat: 36.1077, lng: -115.1765,
      description: "Non-gaming luxury high-rise. Part of the CityCenter complex." },
    { id: "aria", name: "Aria Resort & Casino", side: "west", zone: "south", position: 49, gaming: true,
      lat: 36.1070, lng: -115.1778,
      description: "Modern luxury resort in CityCenter. Connected to free Aria Express tram." },
    { id: "vdara", name: "Vdara Hotel & Spa", side: "west", zone: "south", position: 48, gaming: false,
      lat: 36.1083, lng: -115.1782,
      description: "Non-gaming, non-smoking luxury hotel in CityCenter." },
    { id: "crystals", name: "The Shops at Crystals", side: "west", zone: "south", position: 47, gaming: false,
      lat: 36.1080, lng: -115.1760,
      description: "High-end shopping center in CityCenter. Tram stop for Aria Express." },
    { id: "park-mgm", name: "Park MGM", side: "west", zone: "south", position: 53, gaming: true,
      lat: 36.1053, lng: -115.1757,
      description: "Only fully smoke-free casino on the Strip. Near T-Mobile Arena." },
    { id: "ny-ny", name: "New York-New York", side: "west", zone: "south", position: 56, gaming: true,
      lat: 36.1023, lng: -115.1745,
      description: "NYC-themed resort with a roller coaster and Brooklyn Bridge replica." },
    { id: "mgm-grand", name: "MGM Grand", side: "east", zone: "south", position: 57, gaming: true,
      lat: 36.1026, lng: -115.1703,
      description: "One of the world's largest hotels. Home to a Monorail station and major shows." },
    { id: "excalibur", name: "Excalibur", side: "west", zone: "south", position: 63, gaming: true,
      lat: 36.0988, lng: -115.1752,
      description: "Medieval castle-themed resort. Connected via walkway and tram to Luxor and Mandalay Bay." },
    { id: "tropicana-site", name: "Tropicana Site (A's Stadium)", side: "east", zone: "south", position: 63, gaming: false,
      lat: 36.1003, lng: -115.1702,
      description: "Former Tropicana hotel, now demolished. Future site of the Oakland A's baseball stadium (opening ~2028)." },
    { id: "luxor", name: "Luxor", side: "west", zone: "south", position: 68, gaming: true,
      lat: 36.0955, lng: -115.1762,
      description: "Iconic pyramid-shaped hotel with a sky beam visible for miles." },
    { id: "delano", name: "Delano Las Vegas", side: "west", zone: "south", position: 72, gaming: false,
      lat: 36.0930, lng: -115.1775,
      description: "All-suite luxury hotel connected to Mandalay Bay." },
    { id: "mandalay-bay", name: "Mandalay Bay", side: "west", zone: "south", position: 75, gaming: true,
      lat: 36.0920, lng: -115.1766,
      description: "Southern anchor of the Strip. Features a beach wave pool, aquarium, and convention center." },
  ],

  /**
   * Connections between hotels/locations.
   * type: "indoor_walkway" | "pedestrian_bridge" | "free_tram" | "monorail" | "sidewalk"
   * walkMinutes: approximate walking time in minutes
   * cost: "free" | dollar amount
   * directions: step-by-step turn-by-turn navigation instructions
   */
  connections: [
    // === INDOOR WALKWAYS (climate-controlled, no crossing streets) ===
    { from: "wynn", to: "encore", type: "indoor_walkway", walkMinutes: 3,
      description: "Climate-controlled corridor through the Wynn resort interior.",
      directions: [
        "From the Wynn lobby, head north past the floral atrium and the lake of dreams waterfall feature.",
        "Continue straight through the casino floor, keeping the high-limit slots area on your left.",
        "Follow overhead signs marked 'Encore' through the connecting corridor lined with luxury boutiques.",
        "The corridor opens into the Encore lobby near the concierge desk."
      ] },
    { from: "venetian", to: "palazzo", type: "indoor_walkway", walkMinutes: 5,
      description: "Connected via the Grand Canal Shoppes on Level 2. Indoor canals and Italian shops line the route.",
      directions: [
        "From the Venetian lobby, take the escalator or elevator up to Level 2 (Grand Canal Shoppes).",
        "Enter the Grand Canal Shoppes and walk north along the indoor canal. Gondola rides operate on the canal beside you.",
        "Keep the canal on your left as you pass Italian-themed restaurants and luxury shops. Follow signs for 'The Palazzo'.",
        "Continue past St. Mark's Square (the open atrium area) and through the arched corridor.",
        "The walkway transitions into The Palazzo's shopping level. Take the escalator down to reach the Palazzo lobby and casino floor."
      ] },
    { from: "paris", to: "horseshoe", type: "indoor_walkway", walkMinutes: 4,
      description: "Internally connected through Le Boulevard corridor. Same ownership makes this a seamless walk.",
      directions: [
        "From the Paris casino floor, head toward the south side of the property past the Le Village Buffet.",
        "Follow signs for 'Horseshoe' or 'Bally's' through the Le Boulevard shopping corridor connecting the two resorts.",
        "Walk through Le Boulevard past the French-themed shops and eateries.",
        "The corridor opens directly onto the Horseshoe casino floor near the poker room."
      ] },
    { from: "bellagio", to: "cosmopolitan", type: "indoor_walkway", walkMinutes: 5,
      description: "Enclosed walkway connecting the south end of Bellagio to the Cosmopolitan's north entrance.",
      directions: [
        "From the Bellagio lobby, walk south through the casino floor past the Conservatory & Botanical Gardens.",
        "Continue past the high-limit gaming area toward the south exit. Follow overhead signs for 'Cosmopolitan'.",
        "Take the enclosed pedestrian walkway that connects to The Cosmopolitan. There is an escalator and elevator at each end.",
        "The walkway deposits you on Level 2 of The Cosmopolitan near The Chandelier bar."
      ] },
    { from: "cosmopolitan", to: "crystals", type: "indoor_walkway", walkMinutes: 3,
      description: "Elevated enclosed bridge from Cosmopolitan Level 2 into the Crystals shopping center.",
      directions: [
        "From The Cosmopolitan casino floor, head to Level 2 via escalator near the west side of the building.",
        "Follow signs for 'Crystals' or 'CityCenter'. The enclosed pedestrian bridge exits from the southwest corner of Level 2.",
        "Cross the elevated bridge over Harmon Avenue. The bridge is fully enclosed and climate-controlled.",
        "Enter The Shops at Crystals on the upper level near the Louis Vuitton store."
      ] },
    { from: "crystals", to: "aria", type: "indoor_walkway", walkMinutes: 3,
      description: "Walk through the Crystals shopping center directly into Aria's main entrance corridor.",
      directions: [
        "From inside Crystals, head south through the shopping center. Follow signs for 'Aria Resort'.",
        "Pass the Mastro's Ocean Club restaurant and the large-scale art installations.",
        "Exit through the south corridor of Crystals, which feeds directly into Aria's arrival promenade.",
        "Continue straight ahead into the Aria lobby. The front desk is to your right."
      ] },
    { from: "crystals", to: "waldorf", type: "indoor_walkway", walkMinutes: 3,
      description: "Connected through the CityCenter complex via Crystals' east corridor.",
      directions: [
        "From inside Crystals, head toward the east side of the shopping center.",
        "Follow signs for 'Waldorf Astoria' near the Tiffany & Co. store.",
        "Exit through the east corridor and cross the short enclosed walkway into the Waldorf Astoria lobby.",
        "The Waldorf reception desk will be directly ahead."
      ] },
    { from: "aria", to: "vdara", type: "indoor_walkway", walkMinutes: 4,
      description: "Climate-controlled walkway through the CityCenter complex connecting Aria to Vdara.",
      directions: [
        "From the Aria lobby, head north past the front desk and the check-in kiosks.",
        "Follow overhead signs for 'Vdara' through the corridor on the northwest side of the lobby.",
        "Walk through the connecting hallway, which passes between conference facilities.",
        "Continue straight until you reach the Vdara lobby. The front desk and concierge are on the right."
      ] },
    { from: "mandalay-bay", to: "delano", type: "indoor_walkway", walkMinutes: 3,
      description: "Delano connects directly to Mandalay Bay at the lobby level on the west side.",
      directions: [
        "From the Mandalay Bay lobby, walk west past the front desk toward the convention center side of the resort.",
        "Follow signs for 'Delano' along the corridor behind the main elevator bank.",
        "The corridor transitions seamlessly into the Delano lobby, which has a separate boutique-hotel atmosphere.",
        "Delano's front desk and lounge are straight ahead."
      ] },
    { from: "mandalay-bay", to: "luxor", type: "indoor_walkway", walkMinutes: 7,
      description: "Indoor corridor through the Shoppes at Mandalay Place, connecting the two resorts on Level 2.",
      directions: [
        "From the Mandalay Bay casino floor, head north toward the shopping corridor. Follow signs for 'Luxor' or 'Mandalay Place'.",
        "Take the escalator up to Mandalay Place (Level 2), the shopping and dining walkway between the resorts.",
        "Walk north through Mandalay Place, passing restaurants and specialty shops. The corridor is long but fully climate-controlled.",
        "At the north end of Mandalay Place, take the escalator down into the Luxor casino floor.",
        "You will enter Luxor near the food court area inside the pyramid. The lobby is to your left."
      ] },
    { from: "luxor", to: "excalibur", type: "indoor_walkway", walkMinutes: 5,
      description: "Indoor walkway connecting Luxor's north side to Excalibur's south entrance.",
      directions: [
        "From the Luxor casino floor, head north toward the food court area. Follow signs for 'Excalibur'.",
        "Take the moving walkway through the connecting corridor between the two properties.",
        "The corridor is on the second level and has a moving sidewalk to help with the walk.",
        "You will exit into Excalibur's casino floor on the south side, near the food court and medieval-themed shops."
      ] },
    { from: "harrahs", to: "linq", type: "indoor_walkway", walkMinutes: 4,
      description: "Connected through the LINQ Promenade corridor on the east side, behind the properties.",
      directions: [
        "From the Harrah's casino floor, head east toward the back of the property. Follow signs for 'LINQ Promenade'.",
        "Exit through the rear corridor onto the LINQ Promenade, the outdoor pedestrian shopping and dining district.",
        "Walk south along the Promenade (the High Roller observation wheel will be visible ahead of you).",
        "Enter The LINQ Hotel through its promenade-facing entrance on the left side."
      ] },
    { from: "flamingo", to: "linq", type: "indoor_walkway", walkMinutes: 4,
      description: "Connected through the LINQ Promenade area. Exit Flamingo's north side to reach the LINQ.",
      directions: [
        "From the Flamingo casino floor, head north and east following signs for 'LINQ Promenade'.",
        "Exit through Flamingo's northeast corridor near the wildlife habitat.",
        "Walk north along the LINQ Promenade toward the High Roller wheel.",
        "Enter The LINQ Hotel through its main promenade entrance on your right."
      ] },
    { from: "caesars", to: "cromwell", type: "indoor_walkway", walkMinutes: 5,
      description: "Connected on the east side of Caesars near the Flamingo Rd intersection via an enclosed corridor.",
      directions: [
        "From the Caesars Palace casino floor, head east toward the Las Vegas Blvd side of the property.",
        "Walk toward the Flamingo Rd corner of the building, passing the Race & Sports Book.",
        "Follow signs for 'The Cromwell' or 'Flamingo Road'. Take the connecting corridor near the valet area.",
        "Cross through the enclosed walkway at the Flamingo Rd intersection into The Cromwell lobby.",
        "The Cromwell's boutique casino floor and Drai's nightclub entrance will be on your left."
      ] },
    { from: "mgm-grand", to: "ny-ny", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Covered pedestrian bridge crossing Tropicana Ave from MGM Grand's west side to New York-New York.",
      directions: [
        "From the MGM Grand casino floor, head west toward the Las Vegas Blvd exit. Follow signs for 'Tropicana Ave Bridge'.",
        "Exit through the west doors near the main valet and walk to the pedestrian bridge escalator at the Tropicana Ave corner.",
        "Take the escalator (or elevator) up to the overhead bridge level.",
        "Cross the bridge over Tropicana Ave heading west. The bridge offers views of the NY-NY roller coaster.",
        "Descend on the west side into New York-New York's entrance near the Brooklyn Bridge replica."
      ] },

    // === PEDESTRIAN BRIDGES (overhead, crossing Las Vegas Blvd) ===
    { from: "wynn", to: "fashion-show", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Spring Mountain Rd / Sands Ave crossing Las Vegas Blvd from the east to west side.",
      directions: [
        "From the Wynn, exit through the south entrance onto Las Vegas Blvd and walk south to the Spring Mountain Rd intersection.",
        "Look for the pedestrian bridge escalators at the southeast corner of Spring Mountain Rd and Las Vegas Blvd.",
        "Take the escalator (or elevator) up to the overhead bridge level.",
        "Cross the bridge heading west over Las Vegas Blvd.",
        "Descend on the west side. Fashion Show Mall's entrance is directly ahead."
      ] },
    { from: "venetian", to: "treasure-island", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Overhead bridge at Spring Mountain Rd / Sands Ave crossing Las Vegas Blvd from east to west side.",
      directions: [
        "From The Venetian, exit through the main Las Vegas Blvd entrance and walk north to the Sands Ave / Spring Mountain Rd intersection.",
        "Find the pedestrian bridge escalator on the east side of the intersection.",
        "Take the escalator up and cross the overhead bridge heading west over Las Vegas Blvd.",
        "On the west side, follow signs for 'Treasure Island'. Descend the escalator.",
        "TI's main entrance is a short walk south from the bridge landing."
      ] },
    { from: "venetian", to: "fashion-show", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Spring Mountain Rd / Sands Ave from The Venetian to Fashion Show Mall.",
      directions: [
        "From The Venetian, exit through the main Las Vegas Blvd entrance and walk north to the Sands Ave intersection.",
        "Take the pedestrian bridge escalator on the east side of the intersection.",
        "Cross the bridge over Las Vegas Blvd heading northwest.",
        "Descend on the west side directly into Fashion Show Mall's east entrance."
      ] },
    { from: "caesars", to: "flamingo", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Overhead bridge at the Flamingo Rd intersection, crossing Las Vegas Blvd from west to east side.",
      directions: [
        "From Caesars Palace, exit through the east entrance (Forum Shops side) onto Las Vegas Blvd.",
        "Walk south to the Flamingo Rd intersection. Look for the pedestrian bridge escalators on the southwest corner.",
        "Take the escalator up to the overhead bridge level.",
        "Cross the bridge heading east over Las Vegas Blvd. You'll have views of The Cromwell and Flamingo properties below.",
        "Descend on the east side and turn right (south) to reach the Flamingo's main entrance."
      ] },
    { from: "caesars", to: "horseshoe", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Overhead bridge at Flamingo Rd crossing Las Vegas Blvd, landing near Horseshoe's north entrance.",
      directions: [
        "From Caesars Palace, exit through the east entrance onto Las Vegas Blvd.",
        "Walk south to the Flamingo Rd intersection and find the pedestrian bridge escalators.",
        "Take the escalator up and cross the bridge heading east over Las Vegas Blvd.",
        "On the east side, take the south landing toward Horseshoe (formerly Bally's). Follow signs for 'Horseshoe'.",
        "Descend and enter Horseshoe through its north entrance on Flamingo Rd."
      ] },
    { from: "bellagio", to: "horseshoe", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Flamingo Rd crossing Las Vegas Blvd. Excellent spot to view the Bellagio fountains from above.",
      directions: [
        "From the Bellagio, exit through the north entrance onto Las Vegas Blvd near the fountain lake.",
        "Walk north to the Flamingo Rd intersection. The pedestrian bridge escalator is on the northwest corner.",
        "Take the escalator up. Pause on the bridge for an elevated view of the Bellagio fountains if they are running.",
        "Cross the bridge heading east over Las Vegas Blvd.",
        "Descend on the east side and walk south to Horseshoe's main entrance."
      ] },
    { from: "bellagio", to: "caesars", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Overhead bridge on the west side of Las Vegas Blvd connecting Bellagio to Caesars near Flamingo Rd.",
      directions: [
        "From the Bellagio, exit through the north entrance onto Las Vegas Blvd.",
        "Walk north along the west sidewalk toward the Flamingo Rd intersection.",
        "Take the pedestrian bridge escalator on the northwest corner of Flamingo Rd and Las Vegas Blvd.",
        "Cross the bridge heading north on the west side of the boulevard.",
        "Descend near the Caesars Palace main driveway and enter through the east-facing entrance."
      ] },
    { from: "cosmopolitan", to: "planet-hollywood", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Direct pedestrian bridge at Harmon Ave, crossing Las Vegas Blvd from west to east side.",
      directions: [
        "From The Cosmopolitan, exit through the east entrance onto Las Vegas Blvd at the Harmon Ave corner.",
        "The pedestrian bridge entrance is right at the Harmon Ave intersection. Take the escalator up.",
        "Cross the bridge heading east over Las Vegas Blvd. This is a direct bridge with no branching paths.",
        "Descend on the east side directly into the Miracle Mile Shops entrance at Planet Hollywood."
      ] },
    { from: "excalibur", to: "tropicana-site", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Tropicana Ave crossing Las Vegas Blvd. Note: Tropicana site is now a construction zone.",
      directions: [
        "From Excalibur, exit through the north entrance toward Tropicana Ave.",
        "Find the pedestrian bridge escalator at the Tropicana Ave and Las Vegas Blvd intersection (northwest corner).",
        "Take the escalator up and cross the bridge heading east over Las Vegas Blvd.",
        "Descend on the east side at the former Tropicana site (now the A's stadium construction zone)."
      ] },
    { from: "excalibur", to: "ny-ny", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Tropicana Ave connecting Excalibur to New York-New York on the west side.",
      directions: [
        "From Excalibur, exit through the north entrance toward Tropicana Ave.",
        "Take the pedestrian bridge escalator at the northwest corner of the Tropicana Ave intersection.",
        "Cross the bridge heading north over Tropicana Ave on the west side of Las Vegas Blvd.",
        "Descend on the north side directly at New York-New York's south entrance near the Hershey's store."
      ] },
    { from: "mgm-grand", to: "tropicana-site", type: "pedestrian_bridge", walkMinutes: 4,
      description: "Overhead bridge at Tropicana Ave connecting MGM Grand to the east side of the intersection.",
      directions: [
        "From MGM Grand, exit through the north doors toward Tropicana Ave.",
        "Find the pedestrian bridge escalator at the northeast corner of the Tropicana and Las Vegas Blvd intersection.",
        "Take the escalator up and cross the bridge heading north on the east side.",
        "Descend on the north side at the former Tropicana site (A's stadium construction area)."
      ] },
    { from: "mgm-grand", to: "excalibur", type: "pedestrian_bridge", walkMinutes: 5,
      description: "Overhead bridge crossing both Tropicana Ave and Las Vegas Blvd from MGM Grand to Excalibur.",
      directions: [
        "From MGM Grand, exit through the west entrance toward the Tropicana Ave and Las Vegas Blvd intersection.",
        "Take the pedestrian bridge escalator at the northeast corner of the intersection.",
        "Cross the bridge heading west and south, going over Las Vegas Blvd and then along Tropicana Ave.",
        "This is the longest bridge path at this intersection. Follow signs for 'Excalibur'.",
        "Descend on the southwest corner into Excalibur's north entrance."
      ] },

    // === SIDEWALK CONNECTIONS (same side of the street, walking along Las Vegas Blvd) ===
    { from: "strat", to: "sahara", type: "sidewalk", walkMinutes: 8,
      description: "Walk south along the east sidewalk of Las Vegas Blvd. Longest gap between properties on the north Strip.",
      directions: [
        "Exit The STRAT through the main Las Vegas Blvd entrance on the east side.",
        "Turn left (south) and walk along the east sidewalk of Las Vegas Blvd.",
        "This stretch has less foot traffic and fewer shade structures than the mid-Strip. Stay hydrated in summer.",
        "Pass the SLS/W Hotel site and several smaller properties.",
        "Sahara Las Vegas will appear on your left. Enter through the main Las Vegas Blvd entrance."
      ] },
    { from: "sahara", to: "fontainebleau", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the east sidewalk. Fontainebleau's massive blue glass tower is a visible landmark ahead.",
      directions: [
        "Exit Sahara through the Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "The Fontainebleau's distinctive blue-glass tower will be visible ahead on your left.",
        "Continue south until you reach the Fontainebleau entrance. The main doors face Las Vegas Blvd."
      ] },
    { from: "fontainebleau", to: "encore", type: "sidewalk", walkMinutes: 8,
      description: "Walk south along the east sidewalk. Resorts World is visible across the boulevard on the west side.",
      directions: [
        "Exit Fontainebleau through the Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "You'll pass the Las Vegas Convention Center access road on your left. Resorts World's red-and-gold tower is visible across the street.",
        "Continue south past the Convention Center area. The walk is exposed with limited shade.",
        "Encore's curved bronze tower will appear ahead. Enter through the Las Vegas Blvd entrance."
      ] },
    { from: "circus-circus", to: "resorts-world", type: "sidewalk", walkMinutes: 6,
      description: "Walk south along the west sidewalk of Las Vegas Blvd past the Circus Circus Adventuredome.",
      directions: [
        "Exit Circus Circus through the Las Vegas Blvd entrance on the west side.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the Circus Circus Adventuredome dome structure on your right.",
        "Continue south. Resorts World's modern tower complex will be ahead on your right.",
        "Enter Resorts World through its Las Vegas Blvd entrance."
      ] },
    { from: "resorts-world", to: "fashion-show", type: "sidewalk", walkMinutes: 8,
      description: "Walk south along the west sidewalk. Longer stretch passing the Wynn golf course area across the street.",
      directions: [
        "Exit Resorts World through the Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the former Riviera site (now convention expansion area) and continue south.",
        "The Wynn golf course and resort will be visible across the boulevard to your left.",
        "Continue until you see Fashion Show Mall's large metallic 'cloud' canopy structure ahead on your right.",
        "Enter Fashion Show Mall through the east-facing Las Vegas Blvd entrance."
      ] },
    { from: "fashion-show", to: "treasure-island", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the west sidewalk. TI is immediately adjacent to Fashion Show Mall.",
      directions: [
        "Exit Fashion Show Mall through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "Treasure Island is immediately adjacent. Its main entrance and porte-cochere are just ahead on your right.",
        "Enter TI through the main Las Vegas Blvd entrance."
      ] },
    { from: "encore", to: "wynn", type: "sidewalk", walkMinutes: 2,
      description: "Adjacent properties sharing the same resort campus on the east side. Very short walk.",
      directions: [
        "Exit Encore through the south Las Vegas Blvd entrance.",
        "Walk south along the east sidewalk. The Wynn entrance is immediately adjacent.",
        "The two properties share a driveway and landscaping. Enter Wynn through the next entrance on your right."
      ] },
    { from: "wynn", to: "venetian", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the east sidewalk past the Wynn plaza and across Sands Ave.",
      directions: [
        "Exit Wynn through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "Cross Sands Ave / Spring Mountain Rd at the crosswalk (or use the overhead pedestrian bridge).",
        "Continue south. The Venetian's Italian facade and campanile tower will be ahead on your left.",
        "Enter The Venetian through the main Las Vegas Blvd entrance under the arched colonnade."
      ] },
    { from: "treasure-island", to: "mirage", type: "sidewalk", walkMinutes: 4,
      description: "Walk south along the west sidewalk past TI. The Mirage is currently closed for renovation.",
      directions: [
        "Exit Treasure Island through the south entrance onto Las Vegas Blvd.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the TI parking garage entrance and continue south.",
        "The Mirage (under renovation to Hard Rock) will be on your right. Note: the property is currently closed.",
        "The construction fence runs along the sidewalk. Continue past it if heading further south."
      ] },
    { from: "mirage", to: "caesars", type: "sidewalk", walkMinutes: 6,
      description: "Walk south along the west sidewalk past the Mirage construction site toward Caesars Palace.",
      directions: [
        "From the Mirage area (currently closed), continue south along the west sidewalk.",
        "Walk past the Mirage/Hard Rock construction fencing.",
        "Cross the Caesars Palace driveway. The resort's massive Roman-columned entrance and fountain plaza will appear on your right.",
        "Continue south past the main valet area. Enter Caesars through one of the Las Vegas Blvd entrances.",
        "The Forum Shops entrance is further south along the sidewalk if you prefer to enter through the mall."
      ] },
    { from: "venetian", to: "harrahs", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the east sidewalk past The Venetian and Palazzo frontage.",
      directions: [
        "Exit The Venetian through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "Pass the extended Venetian/Palazzo frontage along Las Vegas Blvd.",
        "Continue south past the Palazzo entrance. Harrah's will appear on your left with its white facade.",
        "Enter Harrah's through the Las Vegas Blvd main entrance."
      ] },
    { from: "palazzo", to: "venetian", type: "sidewalk", walkMinutes: 2,
      description: "Adjacent properties on the east side. Very short walk along the shared frontage.",
      directions: [
        "Exit The Palazzo through the Las Vegas Blvd entrance.",
        "Walk south along the east sidewalk. The Venetian entrance is immediately adjacent.",
        "The two properties share continuous frontage. Enter The Venetian through the next entrance."
      ] },
    { from: "harrahs", to: "flamingo", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the east sidewalk past The LINQ entrance. Flamingo is just beyond.",
      directions: [
        "Exit Harrah's through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "Pass The LINQ Hotel's Las Vegas Blvd entrance and the LINQ Promenade shopping area.",
        "Continue south. The Flamingo's neon-pink signage and tropical landscaping will be ahead.",
        "Enter Flamingo through the main Las Vegas Blvd entrance."
      ] },
    { from: "flamingo", to: "cromwell", type: "sidewalk", walkMinutes: 2,
      description: "Adjacent properties at the Flamingo Rd corner. Very short walk south.",
      directions: [
        "Exit Flamingo through the south Las Vegas Blvd entrance.",
        "Walk south a few steps. The Cromwell is at the corner of Flamingo Rd and Las Vegas Blvd.",
        "Enter The Cromwell through its Las Vegas Blvd entrance. Drai's nightclub entrance is on the upper floors."
      ] },
    { from: "cromwell", to: "paris", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the east sidewalk past Flamingo Rd toward the Paris Eiffel Tower replica.",
      directions: [
        "Exit The Cromwell through the south entrance.",
        "Cross Flamingo Rd at the crosswalk heading south on the east sidewalk.",
        "Paris Las Vegas is immediately ahead. The half-scale Eiffel Tower replica is unmistakable.",
        "Enter Paris through the Las Vegas Blvd entrance near the base of the Eiffel Tower."
      ] },
    { from: "paris", to: "planet-hollywood", type: "sidewalk", walkMinutes: 4,
      description: "Walk south along the east sidewalk past Paris Las Vegas toward Planet Hollywood.",
      directions: [
        "Exit Paris through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "Pass the Paris balloon sign and Le Boulevard shops entrance.",
        "Continue south. Planet Hollywood's modern facade and the Miracle Mile Shops entrance will appear on your left.",
        "Enter Planet Hollywood through the Las Vegas Blvd entrance."
      ] },
    { from: "caesars", to: "bellagio", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the west sidewalk past The Forum Shops and Caesars frontage toward Bellagio.",
      directions: [
        "Exit Caesars Palace through a south-facing Las Vegas Blvd entrance (or the Forum Shops exit).",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the extended Caesars Palace frontage including The Forum Shops storefronts.",
        "Continue south. The Bellagio's famous fountain lake will come into view on your right.",
        "Walk along the fountain lake railing. Enter Bellagio through the main Las Vegas Blvd entrance."
      ] },
    { from: "bellagio", to: "cosmopolitan", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the west sidewalk past the Bellagio fountain lake.",
      directions: [
        "Exit Bellagio through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "The south end of the Bellagio fountain lake will be on your right.",
        "The Cosmopolitan's modern tower and multi-story LED columns will be directly ahead.",
        "Enter The Cosmopolitan through the Las Vegas Blvd main entrance."
      ] },
    { from: "cosmopolitan", to: "aria", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the west sidewalk through the CityCenter frontage area.",
      directions: [
        "Exit The Cosmopolitan through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass The Shops at Crystals and the Waldorf Astoria tower on your right.",
        "Continue south through the CityCenter development area.",
        "Aria's curved glass tower will be ahead. Enter through the Las Vegas Blvd entrance to the east of the main porte-cochere."
      ] },
    { from: "planet-hollywood", to: "mgm-grand", type: "sidewalk", walkMinutes: 10,
      description: "Long walk south along the east sidewalk. This is one of the longest stretches between major properties.",
      directions: [
        "Exit Planet Hollywood through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "This is a longer stretch with limited shade. Pass the Harmon Ave intersection and several smaller storefronts.",
        "Continue south past the CityCenter development area across the street.",
        "Cross several crosswalks as you continue south. The MGM Grand's green-glass tower and lion statue will eventually appear on your left.",
        "Enter MGM Grand through the Las Vegas Blvd main entrance near the bronze lion statue."
      ] },
    { from: "aria", to: "park-mgm", type: "sidewalk", walkMinutes: 4,
      description: "Walk south along the west sidewalk past the Aria porte-cochere toward Park MGM.",
      directions: [
        "Exit Aria through the south entrance toward Las Vegas Blvd.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the T-Mobile Arena area on your right. You may see event-day crowds here.",
        "Park MGM's entrance will appear ahead on your right. Its modern low-rise design is distinct from the megatowers.",
        "Enter Park MGM through the Las Vegas Blvd entrance."
      ] },
    { from: "park-mgm", to: "ny-ny", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the west sidewalk past T-Mobile Arena toward New York-New York.",
      directions: [
        "Exit Park MGM through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "T-Mobile Arena and The Park outdoor dining district will be on your right.",
        "New York-New York's Statue of Liberty replica and Brooklyn Bridge facade will be ahead.",
        "Enter New York-New York through the Las Vegas Blvd entrance near the Hershey's store."
      ] },
    { from: "ny-ny", to: "excalibur", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the west sidewalk, crossing Tropicana Ave to reach Excalibur.",
      directions: [
        "Exit New York-New York through the south entrance.",
        "Walk south to the Tropicana Ave intersection.",
        "Cross Tropicana Ave at the crosswalk heading south (or use the overhead pedestrian bridge).",
        "Excalibur's castle towers will be directly ahead on the west side.",
        "Enter Excalibur through the main Las Vegas Blvd entrance."
      ] },
    { from: "excalibur", to: "luxor", type: "sidewalk", walkMinutes: 4,
      description: "Walk south along the west sidewalk. The Luxor pyramid is visible ahead.",
      directions: [
        "Exit Excalibur through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "The Luxor's black glass pyramid and sphinx will be visible ahead.",
        "Enter Luxor through the Las Vegas Blvd entrance at the base of the sphinx."
      ] },
    { from: "luxor", to: "mandalay-bay", type: "sidewalk", walkMinutes: 5,
      description: "Walk south along the west sidewalk. Mandalay Bay is the last major resort heading south.",
      directions: [
        "Exit Luxor through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the west sidewalk.",
        "Pass the Luxor parking area and continue south.",
        "Mandalay Bay's gold tower will be ahead. This is the southern anchor of the Strip.",
        "Enter Mandalay Bay through the Las Vegas Blvd main entrance."
      ] },
    { from: "mgm-grand", to: "tropicana-site", type: "sidewalk", walkMinutes: 3,
      description: "Walk south along the east sidewalk past MGM Grand toward the former Tropicana site.",
      directions: [
        "Exit MGM Grand through the south Las Vegas Blvd entrance.",
        "Turn left (south) and walk along the east sidewalk.",
        "The former Tropicana site (now Oakland A's stadium construction) is just ahead.",
        "Note: This area is an active construction zone. Sidewalk access may be rerouted."
      ] },

    // === FREE TRAMS ===
    { from: "mandalay-bay", to: "excalibur", type: "free_tram", walkMinutes: 5, rideName: "Mandalay Bay Tram",
      description: "Free tram from Mandalay Bay to Excalibur, stopping at Luxor. Return trip is express (skips Luxor).",
      directions: [
        "From the Mandalay Bay casino floor, head to the north side of the property near the convention center hallway.",
        "Follow signs for 'Free Tram' or 'Tram to Luxor/Excalibur'. The tram station is on the second level.",
        "Take the escalator up to the tram platform. Trams depart every 3-5 minutes.",
        "Board the tram. First stop is Luxor (about 2 minutes). Remain on board for Excalibur.",
        "Exit at the Excalibur station. Follow signs back down to the casino floor.",
        "Note: The return tram (Excalibur to Mandalay Bay) is express and skips the Luxor stop."
      ],
      stops: ["mandalay-bay", "luxor", "excalibur"],
      hours: "Daily 7am - 12:30am, trams every 3-5 minutes" },
    { from: "mandalay-bay", to: "luxor", type: "free_tram", walkMinutes: 3, rideName: "Mandalay Bay Tram",
      description: "Free tram from Mandalay Bay to Luxor (first stop). Return express service skips Luxor.",
      directions: [
        "From the Mandalay Bay casino floor, follow signs for 'Free Tram' on the north side near the convention center.",
        "Take the escalator up to the tram platform on the second level.",
        "Board the tram. Luxor is the first stop, about 2 minutes away.",
        "Exit at the Luxor tram station and follow signs down to the Luxor casino floor.",
        "Warning: If returning, the Excalibur-to-Mandalay Bay tram is express and does not stop at Luxor. Walk or use the indoor walkway instead."
      ],
      stops: ["mandalay-bay", "luxor", "excalibur"],
      hours: "Daily 7am - 12:30am, trams every 3-5 minutes" },
    { from: "bellagio", to: "aria", type: "free_tram", walkMinutes: 5, rideName: "Aria Express",
      description: "Free Aria Express tram from Bellagio to Aria, with stops at Vdara and Crystals.",
      directions: [
        "From the Bellagio, head to the south side of the property near the spa tower. Follow signs for 'Aria Express Tram'.",
        "The Bellagio tram station is on the west side of the resort, away from Las Vegas Blvd. Take the elevator or escalator to the platform.",
        "Board the Aria Express tram. The route runs: Bellagio → Vdara → Crystals → Aria.",
        "Ride through the CityCenter complex. Exit at the Aria station.",
        "Follow signs from the Aria tram platform down to the lobby and casino floor."
      ],
      stops: ["bellagio", "vdara", "crystals", "aria", "park-mgm"],
      hours: "Daily 8am - 2am, every 7-10 minutes" },
    { from: "bellagio", to: "park-mgm", type: "free_tram", walkMinutes: 7, rideName: "Aria Express",
      description: "Free Aria Express tram from Bellagio to Park MGM, the final stop. Passes Vdara, Crystals, and Aria.",
      directions: [
        "From the Bellagio, head to the south side of the property near the spa tower. Follow signs for 'Aria Express Tram'.",
        "Take the elevator or escalator up to the Bellagio tram station platform.",
        "Board the Aria Express tram and ride through all stops: Vdara, Crystals, Aria.",
        "Remain on the tram until the final stop at Park MGM.",
        "Exit and follow signs from the tram platform to the Park MGM lobby and smoke-free casino floor."
      ],
      stops: ["bellagio", "vdara", "crystals", "aria", "park-mgm"],
      hours: "Daily 8am - 2am, every 7-10 minutes" },
    { from: "aria", to: "park-mgm", type: "free_tram", walkMinutes: 3, rideName: "Aria Express",
      description: "Free Aria Express tram one stop from Aria to Park MGM.",
      directions: [
        "From Aria's lobby, follow signs for 'Aria Express Tram' toward the south side of the resort.",
        "Take the elevator or escalator to the tram platform.",
        "Board the tram heading south. Park MGM is the next and final stop.",
        "Exit at Park MGM and follow signs to the lobby."
      ],
      stops: ["bellagio", "vdara", "crystals", "aria", "park-mgm"],
      hours: "Daily 8am - 2am, every 7-10 minutes" },
    { from: "aria", to: "bellagio", type: "free_tram", walkMinutes: 5, rideName: "Aria Express",
      description: "Free Aria Express tram from Aria to Bellagio. Return trip may stop at Vdara.",
      directions: [
        "From Aria's lobby, follow signs for 'Aria Express Tram' toward the north side of the resort.",
        "Take the elevator or escalator to the tram platform.",
        "Board the tram heading north toward Bellagio. The return route stops at Vdara.",
        "Ride through the CityCenter complex. Exit at the Bellagio station.",
        "Follow signs from the Bellagio tram platform back to the hotel lobby and casino floor."
      ],
      stops: ["bellagio", "vdara", "crystals", "aria", "park-mgm"],
      hours: "Daily 8am - 2am, every 7-10 minutes" },

    // === MONORAIL (paid, east side of Strip) ===
    { from: "mgm-grand", to: "horseshoe", type: "monorail", walkMinutes: 5, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Monorail from MGM Grand Station to Horseshoe/Paris Station. One stop northbound.",
      directions: [
        "From the MGM Grand casino floor, head east toward the back of the property. Follow overhead signs for 'Monorail'.",
        "The monorail station is located on the east (back) side of MGM Grand, away from Las Vegas Blvd. It is a significant walk through the casino.",
        "Take the escalator up to the monorail platform. Purchase a ticket at the kiosk or use the mobile app ($5 single ride).",
        "Board the northbound monorail. Horseshoe/Paris Station is the first stop.",
        "Exit at Horseshoe/Paris Station. Follow signs east through the connecting walkway to reach Horseshoe or Paris."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
    { from: "horseshoe", to: "flamingo", type: "monorail", walkMinutes: 3, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Monorail from Horseshoe/Paris Station to Flamingo/LINQ Station. One stop northbound.",
      directions: [
        "From Horseshoe, walk east through the casino toward the back of the property. Follow signs for 'Monorail'.",
        "The Horseshoe/Paris monorail station is on the east side of the building. Take the escalator to the platform.",
        "Purchase a ticket ($5) if you don't have one and board the northbound monorail.",
        "Flamingo/LINQ Station is the next stop.",
        "Exit and follow the covered walkway west toward the Flamingo or LINQ. The walk back to Las Vegas Blvd takes several minutes."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
    { from: "flamingo", to: "harrahs", type: "monorail", walkMinutes: 3, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Monorail from Flamingo/LINQ Station to Harrah's/The LINQ Station. One stop northbound.",
      directions: [
        "From the Flamingo, walk east through the casino past the Garden Habitat. Follow signs for 'Monorail'.",
        "The Flamingo/LINQ monorail station is on the east (back) side. Take the escalator to the platform.",
        "Purchase a ticket ($5) and board the northbound monorail.",
        "Harrah's/The LINQ Station is the next stop.",
        "Exit and follow the walkway west toward Harrah's or The LINQ. Budget extra time to walk back to Las Vegas Blvd."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
    { from: "harrahs", to: "sahara", type: "monorail", walkMinutes: 8, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Monorail from Harrah's Station to SAHARA Station. Passes Convention Center and Westgate stops.",
      directions: [
        "From Harrah's, walk east through the casino toward the back of the property. Follow signs for 'Monorail'.",
        "Take the escalator to the Harrah's/LINQ monorail platform.",
        "Purchase a ticket ($5) and board the northbound monorail.",
        "The train passes through Convention Center Station and Westgate Station before reaching SAHARA.",
        "Stay on the train for 3 stops. Exit at SAHARA Station.",
        "The SAHARA station is adjacent to the Sahara resort. Follow signs west to reach the hotel lobby and Las Vegas Blvd."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
    { from: "mgm-grand", to: "sahara", type: "monorail", walkMinutes: 15, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Full monorail ride from MGM Grand (south) to SAHARA (north). All 7 stations, end-to-end.",
      directions: [
        "From the MGM Grand casino floor, head east toward the back of the property. Follow signs for 'Monorail' — it is a long walk through the casino.",
        "Take the escalator to the MGM Grand monorail platform. Purchase a ticket ($5 single ride, or consider a day pass for multiple trips).",
        "Board the northbound monorail. This is the end-to-end route covering all 7 stations.",
        "Stops in order: MGM Grand → Horseshoe/Paris → Flamingo/LINQ → Harrah's/LINQ → Convention Center → Westgate → SAHARA.",
        "Stay on through all stops. The full ride takes about 15 minutes.",
        "Exit at SAHARA Station and follow signs west to reach the Sahara resort and Las Vegas Blvd."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
    { from: "sahara", to: "mgm-grand", type: "monorail", walkMinutes: 15, cost: 5,
      rideName: "Las Vegas Monorail",
      description: "Full monorail ride from SAHARA (north) to MGM Grand (south). All 7 stations, end-to-end.",
      directions: [
        "From the Sahara resort, head east to the SAHARA monorail station. Follow signs for 'Monorail' from the casino floor.",
        "Take the escalator to the platform. Purchase a ticket ($5 single ride, or consider a day pass).",
        "Board the southbound monorail. This is the end-to-end route covering all 7 stations.",
        "Stops in order: SAHARA → Westgate → Convention Center → Harrah's/LINQ → Flamingo/LINQ → Horseshoe/Paris → MGM Grand.",
        "Stay on through all stops. The full ride takes about 15 minutes.",
        "Exit at MGM Grand Station and follow signs west through the casino to reach Las Vegas Blvd. The walk from the station to the Blvd is significant."
      ],
      hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am" },
  ],

  monorail: {
    name: "Las Vegas Monorail",
    side: "east",
    cost: "$5 single ride. Day passes available for 1-7 days. Children 5 and under ride free. Nevada residents $1/ride with valid ID.",
    hours: "Mon 7am-12am, Tue-Thu 7am-2am, Fri-Sun 7am-3am. Trains every 4-8 minutes.",
    stations: [
      { id: "mgm-grand", name: "MGM Grand Station", nearbyHotels: ["mgm-grand"],
        boarding: "Enter through the east side of MGM Grand. The station is on the back of the property, far from Las Vegas Blvd. Budget 5-10 minutes to walk through the casino to reach the platform." },
      { id: "horseshoe", name: "Horseshoe/Paris Station", nearbyHotels: ["horseshoe", "paris"],
        boarding: "Access from the east side of Horseshoe (formerly Bally's) or Paris. The station connects to both properties via a covered walkway. Walk east through either casino to reach it." },
      { id: "flamingo", name: "Flamingo/LINQ Station", nearbyHotels: ["flamingo", "linq", "cromwell"],
        boarding: "Access from the east side of the Flamingo. Walk through the casino past the wildlife habitat. Also reachable from The LINQ Promenade's east end. The walk from Las Vegas Blvd takes 5-8 minutes." },
      { id: "harrahs", name: "Harrah's/The LINQ Station", nearbyHotels: ["harrahs", "linq"],
        boarding: "Access from the east side of Harrah's. Walk through the casino and follow monorail signs. Also reachable via the LINQ Promenade." },
      { id: "convention-center", name: "Las Vegas Convention Center Station", nearbyHotels: [],
        boarding: "Located at the Las Vegas Convention Center. Primarily used for convention attendees. A long walk from any Strip hotel." },
      { id: "westgate", name: "Westgate Station", nearbyHotels: ["fontainebleau"],
        boarding: "Located at the Westgate Las Vegas (off-Strip). Closest Strip property is Fontainebleau, but it's still a significant walk." },
      { id: "sahara", name: "SAHARA Station", nearbyHotels: ["sahara", "strat"],
        boarding: "Located at the east side of Sahara Las Vegas. Walk through the Sahara casino and follow monorail signs. Also a long walk north to reach The STRAT." },
    ]
  },

  freeTrams: [
    {
      name: "Mandalay Bay Tram",
      stops: ["mandalay-bay", "luxor", "excalibur"],
      hours: "Daily 7am - 12:30am, trams every 3-5 minutes",
      note: "Return trip from Excalibur to Mandalay Bay is EXPRESS (skips Luxor stop). If you need Luxor on the return, use the indoor walkway instead.",
      boarding: {
        "mandalay-bay": "The Mandalay Bay tram station is on the north side of the resort near the convention center. From the casino floor, follow signs for 'Free Tram to Luxor/Excalibur'. Take the escalator up to the second-level platform.",
        "luxor": "The Luxor tram station is on the south side of the pyramid, accessible from the casino floor. Follow signs for 'Tram'. Note: The return express service from Excalibur does not stop here.",
        "excalibur": "The Excalibur tram station is on the south side of the castle. From the casino floor, head south and follow signs for 'Free Tram to Mandalay Bay'."
      }
    },
    {
      name: "Aria Express Tram",
      stops: ["bellagio", "vdara", "crystals", "aria", "park-mgm"],
      hours: "Daily 8am - 2am, trams every 7-10 minutes",
      note: "Vdara stop is only on the Bellagio-bound (northbound) return trip. Southbound service goes Bellagio → Crystals → Aria → Park MGM.",
      boarding: {
        "bellagio": "The Bellagio tram station is on the south/west side of the property, near the spa tower. From the casino floor, walk toward the south end and follow signs for 'Aria Express'. It is not near Las Vegas Blvd.",
        "vdara": "The Vdara stop is between Bellagio and Crystals. Only served on the northbound (Bellagio-bound) return trip.",
        "crystals": "The Crystals tram stop is inside The Shops at Crystals on the upper level. Follow signs for 'Tram' within the shopping center.",
        "aria": "The Aria tram station is on the north side of the resort. From the casino floor, follow signs for 'Aria Express Tram'.",
        "park-mgm": "The Park MGM tram station is on the north side of the property. From the casino floor, head north and follow signs for 'Free Tram to Bellagio'."
      }
    },
    {
      name: "Mirage - Treasure Island Tram",
      stops: ["mirage", "treasure-island"],
      hours: "CURRENTLY CLOSED due to Mirage renovation",
      note: "Suspended indefinitely while The Mirage is converted to Hard Rock Hotel. Walk along the west sidewalk (4 min) or use the Spring Mountain Rd pedestrian bridge as alternatives."
    }
  ],

  pedestrianBridges: [
    {
      name: "Spring Mountain / Sands Ave Bridge",
      location: "Spring Mountain Rd / Sands Ave & Las Vegas Blvd",
      connects: ["wynn", "venetian", "treasure-island", "fashion-show"],
      type: "four-corner",
      description: "Four-corner overhead walkway with escalators and elevators at each corner. Connects the Wynn/Venetian side (east) to Fashion Show Mall and TI (west). Busier during convention season.",
      landmarks: "Look for the large pedestrian bridge signs at the intersection. The Fashion Show Mall's metallic 'cloud' canopy is a visible landmark on the west side."
    },
    {
      name: "Flamingo Road Bridge",
      location: "Flamingo Rd & Las Vegas Blvd",
      connects: ["caesars", "bellagio", "flamingo", "cromwell", "horseshoe"],
      type: "four-corner",
      description: "Four-corner overhead walkway at one of the Strip's busiest intersections. The Bellagio-side bridge offers an elevated view of the fountain show. Connects five properties across the intersection.",
      landmarks: "The Caesars Palace columns are on the northwest, Bellagio fountains on the southwest, Flamingo's neon pink on the northeast, and The Cromwell's boutique facade on the southeast."
    },
    {
      name: "Harmon Ave Bridge",
      location: "Harmon Ave & Las Vegas Blvd",
      connects: ["cosmopolitan", "planet-hollywood"],
      type: "direct",
      description: "Direct pedestrian bridge from The Cosmopolitan (west side) to Planet Hollywood / Miracle Mile Shops (east side). Quick and straightforward crossing — no branching paths.",
      landmarks: "The Cosmopolitan's distinctive multi-story LED columns are on the west. The Miracle Mile Shops entrance is on the east."
    },
    {
      name: "Tropicana Ave Bridge",
      location: "Tropicana Ave & Las Vegas Blvd",
      connects: ["mgm-grand", "ny-ny", "excalibur", "tropicana-site"],
      type: "four-corner",
      description: "Four-corner overhead walkway at one of the Strip's busiest pedestrian intersections. Connects MGM Grand (east), NY-NY and Excalibur (west), and the former Tropicana site (east). Note: the Tropicana site is under construction for the A's stadium.",
      landmarks: "MGM Grand's gold lion statue is on the southeast, NY-NY's Statue of Liberty is on the northwest, and Excalibur's castle turrets are on the southwest."
    }
  ],

  tips: [
    "The Strip is 4.2 miles (6.8 km) from The STRAT at the north end to Mandalay Bay at the south end. Walking the entire length takes about 90 minutes without stopping.",
    "Jaywalking fines are $163. Always use crosswalks and pedestrian bridges to cross Las Vegas Blvd. Bridges are also faster than waiting for crosswalk signals.",
    "Summer temperatures regularly exceed 110\u00B0F (43\u00B0C). Use indoor walkways and free trams to stay cool. Most casinos are aggressively air-conditioned and can provide relief.",
    "Stay hydrated. Carry water, especially May through September. Every hotel gift shop sells bottled water, though prices vary — drug stores on the Strip are cheaper.",
    "Wear comfortable walking shoes. Even 'short' trips involve a lot of walking through massive casino floors. A trip that looks like 5 minutes on a map can take 15 minutes door-to-door.",
    "The Monorail runs on the EAST side of the Strip. Stations are behind the hotels, not on Las Vegas Blvd itself. Budget 5-10 extra minutes to walk through each casino to reach a station.",
    "Free trams run on the WEST side of the Strip. The Mandalay Bay Tram (Mandalay Bay ↔ Excalibur) and Aria Express (Bellagio ↔ Park MGM) can save significant walking time.",
    "Casino floors are intentionally maze-like. Follow overhead signs to find exits and walkways to connected properties. When in doubt, ask a security guard for directions — they know every shortcut.",
    "The north end of the Strip (STRAT to Resorts World) has fewer connections and longer sidewalk walks between properties. Consider ride-share for this stretch.",
    "Peak pedestrian congestion is 6pm-11pm on weekends, especially around the Bellagio fountains and Flamingo Rd intersection. The Tropicana Ave bridge is another bottleneck.",
    "Distances on the Strip are deceptive. Resorts are enormous, and what looks close on a map can be a 20-minute walk when you factor in casino floor traversal, elevator waits, and bridge crossings.",
    "Pedestrian bridges have escalators and elevators on each corner. Elevators are essential for luggage, strollers, and accessibility. They can be slow during peak hours — escalators are usually faster.",
    "The best time to walk the Strip is early morning (before 10am) when temperatures are lower and crowds are minimal. Night walks are pleasant temperature-wise but very crowded.",
    "Many hotels have multiple entrances. If you're headed to a specific restaurant or show, check which entrance is closest — using the 'wrong' entrance can add 10+ minutes of walking through the casino.",
    "The Aria Express tram and Mandalay Bay tram are free and air-conditioned. They run frequently and are often faster than walking, especially in summer. Always check operating hours first.",
    "If you're staying at a hotel without direct indoor connections, consider which pedestrian bridge is closest. Using bridges to cross Las Vegas Blvd is always faster than using the crosswalk signals.",
    "The LINQ Promenade (between Harrah's and Flamingo) is an open-air shopping and dining corridor with the High Roller observation wheel. It provides a shortcut between these properties without using Las Vegas Blvd.",
    "Ride-share pickup/drop-off locations vary by hotel and are often not at the main entrance. Check your hotel's ride-share zone before ordering. Most are in the parking garage or a side entrance."
  ]
};
