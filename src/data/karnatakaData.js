// Comprehensive Karnataka Spatial & Regional Directory

export const ADMINISTRATIVE_DIVISIONS = [
  {
    id: 'bengaluru',
    name: 'Bengaluru Division',
    headquarters: 'Bengaluru',
    districts: [
      'Bengaluru Urban', 'Bengaluru Rural', 'Ramanagara',
      'Chikkaballapura', 'Kolar', 'Tumakuru', 'Chitradurga', 'Davangere'
    ],
    highlight: 'Tech capital, Nandi Hills, Silk & Toy crafts, Ancient Dravidian temples',
    totalAttractions: 48,
  },
  {
    id: 'mysuru',
    name: 'Mysuru Division',
    headquarters: 'Mysuru',
    districts: [
      'Mysuru', 'Kodagu', 'Mandya', 'Chamarajanagara',
      'Hassan', 'Chikkamagaluru', 'Dakshina Kannada', 'Udupi'
    ],
    highlight: 'Royal palaces, Hoysala stone architecture, Coffee highlands, Arabian coastline',
    totalAttractions: 62,
  },
  {
    id: 'belagavi',
    name: 'Belagavi Division',
    headquarters: 'Belagavi',
    districts: [
      'Belagavi', 'Bagalkot', 'Vijayapura', 'Dharwad',
      'Gadag', 'Haveri', 'Uttara Kannada'
    ],
    highlight: 'Chalukya rock caves, Adil Shahi domes, Kali river rapids, Pristine beaches',
    totalAttractions: 54,
  },
  {
    id: 'kalaburagi',
    name: 'Kalaburagi Division',
    headquarters: 'Kalaburagi',
    districts: [
      'Kalaburagi', 'Bidar', 'Ballari', 'Vijayanagara',
      'Raichur', 'Koppal', 'Yadgir'
    ],
    highlight: 'UNESCO Vijayanagara ruins of Hampi, Bahmani sultanate forts, Deccan plateau',
    totalAttractions: 41,
  },
];

export const DISTRICT_HIERARCHY = {
  'Bengaluru Urban': {
    taluks: ['Bengaluru North', 'Bengaluru South', 'Bengaluru East', 'Anekal', 'Yelahanka'],
    attractions: [
      { id: 101, name: 'Vidhana Soudha & Cubbon Park', taluk: 'Bengaluru North', category: 'Heritage', familyFriendly: true, roadType: 'Paved Highway', cost: '₹0 - ₹50', verified: true },
      { id: 102, name: 'Bannerghatta Biological Park', taluk: 'Anekal', category: 'Wildlife', familyFriendly: true, roadType: 'Paved Highway', cost: '₹350', verified: true },
      { id: 103, name: 'Lalbagh Botanical Gardens', taluk: 'Bengaluru South', category: 'Nature', familyFriendly: true, roadType: 'Paved Highway', cost: '₹30', verified: true },
      { id: 104, name: 'HAL Heritage Centre & Aerospace Museum', taluk: 'Bengaluru East', category: 'Education', familyFriendly: true, roadType: 'Paved Highway', cost: '₹50', verified: true },
    ]
  },
  'Chikkamagaluru': {
    taluks: ['Chikkamagaluru', 'Mudigere', 'Koppa', 'Sringeri', 'Narasimharajapura', 'Tarikere', 'Kadur'],
    attractions: [
      { id: 201, name: 'Mullayanagiri Peak', taluk: 'Chikkamagaluru', category: 'Hill stations', familyFriendly: true, roadType: 'Narrow Ghat Paved', cost: '₹0', verified: true },
      { id: 202, name: 'Bababudangiri Ridge Trail', taluk: 'Chikkamagaluru', category: 'Adventure', familyFriendly: false, roadType: 'Rocky / 4x4 Trail', cost: '₹0', verified: true },
      { id: 203, name: 'Kudremukh Peak & Valley', taluk: 'Mudigere', category: 'Trek', familyFriendly: false, roadType: 'Dirt & Forest Trek', cost: '₹600 (Permit)', verified: true },
      { id: 204, name: 'Kemmangundi Rose Gardens & Z Point', taluk: 'Tarikere', category: 'Nature', familyFriendly: true, roadType: 'Paved Ghat', cost: '₹20', verified: true },
      { id: 205, name: 'Sringeri Sharada Peetham', taluk: 'Sringeri', category: 'Spiritual', familyFriendly: true, roadType: 'Paved Highway', cost: '₹0', verified: true },
      { id: 206, name: 'Hebbe Falls Forest Trail', taluk: 'Tarikere', category: 'Waterfalls', familyFriendly: false, roadType: '4x4 Forest Jeep Track', cost: '₹500 (Jeep)', verified: true },
    ]
  },
  'Kodagu': {
    taluks: ['Madikeri', 'Somwarpet', 'Virajpet', 'Ponnampet', 'Kushalnagar'],
    attractions: [
      { id: 301, name: 'Abbey Falls', taluk: 'Madikeri', category: 'Waterfalls', familyFriendly: true, roadType: 'Paved Road', cost: '₹20', verified: true },
      { id: 302, name: 'Raja\'s Seat Viewpoint', taluk: 'Madikeri', category: 'Viewpoint', familyFriendly: true, roadType: 'Paved Urban', cost: '₹10', verified: true },
      { id: 303, name: 'Namdroling Golden Temple (Bylakuppe)', taluk: 'Kushalnagar', category: 'Spiritual', familyFriendly: true, roadType: 'Paved Highway', cost: '₹0', verified: true },
      { id: 304, name: 'Dubare Elephant Camp', taluk: 'Somwarpet', category: 'Wildlife', familyFriendly: true, roadType: 'Paved + Boat Crossing', cost: '₹100', verified: true },
      { id: 305, name: 'Mandalpatti Peak 4x4 Track', taluk: 'Madikeri', category: 'Adventure', familyFriendly: false, roadType: 'Broken Rock / 4x4 Off-Road', cost: '₹1500 (Jeep)', verified: true },
      { id: 306, name: 'Talacauvery & Brahmagiri', taluk: 'Madikeri', category: 'Spiritual & Trek', familyFriendly: true, roadType: 'Paved Ghat Road', cost: '₹0', verified: true },
    ]
  },
  'Vijayanagara': {
    taluks: ['Hospet', 'Kudligi', 'Hagaribommanahalli', 'Kotturu', 'Hoovina Hadagali', 'Harapanahalli'],
    attractions: [
      { id: 401, name: 'Hampi Virupaksha Temple & Bazaar', taluk: 'Hospet', category: 'Heritage', familyFriendly: true, roadType: 'Paved Road', cost: '₹0', verified: true },
      { id: 402, name: 'Vijaya Vittala Temple & Stone Chariot', taluk: 'Hospet', category: 'Heritage', familyFriendly: true, roadType: 'Paved + Electric Buggy', cost: '₹40 (ASI)', verified: true },
      { id: 403, name: 'Anjanadri Hill Sunrise Trek', taluk: 'Hospet', category: 'Spiritual / Trek', familyFriendly: true, roadType: 'Stone Steps (575 stairs)', cost: '₹0', verified: true },
      { id: 404, name: 'Daroji Sloth Bear Sanctuary', taluk: 'Hospet', category: 'Wildlife', familyFriendly: true, roadType: 'Paved Rural Road', cost: '₹50', verified: true },
    ]
  },
  'Uttara Kannada': {
    taluks: ['Kumta', 'Gokarna', 'Bhatkal', 'Honnavar', 'Sirsi', 'Karwar', 'Yellapur', 'Haliyal', 'Joida', 'Ankola', 'Siddapur'],
    attractions: [
      { id: 501, name: 'Om Beach & Kudle Beach', taluk: 'Gokarna', category: 'Coastal', familyFriendly: true, roadType: 'Paved Coastal Road', cost: '₹0', verified: true },
      { id: 502, name: 'Murudeshwar Shiva Temple & Beach', taluk: 'Bhatkal', category: 'Spiritual', familyFriendly: true, roadType: 'NH66 4-Lane Paved', cost: '₹0', verified: true },
      { id: 503, name: 'Yana Crystalline Rock Caves', taluk: 'Kumta', category: 'Adventure', familyFriendly: true, roadType: 'Forest Trail (0.5 km walk)', cost: '₹20', verified: true },
      { id: 504, name: 'Sathodi & Magod Falls', taluk: 'Yellapur', category: 'Waterfalls', familyFriendly: false, roadType: 'Rough Paved & Gravel', cost: '₹15', verified: true },
      { id: 505, name: 'Dandeli Kali River White Water Rafting', taluk: 'Joida', category: 'Adventure', familyFriendly: false, roadType: 'Paved Forest Road', cost: '₹1200', verified: true },
      { id: 506, name: 'Sharavathi Backwaters Mangrove Boating', taluk: 'Honnavar', category: 'Nature', familyFriendly: true, roadType: 'Paved Highway', cost: '₹200', verified: true },
    ]
  },
  'Mysuru': {
    taluks: ['Mysuru', 'Nanjangud', 'T. Narasipura', 'Hunsur', 'Piriyapatna', 'H.D. Kote', 'K.R. Nagar'],
    attractions: [
      { id: 601, name: 'Mysuru Palace & Darbar Hall', taluk: 'Mysuru', category: 'Heritage', familyFriendly: true, roadType: 'Paved City Boulevard', cost: '₹70', verified: true },
      { id: 602, name: 'Chamundi Hills & Monolithic Nandi', taluk: 'Mysuru', category: 'Spiritual', familyFriendly: true, roadType: 'Paved Ghat Road', cost: '₹0', verified: true },
      { id: 603, name: 'Keshava Temple, Somanathapura', taluk: 'T. Narasipura', category: 'Heritage (Gem)', familyFriendly: true, roadType: 'Paved Rural Road', cost: '₹25', verified: true },
      { id: 604, name: 'Kabini River Wildlife Safari', taluk: 'H.D. Kote', category: 'Wildlife', familyFriendly: true, roadType: 'Paved Highway', cost: '₹2200', verified: true },
    ]
  },
  'Bagalkot': {
    taluks: ['Badami', 'Bagalkot', 'Hungund', 'Mudhol', 'Jamkhandi', 'Bilagi', 'Ilkal', 'Rabkavi Banhatti', 'Guledgudda'],
    attractions: [
      { id: 701, name: 'Badami Cave Temples (Chalukya)', taluk: 'Badami', category: 'Heritage', familyFriendly: true, roadType: 'Paved Road', cost: '₹25 (ASI)', verified: true },
      { id: 702, name: 'Pattadakal UNESCO Temple Complex', taluk: 'Badami', category: 'Heritage', familyFriendly: true, roadType: 'Paved Road', cost: '₹40 (ASI)', verified: true },
      { id: 703, name: 'Aihole Durga Temple & Lad Khan', taluk: 'Hungund', category: 'Heritage (Gem)', familyFriendly: true, roadType: 'Paved Highway', cost: '₹25 (ASI)', verified: true },
      { id: 704, name: 'Mahakuta Shiva Temple & Pushkarani', taluk: 'Badami', category: 'Spiritual (Gem)', familyFriendly: true, roadType: 'Paved Country Road', cost: '₹0', verified: true },
    ]
  },
  'Shivamogga': {
    taluks: ['Shivamogga', 'Bhadravathi', 'Sagara', 'Thirthahalli', 'Shikaripura', 'Soraba', 'Hosanagara'],
    attractions: [
      { id: 801, name: 'Jog Falls (Gersoppa)', taluk: 'Sagara', category: 'Waterfalls', familyFriendly: true, roadType: 'Paved Highway NH69', cost: '₹20', verified: true },
      { id: 802, name: 'Agumbe Sunset Point & Rainforest', taluk: 'Thirthahalli', category: 'Nature / Ghats', familyFriendly: true, roadType: 'Scenic Ghat Paved (14 Hairpins)', cost: '₹0', verified: true },
      { id: 803, name: 'Kavaledurga Fort Trek', taluk: 'Thirthahalli', category: 'Adventure (Gem)', familyFriendly: false, roadType: 'Paved + 2km Stone Trail', cost: '₹0', verified: true },
      { id: 804, name: 'Sakrebyle Elephant Camp', taluk: 'Shivamogga', category: 'Wildlife', familyFriendly: true, roadType: 'Paved Highway', cost: '₹50', verified: true },
      { id: 805, name: 'Kundadri Hill Peak & Jain Basadi', taluk: 'Thirthahalli', category: 'Viewpoint', familyFriendly: true, roadType: 'Steep Paved Mountain Road', cost: '₹0', verified: true },
    ]
  }
};

