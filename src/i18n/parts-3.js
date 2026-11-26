// English overlays for parts: internal structure + cabin + systems.
export const PARTS_EN_3 = {
  frame: {
    d: 'Ring-shaped frames, like the hoops of a barrel. They maintain the circular cross-section, carry the hoop loads caused by pressurisation and spread concentrated loads into the skin.',
    f: [['Pitch', 'About 61 cm (24 in)'], ['Material', 'CFRP']],
  },
  stringer: {
    d: 'Longitudinal “hat-section” stiffeners. On the 787 they are cured together with the skin in one operation, with no riveting. Together with the skin they carry the tension and compression loads from fuselage bending.',
    f: [['Section', 'Hat'], ['Process', 'Co-cured with the skin']],
  },
  floorBeam: {
    d: 'Floor beams spanning the fuselage support the cabin floor and connect at both ends to the frames; stanchions below carry part of the load into the lower fuselage structure.',
    f: [['Material', 'Composite / aluminium alloy']],
  },
  cabinFloor: {
    d: 'Made from lightweight honeycomb sandwich panels. Longitudinal seat tracks are embedded in the floor; seats and galleys attach to the tracks so airlines can change the layout.',
    f: [['Floor', 'Honeycomb sandwich'], ['Seat tracks', 'Titanium']],
    t: 'Titanium is used for the seat tracks because aluminium in contact with carbon fibre can suffer galvanic corrosion.',
  },
  cargoFloor: {
    d: 'The lower cargo-hold floor is fitted with rollers, ball mats and powered drive units so containers can be pushed along the hold and locked in place.',
    f: [['Handling', 'Rollers + powered drive + locks']],
  },
  fwdBulkhead: {
    d: 'The front boundary of the pressure cabin, just behind the radome. It is a stiffened flat panel; the flight-deck instrument panel is immediately behind it and the radar antenna is mounted in front.',
    f: [['Type', 'Stiffened flat panel'], ['Also', 'Must resist bird strikes']],
  },
  aftBulkhead: {
    d: 'The “rear lid” of the pressure cabin. It is spherical so that membrane tension, like a balloon, carries most of the pressure difference, making it thin and light. The 787 aft bulkhead is a one-piece composite dome.',
    f: [['Type', 'Spherical dome'], ['Material', 'One-piece CFRP'], ['Location', 'Section 47/48 junction']],
  },
  apuFirewall: {
    d: 'A fire-resistant bulkhead separating the APU bay from the rest of the fuselage so a fire cannot spread.',
    f: [['Material', 'Titanium and other fire-resistant materials']],
  },
  centerWingBox: {
    d: 'A box structure running across the lower fuselage and joining the two wings into one unit; one of the most highly loaded parts of the aircraft. Wing bending moments balance here. The centre fuel tank is inside it.',
    f: [['Built by', 'Fuji Heavy Industries (now Subaru, Handa, Japan)'], ['Material', 'Mainly CFRP'], ['Inside', 'Centre fuel tank']],
  },
  keelBeam: {
    d: 'The main gear bay cuts a large opening in the lower fuselage, interrupting the lower skin and stringers. The keel beam runs lengthwise along the centreline through this opening and takes over the fuselage bending loads.',
    f: [['Location', 'Below the centre wing box → centre of the main gear bay']],
  },
  pressureDeck: {
    d: 'The main gear bay is unpressurised. The horizontal pressure deck above it and the bulkheads fore and aft separate the pressurised cabin from the wheel bay and carry cabin pressure loads.',
    f: [['Section 45 built by', 'Kawasaki Heavy Industries'], ['Role', 'Pressure boundary']],
  },

  cockpit: {
    d: 'Two pilots sit side by side. Ahead are five 15-inch large-format displays; each pilot also has a standard head-up display (HUD) that overlays key flight data on the view outside. The 787 keeps conventional control yokes, with fly-by-wire control of the surfaces.',
    f: [['Crew', '2 pilots + observer seat'], ['Displays', '5 × 15.1 in LCD'], ['HUD', 'Dual HUD (standard)'], ['Control', 'Yoke + fly-by-wire']],
    t: 'The 787 flight deck layout and operating logic are very close to the 777, so pilots need only a short differences course.',
  },
  seatBiz: {
    d: 'The illustrative layout is 1-2-1: every seat has direct aisle access and converts into a fully flat bed. Actual layouts are chosen by each airline.',
    f: [['Example count', '28 seats (7 rows)'], ['Arrangement', '1-2-1']],
  },
  seatEco: {
    d: 'The illustrative layout has nine seats per row (3-3-3), narrowing to 2-3-2 at the rear. The 787 cabin is 5.49 m wide.',
    f: [['Example count', '262 seats'], ['Arrangement', '3-3-3'], ['Cabin width', '5.49 m'], ['Maximum seats', '420 (exit limit)']],
  },
  galley: {
    d: 'Work areas for stowing carts and heating meals, grouped near the doors so ground catering vehicles can connect easily.',
    f: [['Location', 'Near doors 1, 2 and 4 (example)']],
  },
  lavatory: {
    d: 'Vacuum toilets use the pressure difference between cabin and outside to draw waste into a tank at the rear at high speed, using very little water per flush.',
    f: [['Flush', 'Vacuum']],
  },
  overheadBin: {
    d: 'Large pivot-down overhead bins that accept carry-on bags on edge. Air-conditioning ducts and cables run in the space above them.',
    f: [['Type', 'Pivot-down']],
  },
  crewRest: {
    d: 'Long-haul flights need several crews. The 787 hides its rest areas above the cabin ceiling: a flight-crew rest forward and a cabin-crew rest aft, each with bunks, using no cabin floor space.',
    f: [['Forward', 'Flight-crew rest'], ['Aft', 'Cabin-crew rest']],
  },
  uld: {
    d: 'Standard air cargo containers loaded side by side in the lower holds. The lower corner is cut away to follow the curved lower fuselage. Bags and freight are packed on the ground and then rolled into the aircraft.',
    f: [['Forward hold', '20 LD3'], ['Aft hold', '16 LD3'], ['Total hold volume', 'About 172 m³']],
  },

  radar: {
    d: 'A flat-plate slotted-array antenna inside the radome scans ahead and receives echoes from rain, showing precipitation and turbulence in colour on the flight-deck displays so pilots can avoid storms.',
    f: [['Antenna', 'Flat-plate slotted array'], ['Band', 'X band'], ['Functions', 'Weather, turbulence, wind-shear detection']],
  },
  fwdEEBay: {
    d: 'Below the flight-deck and forward cabin floor, this bay houses flight-control computers, the common core system (the aircraft’s “central server”) and other avionics, plus the main battery.',
    f: [['Equipment', 'Avionics computers, power distribution'], ['Main battery', 'Located here']],
  },
  mainBattery: {
    d: 'The 787 was the first large airliner to use lithium-ion batteries for the main and APU-start batteries, supplying power for ground refuelling and braking and acting as an emergency backup. After a battery overheating event in 2013, the batteries were enclosed in stainless-steel boxes with dedicated vent lines.',
    f: [['Type', 'Lithium-ion, 8 cells'], ['Rating', '29.6 V / 75 Ah'], ['Built by', 'GS Yuasa (Japan)']],
  },
  aftEEBay: {
    d: 'Behind the main gear bay, this is the aircraft’s “substation”: high-power electricity from the engine and APU generators is distributed here and converted by power electronics to drive large motors such as air-conditioning compressors and hydraulic pumps.',
    f: [['Equipment', 'High-power distribution panels, motor controllers'], ['APU battery', 'Located here']],
  },
  apuBattery: {
    d: 'A lithium-ion battery of the same type as the main battery, used to start the APU when no ground power is available.',
    f: [['Rating', '29.6 V / 75 Ah, 8 cells']],
  },
  eafr: {
    d: 'Popularly called the “black box”, though it is actually bright orange. The 787 carries two enhanced airborne flight recorders, each recording both flight data and cockpit voice, backing each other up.',
    f: [['Number', '2 (forward / aft)'], ['Records', 'Flight data + cockpit voice'], ['Colour', 'International orange']],
  },
  powerFeeder: {
    d: 'Large-section cables (routing illustrative) from the engine starter-generators and APU generators to the aft electronics bay. The 787 replaces engine-bleed-driven air conditioning, wing anti-ice and engine starting with electric power — a more-electric aircraft.',
    f: [['Generators', '4 × 250 kVA + 2 × 225 kVA'], ['Total capacity', 'About 1.45 MW'], ['Electrical systems', '235 V variable-frequency AC / ±270 V DC, etc.']],
  },
  ecsPack: {
    d: 'Two air-conditioning packs sit in the fairing below the centre wing box. High-pressure air from the electric compressors is cooled and dehumidified in heat exchangers and an air-cycle machine, then mixed with recirculated air and supplied to the cabin.',
    f: [['Number', '2'], ['Cabin altitude', 'Up to about 1,830 m (6,000 ft)'], ['Cooling', 'Ram-air heat exchangers']],
    t: 'The composite fuselage tolerates fatigue and moisture well, so the 787 can run a higher cabin pressure and humidity, leaving passengers less tired and dehydrated.',
  },
  cac: {
    d: 'Four high-power electric compressors compress outside air directly for the air-conditioning packs. Conventional airliners take this air from engine compressor bleed; the 787 uses electric power, so the engines no longer lose compressed air and fuel efficiency improves.',
    f: [['Number', '4 (2 per pack)'], ['Drive', 'Electric motors']],
  },
  airDuct: {
    d: 'Conditioned air rises through risers to overhead distribution ducts (routing illustrative), enters the cabin near the bins and leaves through grilles low in the sidewalls.',
    f: [['Flow', 'Supply at the top, return at the bottom']],
  },
  ngs: {
    d: 'Hollow-fibre membranes separate oxygen from air and fill the fuel tanks with nitrogen-rich gas, lowering the oxygen content in the ullage and preventing fuel vapour from igniting.',
    f: [['Principle', 'Membrane separation of nitrogen-rich air'], ['Role', 'Fuel-tank inerting']],
  },
  hydraulics: {
    d: 'Three independent hydraulic systems — left, centre and right — drive flight controls, landing gear and other users. Operating pressure is 5,000 psi, higher than the traditional 3,000 psi, so actuators and lines can be smaller and lighter. Purple lines show illustrative routing.',
    f: [['Systems', '3 (left / centre / right)'], ['Pressure', '5,000 psi (about 345 bar)'], ['Left and right', 'Engine-driven pump + electric pump'], ['Centre', '2 electric pumps + ram air turbine']],
  },
  rat: {
    d: 'The last-resort emergency power source. If both engines fail or electrical and hydraulic power are badly degraded, it deploys automatically from the belly and is spun by the airstream like a windmill, driving a hydraulic pump and generator to keep flight controls and key instruments available.',
    f: [['Deployment', 'Automatic or manual'], ['Provides', 'Emergency hydraulic + electrical power'], ['Location', 'Right rear belly fairing (illustrative)']],
    t: 'You can deploy the ram air turbine in the Animation panel.',
  },
  apu: {
    d: 'A small gas-turbine engine hidden in the tailcone. On the ground it supplies electrical power and supports main-engine start; in flight it can act as a backup generator. The 787 APU generates electricity only and supplies no compressed air, so it is simpler.',
    f: [['Model', 'APS5000'], ['Built by', 'Hamilton Sundstrand'], ['Generation', '2 × 225 kVA starter-generators']],
  },
  waterWaste: {
    d: 'Below the floor aft of the bulk hold (illustrative). Blue is the potable-water tank; brown is the vacuum waste tank collecting lavatory waste.',
    f: [['Disposal', 'Vacuum']],
  },
};
