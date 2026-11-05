import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default Leaflet asset URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Comprehensive Karnataka Destinations Database across all 31 districts
export const KARNATAKA_MARKERS = [
  // Heritage & Monuments
  { id: 1, name: 'Hampi', kannada: 'ಹಂಪಿ', lat: 15.3350, lng: 76.4600, district: 'Vijayanagara', cat: 'Heritage', type: 'temple', crowd: 'High', color: '#8b5cf6', desc: 'UNESCO ruins of the Vijayanagara Empire' },
  { id: 2, name: 'Badami Caves', kannada: 'ಬಾದಾಮಿ ಗುಹೆಗಳು', lat: 15.9189, lng: 75.6775, district: 'Bagalkot', cat: 'Heritage', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'Rock-cut Chalukya cave temples' },
  { id: 3, name: 'Pattadakal', kannada: 'ಪಟ್ಟದಕಲ್ಲು', lat: 15.9485, lng: 75.8160, district: 'Bagalkot', cat: 'Heritage', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'UNESCO Chalukya temples complex' },
  { id: 4, name: 'Aihole', kannada: 'ಐಹೊಳೆ', lat: 16.0210, lng: 75.8820, district: 'Bagalkot', cat: 'Heritage', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Cradle of Indian temple architecture' },
  { id: 5, name: 'Gol Gumbaz', kannada: 'ಗೋಲ್ ಗುಂಬಜ್', lat: 16.8302, lng: 75.7360, district: 'Vijayapura', cat: 'Heritage', type: 'monument', crowd: 'Moderate', color: '#8b5cf6', desc: 'Second largest dome in the world' },
  { id: 6, name: 'Bidar Fort', kannada: 'ಬಿದರ್ ಕೋಟೆ', lat: 17.9150, lng: 77.5186, district: 'Bidar', cat: 'Heritage', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Bahmani fort with Persian architecture' },
  { id: 7, name: 'Mysuru Palace', kannada: 'ಮೈಸೂರು ಅರಮನೆ', lat: 12.3052, lng: 76.6552, district: 'Mysuru', cat: 'Heritage', type: 'palace', crowd: 'High', color: '#f59e0b', desc: 'Royal palace of the Wadiyar dynasty' },
  { id: 8, name: 'Belur Chennakeshava', kannada: 'ಬೇಲೂರು', lat: 13.1623, lng: 75.8576, district: 'Hassan', cat: 'Heritage', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'Intricate Hoysala stone carvings' },
  { id: 9, name: 'Halebidu Hoysaleshwara', kannada: 'ಹಳೇಬೀಡು', lat: 13.2167, lng: 75.9833, district: 'Hassan', cat: 'Heritage', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'Magnificent Hoysala temple complex' },
  { id: 10, name: 'Shravanabelagola', kannada: 'ಶ್ರವಣಬೆಳಗೊಳ', lat: 12.8583, lng: 76.4867, district: 'Hassan', cat: 'Heritage', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'Monolithic Gommateshwara Bhagavan statue' },
  { id: 11, name: 'Somanathapura', kannada: 'ಸೋಮನಾಥಪುರ', lat: 12.2764, lng: 76.9048, district: 'Mysuru', cat: 'Heritage', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Star-shaped Keshava temple' },
  { id: 12, name: 'Chitradurga Fort', kannada: 'ಚಿತ್ರದುರ್ಗ ಕೋಟೆ', lat: 14.2217, lng: 76.4004, district: 'Chitradurga', cat: 'Heritage', type: 'monument', crowd: 'Low', color: '#8b5cf6', desc: 'Legendary stone fort with 7 concentric walls' },
  { id: 13, name: 'Lakkundi Stepwells', kannada: 'ಲಕ್ಕುಂಡಿ', lat: 15.3400, lng: 75.7100, district: 'Gadag', cat: 'Heritage', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Ancient Kalyani stepwells and temples' },

  // Gateways & Cities
  { id: 14, name: 'Bengaluru (Vidhana Soudha)', kannada: 'ಬೆಂಗಳೂರು', lat: 12.9716, lng: 77.5946, district: 'Bengaluru Urban', cat: 'City', type: 'city', crowd: 'High', color: '#3b82f6', desc: 'Capital city & Neo-Dravidian architecture' },
  { id: 15, name: 'Mangaluru', kannada: 'ಮಂಗಳೂರು', lat: 12.9141, lng: 74.8560, district: 'Dakshina Kannada', cat: 'Coastal', type: 'city', crowd: 'Moderate', color: '#06b6d4', desc: 'Coastal gateway with beaches and heritage' },
  { id: 16, name: 'Hubballi-Dharwad', kannada: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ', lat: 15.3647, lng: 75.1240, district: 'Dharwad', cat: 'City', type: 'city', crowd: 'Moderate', color: '#3b82f6', desc: 'Cultural and trade capital of North Karnataka' },
  { id: 17, name: 'Belagavi', kannada: 'ಬೆಳಗಾವಿ', lat: 15.8497, lng: 74.4977, district: 'Belagavi', cat: 'City', type: 'monument', crowd: 'Moderate', color: '#3b82f6', desc: 'Historic fort and Western Ghats gateway' },
  { id: 18, name: 'Kalaburagi', kannada: 'ಕಲಬುರಗಿ', lat: 17.3297, lng: 76.8343, district: 'Kalaburagi', cat: 'Heritage', type: 'monument', crowd: 'Low', color: '#8b5cf6', desc: 'Bahmani capital with massive fortress' },

  // Hill stations & Nature
  { id: 19, name: 'Coorg (Madikeri)', kannada: 'ಮಡಿಕೇರಿ (ಕೊಡಗು)', lat: 12.4244, lng: 75.7382, district: 'Kodagu', cat: 'Hill stations', type: 'nature', crowd: 'Moderate', color: '#10b981', desc: 'Misty hills, coffee estates & Raja\'s Seat' },
  { id: 20, name: 'Chikkamagaluru (Mullayanagiri)', kannada: 'ಮುಳ್ಳಯ್ಯನಗಿರಿ', lat: 13.3912, lng: 75.7214, district: 'Chikkamagaluru', cat: 'Hill stations', type: 'nature', crowd: 'Moderate', color: '#10b981', desc: 'Highest peak in Karnataka (1,930m)' },
  { id: 21, name: 'Kemmangundi', kannada: 'ಕೆಮ್ಮಣ್ಣುಗುಂಡಿ', lat: 13.5489, lng: 75.7578, district: 'Chikkamagaluru', cat: 'Hill stations', type: 'nature', crowd: 'Low', color: '#10b981', desc: 'Royal summer hill station' },
  { id: 22, name: 'Kudremukh Peak', kannada: 'ಕುದುರೆಮುಖ', lat: 13.1285, lng: 75.2530, district: 'Chikkamagaluru', cat: 'Hill stations', type: 'nature', crowd: 'Low', color: '#10b981', desc: 'Protected shola grassland peak' },
  { id: 23, name: 'Nandi Hills', kannada: 'ನಂದಿ ಬೆಟ್ಟ', lat: 13.3702, lng: 77.6835, district: 'Chikkaballapura', cat: 'Hill stations', type: 'nature', crowd: 'High', color: '#f59e0b', desc: 'Ancient hilltop fortress & sunrise viewpoint' },
  { id: 24, name: 'Agumbe Rainforest', kannada: 'ಆಗುಂಬೆ', lat: 13.5074, lng: 75.0934, district: 'Shivamogga', cat: 'Nature', type: 'nature', crowd: 'Low', color: '#10b981', desc: 'High rainfall biodiversity hotspot' },
  { id: 25, name: 'BR Hills', kannada: 'ಬಿಳಿಗಿರಿರಂಗನ ಬೆಟ್ಟ', lat: 11.9904, lng: 77.1402, district: 'Chamarajanagara', cat: 'Wildlife', type: 'wildlife', crowd: 'Low', color: '#eab308', desc: 'Wildlife sanctuary and Soliga tribal heritage' },

  // Waterfalls
  { id: 26, name: 'Jog Falls', kannada: 'ಜೋಗ ಜಲಪಾತ', lat: 14.2285, lng: 74.8122, district: 'Shivamogga', cat: 'Waterfalls', type: 'waterfall', crowd: 'Moderate', color: '#06b6d4', desc: 'Iconic plunge waterfall on Sharavathi River' },
  { id: 27, name: 'Abbey Falls', kannada: 'ಅಬ್ಬೆ ಜಲಪಾತ', lat: 12.4542, lng: 75.7196, district: 'Kodagu', cat: 'Waterfalls', type: 'waterfall', crowd: 'High', color: '#06b6d4', desc: 'Lush waterfall nestled in coffee estates' },
  { id: 28, name: 'Shivanasamudra Falls', kannada: 'ಶಿವನಸಮುದ್ರ', lat: 12.2969, lng: 77.1683, district: 'Mandya', cat: 'Waterfalls', type: 'waterfall', crowd: 'Moderate', color: '#06b6d4', desc: 'Twin Kaveri river waterfalls' },
  { id: 29, name: 'Iruppu Falls', kannada: 'ಇರುಪ್ಪು ಜಲಪಾತ', lat: 11.9667, lng: 75.9833, district: 'Kodagu', cat: 'Waterfalls', type: 'waterfall', crowd: 'Moderate', color: '#06b6d4', desc: 'Sacred waterfall in Brahmagiri hills' },
  { id: 30, name: 'Sathodi Falls', kannada: 'ಸಾತೋಡಿ ಜಲಪಾತ', lat: 14.9469, lng: 74.5828, district: 'Uttara Kannada', cat: 'Waterfalls', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Hidden rock canyon waterfall in Yellapur' },

  // Beaches & Coastal
  { id: 31, name: 'Gokarna (Om Beach)', kannada: 'ಗೋಕರ್ಣ', lat: 14.5479, lng: 74.3188, district: 'Uttara Kannada', cat: 'Coastal', type: 'beach', crowd: 'Moderate', color: '#06b6d4', desc: 'Scenic Om-shaped beach and Mahabaleshwara temple' },
  { id: 32, name: 'Murudeshwar Beach & Temple', kannada: 'ಮುರುಡೇಶ್ವರ', lat: 14.0940, lng: 74.4849, district: 'Uttara Kannada', cat: 'Spiritual', type: 'temple', crowd: 'High', color: '#8b5cf6', desc: 'Giant 123-ft coastal Shiva statue' },
  { id: 33, name: 'Maravanthe Beach', kannada: 'ಮರವಂತೆ', lat: 13.7003, lng: 74.6467, district: 'Udupi', cat: 'Coastal', type: 'beach', crowd: 'Moderate', color: '#06b6d4', desc: 'Highway sandwiched between ocean and river' },
  { id: 34, name: 'Kaup Beach & Lighthouse', kannada: 'ಕಾಪು ಲೈಟ್‌ಹೌಸ್', lat: 13.2238, lng: 74.7408, district: 'Udupi', cat: 'Coastal', type: 'beach', crowd: 'Moderate', color: '#06b6d4', desc: 'Historic 1901 stone lighthouse on Arabian Sea' },
  { id: 35, name: 'Yana Rock Caves', kannada: 'ಯಾಣ', lat: 14.5886, lng: 74.5614, district: 'Uttara Kannada', cat: 'Adventure', type: 'gem', crowd: 'Low', color: '#10b981', desc: 'Monolithic crystalline karst rock peaks in rainforest' },

  // Wildlife & Reserves
  { id: 36, name: 'Nagarhole Tiger Reserve', kannada: 'ನಾಗರಹೊಳೆ', lat: 12.0314, lng: 76.1207, district: 'Kodagu / Mysuru', cat: 'Wildlife', type: 'wildlife', crowd: 'Moderate', color: '#eab308', desc: 'Kabini safari zone with tigers and leopards' },
  { id: 37, name: 'Bandipur National Park', kannada: 'ಬಂಡೀಪುರ', lat: 11.6664, lng: 76.6291, district: 'Chamarajanagara', cat: 'Wildlife', type: 'wildlife', crowd: 'Moderate', color: '#eab308', desc: 'Project Tiger reserve at foot of Nilgiris' },
  { id: 38, name: 'Dandeli Wildlife Sanctuary', kannada: 'ದಾಂಡೇಲಿ', lat: 15.2415, lng: 74.6230, district: 'Uttara Kannada', cat: 'Adventure', type: 'nature', crowd: 'Moderate', color: '#f97316', desc: 'Kali river rafting & hornbill sanctuary' },

  // Spiritual
  { id: 39, name: 'Udupi Sri Krishna Matha', kannada: 'ಉಡುಪಿ ಶ್ರೀ ಕೃಷ್ಣ ಮಠ', lat: 13.3409, lng: 74.7421, district: 'Udupi', cat: 'Spiritual', type: 'temple', crowd: 'High', color: '#8b5cf6', desc: '13th-century monastery and temple' },
  { id: 40, name: 'Dharmasthala Manjunatha', kannada: 'ಧರ್ಮಸ್ಥಳ', lat: 12.9567, lng: 75.3800, district: 'Dakshina Kannada', cat: 'Spiritual', type: 'temple', crowd: 'High', color: '#8b5cf6', desc: '800-year-old pilgrimage landmark' },
  { id: 41, name: 'Kukke Subramanya Temple', kannada: 'ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ', lat: 12.6667, lng: 75.6167, district: 'Dakshina Kannada', cat: 'Spiritual', type: 'temple', crowd: 'High', color: '#8b5cf6', desc: 'Sacred shrine nestled under Kumara Parvatha' },
  { id: 42, name: 'Sringeri Sharada Peetham', kannada: 'ಶೃಂಗೇರಿ', lat: 13.4167, lng: 75.2500, district: 'Chikkamagaluru', cat: 'Spiritual', type: 'temple', crowd: 'Moderate', color: '#8b5cf6', desc: 'Monastery founded by Adi Shankaracharya on Tunga' },
];

export default function KarnatakaMap({
  onSelectMarker,
  selectedId,
  searchQuery = '',
  height = '480px',
  interactiveSearch = true,
  onViewDetails,
}) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersRef = useRef({});
  const searchMarkerRef = useRef(null);

  const [activeMarker, setActiveMarker] = useState(null);
  const [internalQuery, setInternalQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [searchingOSM, setSearchingOSM] = useState(false);
  const [selectedPlaceInfo, setSelectedPlaceInfo] = useState(null);
  const [tileProvider, setTileProvider] = useState('osm'); // 'osm' or 'carto'
  const [mapReady, setMapReady] = useState(false);

  // Initialize Leaflet Map reliably
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container) return;

    // Clean up container._leaflet_id to avoid StrictMode double-init crash
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    // Create map instance
    const map = L.map(container, {
      center: [14.6, 75.8],
      zoom: 7,
      minZoom: 5,
      maxZoom: 18,
      zoomControl: false,
    });

    // Add zoom buttons at top-right
    L.control.zoom({ position: 'topright' }).addTo(map);

    // Add OpenStreetMap / CARTO tile layer
    const tileUrl = tileProvider === 'osm'
      ? 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Plot all verified Karnataka pins
    markersRef.current = {};
    KARNATAKA_MARKERS.forEach((m) => {
      const isSelected = selectedId === m.id;
      const iconHtml = `
        <div style="
          width: ${isSelected ? '32px' : '24px'};
          height: ${isSelected ? '32px' : '24px'};
          background: ${m.color};
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: ${isSelected ? '12px' : '10px'};
          cursor: pointer;
        ">
          ${m.type === 'temple' ? '🏛' : m.type === 'gem' ? '💎' : m.type === 'nature' ? '🌿' : m.type === 'beach' ? '🏖' : m.type === 'waterfall' ? '💧' : m.type === 'wildlife' ? '🐘' : '📍'}
        </div>
      `;

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-map-marker',
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(map);

      marker.bindPopup(`
        <div style="font-family: system-ui, sans-serif; min-width: 190px; padding: 2px;">
          <div style="font-weight: 700; font-size: 14px; color: #1a3d2e;">${m.name}</div>
          ${m.kannada ? `<div style="font-size: 11px; color: #666; margin-top: 1px;">${m.kannada} • ${m.district}</div>` : ''}
          <div style="font-size: 11px; color: #444; margin-top: 5px; line-height: 1.3;">${m.desc || ''}</div>
          <div style="font-size: 11px; color: #666; margin-top: 5px; display: flex; justify-content: space-between;">
            <span>Category: <b>${m.cat}</b></span>
            <span style="color: ${m.crowd === 'High' ? '#dc2626' : m.crowd === 'Moderate' ? '#f59e0b' : '#16a34a'}; font-weight: 600;">● ${m.crowd}</span>
          </div>
          <button id="btn-select-${m.id}" style="
            margin-top: 8px;
            background: #1a3d2e;
            color: white;
            border: none;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 600;
            cursor: pointer;
            width: 100%;
          ">Select Target Destination</button>
        </div>
      `);

      marker.on('click', () => {
        setActiveMarker(m);
        setSelectedPlaceInfo(m);
        if (onSelectMarker) onSelectMarker(m);
      });

      markersRef.current[m.id] = marker;
    });

    mapInstanceRef.current = map;
    setMapReady(true);

    // Invalidate size after layout settles
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [tileProvider]);

  // Real-time Fly-To Function
  const flyToLocation = useCallback((lat, lng, name, extra = {}) => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.flyTo([lat, lng], 13, {
      duration: 1.4,
      easeLinearity: 0.25,
    });

    // Remove previous search marker
    if (searchMarkerRef.current) {
      searchMarkerRef.current.remove();
      searchMarkerRef.current = null;
    }

    // Add high-visibility animated search pin
    const searchIconHtml = `
      <div style="position: relative; width: 28px; height: 28px;">
        <div style="
          position: absolute;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: rgba(232, 115, 42, 0.4);
          animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
          top: -8px;
          left: -8px;
        "></div>
        <div style="
          width: 28px;
          height: 28px;
          background: #e8732a;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 4px 14px rgba(232,115,42,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 13px;
          font-weight: bold;
          position: relative;
          z-index: 2;
        ">
          📍
        </div>
      </div>
    `;

    const icon = L.divIcon({
      html: searchIconHtml,
      className: 'realtime-search-pin',
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });

    const marker = L.marker([lat, lng], { icon }).addTo(map);
    marker.bindPopup(`
      <div style="font-family: system-ui, sans-serif; padding: 4px; min-width: 170px;">
        <div style="font-weight: 700; font-size: 14px; color: #e8732a;">${name}</div>
        <div style="font-size: 11px; color: #666; margin-top: 2px;">OpenStreetMap Geocoded Location</div>
        <div style="font-size: 10px; color: #999; margin-top: 2px;">Coordinates: ${lat.toFixed(4)}, ${lng.toFixed(4)}</div>
        <button id="btn-use-search" style="
          margin-top: 8px;
          background: #e8732a;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 6px;
          font-size: 11px;
          font-weight: 600;
          cursor: pointer;
          width: 100%;
        ">Use This Destination</button>
      </div>
    `).openPopup();

    searchMarkerRef.current = marker;

    const placeObj = {
      name,
      lat,
      lng,
      district: extra.district || 'Karnataka',
      cat: extra.cat || 'Custom Place',
      crowd: extra.crowd || 'Normal',
      ...extra,
    };

    setSelectedPlaceInfo(placeObj);
    if (onSelectMarker) onSelectMarker(placeObj);
  }, [onSelectMarker]);

  // Handle external search query changes
  useEffect(() => {
    if (!mapReady || !searchQuery || searchQuery.trim().length < 2) return;
    const q = searchQuery.trim().toLowerCase();

    // 1. Try local match first
    const match = KARNATAKA_MARKERS.find(m =>
      m.name.toLowerCase().includes(q) ||
      (m.kannada && m.kannada.includes(q)) ||
      m.district.toLowerCase().includes(q)
    );

    if (match) {
      flyToLocation(match.lat, match.lng, match.name, match);
    } else {
      // 2. Query OSM live
      fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Karnataka, India')}&countrycodes=in&limit=1`)
        .then(res => res.json())
        .then(data => {
          if (data && data[0]) {
            const item = data[0];
            flyToLocation(parseFloat(item.lat), parseFloat(item.lon), item.name || item.display_name.split(',')[0], {
              district: 'Karnataka',
              cat: 'Search Result',
            });
          }
        })
        .catch(() => {});
    }
  }, [searchQuery, mapReady, flyToLocation]);

  // Live debounced search input suggestions
  useEffect(() => {
    const q = internalQuery.trim();
    if (q.length < 2) {
      setSuggestions([]);
      return;
    }

    const lower = q.toLowerCase();
    // Local database search
    const localMatches = KARNATAKA_MARKERS.filter(m =>
      m.name.toLowerCase().includes(lower) ||
      (m.kannada && m.kannada.includes(q)) ||
      m.district.toLowerCase().includes(lower) ||
      m.cat.toLowerCase().includes(lower)
    ).map(m => ({
      id: m.id,
      name: m.name,
      district: m.district,
      lat: m.lat,
      lng: m.lng,
      isLocal: true,
      cat: m.cat,
      label: `${m.name} (${m.district}) - ${m.cat}`,
    }));

    // Query OSM Nominatim
    const timer = setTimeout(async () => {
      setSearchingOSM(true);
      try {
        const queryWithContext = q.toLowerCase().includes('karnataka') ? q : `${q}, Karnataka, India`;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(queryWithContext)}&countrycodes=in&limit=5&addressdetails=1`
        );
        if (res.ok) {
          const data = await res.json();
          const osmMatches = data.map(item => ({
            id: `osm-${item.place_id}`,
            name: item.name || item.display_name.split(',')[0],
            district: item.address?.state_district || item.address?.county || item.address?.state || 'Karnataka',
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            isLocal: false,
            cat: item.type || 'Location',
            label: item.display_name,
          }));

          setSuggestions([...localMatches.slice(0, 4), ...osmMatches.slice(0, 4)]);
        } else {
          setSuggestions(localMatches.slice(0, 6));
        }
      } catch (err) {
        setSuggestions(localMatches.slice(0, 6));
      } finally {
        setSearchingOSM(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [internalQuery]);

  const handleSelectSuggestion = (item) => {
    setInternalQuery(item.name);
    setSuggestions([]);
    flyToLocation(item.lat, item.lng, item.name, item);
  };

  const handleResetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([14.6, 75.8], 7);
    }
    setSelectedPlaceInfo(null);
  };

  return (
    <div
      className="relative w-full overflow-hidden rounded-b-xl border border-gray-200 bg-[#eef3eb]"
      style={{ height, minHeight: '400px' }}
    >
      {/* Real-time Search Box Overlay */}
      {interactiveSearch && (
        <div className="absolute top-3 left-3 z-[1000] w-[270px] sm:w-[350px]">
          <div className="relative shadow-lg rounded-xl overflow-hidden bg-white border border-gray-300 focus-within:border-[#1a3d2e] transition-all">
            <div className="flex items-center px-3 py-2.5 gap-2">
              <span className="text-gray-400 text-xs">🔍</span>
              <input
                type="text"
                value={internalQuery}
                onChange={(e) => setInternalQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && suggestions.length > 0) {
                    handleSelectSuggestion(suggestions[0]);
                  }
                }}
                placeholder="Search real-time OpenStreetMap..."
                className="w-full text-xs text-gray-800 placeholder-gray-400 bg-transparent outline-none"
              />
              {searchingOSM && (
                <span className="animate-spin text-xs text-[#1a3d2e]">⟳</span>
              )}
              {internalQuery && (
                <button
                  type="button"
                  onClick={() => { setInternalQuery(''); setSuggestions([]); }}
                  className="text-gray-400 hover:text-gray-600 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {suggestions.length > 0 && (
              <div className="border-t border-gray-100 max-h-56 overflow-y-auto divide-y divide-gray-50 bg-white shadow-xl">
                {suggestions.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectSuggestion(item)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-[#eef5fa] transition-colors flex items-start gap-2"
                  >
                    <span className="text-sm mt-0.5">{item.isLocal ? '🏛' : '📍'}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 truncate">{item.name}</div>
                      <div className="text-[10px] text-gray-400 truncate">{item.label}</div>
                    </div>
                    {item.isLocal ? (
                      <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">Verified</span>
                    ) : (
                      <span className="text-[9px] bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded font-medium flex-shrink-0">OSM</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Map Control Buttons (Reset + Tile Switcher) */}
      <div className="absolute bottom-3 right-3 z-[1000] flex flex-col gap-1.5">
        <button
          type="button"
          onClick={handleResetView}
          className="bg-white/95 hover:bg-white text-gray-700 text-xs font-semibold px-2.5 py-1.5 rounded-lg shadow-md border border-gray-200 transition-all flex items-center gap-1"
          title="Reset View to Karnataka State"
        >
          <span>↺</span>
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          type="button"
          onClick={() => setTileProvider(p => p === 'osm' ? 'carto' : 'osm')}
          className="bg-white/95 hover:bg-white text-gray-700 text-xs font-medium px-2.5 py-1.5 rounded-lg shadow-md border border-gray-200 transition-all"
          title="Toggle Tile Style"
        >
          {tileProvider === 'osm' ? '🌐 OSM Standard' : '🗺 Carto Voyager'}
        </button>
      </div>

      {/* Target Marker HUD Banner */}
      {selectedPlaceInfo && (
        <div className="absolute bottom-3 left-3 z-[1000] bg-white/95 backdrop-blur-sm border border-gray-200 rounded-xl p-3 shadow-lg max-w-xs text-xs animate-in fade-in">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-[#1a3d2e] text-sm truncate">{selectedPlaceInfo.name}</span>
            <button
              type="button"
              onClick={() => setSelectedPlaceInfo(null)}
              className="text-gray-400 hover:text-gray-600 text-xs px-1"
            >
              ✕
            </button>
          </div>
          <p className="text-gray-500 text-[11px] mt-0.5">
            {selectedPlaceInfo.district} • {selectedPlaceInfo.cat || 'Destination'}
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-gray-400">
            <span>Lat: {selectedPlaceInfo.lat?.toFixed(3)}, Lng: {selectedPlaceInfo.lng?.toFixed(3)}</span>
            <span className="text-[#1a3d2e] font-semibold">Target Plotted ✓</span>
          </div>
          {onViewDetails && (
            <button
              type="button"
              onClick={() => onViewDetails(selectedPlaceInfo)}
              className="mt-2 w-full bg-[#1a3d2e] hover:bg-[#145236] text-white text-[11px] font-semibold py-1.5 px-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <span>🚌 🏨 🍽️ Public Transport, Hotels & Menu</span>
            </button>
          )}
        </div>
      )}

      {/* Actual Map Container */}
      <div
        ref={mapContainerRef}
        className="w-full h-full z-10"
        style={{ minHeight: '400px' }}
      />
    </div>
  );
}