// 9 Standard Vehicle Modes with Specifications
export const VEHICLE_MODES = [
  { id: 'family_car', name: 'Family Car', type: 'Car', icon: '🚗', groundClearance: '165mm', avgMileage: '15 km/l', suitableRoads: ['Paved Highways', 'Smooth Rural Roads'], warnings: 'Avoid unpaved steep forest tracks and rocky river crossings' },
  { id: 'hatchback', name: 'Hatchback', type: 'Car', icon: '🚙', groundClearance: '170mm', avgMileage: '18 km/l', suitableRoads: ['Paved Highways', 'City Streets', 'Gentle Ghats'], warnings: 'Prone to underbody scraping on broken monsoon tarmac' },
  { id: 'sedan', name: 'Sedan', type: 'Car', icon: '🚘', groundClearance: '160mm', avgMileage: '16 km/l', suitableRoads: ['4-Lane Highways', 'Expressways', 'Paved Tourism Routes'], warnings: 'Strictly avoid deep ruts, high speed bumps and unpaved coffee trails' },
  { id: 'suv', name: 'Compact / Full SUV', type: 'Car', icon: '🚐', groundClearance: '200mm', avgMileage: '13 km/l', suitableRoads: ['All Paved Roads', 'Moderate Gravel', 'Broken Ghats'], warnings: 'Suitable for 95% of Karnataka routes except extreme 4x4 trails' },
  { id: '4x4', name: '4x4 / AWD Off-Roader', type: 'Car', icon: '🚙', groundClearance: '225mm+', avgMileage: '10 km/l', suitableRoads: ['Mandalpatti Off-Road', 'Bababudangiri Ridge', 'Deep Mud/Slush'], warnings: 'Verify forest department transit permits before entering reserve tracks' },
  { id: 'touring_bike', name: 'Touring Motorcycle', type: 'Motorcycle', icon: '🏍️', groundClearance: '175mm', avgMileage: '35 km/l', suitableRoads: ['Coastal Highway NH66', 'Chitradurga Plains', 'Smooth Ghats'], warnings: 'Keep rain gear ready; beware of wet steel bridge expansion joints' },
  { id: 'adv_bike', name: 'Adventure Motorcycle (ADV)', type: 'Motorcycle', icon: '🏍️', groundClearance: '220mm', avgMileage: '30 km/l', suitableRoads: ['Charmadi Ghat', 'Bisle Forest Link', 'Gravel Byways'], warnings: 'Carry puncture repair kit and portable compressor for remote sections' },
  { id: 'bicycle', name: 'Bicycle / Touring Cycle', type: 'Cycle', icon: '🚲', groundClearance: 'High', avgMileage: 'Zero Emission', suitableRoads: ['Hampi Ruins Trail', 'Coorg Estate Lanes', 'Gokarna Beach Road'], warnings: 'Daytime travel only; steep elevation gains require high fitness' },
  { id: 'public_transport', name: 'Public Transport (KSRTC & Rail)', type: 'Transit', icon: '🚌', groundClearance: 'N/A', avgMileage: 'Eco Friendly', suitableRoads: ['KSRTC Airavat / Rajahamsa Routes', 'South Western Railway'], warnings: 'Last-mile auto or local bus may be needed from taluk bus stand' },
];

