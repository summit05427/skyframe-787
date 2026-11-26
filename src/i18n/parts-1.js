// English overlays for parts: fuselage + wing.
// Only d (description), f (facts) and t (tip) need translation; names reuse PARTS[id].e.
export const PARTS_EN_1 = {
  radome: {
    d: 'The streamlined nose cap that protects the weather-radar antenna. It must let radar waves pass through with almost no loss, so it is made from radar-transparent glass-fibre composite rather than carbon fibre or metal. The thin strips on its surface are lightning-diverter strips that carry a strike current into the fuselage.',
    f: [['Material', 'Radar-transparent composite (fibreglass)'], ['Inside', 'Weather radar, glideslope/localizer antennas'], ['Hinged up', 'For ground maintenance']],
    t: 'The radome is one of the parts most likely to suffer a bird strike or lightning strike.',
  },
  sec41: {
    d: 'The nose section containing the flight deck, nose-gear bay and door 1. Unlike a traditional aluminium fuselage built from thousands of skin panels and rivets, each 787 fuselage section is a one-piece barrel laid up from carbon-fibre tape on a rotating mandrel and cured as a whole in an autoclave.',
    f: [['Built by', 'Spirit AeroSystems (Wichita, USA)'], ['Material', 'Carbon-fibre reinforced polymer (CFRP)'], ['Process', 'Automated fibre placement + autoclave cure']],
    t: 'One one-piece barrel eliminates about 1,500 aluminium sheets and 40,000–50,000 fasteners.',
  },
  sec43: {
    d: 'The constant-section barrel immediately behind the nose section; the forward cargo hold is underneath. Stringers are co-cured with the skin, then frames are added, forming the skin–stringer–frame semi-monocoque structure.',
    f: [['Built by', 'Kawasaki Heavy Industries (Nagoya, Japan)'], ['Diameter', '5.77 m wide × 5.94 m high'], ['Material', 'CFRP one-piece barrel']],
  },
  sec44: {
    d: 'The forward part of the centre fuselage above the wing, joined to the centre wing box (Section 11) below; a key load path that carries wing lift into the fuselage.',
    f: [['Built by', 'Alenia (now Leonardo, Grottaglie, Italy)'], ['Material', 'CFRP one-piece barrel']],
  },
  sec46: {
    d: 'The aft part of the centre fuselage; the main landing-gear bay (Section 45) is below. Sections 44 and 46 are pre-joined with the centre wing box and gear bay in South Carolina into a “centre fuselage” assembly before final assembly.',
    f: [['Built by', 'Alenia (now Leonardo, Grottaglie, Italy)'], ['Material', 'CFRP one-piece barrel']],
    t: 'The 787-9 is 6.1 m longer than the 787-8, with about 3.05 m added ahead of and behind the wing.',
  },
  sec47: {
    d: 'The aft fuselage, which tapers and sweeps upward. It contains the aft cabin, aft cargo hold and bulk hold. The upward sweep keeps the tail from striking the runway during rotation.',
    f: [['Built by', 'Boeing South Carolina (formerly Vought)'], ['Material', 'CFRP one-piece barrel']],
  },
  sec48: {
    d: 'The unpressurised aft body behind the pressure cabin, carrying the vertical stabilizer and the all-moving horizontal stabilizer. The boundary between Sections 47 and 48 is the aft pressure bulkhead.',
    f: [['Built by', 'Boeing South Carolina'], ['Pressurised', 'No'], ['Loads', 'All vertical and horizontal tail loads']],
  },
  tailcone: {
    d: 'The conical fairing at the very end of the fuselage, housing the auxiliary power unit (APU); the circular opening at the tip is the APU exhaust. A firewall separates the APU from the rest of the fuselage.',
    f: [['Inside', 'APU (APS5000)'], ['Tip', 'APU exhaust']],
  },
  apuExhaust: {
    d: 'Hot gas from the auxiliary power unit leaves through the tailcone tip; the surrounding structure uses heat-resistant metal.',
    f: [['Material', 'Heat-resistant alloy / titanium']],
  },
  apuInlet: {
    d: 'The APU inlet door opens when the APU runs and stays closed at other times to keep the tail smooth and reduce drag.',
    f: [['Location', 'Upper tailcone (illustrative)']],
  },
  wbFairing: {
    d: 'The large non-load-bearing fairing around the wing-to-body junction. It smooths the airflow around the wing root and reduces interference drag. Inside it are the air-conditioning packs, main gear bay, hydraulics and fuel-inerting equipment.',
    f: [['Panels built by', 'Harbin Aircraft Industry Group (HAIG)'], ['Material', 'Composite sandwich'], ['Inside', 'Air-conditioning packs, gear bay, etc.']],
    t: 'Chinese companies build several 787 parts: HAIG wing-to-body fairing panels, CAC rudders and SAC vertical-tail leading edges.',
  },
  windshield: {
    d: 'The 787 flight deck has only four large windows: two windshields and two side windows, with no old-style eyebrow windows. Laminated glass and polymer layers withstand bird strikes and cabin pressure, and are electrically heated for anti-ice and demisting.',
    f: [['Number', '4 (2 front + 2 side)'], ['Functions', 'Electric anti-ice/demist, bird-strike resistance'], ['Emergency exit', 'Side windows do not open; a roof hatch is used']],
    t: 'Fewer, larger windows give the 787 nose its smooth look and reduce drag.',
  },
  cabinWindow: {
    d: 'The 787 has some of the largest cabin windows of any airliner. The composite fuselage resists fatigue well enough to allow larger openings. There are no shades; electrochromic glass changes from clear to deep blue as the voltage is varied.',
    f: [['Size', 'About 27 × 47 cm'], ['Dimming', 'Electrochromic, multiple levels'], ['Pitch', 'One window per frame (about 61 cm)']],
    t: 'Try the “Window dimming” slider in the Display panel.',
  },
  paxDoor: {
    d: 'Four Type-A doors on each side; the left side is normally used for boarding and the right for catering and servicing. The doors are plug-type: once the cabin is pressurised, internal pressure presses them against the frame so they cannot be opened in flight. Each door has an emergency evacuation slide.',
    f: [['Number', '8 (4 per side)'], ['Built by', 'Latécoère (France)'], ['Sill height', 'About 4.2–5.1 m'], ['Door stations (from nose)', '6.30 / 18.36 / 35.43 / 49.66 m']],
  },
  cargoDoorFwd: {
    d: 'A large cargo door on the right side that opens outward and upward, allowing LD3 containers and pallets to be loaded directly into the forward hold.',
    f: [['Clear opening', 'About 2.69 × 1.70 m'], ['Location', 'Right side, about 11.0 m from the nose'], ['Built by', 'Saab (Sweden)']],
  },
  cargoDoorAft: {
    d: 'The same size as the forward cargo door, located on the right side behind the wing and serving the aft cargo hold.',
    f: [['Clear opening', 'About 2.69 × 1.70 m'], ['Location', 'Right side, about 43.3 m from the nose'], ['Built by', 'Saab (Sweden)']],
  },
  bulkDoor: {
    d: 'A small door on the left side of the rear fuselage for loose baggage, live animals and other items that do not travel in containers.',
    f: [['Location', 'Left side, about 47.8 m from the nose'], ['Width', 'About 1.02 m']],
  },
  antenna: {
    d: 'Several antennas are distributed over the fuselage crown and belly: shark-fin VHF communication antennas, TCAS antennas, transponder/DME antennas and satellite-navigation antennas.',
    f: [['VHF', 'Voice and data-link communication'], ['TCAS', 'Traffic alert and collision avoidance'], ['GNSS', 'Satellite navigation']],
  },
  satcom: {
    d: 'The low blister on the fuselage crown houses antennas pointed at satellites, providing broadband links for in-flight Wi-Fi and oceanic communication (optional; position and shape vary by airline).',
    f: [['Material', 'Radar-transparent composite'], ['Use', 'In-flight broadband / satellite communication']],
  },
  airData: {
    d: 'Small probes projecting from the nose: pitot tubes measure total pressure to compute airspeed, angle-of-attack vanes sense airflow direction and total-temperature probes measure outside air temperature. All are electrically heated against icing and are multiply redundant.',
    f: [['Pitot tubes', '3 (illustrative)'], ['Angle-of-attack sensors', '2'], ['Anti-ice', 'Electric heating']],
  },
  beacon: {
    d: 'One red flashing beacon on the fuselage crown and one on the belly. They are switched on before engine start to warn ground staff that the aircraft is about to move.',
    f: [['Colour', 'Red flashing'], ['Location', 'Crown + belly']],
  },
  tailLight: {
    d: 'A white navigation light shining aft; together with the red and green wingtip lights it lets other aircraft determine the direction this aircraft is facing.',
    f: [['Colour', 'White']],
  },
  landingLight: {
    d: 'High-power LED landing lights in the wing-root leading edge illuminate the runway during take-off and approach and make the aircraft easier to see.',
    f: [['Source', 'LED'], ['Location', 'Wing-root leading edge, nose gear']],
  },
  packInlet: {
    d: 'The 787 does not use engine bleed air. Cabin air is drawn directly from dedicated belly inlets by electric compressors; the larger ram-air inlets beside them supply cooling air to the air-conditioning heat exchangers.',
    f: [['Cabin-air compressor inlets', 'One set per side'], ['Ram-air inlets', 'Cool the heat exchangers']],
    t: 'Bleedless architecture is one of the 787’s biggest system innovations: cabin air never passes through the engines.',
  },

  wingBox: {
    d: 'The wing’s primary structure is a box formed by the front spar, rear spar and upper/lower skins; it is also an integral fuel tank. On the 787 the skins, spars and stringers are carbon-fibre composite, giving a high aspect ratio, great flexibility and visible wingtip deflection in flight.',
    f: [['Wingspan', '60.12 m'], ['Quarter-chord sweep', 'About 32.2°'], ['Built by', 'Mitsubishi Heavy Industries (Nagoya, Japan)'], ['Skins/spars', 'CFRP']],
    t: 'Turn on “Flight mode” to see the wing bend under lift. In the static test the tip was pulled up about 7.6 m without failure.',
  },
  rakedTip: {
    d: 'Instead of upright winglets, the 787 sweeps its wingtip aft at a large angle and tapers it to a point. This also weakens the tip vortex and reduces induced drag, with better cruise efficiency and lower structural weight on long-range missions.',
    f: [['Purpose', 'Reduce induced drag and fuel burn'], ['Built by', 'Korean Air Aerospace Division']],
  },
  slatIn: {
    d: 'The leading-edge slat between the fuselage and the engine. At low speed it extends forward and down on tracks so the wing can reach a higher angle of attack without stalling.',
    f: [['Number', '1 segment per side'], ['Positions', 'Retracted / sealed / slotted'], ['Anti-ice', 'Electric heater mats']],
  },
  slatOut: {
    d: 'The five outboard leading-edge slats. For take-off they extend to the “sealed” position (no gap) to reduce drag; for landing they extend further to the “slotted” position, where high-speed air through the slot energises the upper surface and delays separation.',
    f: [['Number', '5 segments per side'], ['Anti-ice', 'Electric heater mats (no hot bleed air)'], ['Material', 'Mainly aluminium alloy']],
    t: 'The 787 anti-ices its wing with electric heater mats buried in the slat leading edges, not engine bleed air.',
  },
  krueger: {
    d: 'A small leading-edge flap between the inboard slat and the engine pylon. When deployed it folds forward from the lower wing surface and closes the gap between slat and pylon so the leading-edge high-lift devices form a continuous line.',
    f: [['Number', '1 per side'], ['Type', 'Sealed Krueger flap']],
  },
  flapIn: {
    d: 'The inboard trailing-edge single-slotted flap. The 787 uses a structurally simple hinged flap: it rotates about a fixed hinge below the wing instead of translating along long tracks, saving weight and allowing smaller fairings.',
    f: [['Type', 'Single-slotted hinged flap'], ['Detents', 'UP / 1 / 5 / 10 / 15 / 17 / 18 / 20 / 25 / 30'], ['Material', 'Composite']],
  },
  flapOut: {
    d: 'The outboard single-slotted trailing-edge flap, moving in step with the inboard flap. Extending it increases wing camber and area so the aircraft can take off and land at lower speed.',
    f: [['Type', 'Single-slotted hinged flap'], ['Landing detents', '25 or 30']],
  },
  flaperon: {
    d: 'A small control surface between the inboard and outboard flaps, behind the engine exhaust. It acts as both flap and aileron: it droops with the flaps at low speed and can also move differentially with the ailerons and spoilers to control roll.',
    f: [['Number', '1 per side'], ['Function', 'High lift + roll control']],
  },
  aileron: {
    d: 'The trailing-edge control surface near the wingtip. Differential deflection creates roll: one side goes up while the other goes down, rolling the aircraft toward the up-going side. Flight-control computers share deflection with the flaperons and spoilers.',
    f: [['Number', '1 per side'], ['Control', 'Fly-by-wire']],
  },
  spoilerIn: {
    d: 'Panels on the upper wing ahead of the flaps. Small in-flight deflections add drag or help roll; after touchdown all panels stand up as ground spoilers, destroying lift and pressing the aircraft onto the wheels so the brakes work effectively.',
    f: [['Number', '3 per side'], ['Function', 'Speedbrake / roll assist / ground lift dump']],
  },
  spoilerOut: {
    d: 'There are seven spoilers per wing, four of them outboard. When the flaps are down, the spoilers droop slightly to sit against the flap leading edge and preserve the slot shape.',
    f: [['Number', '4 per side (14 in total)'], ['Actuation', 'Mainly hydraulic; two pairs are electrically actuated']],
  },
  flapFairing: {
    d: 'Boat-shaped fairings under the trailing edge enclose the flap hinges and actuators to reduce drag. The rear part moves down with the flap.',
    f: [['Number', '3 per side'], ['Built by', 'Korean Air Aerospace Division']],
  },
  navLight: {
    d: 'A red light at the left wingtip and a green light at the right wingtip, an international convention inherited from maritime navigation. A white high-intensity strobe sits beside each.',
    f: [['Left', 'Red'], ['Right', 'Green']],
  },
  staticWick: {
    d: 'Small needle-like dischargers on the wingtips and control-surface trailing edges. Friction with the air builds static charge; the wicks release it gradually into the atmosphere so it does not interfere with radio communication and navigation.',
    f: [['Location', 'Wing and tail trailing edges']],
  },
  frontSpar: {
    d: 'The front primary spar running spanwise through the wing. With the rear spar and skins it forms the wing box, carries bending and shear, and acts as the front wall of the fuel tank.',
    f: [['Material', 'CFRP'], ['Location', 'About 14% chord (illustrative)']],
  },
  rearSpar: {
    d: 'The rear wall of the wing box. Flap, aileron and spoiler hinges and actuators, plus the main landing-gear support beam, attach around the rear spar.',
    f: [['Material', 'CFRP'], ['Location', 'About 60% chord (illustrative)']],
  },
  wingRib: {
    d: 'Chordwise bulkheads that maintain the aerofoil shape, transfer aerodynamic loads from the skin to the front and rear spars, and divide the tank into bays to limit fuel slosh.',
    f: [['Material', 'Machined aluminium alloy'], ['Role', 'Shape, load transfer, tank baffles']],
  },
  wingStringer: {
    d: 'Spanwise stiffeners bonded inside the upper and lower skins to prevent the thin skin from buckling under compression. Together with the skin they form a stiffened panel.',
    f: [['Material', 'CFRP, co-cured/co-bonded with the skin']],
  },
  fuelMain: {
    d: 'Each outer wing box contains a main fuel tank, sealed inside the wing structure (integral tank). In flight the centre tank is used first and the wing fuel is kept for last: its weight offsets part of the lift-induced bending moment and relieves the structure.',
    f: [['Capacity per side', 'About 20,900 L'], ['Total fuel', 'About 126,370 L including the centre tank'], ['Explosion protection', 'Nitrogen inerting system']],
  },
  fuelCenter: {
    d: 'The largest of the three tanks, inside the centre wing box under the fuselage and extending into the inner wing sections.',
    f: [['Capacity', 'About 84,600 L'], ['Location', 'Centre wing box + inner wing']],
  },
  fuelSurge: {
    d: 'Small bays near the wingtips, normally empty. They vent the main tanks to atmosphere and collect fuel that spills during manoeuvres so it cannot flow overboard.',
    f: [['Location', 'Outboard of the main tanks'], ['Function', 'Venting and spill collection']],
  },
};
