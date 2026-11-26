// English overlays for parts: engines + empennage + landing gear.
export const PARTS_EN_2 = {
  engInlet: {
    d: 'The ring-shaped lip and inlet at the front of the engine, delivering air smoothly to the fan. The lip is anti-iced with hot air taken from the engine — one of the few bleed-air uses retained on the 787. The inner wall is lined with honeycomb acoustic panels.',
    f: [['Anti-ice', 'Engine hot bleed air'], ['Inner wall', 'Acoustic lining'], ['Nacelle built by', 'Goodrich (now Collins Aerospace)']],
  },
  engFanCowl: {
    d: 'Two clamshell doors around the fan case; they can be hinged upward during ground maintenance to expose the fan case and accessories.',
    f: [['Material', 'Composite sandwich']],
  },
  engReverser: {
    d: 'After touchdown the rear sleeve of the nacelle slides aft while internal blocker doors close the bypass duct, forcing fan air out through the exposed cascade vanes at an angle, producing a rearward decelerating force. The serrated chevrons at the trailing edge mix the exhaust with ambient air more gently, reducing noise.',
    f: [['Type', 'Translating sleeve + cascade'], ['Reverses', 'Bypass (fan) flow only'], ['Noise', 'Chevron nozzle']],
    t: 'Open “Reverser” in the Animation panel to see the sleeve translate aft and expose the cascades.',
  },
  engCascade: {
    d: 'A ring of guide-vane grilles exposed when the translating sleeve moves aft; they turn the blocked fan flow forward.',
    f: [['Exposed when', 'Sleeve translates aft']],
  },
  engCoreCowl: {
    d: 'The inner cowl around the core engine; its outer surface is also the inner wall of the bypass duct.',
    f: [['Material', 'Heat-resistant composite / metal']],
  },
  engPlug: {
    d: 'The exit for hot core gas. The centre plug gives the annular nozzle a smoothly varying flow area.',
    f: [['Material', 'Titanium / superalloy']],
  },
  engFan: {
    d: 'The GEnx-1B fan is 2.82 m in diameter and has only 18 wide-chord swept blades. The blades are carbon-fibre composite with titanium leading edges, and the fan case is composite too. About nine-tenths of the air passes only through the fan and out of the bypass duct, producing most of the thrust.',
    f: [['Diameter', '2.82 m (111.1 in)'], ['Blades', '18 (GEnx-1B)'], ['Bypass ratio', 'About 9'], ['Blade material', 'Carbon-fibre composite + titanium leading edge']],
    t: 'The other 787 engine option is the Rolls-Royce Trent 1000: 2.85 m fan, 20 blades and a three-shaft architecture.',
  },
  engSpinner: {
    d: 'The conical cap at the fan centre that guides air smoothly into the fan root. It often carries a spiral marking that warns ground staff and discourages birds when turning.',
    f: [['Rotation', 'Turns with the fan (N1)']],
  },
  engOGV: {
    d: 'A ring of fixed vanes behind the fan that straightens the swirling fan flow into axial flow to recover thrust; they also form the structural struts between the fan case and the core.',
    f: [['Type', 'Stator vanes']],
  },
  engShaft: {
    d: 'The GEnx is a two-shaft engine: the low-pressure shaft (N1) connects the fan, booster and low-pressure turbine; the surrounding high-pressure shaft (N2) connects the high-pressure compressor and high-pressure turbine. The two shafts turn at different speeds.',
    f: [['N1', 'Fan + booster + low-pressure turbine'], ['N2', 'High-pressure compressor + high-pressure turbine']],
  },
  engLPC: {
    d: 'The four-stage booster immediately behind the fan, on the same shaft, giving the core air its first compression.',
    f: [['Stages', '4'], ['Rotor', 'Low-pressure rotor N1']],
  },
  engHPC: {
    d: 'A ten-stage high-pressure compressor raises the air to more than twenty times inlet pressure; blades become shorter toward the rear. With the fan and booster, overall pressure ratio reaches more than 40.',
    f: [['Stages', '10'], ['Overall pressure ratio', 'About 46–55 depending on model']],
  },
  engCombustor: {
    d: 'An annular combustor where high-pressure air mixes with fuel and burns at temperatures far above the metal melting point; film cooling and thermal-barrier coatings protect the liner. The GEnx uses a lean-premixed TAPS combustor that greatly reduces nitrogen-oxide emissions.',
    f: [['Type', 'Annular · TAPS lean burn'], ['Role', 'Convert chemical energy into heat']],
  },
  engHPT: {
    d: 'The two-stage high-pressure turbine extracts energy from the hot gas to drive the high-pressure compressor. This is the harshest environment in the engine; blades use single-crystal superalloys with complex internal cooling passages.',
    f: [['Stages', '2'], ['Drives', 'High-pressure compressor (N2)']],
  },
  engLPT: {
    d: 'The seven-stage low-pressure turbine extracts further energy and drives the fan at the front through the long low-pressure shaft. The rear stages of the GEnx use lighter titanium-aluminide blades.',
    f: [['Stages', '7'], ['Drives', 'Fan + booster (N1)']],
  },
  engAGB: {
    d: 'Mounted below the engine and driven by the high-pressure rotor through a shaft, it powers the starter-generators, hydraulic pumps, fuel pumps, oil pumps and other accessories.',
    f: [['Power source', 'High-pressure rotor (N2)']],
  },
  engVFSG: {
    d: 'Each engine carries two 250 kVA variable-frequency starter-generators. On start they act as motors to turn the engine (replacing the traditional air starter); once running they generate electricity for this more-electric aircraft.',
    f: [['Number', '2 per engine (4 in total)'], ['Rating', '250 kVA each'], ['Output', '235 V variable-frequency AC']],
    t: 'With the APU’s two 225 kVA generators, the 787 can generate about 1.45 MW — several times that of a conventional airliner of the same size.',
  },
  engStrake: {
    d: 'A small strake on the side of the nacelle. At high angle of attack it creates a vortex that sweeps over the wing upper surface, energising the boundary layer and delaying separation behind the nacelle.',
    f: [['Purpose', 'Improve high-angle-of-attack lift'], ['Location', 'Upper inboard nacelle (illustrative)']],
  },
  pylon: {
    d: 'The load-bearing structure that hangs the engine below the wing, carries thrust and routes fuel, hydraulic and electrical lines. It places the engine forward and below the wing for aerodynamic benefit, and the engine mass helps damp wing flutter.',
    f: [['Built by', 'Spirit AeroSystems'], ['Engine centreline', '9.91 m from the aircraft centreline']],
  },

  fin: {
    d: 'The fixed part of the vertical tail, providing directional stability like the feathers on an arrow. Its main structure is a carbon-fibre composite wing box.',
    f: [['Height to fin tip', '17.02 m'], ['Built by', 'Boeing (Frederickson, USA)'], ['Material', 'CFRP']],
  },
  finLE: {
    d: 'The 787-9 fin leading edge uses hybrid laminar flow control: many micro-holes in the leading-edge skin passively remove a little boundary-layer air, keeping the flow laminar for longer and reducing skin-friction drag.',
    f: [['Built by', 'Shenyang Aircraft Corporation (SAC)'], ['Technology', 'Hybrid laminar flow control (HLFC)']],
    t: 'This was the first use of hybrid laminar flow control on a production airliner.',
  },
  rudder: {
    d: 'The control surface hinged to the fin trailing edge. Deflecting it left or right produces yaw; it is used mainly to align with the runway in crosswinds, coordinate turns and counter asymmetric thrust after an engine failure.',
    f: [['Type', 'Single-piece'], ['Built by', 'Chengdu Aircraft Corporation (CAC)'], ['Material', 'Composite sandwich']],
  },
  finStructure: {
    d: 'The spars and ribs inside the vertical stabilizer. Like the wing, it is a box of front and rear spars, ribs and stiffened skins.',
    f: [['Material', 'Mainly CFRP']],
  },
  stab: {
    d: 'The main body of the horizontal tail. The whole surface rotates about a pivot to trim the aircraft — as fuel burns and speed changes, it adjusts automatically so the pilot does not need continuous push or pull.',
    f: [['Span', '19.81 m'], ['Built by', 'Alenia (Foggia, Italy) and others'], ['Trim', 'All-moving']],
    t: 'Drag “Stabilizer trim” in the Flight controls panel to see the whole horizontal tail rotate.',
  },
  stabLE: {
    d: 'The horizontal-stabilizer leading edge, made of metal to resist bird strikes and sand erosion.',
    f: [['Material', 'Aluminium alloy']],
  },
  elevator: {
    d: 'The control surface hinged to the horizontal-stabilizer trailing edge. Deflecting it up creates downforce at the tail and raises the nose; the opposite lowers the nose.',
    f: [['Number', '1 per side'], ['Control', 'Fly-by-wire + hydraulic actuators']],
  },
  stabStructure: {
    d: 'The spars and ribs inside the horizontal stabilizer. The left and right halves join inside the fuselage and connect to Section 48 through the pivot and trim actuator.',
    f: [['Material', 'Mainly CFRP']],
  },

  noseGear: {
    d: 'Supports the nose and provides ground steering. The leg contains an oleo-pneumatic shock absorber: compressed nitrogen acts as the spring and hydraulic oil forced through an orifice dissipates impact energy. After take-off it retracts forward into the bay under the nose.',
    f: [['Wheels', '2'], ['Retraction', 'Forward'], ['Station from nose', '5.41 m'], ['Built by', 'Safran Landing Systems']],
  },
  noseWheel: {
    d: 'The two nose-gear wheels. They have no brakes and can be steered left or right by the steering actuator.',
    f: [['Tyre size', '40 × 16.0 R16'], ['Brakes', 'None']],
  },
  noseGearDoor: {
    d: 'Four doors. The two large forward doors open only during extension and retraction and close again when the gear is down to reduce drag and noise; the two small aft doors are linked to the leg and stay open with the gear down.',
    f: [['Number', '4 (2 front + 2 rear)']],
  },
  mainGear: {
    d: 'One four-wheel bogie main gear on each side, carrying about ninety percent of the aircraft weight and landing impact. After take-off it retracts inward into the main gear bay under the fuselage. The legs use titanium and high-strength steel.',
    f: [['Wheels', '4 per side (8 total)'], ['Main gear track', '9.80 m'], ['Wheelbase', '25.83 m'], ['Built by', 'Safran Landing Systems']],
    t: 'Click “Landing gear” in the Animation panel to watch the full sequence: doors open → gear retracts → doors close.',
  },
  mainWheel: {
    d: 'Two pairs of wheels fore and aft on each main-gear bogie. The radial tyres are filled with nitrogen and can cope with rolling speeds approaching 380 km/h.',
    f: [['Tyre size', '54 × 21.0 R23'], ['Inflation', 'Nitrogen']],
  },
  brake: {
    d: 'The 787 was the first large airliner with electric brakes. Each main wheel contains a carbon/carbon brake stack pressed by four electric actuators, replacing hydraulic pistons and brake lines. There is no hydraulic fluid to leak, and wear can be monitored wheel by wheel.',
    f: [['Brake stack', 'Carbon/carbon composite'], ['Actuation', '4 electric actuators per wheel'], ['Suppliers', 'Safran / Collins (Goodrich)']],
  },
  mainGearDoor: {
    d: 'The large belly doors open only during extension and retraction and then close; small doors fixed to the legs move with the gear.',
    f: [['Sequence', 'Open → extend/retract → close']],
  },
};