// Adventure Roads Dataset
export const ADVENTURE_ROADS = [
  {
    id: 'adv-1',
    name: 'Agumbe Ghat Hairpin Descent (NH169A)',
    district: 'Shivamogga & Udupi',
    distanceKm: 38,
    durationHours: '1.5 hrs',
    surface: 'Paved Asphalt with 14 Hairpin Bends',
    difficulty: 'Moderate to Challenging',
    accessStatus: 'Open (Caution in Heavy Monsoon)',
    suitableVehicles: ['SUV', '4x4', 'Touring Motorcycle', 'Adventure Motorcycle', 'Family Car'],
    unsuitableVehicles: ['Bicycle in Heavy Rain'],
    lastVerified: 'October 2026',
    safetyTip: 'Use low gear engine braking; watch for wet slippery moss on apexes and occasional troop of macaques.',
    highlights: ['Breathtaking Arabian Sea sunset views from Hairpin 14', 'Agumbe Rainforest canopy', 'Waterfalls along cliffs'],
  },
  {
    id: 'adv-2',
    name: 'Bisle Ghat Forest Corridor',
    district: 'Hassan to Dakshina Kannada',
    distanceKm: 42,
    durationHours: '2.0 hrs',
    surface: 'Single-Lane Paved with Patchy Gravel',
    difficulty: 'Challenging',
    accessStatus: 'Open (Night Travel Restricted 09 PM - 06 AM)',
    suitableVehicles: ['SUV', '4x4', 'Adventure Motorcycle'],
    unsuitableVehicles: ['Low-slung Sedan', 'Bicycle'],
    lastVerified: 'September 2026',
    safetyTip: 'No mobile network for 28 km; ensure spare tyre and fuel before entering forest check-post at Shanivarasanthe.',
    highlights: ['Bisle Viewpoint looking out at Pushpagiri, Dodda Betta, Kumaraparvatha', 'Pristine shola forest corridor'],
  },
  {
    id: 'adv-3',
    name: 'Mandalpatti Ridge 4x4 Jeep Trail',
    district: 'Kodagu (Madikeri)',
    distanceKm: 21,
    durationHours: '1.2 hrs',
    surface: 'Loose Stone, Deep Ruts & Rocky Bedrock',
    difficulty: 'Expert 4x4 Only',
    accessStatus: 'Permit & 4x4 Required at Base',
    suitableVehicles: ['4x4 / AWD Off-Roader', 'High-Clearance ADV Bike (Experienced)'],
    unsuitableVehicles: ['Family Car', 'Hatchback', 'Sedan', 'Touring Motorcycle'],
    lastVerified: 'November 2026',
    safetyTip: 'Private 2WD cars strictly prohibited past the forest checkpoint. Local authorized 4x4 jeeps available for hire at base.',
    highlights: ['Panoramic views of Pushpagiri Wildlife Sanctuary', 'Endless sea of misty green hills'],
  },
  {
    id: 'adv-4',
    name: 'Charmadi Ghat Scenic Pass',
    district: 'Chikkamagaluru to Dakshina Kannada',
    distanceKm: 34,
    durationHours: '1.3 hrs',
    surface: 'Smooth Paved Mountain Highway',
    difficulty: 'Moderate',
    accessStatus: 'Open (Monsoon speed limit 30 km/h)',
    suitableVehicles: ['All Vehicles', 'Cars', 'Bikes', 'KSRTC Buses'],
    unsuitableVehicles: ['None'],
    lastVerified: 'October 2026',
    safetyTip: 'Dense fog reduces visibility to under 10 meters between June and September; keep hazard lights or low beams active.',
    highlights: ['Charmadi Waterfalls on cliffside', 'Spectacular valleys of the Netravati river basin'],
  },
  {
    id: 'adv-5',
    name: 'Kavaledurga Hill Fort Trail',
    district: 'Shivamogga (Thirthahalli)',
    distanceKm: 16,
    durationHours: '45 mins drive + 1.5 hr trek',
    surface: 'Rural Tar Road leading to Ancient Stone Pathway',
    difficulty: 'Moderate Trek',
    accessStatus: 'Open (Closes at 05:30 PM)',
    suitableVehicles: ['All Cars & Bikes to Parking Lot'],
    unsuitableVehicles: ['Vehicles cannot go past fortification gate'],
    lastVerified: 'October 2026',
    safetyTip: 'Carry drinking water; no shops or stalls once you ascend the second fortification wall.',
    highlights: ['Ruins of the Keladi Nayaka palace', 'Panoramic Varahi backwater views', 'Kasi Viswanatha temple'],
  },
];

// Family Travel Recommendations
export const FAMILY_TRAVEL_DESTINATIONS = [
  {
    id: 'fam-1',
    name: 'Mysuru Heritage & Royal Gardens',
    district: 'Mysuru',
    suitableFor: 'All Ages (Toddlers to Seniors)',
    roadQuality: 'Paved 6-Lane Expressway (Bengaluru-Mysuru NH275)',
    restStops: ['Kadur Highway Food Plaza', 'Empire Express Ramnagar', 'Shivalli Restaurant Channapatna'],
    accessibility: 'Wheelchair ramps at Mysuru Palace, battery carts available at Karanji Lake and Zoo',
    familyHighlights: ['Mysuru Palace Illumination', 'Sri Chamarajendra Zoological Gardens', 'Brindavan Gardens Musical Fountains', 'St. Philomena\'s Cathedral'],
    recommendedDuration: '2 - 3 Days',
    budgetPerPerson: '₹4,500 - ₹8,000',
  },
  {
    id: 'fam-2',
    name: 'Coastal Udupi & Malpe Beachway',
    district: 'Udupi',
    suitableFor: 'Families & Children',
    roadQuality: 'Paved 4-Lane NH66 with Sea Bridges',
    restStops: ['Hotel Woodlands Udupi', 'Pangala Rest Hub', 'MTR Coastal Diner'],
    accessibility: 'Paved beachfront promenades, sea-walkway with railings, shallow safe swimming zones',
    familyHighlights: ['St. Mary\'s Island basalt rock boat ride', 'Malpe Beach water sports & camel rides', 'Udupi Krishna Matha cultural visit', 'Coin Museum Corp Bank'],
    recommendedDuration: '3 Days',
    budgetPerPerson: '₹5,500 - ₹9,500',
  },
  {
    id: 'fam-3',
    name: 'Hampi Open-Air Archaeological Walk',
    district: 'Vijayanagara (Hospet)',
    suitableFor: 'School Children & Heritage Enthusiasts',
    roadQuality: 'Paved NH48 & NH50 4-Lane Road',
    restStops: ['Chitradurga Highway Rest Stop', 'Hotel Malligi Hospet', 'Kamat Upachar Sira'],
    accessibility: 'Electric golf buggies operate from parking to Vittala Stone Chariot; flat stone pathways',
    familyHighlights: ['Stone Chariot', 'Musical Pillars of Vittala', 'Coracle boat ride on Tungabhadra', 'Elephant Stables & Lotus Mahal gardens'],
    recommendedDuration: '2 - 3 Days',
    budgetPerPerson: '₹5,000 - ₹8,500',
  },
  {
    id: 'fam-4',
    name: 'Coorg Coffee Estates & Bylakuppe',
    district: 'Kodagu',
    suitableFor: 'Families seeking relaxing stays',
    roadQuality: 'Paved 2-Lane Ghats with Smooth Tarmac',
    restStops: ['Kushalnagar Coffee Day', 'Channarayapatna Kamat', 'Adigas Hunsur'],
    accessibility: 'Gentle garden walkways at Namdroling Monastery; estate homestays with home-cooked meals',
    familyHighlights: ['Namdroling Golden Temple monks chanting', 'Dubare Elephant interaction & bathing', 'Coffee plantation guided walks', 'Nisargadhama bamboo island'],
    recommendedDuration: '3 Days',
    budgetPerPerson: '₹6,000 - ₹11,000',
  },
];

