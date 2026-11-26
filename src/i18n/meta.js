// English overlays for tour, specification, groups and material legend.
export const GROUPS_EN = {
  fuselage: 'Fuselage',
  wing: 'Wings & control surfaces',
  engine: 'Powerplant',
  tail: 'Empennage',
  gear: 'Landing gear',
  structure: 'Internal structure',
  cabin: 'Cabin & cargo',
  systems: 'Aircraft systems',
};

export const SPEC_EN = [
  ['Length', '62.81 m'],
  ['Wingspan', '60.12 m'],
  ['Height', '17.02 m'],
  ['Fuselage width', '5.77 m'],
  ['MTOW', '254.7 t'],
  ['Typical two-class seats', '290'],
  ['Range', 'Approx. 14,000 km'],
  ['Cruise speed', 'Mach 0.85'],
  ['Engines', 'GEnx-1B / Trent 1000'],
  ['First delivery', '2014'],
];

export const CLASSES_EN = {
  cfrp: 'Carbon laminate',
  sandwich: 'Carbon sandwich',
  glass: 'Fiberglass',
  alu: 'Aluminum',
  ti: 'Titanium',
  steel: 'Steel',
  other: 'Other (glass, rubber, etc.)',
};

export const SHARE_EN = {
  cfrp: 'Composites, about 50%',
  alu: 'Aluminum, about 20%',
  ti: 'Titanium, about 15%',
  steel: 'Steel, about 10%',
  other: 'Other, about 5%',
};

export const TOUR_EN = [
  {
    title: 'Meet the Boeing 787-9',
    text: 'The 787 “Dreamliner” is the first large airliner whose airframe is mainly carbon-fibre composite. The 787-9 is the middle member of the family: 62.81 m long, 60.12 m span, typically 290 seats in two classes, and about 14,000 km unrefuelled. The next dozen steps take you from the outside in.',
  },
  {
    title: 'Half of it is composite',
    text: 'By weight, about 50% of the 787 structure is composite, 20% aluminium, 15% titanium and 10% steel. The blue areas — fuselage barrels, wing and tail — are carbon fibre; the gold aluminium remains mainly at the leading edges; titanium and steel dominate around the landing gear and engine pylons. Composites resist fatigue and corrosion and allow a higher cabin pressure and humidity.',
  },
  {
    title: 'Assembled like building blocks',
    text: 'The 787 fuselage is not built from riveted skin panels but from a few one-piece carbon-fibre barrels. They are made in the United States, Japan, Italy and elsewhere, flown to final assembly on converted “Dreamlifter” freighters, and joined. From nose to tail: Sections 41, 43, 44, 46, 47, 48 and the tailcone, with the centre wing box under the wing.',
  },
  {
    title: 'Nose and flight deck',
    text: 'At the very front is the radar-transparent radome containing the weather radar. The flight deck has only four large windows. Each pilot faces five 15-inch displays plus a head-up display. Below the floor are the nose-gear bay and the forward electronics bay.',
  },
  {
    title: 'A wing that bends',
    text: 'The carbon-fibre wing is long, thin and very flexible. In flight, lift bends the tip several metres above its ground position — the 787’s most recognisable attitude. Instead of winglets, the tip is raked aft to reduce drag.',
  },
  {
    title: 'Morphing for take-off and landing',
    text: 'At low speed the wing must “change shape” to make enough lift: leading-edge slats extend forward and down, trailing-edge flaps deflect down, and the flaperons droop too. The flap lever has UP, 1, 5, 10, 15, 17, 18, 20, 25 and 30 detents; landing is normally at 25 or 30.',
  },
  {
    title: 'Spoilers and flight controls',
    text: 'Each wing has seven spoilers on the upper surface. After touchdown they all stand up, destroying lift so the wheels press firmly onto the runway and the brakes can work. In flight, ailerons and flaperons control roll, elevators control pitch and the rudder controls yaw — all commanded by fly-by-wire.',
  },
  {
    title: 'Inside the engine',
    text: 'This is a GEnx-1B high-bypass turbofan. The 2.82 m fan at the front produces most of the thrust; the slim core runs through booster, high-pressure compressor, combustor, high-pressure turbine and low-pressure turbine. The turbines extract energy from the gas and drive the compressors and fan through two concentric shafts.',
  },
  {
    title: 'Reversers: turning thrust forward',
    text: 'After touchdown the pilot pulls the reverse-thrust levers; the rear sleeve of the nacelle slides aft to expose a ring of cascade vanes. The bypass duct is blocked and fan air is redirected forward at an angle to help slow the aircraft. The serrated nozzle trailing edge is there to reduce noise.',
  },
  {
    title: 'Landing gear',
    text: 'Each main gear has four wheels and retracts inward into the belly; the nose gear has two wheels and retracts forward. Watch the sequence: doors open first, the leg swings into place, then the doors close. The 787 main-wheel brakes are electric, with no hydraulic brake lines.',
  },
  {
    title: 'The fuselage skeleton',
    text: 'Through the skin you can see the skeleton: rings of frames and longitudinal stringers. Skin, stringers and frames form a semi-monocoque shell that carries cabin pressure and flight loads at very low weight. Floor beams divide the fuselage into the upper cabin and lower cargo holds.',
  },
  {
    title: 'Cabin and cargo holds',
    text: 'Cut along the centreline: the upper deck is the cabin, shown here as 28 business and 262 economy seats; crew rests are hidden above the ceiling. The lower holds take 36 LD3 containers, split into forward and aft sections by the centre wing box and main gear bay.',
  },
  {
    title: 'The more-electric aircraft',
    text: 'The 787 eliminated conventional engine bleed air. Each engine drives two 250 kVA starter-generators, and the APU two more, for about 1.45 MW total. Electrical power (green) gathers in the aft electronics bay and then drives air-conditioning compressors (cyan belly units), hydraulic pumps, wing anti-ice and brakes. Purple shows the three 5,000 psi hydraulic systems.',
  },
  {
    title: 'Where the fuel goes',
    text: 'The wing is the tank. Orange-red is the centre tank (about 84,600 L) in the centre wing box and inner wing; orange-yellow is the left and right main tanks (about 20,900 L each); the pale tanks near the tips are surge tanks. Total fuel is about 126,370 L, with nitrogen-enriched ullage gas to prevent ignition.',
  },
  {
    title: 'Tail: empennage and APU',
    text: 'The pressurised cabin ends at the spherical aft pressure bulkhead. Behind it, Section 48 carries the vertical fin and the all-moving horizontal stabiliser, which trims by changing its angle as a whole. The tailcone hides the auxiliary power unit (APU), a small gas turbine that generates electricity only.',
  },
  {
    title: 'Explore freely',
    text: 'That is the end of the tour. Now explore for yourself: click any part; use the top buttons for Exterior / X-ray / Cutaway / Exploded / Materials; and use the bottom panel to operate flaps, control surfaces, landing gear and reversers. Enjoy.',
  },
];