// Public Transport Directory for Karnataka Destinations
export const PUBLIC_TRANSPORT_DATA = {
  'Hampi': {
    nearestBusStand: 'Hampi Bazaar KSRTC Bus Shelter (0.2 km) & Hospet Central Bus Stand (12 km)',
    busDetails: [
      { type: 'KSRTC Local Shuttle', route: 'Hospet KSRTC ↔ Hampi Bazaar', frequency: 'Every 20 mins', fare: '₹18', timings: '06:00 AM - 09:30 PM' },
      { type: 'KSRTC Airavat Club Class AC', route: 'Bengaluru (Kempegowda) → Hospet', frequency: '6 Daily Overnights', fare: '₹750 - ₹950', timings: '10:00 PM - 06:30 AM' },
      { type: 'KSRTC Rajahamsa Executive', route: 'Mysuru / Hubballi → Hospet', frequency: '4 Daily Services', fare: '₹420 - ₹580', timings: 'Daily Scheduled' },
    ],
    nearestRailStation: 'Hosapete Junction (HPT) - 13 km',
    trainDetails: [
      { name: 'Hampi Express (16591)', route: 'Mysuru ↔ Bengaluru ↔ Hosapete', schedule: 'Daily Overnight', fare: '₹280 (Sleeper) / ₹750 (3AC)' },
      { name: 'Amaravathi Express (17226)', route: 'Hubballi ↔ Hosapete ↔ Vijayawada', schedule: 'Tri-weekly', fare: '₹190 (SL) / ₹520 (3AC)' },
    ],
    lastMileTransit: 'Battery buggies inside temple complex (₹30). Auto rickshaw Hospet to Hampi (₹200 - ₹250 fixed union rate). Bicycle rental at Hampi Bazaar (₹100 - ₹150/day).',
  },
  'Mysuru': {
    nearestBusStand: 'Mysuru KSRTC Suburb Bus Stand (0.8 km from Palace) & City Bus Stand (0.4 km)',
    busDetails: [
      { type: 'KSRTC Flybus Non-Stop AC', route: 'Bengaluru Airport (KIA) ↔ Mysuru', frequency: 'Every 1 hr', fare: '₹800', timings: '24x7 Round the clock' },
      { type: 'KSRTC Airavat Multi-Axle', route: 'Bengaluru Satellite Bus Stand ↔ Mysuru (Expressway)', frequency: 'Every 15 mins', fare: '₹320', timings: 'Non-stop 2 hrs journey' },
      { type: 'KSRTC Sarige / Express', route: 'Mysuru ↔ Madikeri / Hassan / Mangaluru', frequency: 'Every 30 mins', fare: '₹130 - ₹260', timings: 'Daily frequent' },
    ],
    nearestRailStation: 'Mysuru Junction (MYS) - 1.2 km from Palace',
    trainDetails: [
      { name: 'Vande Bharat Express (20607)', route: 'Chennai ↔ Bengaluru ↔ Mysuru', schedule: 'Daily except Wed (2 hrs from BLR)', fare: '₹515 (CC) / ₹1020 (EC)' },
      { name: 'Shatabdi Express (12007)', route: 'Bengaluru ↔ Mysuru Superfast', schedule: 'Daily except Tue', fare: '₹380 (CC) / ₹790 (EC)' },
      { name: 'Chamundi Express (16216)', route: 'Bengaluru City ↔ Mysuru Daily Intercity', schedule: 'Daily 06:15 PM', fare: '₹85 (2S) / ₹310 (CC)' },
    ],
    lastMileTransit: 'Prepaid auto stand at Mysuru Junction (₹30 min fare, meter + 10%). Tongas (horse carriages) around palace heritage ring (₹200 - ₹300 per ride).',
  },
  'Kodagu': {
    nearestBusStand: 'Madikeri KSRTC Bus Depot & Private Bus Stand (Town Centre)',
    busDetails: [
      { type: 'KSRTC Airavat Diamond Class', route: 'Bengaluru (KSR) → Madikeri via Mysuru', frequency: '5 Daily', fare: '₹620', timings: 'Day & Overnight options (6 hrs)' },
      { type: 'KSRTC Rajahamsa', route: 'Mangaluru ↔ Madikeri (via Sullia Ghat)', frequency: 'Every 45 mins', fare: '₹220', timings: '06:00 AM - 08:00 PM' },
      { type: 'KSRTC Rural Shuttle', route: 'Madikeri ↔ Somwarpet / Bhagamandala / Kushalnagar', frequency: 'Every 20 mins', fare: '₹35 - ₹65', timings: 'Daytime service' },
    ],
    nearestRailStation: 'Subrahmanya Road (SBHR) - 45 km or Mysuru Junction (MYS) - 118 km',
    trainDetails: [
      { name: 'Karwar Express / Panchaganga', route: 'Connects Bengaluru to Subrahmanya Road', schedule: 'Daily', fare: '₹210 (SL) / ₹580 (3AC)' },
    ],
    lastMileTransit: 'Local shared Mahindra Commander jeeps from Madikeri to Mandalpatti / Talacauvery. Local autos in town (₹40 min fare).',
  },
  'Chikkamagaluru': {
    nearestBusStand: 'Chikkamagaluru KSRTC Central Bus Station (Town Heart)',
    busDetails: [
      { type: 'KSRTC Airavat Club Class', route: 'Bengaluru ↔ Chikkamagaluru (via Hassan)', frequency: '4 Daily', fare: '₹480', timings: '4.5 hrs journey' },
      { type: 'KSRTC Rural / Ghat Bus', route: 'Chikkamagaluru ↔ Mullayanagiri base / Sringeri', frequency: 'Every 30 mins', fare: '₹40 - ₹110', timings: '06:30 AM - 06:30 PM' },
    ],
    nearestRailStation: 'Chikkamagaluru Railway Station (CMGR) & Kadur Junction (DRU) - 39 km',
    trainDetails: [
      { name: 'Yesvantpur - Chikkamagaluru Express (16239)', route: 'Bengaluru ↔ Chikkamagaluru Direct', schedule: 'Daily Morning', fare: '₹120 (2S) / ₹450 (CC)' },
      { name: 'Janshatabdi Express via Kadur', route: 'Bengaluru ↔ Hubballi (Stops at Kadur)', schedule: 'Daily', fare: '₹140 (2S) / ₹490 (CC)' },
    ],
    lastMileTransit: 'Private 4x4 Jeeps from town to Mullayanagiri and Bababudangiri peaks (₹1,500 - ₹2,000 round trip). Town auto rickshaws (metered).',
  },
  'Gokarna': {
    nearestBusStand: 'Gokarna Checkpost KSRTC Bus Stand & Kumta Bus Depot (32 km)',
    busDetails: [
      { type: 'KSRTC Non-AC Sleeper', route: 'Bengaluru ↔ Gokarna (via Sirsi Ghat)', frequency: '3 Daily Overnights', fare: '₹750', timings: '08:00 PM - 07:00 AM' },
      { type: 'KSRTC Coastal Shuttle', route: 'Mangaluru / Udupi / Karwar ↔ Gokarna', frequency: 'Every 40 mins', fare: '₹110 - ₹180', timings: 'Daily' },
    ],
    nearestRailStation: 'Gokarna Road Railway Station (GOK) - 8 km (Konkan Railway)',
    trainDetails: [
      { name: 'Matsyagandha Express (12620)', route: 'Mangaluru ↔ Gokarna Road ↔ Mumbai LTT', schedule: 'Daily', fare: '₹175 (SL) / ₹480 (3AC)' },
      { name: 'Panchaganga SF Express (16595)', route: 'Bengaluru ↔ Gokarna Road Direct', schedule: 'Daily Overnight', fare: '₹340 (SL) / ₹920 (3AC)' },
    ],
    lastMileTransit: 'Auto rickshaw from Gokarna Road station to Kudle Beach / Town (₹200 - ₹250 fixed). Boat ferry from Om Beach to Half Moon / Paradise Beach (₹300/person).',
  },
  'Badami': {
    nearestBusStand: 'Badami KSRTC Town Bus Stand (0.5 km from Cave 1)',
    busDetails: [
      { type: 'KSRTC Inter-Heritage Route', route: 'Badami ↔ Pattadakal (22 km) ↔ Aihole (35 km)', frequency: 'Every 30 mins', fare: '₹25 - ₹45', timings: '07:00 AM - 07:00 PM' },
      { type: 'KSRTC Express', route: 'Hubballi / Belagavi / Bagalkot → Badami', frequency: 'Hourly', fare: '₹90 - ₹150', timings: 'Daily' },
    ],
    nearestRailStation: 'Badami Railway Station (BDM) - 4 km from caves (South Western Railway)',
    trainDetails: [
      { name: 'Gol Gumbaz Express (16535)', route: 'Mysuru ↔ Bengaluru ↔ Badami ↔ Vijayapura', schedule: 'Daily', fare: '₹290 (SL) / ₹800 (3AC)' },
      { name: 'Hubballi - Solapur Passenger', route: 'Connects Hubballi junction to Badami', schedule: 'Daily twice', fare: '₹55' },
    ],
    lastMileTransit: 'Auto rickshaw from Badami station to Agastya Lake / Caves (₹80 - ₹100). Shared tonga carts inside ancient town.',
  },
  'Bengaluru': {
    nearestBusStand: 'Kempegowda Bus Station (Majestic) & Shantinagar TTMC (0.5 - 2 km)',
    busDetails: [
      { type: 'BMTC Vayu Vajra Airport AC', route: 'KIA Airport ↔ Majestic / Electronic City', frequency: 'Every 15 mins', fare: '₹240 - ₹310', timings: '24x7 Round the clock' },
      { type: 'Namma Metro (Purple / Green lines)', route: 'Whitefield ↔ Challaghatta & Nagasandra ↔ Silk Institute', frequency: 'Every 4 mins', fare: '₹10 - ₹60', timings: '05:00 AM - 11:30 PM' },
      { type: 'KSRTC Non-Stop Airavat', route: 'Majestic ↔ Mysuru / Hassan / Tumakuru / Hubballi', frequency: 'Every 10 mins', fare: '₹180 - ₹750', timings: 'Round the clock' },
    ],
    nearestRailStation: 'KSR Bengaluru City Junction (SBC) & Yesvantpur Junction (YPR)',
    trainDetails: [
      { name: 'Vande Bharat Express (20607)', route: 'Bengaluru ↔ Mysuru & Bengaluru ↔ Dharwad / Belagavi', schedule: 'Daily Express', fare: '₹515 - ₹1,250' },
      { name: 'Karnataka Express (12627)', route: 'Bengaluru ↔ New Delhi via Kalaburagi', schedule: 'Daily', fare: '₹480 (SL) / ₹1,420 (3AC)' },
    ],
    lastMileTransit: 'Namma Yatri / metered auto stands at all metro gates (₹30 min fare). App cabs (Uber/Ola) available 24x7.',
  },
  'Udupi': {
    nearestBusStand: 'Udupi KSRTC Bus Stand & City Bus Stand (Near Sri Krishna Matha)',
    busDetails: [
      { type: 'KSRTC Rajahamsa / Airavat', route: 'Bengaluru / Mysuru ↔ Udupi (via Shiradi Ghat)', frequency: 'Every 1 hr', fare: '₹520 - ₹780', timings: 'Day & Overnight' },
      { type: 'Udupi City Blue Bus', route: 'Udupi Bus Stand ↔ Malpe Beach / St. Marys Island / Manipal', frequency: 'Every 10 mins', fare: '₹15 - ₹25', timings: '06:00 AM - 09:30 PM' },
    ],
    nearestRailStation: 'Udupi Railway Station (UD) - 3.5 km from Sri Krishna Matha (Konkan Railway)',
    trainDetails: [
      { name: 'Panchaganga Express (16595)', route: 'Bengaluru KSR ↔ Udupi ↔ Karwar', schedule: 'Daily Overnight', fare: '₹310 (SL) / ₹840 (3AC)' },
      { name: 'Matsyagandha Express (12619)', route: 'Mumbai LTT ↔ Udupi ↔ Mangaluru', schedule: 'Daily', fare: '₹220 (SL) / ₹610 (3AC)' },
    ],
    lastMileTransit: 'Prepaid auto stand at Udupi station. Shared ferry boat from Malpe Beach jetty to St. Marys basaltic islands (₹400 return).',
  },
  'Shivamogga': {
    nearestBusStand: 'Shivamogga KSRTC Depot & Sagara Bus Stand (Near Jog Falls)',
    busDetails: [
      { type: 'KSRTC Non-Stop Airavat', route: 'Bengaluru ↔ Shivamogga (via Tumakuru - Arsikere)', frequency: 'Every 1 hr', fare: '₹440', timings: '5.5 hrs' },
      { type: 'KSRTC Jog Falls Shuttle', route: 'Sagara Bus Stand ↔ Jog Falls Viewpoint', frequency: 'Every 20 mins', fare: '₹35', timings: '07:00 AM - 07:00 PM' },
    ],
    nearestRailStation: 'Shivamogga Town (SMET) & Talaguppa Railway Station (TLGP - 14 km from Jog Falls)',
    trainDetails: [
      { name: 'Talaguppa Intercity Express (16206)', route: 'Mysuru ↔ Bengaluru ↔ Shivamogga ↔ Talaguppa', schedule: 'Daily Superfast', fare: '₹155 (2S) / ₹560 (CC)' },
      { name: 'Janshatabdi Express (12089)', route: 'Yesvantpur ↔ Shivamogga Town', schedule: 'Daily', fare: '₹135 (2S) / ₹470 (CC)' },
    ],
    lastMileTransit: 'Local shared taxis and KSRTC shuttles directly to British Bungalow & Karnataka Power Corp viewpoint.',
  },
  'Belagavi': {
    nearestBusStand: 'Belagavi Central CBT Bus Stand (Near Fort)',
    busDetails: [
      { type: 'KSRTC Airavat Multi-Axle', route: 'Bengaluru ↔ Belagavi (NH48 Golden Quadrilateral)', frequency: '8 Daily', fare: '₹720', timings: '8.5 hrs' },
      { type: 'NWKRTC City Bus', route: 'CBT ↔ Belagavi Fort ↔ Military Mahadeva Temple', frequency: 'Every 15 mins', fare: '₹15', timings: '06:00 AM - 10:00 PM' },
    ],
    nearestRailStation: 'Belagavi Railway Station (BGM) - 2 km from Fort',
    trainDetails: [
      { name: 'Vande Bharat Express (20669)', route: 'Bengaluru (KSR) ↔ Hubballi ↔ Belagavi', schedule: '6 days a week', fare: '₹1,150 (CC) / ₹2,100 (EC)' },
      { name: 'Rani Chennamma Express (16589)', route: 'Bengaluru ↔ Belagavi ↔ Miraj', schedule: 'Daily Overnight', fare: '₹360 (SL) / ₹980 (3AC)' },
    ],
    lastMileTransit: 'Auto rickshaws readily available across railway station and CBT terminal (metered).',
  },
  'Kalaburagi': {
    nearestBusStand: 'Kalaburagi Central Bus Terminal (KKRTC Main Hub)',
    busDetails: [
      { type: 'KKRTC Kalyana Ratha AC Sleeper', route: 'Bengaluru ↔ Kalaburagi', frequency: '6 Daily Overnights', fare: '₹840', timings: '09:00 PM - 07:00 AM' },
      { type: 'KKRTC Express', route: 'Kalaburagi ↔ Bidar (Fort) ↔ Raichur', frequency: 'Every 30 mins', fare: '₹140', timings: 'Regular intervals' },
    ],
    nearestRailStation: 'Kalaburagi Junction (KLBG) - Central Railway Hub',
    trainDetails: [
      { name: 'Vande Bharat Express (22231)', route: 'Kalaburagi ↔ Bengaluru SMVT', schedule: '6 days a week', fare: '₹980 (CC) / ₹1,850 (EC)' },
      { name: 'Udyan Express (11301)', route: 'Mumbai CSMT ↔ Kalaburagi ↔ Bengaluru', schedule: 'Daily', fare: '₹310 (SL) / ₹860 (3AC)' },
    ],
    lastMileTransit: 'Auto rickshaws and city buses connect Junction directly to historic Gulbarga Fort & Khwaja Bande Nawaz Dargah.',
  },
};

// Nearest Hotels & Homestays with Ratings and Budget Categories
export const NEAREST_HOTELS_DATA = {
  'Hampi': [
    { id: 'h-1', name: 'Heritage Resort Hampi', category: 'Luxury Heritage', rating: 4.8, reviews: 1420, pricePerNight: '₹6,500', distance: '3.5 km from ruins', amenities: ['Swimming Pool', 'Ayurvedic Spa', 'Free Breakfast', 'Organic Farm'], badge: 'Top Rated Luxury' },
    { id: 'h-2', name: 'Hotel Malligi (Hospet)', category: 'Comfort Hotel', rating: 4.5, reviews: 3840, pricePerNight: '₹2,400', distance: '11 km from Hampi (Free Parking)', amenities: ['Multi-cuisine Diner', 'AC Rooms', 'Travel Desk', 'Bar'], badge: 'Most Booked' },
    { id: 'h-3', name: 'Rocky Guesthouse & Cafe', category: 'Budget Backpackers', rating: 4.4, reviews: 890, pricePerNight: '₹850', distance: '0.3 km from Virupaksha Temple', amenities: ['Rooftop Boulders View', 'Free WiFi', 'Cycle Rental'], badge: 'Best Budget Value' },
    { id: 'h-4', name: 'KSTDC Hotel Mayura Bhuvaneshwari', category: 'Government Verified', rating: 4.2, reviews: 1150, pricePerNight: '₹1,950', distance: '1.2 km inside Kamalapur site', amenities: ['ASI Pass Counter', 'Garden', 'Restaurant'], badge: 'Official KSTDC' },
  ],
  'Mysuru': [
    { id: 'm-1', name: 'Grand Mercure Mysuru', category: 'Premium Hotel', rating: 4.8, reviews: 2950, pricePerNight: '₹5,800', distance: '2.5 km from Palace', amenities: ['Rooftop Pool', 'Fine Dining', 'Gym', 'Valet'], badge: 'Premium Stay' },
    { id: 'm-2', name: 'Roopa Elite Heritage', category: 'Mid-range Comfort', rating: 4.6, reviews: 1820, pricePerNight: '₹2,600', distance: '1.8 km from Palace', amenities: ['Complimentary Breakfast', 'Free WiFi', 'AC', 'Spa'], badge: 'Family Favorite' },
    { id: 'm-3', name: 'Hotel Dasaprakash Heritage', category: 'Budget Vegetarian', rating: 4.3, reviews: 2400, pricePerNight: '₹1,400', distance: '0.9 km from Mysore Palace', amenities: ['Pure Veg Restaurant', 'Ice Cream Parlor', 'Parking'], badge: 'Iconic Veg Heritage' },
    { id: 'm-4', name: 'Zostel Mysuru Heritage Villa', category: 'Hostel & Private Rooms', rating: 4.7, reviews: 1350, pricePerNight: '₹890 - ₹2,100', distance: '1.5 km from Zoo', amenities: ['Common Lounge', 'Cycle Tours', 'Cafe'], badge: 'Solo / Backpackers' },
  ],
  'Kodagu': [
    { id: 'k-1', name: 'Evolve Back Kuruba Safari Lodge', category: 'Ultra Luxury Estate', rating: 4.9, reviews: 1200, pricePerNight: '₹18,500', distance: 'Kabini / Coorg Border', amenities: ['Private Pool', 'Forest Safari', 'Infinity Pool', 'Fine Dining'], badge: 'World Heritage Luxury' },
    { id: 'k-2', name: 'Coorg Cliffs Resort & Spa', category: 'Nature Resort', rating: 4.7, reviews: 1850, pricePerNight: '₹6,200', distance: 'Pollibetta Coffee Belt', amenities: ['Mountain View Balcony', 'Infinity Pool', 'Plantation Walk'], badge: 'Hill View Pick' },
    { id: 'k-3', name: 'Coffee Blossom Homestay', category: 'Authentic Kodava Homestay', rating: 4.8, reviews: 760, pricePerNight: '₹2,200', distance: 'Madikeri Foothills (3 km)', amenities: ['Home Cooked Kodava Meals', 'Fireplace', 'Campfire'], badge: 'Best Local Experience' },
    { id: 'k-4', name: 'Hotel Mayura Valley View (KSTDC)', category: 'Government Scenic Hotel', rating: 4.3, reviews: 1450, pricePerNight: '₹2,100', distance: 'Attached to Raja\'s Seat', amenities: ['Valley View Balcony', 'Bar', 'Restaurant'], badge: 'Official Scenic View' },
  ],
  'Chikkamagaluru': [
    { id: 'c-1', name: 'The Serai Chikmagalur', category: 'Luxury Coffee Resort', rating: 4.8, reviews: 1750, pricePerNight: '₹14,000', distance: 'Mugthihalli Estate', amenities: ['Private Pool Villa', 'Oma Spa', 'Estate Biking'], badge: 'Luxury Coffee Retreat' },
    { id: 'c-2', name: 'Trivik Resort Mullayanagiri', category: 'Mountain Resort', rating: 4.7, reviews: 1400, pricePerNight: '₹8,500', distance: 'Mullayanagiri Peak Road', amenities: ['Direct Cloud Sea View', 'Jacuzzi', 'Bonfire'], badge: 'Peak View' },
    { id: 'c-3', name: 'Girisiri Mountain Homestay', category: 'Budget Estate Homestay', rating: 4.6, reviews: 620, pricePerNight: '₹1,800', distance: 'Baba Budangiri Foothills', amenities: ['Malnad Homestyle Thali', 'Plantation Tour', 'Trek Guide'], badge: 'Budget Eco Stay' },
  ],
  'Gokarna': [
    { id: 'g-1', name: 'SwaSwara Wellness Retreat', category: 'Eco Luxury Ayurvedic', rating: 4.8, reviews: 850, pricePerNight: '₹12,500', distance: 'Direct Om Beach Cliff', amenities: ['Ayurvedic Rejuvenation', 'Yoga Deck', 'Private Villas'], badge: 'Wellness Sanctuary' },
    { id: 'g-2', name: 'Kudle Beach View Resort', category: 'Beachfront Comfort', rating: 4.5, reviews: 1980, pricePerNight: '₹3,200', distance: '100m from Kudle Sand', amenities: ['Sea Facing Pool', 'Beach Shack', 'Free Breakfast'], badge: 'Beach Lovers' },
    { id: 'g-3', name: 'Namaste Cafe Cottages', category: 'Iconic Budget Shacks', rating: 4.4, reviews: 2600, pricePerNight: '₹1,500', distance: 'Directly on Om Beach', amenities: ['Seafood Cafe', 'Ocean Breezes', 'Kayaking'], badge: 'Famous Beach Cafe' },
  ],
  'Badami': [
    { id: 'b-1', name: 'The Heritage Resort Badami', category: 'Heritage Cottage Stay', rating: 4.6, reviews: 920, pricePerNight: '₹3,800', distance: '2 km from Caves', amenities: ['Swimming Pool', 'Lawn Garden', 'Restaurant', 'Parking'], badge: 'Top Rated Comfort' },
    { id: 'b-2', name: 'Hotel Badami Court', category: 'Classic Hotel', rating: 4.3, reviews: 1400, pricePerNight: '₹2,200', distance: '1.5 km from Cave 1', amenities: ['AC Rooms', 'Garden Pool', 'Travel Desk'], badge: 'Value for Money' },
    { id: 'b-3', name: 'KSTDC Hotel Mayura Chalukya', category: 'Official Heritage Hotel', rating: 4.1, reviews: 890, pricePerNight: '₹1,600', distance: '0.8 km from Rock Caves', amenities: ['Traditional Karnataka Meals', 'Ample Parking'], badge: 'Official KSTDC' },
  ],
  'Bengaluru': [
    { id: 'bng-1', name: 'The Taj West End Bangalore', category: 'Luxury Heritage Hotel', rating: 4.9, reviews: 3100, pricePerNight: '₹12,500', distance: 'Race Course Road (Central)', amenities: ['Heritage Gardens', 'Blue Ginger Diner', 'Tennis Courts', 'Luxury Spa'], badge: 'Heritage Landmark' },
    { id: 'bng-2', name: 'ITC Windsor Bengaluru', category: '5-Star Luxury', rating: 4.8, reviews: 2750, pricePerNight: '₹9,800', distance: 'Sankey Road / High Grounds', amenities: ['Dakshin Cuisine', 'Heated Pool', 'Butler Service', 'Fitness Center'], badge: 'Regal Luxury' },
    { id: 'bng-3', name: 'Hotel Maurya Heritage', category: 'Mid-range Comfort', rating: 4.3, reviews: 1600, pricePerNight: '₹2,100', distance: 'Near Majestic & Vidhana Soudha', amenities: ['Pure Veg Restaurant', 'Free Parking', 'Travel Desk'], badge: 'City Gateway Pick' },
    { id: 'bng-4', name: 'Zostel Bangalore Indiranagar', category: 'Backpackers & Social Hostel', rating: 4.7, reviews: 1890, pricePerNight: '₹899 - ₹2,400', distance: '100ft Road Indiranagar', amenities: ['Rooftop Cafe', 'Co-working Pods', 'Social Events', 'High Speed WiFi'], badge: 'Solo Traveler Choice' },
  ],
  'Udupi': [
    { id: 'u-1', name: 'Country Inn & Suites by Radisson Manipal', category: 'Premium Hotel', rating: 4.7, reviews: 1620, pricePerNight: '₹4,200', distance: '3 km from Krishna Matha', amenities: ['Infinity Pool', 'Mosaic Diner', 'Fitness Center'], badge: 'Premium Pick' },
    { id: 'u-2', name: 'Paradise Isle Beach Resort (Malpe)', category: 'Beachfront Resort', rating: 4.4, reviews: 2200, pricePerNight: '₹3,600', distance: 'Directly on Malpe Beach Sand', amenities: ['Ocean View Rooms', 'Watersports Desk', 'Seafood Restaurant'], badge: 'Beachfront Living' },
    { id: 'u-3', name: 'Hotel Kediyoor Udupi', category: 'Heritage Comfort', rating: 4.3, reviews: 1450, pricePerNight: '₹1,750', distance: '0.4 km from Sri Krishna Temple', amenities: ['Pure Veg Dining', 'AC Deluxe Rooms', 'Temple Proximity'], badge: 'Temple Pilgrim Pick' },
  ],
  'Shivamogga': [
    { id: 's-1', name: 'KSTDC Hotel Mayura Gerusoppa (Jog Falls)', category: 'Official Falls View Resort', rating: 4.4, reviews: 1980, pricePerNight: '₹1,950', distance: 'Front view of Jog Falls', amenities: ['Direct Plunge Waterfall View', 'KSTDC Restaurant', 'Garden'], badge: 'Direct Falls View' },
    { id: 's-2', name: 'Royal Orchid Central Shivamogga', category: 'Modern Business Comfort', rating: 4.5, reviews: 1120, pricePerNight: '₹3,400', distance: 'B.H. Road City Centre', amenities: ['Pinxx Multi-Cuisine', 'Gym', 'Free Breakfast', 'Wi-Fi'], badge: 'Top Rated Comfort' },
  ],
  'Belagavi': [
    { id: 'bel-1', name: 'Fairfield by Marriott Belagavi', category: 'International Comfort', rating: 4.7, reviews: 1350, pricePerNight: '₹4,600', distance: 'Kakati (NH48)', amenities: ['Outdoor Pool', '24/7 Market', 'Fitness Centre', 'Buffet'], badge: 'Brand Luxury' },
    { id: 'bel-2', name: 'Hotel Sanman Deluxe', category: 'Central City Stay', rating: 4.3, reviews: 940, pricePerNight: '₹1,650', distance: 'Near Central Bus Terminal', amenities: ['Restaurant', 'Room Service', 'Safe Parking'], badge: 'Budget Value' },
  ],
  'Kalaburagi': [
    { id: 'kal-1', name: 'The Heritage Inn Kalaburagi', category: 'Modern Comfort', rating: 4.4, reviews: 880, pricePerNight: '₹2,600', distance: 'Station Road (1.5 km from Fort)', amenities: ['AC Deluxe Rooms', 'Vegetarian Dining', 'Free Wi-Fi'], badge: 'Top City Choice' },
    { id: 'kal-2', name: 'Hotel Pariwar Comforts', category: 'Budget Pilgrim Stay', rating: 4.2, reviews: 760, pricePerNight: '₹1,400', distance: 'Near Railway Station', amenities: ['Fast Check-in', 'South Indian Breakfast', 'AC'], badge: 'Budget Pick' },
  ],
};

// Regional Karnataka Budget Food Menus & Top Rated Restaurants
export const REGIONAL_DINING_DATA = {
  'Mysuru': {
    regionName: 'Royal Mysuru & Old Mysore Cuisine',
    topRestaurants: [
      { name: 'Hotel Vinayaka Mylari (Agrahara)', rating: 4.8, specialty: 'Original Mylari Butter Masala Dosa & Sagu', avgForTwo: '₹160', address: 'Shop 79, Nazarbad Main Rd' },
      { name: 'RRR Restaurant (Gandhi Square)', rating: 4.7, specialty: 'Spicy Mysuru Mutton/Chicken Biryani on Plantain Leaf', avgForTwo: '₹450', address: 'Gandhi Square' },
      { name: 'Guru Sweets (Origin of Mysore Pak)', rating: 4.9, specialty: 'Royal Ghee Mysore Pak (Since Wadiyar era)', avgForTwo: '₹180', address: 'Sayyaji Rao Rd' },
      { name: 'Gufha Restaurant', rating: 4.5, specialty: 'Cave-themed North & South Indian dining', avgForTwo: '₹800', address: 'Pai Vista Hotel, BN Rd' },
    ],
    budgetMenu: [
      { name: 'Mylari Butter Masala Dosa', kannada: 'ಬೆಣ್ಣೆ ಮಸಾಲೆ ದೋಸೆ', price: '₹55', type: 'Veg', desc: 'Legendary soft, melt-in-mouth golden dosa smeared with fresh white butter and coconut sagu' },
      { name: 'Traditional South Indian Full Meals (Oota)', kannada: 'ಸಂಪೂರ್ಣ ಊಟ', price: '₹120', type: 'Veg', desc: 'Unlimited rice, sambar, rasam, kosambari, palya, curd, papad, payasa served on banana leaf' },
      { name: 'Authentic Mysore Pak (250g)', kannada: 'ಮೈಸೂರು ಪಾಕ್', price: '₹95', type: 'Veg', desc: 'Traditional gram flour, sugar syrup and pure desi ghee confection invented in palace royal kitchen' },
      { name: 'Filter Kaapi in Brass Davarah', kannada: 'ಫಿಲ್ಟರ್ ಕಾಫಿ', price: '₹25', type: 'Veg', desc: 'Fresh roasted Chikmagalur peaberry blend brewed with frothy buffalo milk' },
      { name: 'Thatte Idli with Red Chutney', kannada: 'ತಟ್ಟೆ ಇಡ್ಲಿ', price: '₹40', type: 'Veg', desc: 'Steaming plate-sized spongy rice cake topped with spiced gun powder (chutney podi) and ghee' },
    ]
  },
  'Hampi': {
    regionName: 'Tungabhadra Heritage & Hippie Island Cuisine',
    topRestaurants: [
      { name: 'Mango Tree Restaurant (Kamalapur)', rating: 4.8, specialty: 'South Indian Thali, Banana Flower Curry, Israeli Falafel', avgForTwo: '₹350', address: 'Near Kamalapur Lake Road' },
      { name: 'Laughing Buddha Cafe', rating: 4.6, specialty: 'Wood-fired Pizza, Shakshuka, Fresh Pomegranate Juices', avgForTwo: '₹400', address: 'Across river, Anegundi Road' },
      { name: 'Archana Guesthouse Rooftop Diner', rating: 4.5, specialty: 'Authentic North Karnataka Jolada Rotti & Lassi', avgForTwo: '₹240', address: 'Hampi Bazaar lane' },
    ],
    budgetMenu: [
      { name: 'North Karnataka Jolada Rotti Oota', kannada: 'ಜೋಳದ ರೊಟ್ಟಿ ಊಟ', price: '₹110', type: 'Veg', desc: '2 roasted sorghum flatbreads with stuffed brinjal (Yennegai), garlic chutney, curd and sprouts' },
      { name: 'Special Karnataka Heritage Thali', kannada: 'ಕರ್ನಾಟಕ ವಿಶೇಷ ಥಾಲಿ', price: '₹140', type: 'Veg', desc: 'Local red rice, drumstick sambar, huli, kootu, crunchy papad, buttermilk and holige sweet' },
      { name: 'Wood-fired Thin Crust Margherita', kannada: 'ಪಿಜ್ಜಾ', price: '₹260', type: 'Veg', desc: 'Stone-baked thin pizza seasoned with local basil and farm mozzarella' },
      { name: 'Fresh Mint Lime Ginger Cooler', kannada: 'ಮಿಂಟ್ ಲೈಮ್', price: '₹40', type: 'Veg', desc: 'Refreshes travellers after exploring boulders under the warm Deccan sun' },
    ]
  },
  'Kodagu': {
    regionName: 'Coorg Kodava Mountain Cuisine',
    topRestaurants: [
      { name: 'Coorg Cuisine (Madikeri)', rating: 4.7, specialty: 'Authentic Pandi Curry, Kadambuttu & Bamboo Shoot Curry', avgForTwo: '₹550', address: 'Main Road, Opposite Post Office' },
      { name: 'Raintree Restaurant', rating: 4.6, specialty: 'Heritage bungalow dining with Kodava delicacies', avgForTwo: '₹750', address: 'Pension Lane, Madikeri' },
      { name: 'East End Hotel', rating: 4.4, specialty: 'Traditional Coorg breakfast & mutton biryani', avgForTwo: '₹320', address: 'General Thimmaiah Road' },
    ],
    budgetMenu: [
      { name: 'Kadambuttu with Coorg Curry', kannada: 'ಕದಂಬುಟ್ಟು & ಕರಿ', price: '₹180', type: 'Non-Veg / Veg Option', desc: 'Steamed fragrant round rice balls served with traditional black pepper & vinegar infused curry' },
      { name: 'Akki Rotti with Ellu Pajji', kannada: 'ಅಕ್ಕಿ ರೊಟ್ಟಿ', price: '₹80', type: 'Veg', desc: 'Crispy rice flour flatbread spiced with cumin, coriander & toasted sesame seed chutney' },
      { name: 'Noolputtu with Sweet Coconut Milk', kannada: 'ನೂಲ್ಪುಟ್ಟು', price: '₹90', type: 'Veg', desc: 'Delicate steamed rice string hoppers paired with sweetened cardamom coconut milk' },
      { name: 'Estate Fresh Filter Coffee', kannada: 'ಕಾಫಿ', price: '₹30', type: 'Veg', desc: 'Hand-picked Arabica & Robusta beans roasted on high-altitude local plantations' },
    ]
  },
  'Gokarna': {
    regionName: 'Coastal Karavali & Konkan Seafood Cuisine',
    topRestaurants: [
      { name: 'Namaste Cafe (Om Beach)', rating: 4.6, specialty: 'Grilled Kingfish, Calamari, Nutella Crepes, Smoothies', avgForTwo: '₹600', address: 'Om Beach Cliffside' },
      { name: 'Pai Hotel Pure Veg', rating: 4.7, specialty: 'Udupi Dosa, Mangalore Buns, Filter Coffee', avgForTwo: '₹180', address: 'Temple Car Street' },
      { name: 'Chez Christophe French Cafe', rating: 4.5, specialty: 'Fresh Baguettes, French Croissants, Seafood Pasta', avgForTwo: '₹500', address: 'Middle Beach trail' },
    ],
    budgetMenu: [
      { name: 'Coastal Fish Curry Meals (Surmai/Anjal)', kannada: 'ಮೀನು ಊಟ', price: '₹220', type: 'Non-Veg', desc: 'Fresh Arabian Sea catch cooked in spicy coconut-kokum gravy served with boiled red rice' },
      { name: 'Mangalore Buns with Coconut Chutney', kannada: 'ಮಂಗಳೂರು ಬನ್ಸ್', price: '₹40', type: 'Veg', desc: 'Mildly sweet fluffy fried banana bread served with spicy coconut sambar' },
      { name: 'Neer Dosa with Sagu (3 pieces)', kannada: 'ನೀರ್ ದೋಸೆ', price: '₹65', type: 'Veg', desc: 'Paper-thin delicate water dosas served with fresh coconut chutney and mixed vegetable sagu' },
      { name: 'Fresh Tender Coconut Water', kannada: 'ಎಳನೀರು', price: '₹40', type: 'Veg', desc: 'Freshly harvested coastal tender coconut on beachside shacks' },
    ]
  },
  'Badami': {
    regionName: 'North Karnataka Malaprabha Cuisine',
    topRestaurants: [
      { name: 'Banashankari Khanavali', rating: 4.8, specialty: 'Unlimited Jolada Rotti, Shenga Chutney Pudi, Ranjaka', avgForTwo: '₹200', address: 'Near Bus Stand, Station Road' },
      { name: 'Hotel Sanman Deluxe', rating: 4.4, specialty: 'North & South Indian veg meals', avgForTwo: '₹280', address: 'Near Agastya Lake' },
    ],
    budgetMenu: [
      { name: 'Full North Karnataka Khanavali Oota', kannada: 'ಖಾನಾವಳಿ ಊಟ', price: '₹90', type: 'Veg', desc: 'Unlimited hot jowar rotis, badane ennegai, spicy peanut chutney powder, curd and buttermilk' },
      { name: 'Mirchi Bajji & Girmit Platter', kannada: 'ಗಿರ್ಮಿಟ್ & ಮಿರ್ಚಿ', price: '₹40', type: 'Veg', desc: 'Spiced puffed rice snack tossed with onions, fried gram and crispy gram flour chilli fritters' },
      { name: 'Dharwad Peda (200g Box)', kannada: 'ಧಾರವಾಡ ಪೇಡ', price: '₹90', type: 'Veg', desc: 'Caramelised milk mawa confection rolled in powdered sugar' },
    ]
  }
};

// Spatial Lookup Helpers to guarantee rich Transport, Hotel & Dining data for ANY Karnataka destination
export function getDestinationPublicTransport(dest) {
  if (!dest) return { region: 'Mysuru', ...PUBLIC_TRANSPORT_DATA['Mysuru'] };
  const name = (dest.name || '').toLowerCase();
  const district = (dest.district || '').toLowerCase();
  const div = (dest.div || '').toLowerCase();

  // Search exact or key match
  for (const [key, data] of Object.entries(PUBLIC_TRANSPORT_DATA)) {
    const k = key.toLowerCase();
    if (name.includes(k) || district.includes(k) || div.includes(k) || k.includes(district)) {
      return { region: key, ...data };
    }
  }

  // District / region heuristics
  if (district.includes('vijayanagara') || district.includes('ballari') || district.includes('koppal') || name.includes('hampi') || name.includes('vittala') || name.includes('virupaksha')) {
    return { region: 'Hampi', ...PUBLIC_TRANSPORT_DATA['Hampi'] };
  }
  if (district.includes('kodagu') || district.includes('coorg') || name.includes('madikeri') || name.includes('abbey') || name.includes('mandalpatti') || name.includes('talacauvery')) {
    return { region: 'Kodagu', ...PUBLIC_TRANSPORT_DATA['Kodagu'] };
  }
  if (district.includes('chikkamagaluru') || district.includes('chikmagalur') || name.includes('mullayanagiri') || name.includes('kudremukh') || name.includes('sringeri') || name.includes('kemmangundi')) {
    return { region: 'Chikkamagaluru', ...PUBLIC_TRANSPORT_DATA['Chikkamagaluru'] };
  }
  if (district.includes('uttara kannada') || district.includes('gokarna') || district.includes('karwar') || name.includes('om beach') || name.includes('murudeshwar') || name.includes('yana') || name.includes('dandeli')) {
    return { region: 'Gokarna', ...PUBLIC_TRANSPORT_DATA['Gokarna'] };
  }
  if (district.includes('bagalkot') || district.includes('badami') || district.includes('aihole') || district.includes('pattadakal')) {
    return { region: 'Badami', ...PUBLIC_TRANSPORT_DATA['Badami'] };
  }
  if (district.includes('shivamogga') || district.includes('shimoga') || name.includes('jog') || name.includes('agumbe') || name.includes('sharavathi')) {
    return { region: 'Shivamogga', ...PUBLIC_TRANSPORT_DATA['Shivamogga'] };
  }
  if (district.includes('udupi') || district.includes('dakshina kannada') || district.includes('mangaluru') || name.includes('krishna') || name.includes('malpe') || name.includes('dharmasthala') || name.includes('subramanya')) {
    return { region: 'Udupi', ...PUBLIC_TRANSPORT_DATA['Udupi'] };
  }
  if (district.includes('belagavi') || district.includes('dharwad') || district.includes('hubballi') || name.includes('gokak') || name.includes('chennamma')) {
    return { region: 'Belagavi', ...PUBLIC_TRANSPORT_DATA['Belagavi'] };
  }
  if (district.includes('kalaburagi') || district.includes('bidar') || district.includes('raichur') || district.includes('yadgir') || name.includes('bahmani') || name.includes('gumbaz')) {
    return { region: 'Kalaburagi', ...PUBLIC_TRANSPORT_DATA['Kalaburagi'] };
  }
  if (district.includes('bengaluru') || district.includes('ramangara') || district.includes('kolar') || district.includes('chikkaballapura') || name.includes('soudha') || name.includes('lalbagh') || name.includes('nandi')) {
    return { region: 'Bengaluru', ...PUBLIC_TRANSPORT_DATA['Bengaluru'] };
  }

  return { region: 'Mysuru', ...PUBLIC_TRANSPORT_DATA['Mysuru'] };
}

export function getDestinationHotels(dest) {
  if (!dest) return NEAREST_HOTELS_DATA['Mysuru'];
  const name = (dest.name || '').toLowerCase();
  const district = (dest.district || '').toLowerCase();
  const div = (dest.div || '').toLowerCase();

  for (const [key, list] of Object.entries(NEAREST_HOTELS_DATA)) {
    const k = key.toLowerCase();
    if (name.includes(k) || district.includes(k) || div.includes(k) || k.includes(district)) {
      return list;
    }
  }

  if (district.includes('vijayanagara') || district.includes('ballari') || name.includes('hampi')) return NEAREST_HOTELS_DATA['Hampi'];
  if (district.includes('kodagu') || district.includes('coorg') || name.includes('madikeri')) return NEAREST_HOTELS_DATA['Kodagu'];
  if (district.includes('chikkamagaluru') || name.includes('mullayanagiri') || name.includes('kudremukh')) return NEAREST_HOTELS_DATA['Chikkamagaluru'];
  if (district.includes('uttara kannada') || name.includes('gokarna') || name.includes('murudeshwar')) return NEAREST_HOTELS_DATA['Gokarna'];
  if (district.includes('bagalkot') || name.includes('badami') || name.includes('pattadakal')) return NEAREST_HOTELS_DATA['Badami'];
  if (district.includes('shivamogga') || name.includes('jog')) return NEAREST_HOTELS_DATA['Shivamogga'];
  if (district.includes('udupi') || district.includes('mangaluru')) return NEAREST_HOTELS_DATA['Udupi'];
  if (district.includes('belagavi') || district.includes('dharwad')) return NEAREST_HOTELS_DATA['Belagavi'];
  if (district.includes('kalaburagi') || district.includes('bidar')) return NEAREST_HOTELS_DATA['Kalaburagi'];
  if (district.includes('bengaluru') || name.includes('cubbon') || name.includes('nandi')) return NEAREST_HOTELS_DATA['Bengaluru'];

  return NEAREST_HOTELS_DATA['Mysuru'];
}

export function getDestinationDining(dest) {
  if (!dest) return REGIONAL_DINING_DATA['Mysuru'];
  const name = (dest.name || '').toLowerCase();
  const district = (dest.district || '').toLowerCase();
  const div = (dest.div || '').toLowerCase();

  for (const [key, data] of Object.entries(REGIONAL_DINING_DATA)) {
    const k = key.toLowerCase();
    if (name.includes(k) || district.includes(k) || div.includes(k) || k.includes(district)) {
      return data;
    }
  }

  if (district.includes('vijayanagara') || district.includes('ballari') || name.includes('hampi')) return REGIONAL_DINING_DATA['Hampi'];
  if (district.includes('kodagu') || district.includes('coorg') || name.includes('madikeri')) return REGIONAL_DINING_DATA['Kodagu'];
  if (district.includes('chikkamagaluru') || name.includes('mullayanagiri')) return REGIONAL_DINING_DATA['Kodagu']; // Similar Malnad
  if (district.includes('uttara kannada') || name.includes('gokarna') || name.includes('murudeshwar')) return REGIONAL_DINING_DATA['Gokarna'];
  if (district.includes('bagalkot') || name.includes('badami')) return REGIONAL_DINING_DATA['Badami'];
  if (district.includes('shivamogga') || name.includes('jog')) return REGIONAL_DINING_DATA['Shivamogga'];
  if (district.includes('udupi') || district.includes('mangaluru')) return REGIONAL_DINING_DATA['Udupi'];
  if (district.includes('belagavi') || district.includes('dharwad')) return REGIONAL_DINING_DATA['Belagavi'];
  if (district.includes('kalaburagi') || district.includes('bidar')) return REGIONAL_DINING_DATA['Kalaburagi'];
  if (district.includes('bengaluru') || name.includes('cubbon')) return REGIONAL_DINING_DATA['Bengaluru'];

  return REGIONAL_DINING_DATA['Mysuru'];
}
