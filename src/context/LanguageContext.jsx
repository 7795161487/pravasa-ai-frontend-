import { createContext, useContext, useState, useEffect } from 'react';

export const TRANSLATIONS = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_explore: 'Explore',
    nav_gems: 'Hidden Gems',
    nav_adventure: 'Adventure Roads',
    nav_family: 'Family Travel',
    nav_plan: 'Trip Planner',
    nav_saved: 'Saved Trips',
    nav_map: 'Smart Map',
    nav_budget: 'Budget',
    nav_crowd: 'Crowd Status',
    nav_festivals: 'Festivals',
    nav_signin: 'Sign In',
    nav_sos: 'SOS 112',
    nav_search_placeholder: 'Search district, taluk, city...',
    brand_title: 'Pravasa AI',
    brand_subtitle: 'Karnataka Tourism AI',

    // Hero Section
    hero_badge: 'Karnataka Travel Intelligence',
    hero_title_1: 'Explore Every Corner of',
    hero_title_2: 'Karnataka with Pravasa AI',
    hero_sub: 'Real-time road surface alerts, family-friendly circuits, public transport transit, nearest hotels & budget menus across all 31 districts.',
    btn_build_itinerary: 'Build my itinerary →',
    btn_explore_destinations: 'Explore 159 destinations',

    // Quick Planner
    quick_planner_title: 'Quick Itinerary Builder',
    quick_origin: 'Starting Point / Gateway',
    quick_budget: 'Budget (₹ INR)',
    quick_duration: 'Duration (days)',
    quick_travelers: 'Travelers',
    quick_vehicle: 'Vehicle mode',
    quick_btn: 'Generate Plan →',

    // Alerts
    alert_badge: 'Official Travel Advisory',
    emergency_call: 'Emergency Services 112',

    // Categories
    cat_all: 'All',
    cat_heritage: 'Heritage',
    cat_nature: 'Nature',
    cat_adventure: 'Adventure',
    cat_spiritual: 'Spiritual',
    cat_coastal: 'Coastal',
    cat_wildlife: 'Wildlife',
    cat_food: 'Food & Cuisine',
    cat_hills: 'Hill stations',
    cat_waterfalls: 'Waterfalls',

    // Divisions
    divisions_section_label: 'Administrative Regions',
    divisions_title: 'Explore by Division',
    divisions_sub: 'Karnataka has four revenue divisions, each with distinct geography, cuisine, and cultural identity.',
    div_bengaluru: 'Bengaluru Division',
    div_bengaluru_desc: 'Tech capital, Nandi Hills, Silk & Toy crafts, Ancient Dravidian temples',
    div_mysuru: 'Mysuru Division',
    div_mysuru_desc: 'Royal palaces, Hoysala stone architecture, Coffee highlands, Arabian coastline',
    div_belagavi: 'Belagavi Division',
    div_belagavi_desc: 'Chalukya rock caves, Adil Shahi domes, Kali river rapids, Pristine beaches',
    div_kalaburagi: 'Kalaburagi Division',
    div_kalaburagi_desc: 'UNESCO Vijayanagara ruins of Hampi, Bahmani sultanate forts, Deccan plateau',
    view_destinations: 'View destinations →',

    // Popular Places
    popular_section_label: 'Destinations',
    popular_title: 'Popular places in Karnataka',
    view_all_places: 'View all 159 →',
    verified_tag: '✓ Verified by Tourism Dept',

    // Card Tags
    tag_transit: 'Transit',
    tag_stays: 'Stays',
    tag_menu: 'Menu',
    details_btn: 'Details ›',

    // Modal
    modal_title_region: 'KARNATAKA',
    tab_overview: 'Overview & Access',
    tab_transport: 'Public Transport',
    tab_hotels: 'Nearest Hotels',
    tab_dining: 'Budget Menu & Dining',
    tab_transport_sub: 'KSRTC & Rail',
    tab_hotels_sub: '★ Ratings',
    tab_dining_sub: 'Authentic',
    about_dest: 'About Destination',
    road_surface: 'Road Surface & Condition:',
    official_ticket: 'Official Ticket / Entry:',
    suitable_vehicles: 'Suitable Vehicle Modes:',
    best_time: 'Best Time of Day:',
    btn_add_to_trip: '+ Add to Trip Itinerary',
    btn_added: '✓ Added to Itinerary',
    btn_close: 'Close',
    btn_share: 'Share',
    btn_copied: '✓ Copied',

    // Transport Tab
    nearest_bus_stand: 'Nearest KSRTC Bus Stand & Depot',
    available_bus_services: 'Available Bus Services & Fares',
    nearest_rail_station: 'Nearest Railway Station',
    direct_train_conn: 'Direct Train Connectivity',
    last_mile_transit: 'Last-Mile Transit & Local Fares',
    book_ksrtc_btn: 'KSRTC Portal ↗',
    book_rail_btn: 'IRCTC Rail ↗',
    govt_fare: 'Govt Regulated Fare',

    // Hotels Tab
    filter_all: 'All',
    filter_luxury: 'Luxury',
    filter_comfort: 'Comfort',
    filter_budget: 'Budget',
    filter_kstdc: '🏛 KSTDC Official',
    verified_accommodations: 'Verified Accommodations',
    starting_from: 'Starting from',
    per_night: '/ night (taxes incl.)',
    check_stay: 'Check Stay ↗',
    reviews_count: 'reviews',

    // Dining Tab
    regional_culinary_title: 'Regional Culinary Identity',
    top_restaurants_title: 'Top-Rated Iconic Restaurants & Heritage Dhabas',
    budget_menu_title: 'Local Budget Food Menu (With Kannada Names & Pricing)',
    budget_menu_sub: 'Pocket-friendly heritage dishes you must taste',
    famous_for: 'Famous For:',
    avg_for_two: 'for two',
    budget_price: 'Budget Price:',

    // Map & Explorer
    map_banner_title: 'Smart Karnataka Tourism Map',
    map_banner_sub: 'Live OpenStreetMap integration with real-time geocoding across 31 districts, taluks & heritage sites',
    search_map_placeholder: 'Search any place in Karnataka...',
    map_showing_spots: 'verified spots',
    fly_instruction: 'Click any destination to fly to location or view public transit & hotel ratings',
    btn_reset: 'Reset',

    // Language Toggle
    lang_toggle_label: 'ಕನ್ನಡ',
    lang_current_label: 'English',
  },

  kn: {
    // Navigation
    nav_home: 'ಮುಖಪುಟ',
    nav_explore: 'ಅನ್ವೇಷಿಸಿ',
    nav_gems: 'ಗುಪ್ತ ತಾಣಗಳು',
    nav_adventure: 'ಸಾಹಸ ರಸ್ತೆಗಳು',
    nav_family: 'ಕುಟುಂಬ ಪ್ರವಾಸ',
    nav_plan: 'ಪ್ರವಾಸ ಯೋಜಕ',
    nav_saved: 'ಉಳಿಸಿದ ಪ್ರವಾಸಗಳು',
    nav_map: 'ಸ್ಮಾರ್ಟ್ ನಕ್ಷೆ',
    nav_budget: 'ಬಜೆಟ್',
    nav_crowd: 'ಜನಸಂದಣಿ ಸ್ಥಿತಿ',
    nav_festivals: 'ಉತ್ಸವಗಳು & ಹಬ್ಬಗಳು',
    nav_signin: 'ಲಾಗಿನ್',
    nav_sos: 'ತುರ್ತು 112',
    nav_search_placeholder: 'ಜಿಲ್ಲೆ, ತಾಲೂಕು, ನಗರ ಹುಡುಕಿ...',
    brand_title: 'ಪ್ರವಾಸ AI',
    brand_subtitle: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಎಐ',

    // Hero Section
    hero_badge: 'ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ಬುದ್ಧಿಮತ್ತೆ',
    hero_title_1: 'ಕರ್ನಾಟಕದ ಪ್ರತಿಯೊಂದು ತಾಣವನ್ನು',
    hero_title_2: 'ಪ್ರವಾಸ AI ಮೂಲಕ ಆತ್ಮೀಯವಾಗಿ ಅನ್ವೇಷಿಸಿ',
    hero_sub: 'ನೈಜ ಸಮಯದ ಘಾಟ್ ರಸ್ತೆ ಎಚ್ಚರಿಕೆಗಳು, ಕುಟುಂಬ ಪ್ರವಾಸ ಸರ್ಕ್ಯೂಟ್‌ಗಳು, ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಸಾರಿಗೆ, ಹತ್ತಿರದ ಹೋಟೆಲ್‌ಗಳು ಮತ್ತು 31 ಜಿಲ್ಲೆಗಳ ಅಪ್ಪಟ ಬಜೆಟ್ ತಿನಿಸುಗಳು.',
    btn_build_itinerary: 'ನನ್ನ ಪ್ರವಾಸ ಯೋಜಿಸಿ →',
    btn_explore_destinations: '159 ತಾಣಗಳನ್ನು ಅನ್ವೇಷಿಸಿ',

    // Quick Planner
    quick_planner_title: 'ತ್ವರಿತ ಪ್ರವಾಸ ಯೋಜಕ',
    quick_origin: 'ಆರಂಭಿಕ ತಾಣ / ಗೇಟ್‌ವೇ',
    quick_budget: 'ಬಜೆಟ್ (₹ INR)',
    quick_duration: 'ಪ್ರವಾಸದ ದಿನಗಳು',
    quick_travelers: 'ಪ್ರಯಾಣಿಕರ ಸಂಖ್ಯೆ',
    quick_vehicle: 'ವಾಹನ ವಿಧಾನ',
    quick_btn: 'ಪ್ರವಾಸ ಯೋಜನೆ ರಚಿಸಿ →',

    // Alerts
    alert_badge: 'ಅಧಿಕೃತ ಪ್ರವಾಸೋದ್ಯಮ ಮುನ್ನೆಚ್ಚರಿಕೆ',
    emergency_call: 'ತುರ್ತು ಸೇವೆಗಳು 112',

    // Categories
    cat_all: 'ಎಲ್ಲವೂ',
    cat_heritage: 'ಪರಂಪರೆ',
    cat_nature: 'ಪ್ರಕೃತಿ',
    cat_adventure: 'ಸಾಹಸ',
    cat_spiritual: 'ಆಧ್ಯಾತ್ಮಿಕ',
    cat_coastal: 'ಕರಾವಳಿ',
    cat_wildlife: 'ವನ್ಯಜೀವಿ',
    cat_food: 'ಆಹಾರ & ತಿನಿಸು',
    cat_hills: 'ಗಿರಿಧಾಮಗಳು',
    cat_waterfalls: 'ಜಲಪಾತಗಳು',

    // Divisions
    divisions_section_label: 'ಆಡಳಿತ ವಿಭಾಗಗಳು',
    divisions_title: 'ವಿಭಾಗವಾರು ಅನ್ವೇಷಣೆ',
    divisions_sub: 'ಕರ್ನಾಟಕವು ನಾಲ್ಕು ಕಂದಾಯ ವಿಭಾಗಗಳನ್ನು ಹೊಂದಿದ್ದು, ಪ್ರತಿಯೊಂದೂ ತನ್ನದೇ ಆದ ವಿಶಿಷ್ಟ ಭೂಗೋಳ, ಪಾಕಪದ್ಧತಿ ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಪರಂಪರೆಯನ್ನು ಹೊಂದಿದೆ.',
    div_bengaluru: 'ಬೆಂಗಳೂರು ವಿಭಾಗ',
    div_bengaluru_desc: 'ತಂತ್ರಜ್ಞಾನ ರಾಜಧಾನಿ, ನಂದಿ ಬೆಟ್ಟ, ರೇಷ್ಮೆ ಮತ್ತು ಚನ್ನಪಟ್ಟಣ ಬೊಂಬೆಗಳು, ದ್ರಾವಿಡ ದೇವಾಲಯಗಳು',
    div_mysuru: 'ಮೈಸೂರು ವಿಭಾಗ',
    div_mysuru_desc: 'ವೈಭವದ ಅರಮನೆಗಳು, ಹೊಯ್ಸಳ ಶಿಲ್ಪಕಲೆ, ಕಾಫಿ ಗಿರಿಧಾಮಗಳು, ಅರಬ್ಬೀ ಸಮುದ್ರ ಕರಾವಳಿ',
    div_belagavi: 'ಬೆಳಗಾವಿ ವಿಭಾಗ',
    div_belagavi_desc: 'ಚಾಲುಕ್ಯರ ಗುಹಾ ದೇವಾಲಯಗಳು, ಅದಿಲ್ ಶಾಹಿ ಗುಮ್ಮಟಗಳು, ಕಾಳಿ ನದಿ ಸಾಹಸ, ಬೀಚ್‌ಗಳು',
    div_kalaburagi: 'ಕಲಬುರಗಿ ವಿಭಾಗ',
    div_kalaburagi_desc: 'ವಿಶ್ವ ಪರಂಪರೆ ಹಂಪಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ, ಬಹಮನಿ ಕೋಟೆಗಳು, ದಖನ್ ಪ್ರಸ್ಥಭೂಮಿ',
    view_destinations: 'ತಾಣಗಳನ್ನು ವೀಕ್ಷಿಸಿ →',

    // Popular Places
    popular_section_label: 'ಪ್ರೇಕ್ಷಣೀಯ ಸ್ಥಳಗಳು',
    popular_title: 'ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಪ್ರವಾಸಿ ತಾಣಗಳು',
    view_all_places: 'ಎಲ್ಲಾ 159 ತಾಣಗಳು →',
    verified_tag: '✓ ಪ್ರವಾಸೋದ್ಯಮ ಇಲಾಖೆ ಪರಿಶೀಲಿಸಿದೆ',

    // Card Tags
    tag_transit: 'ಸಾರಿಗೆ',
    tag_stays: 'ವಸತಿ',
    tag_menu: 'ಊಟ-ತಿನಿಸು',
    details_btn: 'ವಿವರಗಳು ›',

    // Modal
    modal_title_region: 'ಕರ್ನಾಟಕ',
    tab_overview: 'ಅವಲೋಕನ & ಪ್ರವೇಶ',
    tab_transport: 'ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ',
    tab_hotels: 'ಹತ್ತಿರದ ಹೋಟೆಲ್‌ಗಳು',
    tab_dining: 'ಬಜೆಟ್ ಆಹಾರ & ಭೋಜನ',
    tab_transport_sub: 'ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ & ರೈಲು',
    tab_hotels_sub: '★ ರೇಟಿಂಗ್‌ಗಳು',
    tab_dining_sub: 'ಅಪ್ಪಟ ರುಚಿ',
    about_dest: 'ತಾಣದ ಕುರಿತು',
    road_surface: 'ರಸ್ತೆ ಗುಣಮಟ್ಟ ಮತ್ತು ಸ್ಥಿತಿ:',
    official_ticket: 'ಅಧಿಕೃತ ಪ್ರವೇಶ ಶುಲ್ಕ:',
    suitable_vehicles: 'ಸೂಕ್ತ ವಾಹನ ಪ್ರಕಾರಗಳು:',
    best_time: 'ಭೇಟಿಗೆ ಸೂಕ್ತ ಸಮಯ:',
    btn_add_to_trip: '+ ಪ್ರವಾಸ ಯೋಜನೆಗೆ ಸೇರಿಸಿ',
    btn_added: '✓ ಯೋಜನೆಗೆ ಸೇರಿಸಲಾಗಿದೆ',
    btn_close: 'ಮುಚ್ಚಿ',
    btn_share: 'ಹಂಚಿಕೊಳ್ಳಿ',
    btn_copied: '✓ ಲಿಂಕ್ ನಕಲಿಸಲಾಗಿದೆ',

    // Transport Tab
    nearest_bus_stand: 'ಹತ್ತಿರದ ಕೆ.ಎಸ್.ಆರ್.ಟಿ.ಸಿ ಬಸ್ ನಿಲ್ದಾಣ ಮತ್ತು ಡಿಪೋ',
    available_bus_services: 'ಲಭ್ಯವಿರುವ ಬಸ್ ಸೇವೆಗಳು ಮತ್ತು ಟಿಕೆಟ್ ದರಗಳು',
    nearest_rail_station: 'ಹತ್ತಿರದ ರೈಲ್ವೆ ನಿಲ್ದಾಣ',
    direct_train_conn: 'ನೇರ ರೈಲು ಸಂಪರ್ಕ',
    last_mile_transit: 'ಕೊನೆಯ ಮೈಲಿ ಸಾರಿಗೆ ಮತ್ತು ಸ್ಥಳೀಯ ಆಟೋ ದರಗಳು',
    book_ksrtc_btn: 'KSRTC ಬುಕಿಂಗ್ ↗',
    book_rail_btn: 'IRCTC ರೈಲು ಬುಕಿಂಗ್ ↗',
    govt_fare: 'ಸರ್ಕಾರಿ ನಿಯಂತ್ರಿತ ದರ',

    // Hotels Tab
    filter_all: 'ಎಲ್ಲವೂ',
    filter_luxury: 'ಐಷಾರಾಮಿ (Luxury)',
    filter_comfort: 'ಆರಾಮದಾಯಕ (Comfort)',
    filter_budget: 'ಬಜೆಟ್ (Budget)',
    filter_kstdc: '🏛 ಅಧಿಕೃತ KSTDC',
    verified_accommodations: 'ಪರಿಶೀಲಿಸಿದ ವಸತಿ ಗೃಹಗಳು',
    starting_from: 'ಆರಂಭಿಕ ದರ',
    per_night: '/ ರಾತ್ರಿಗೆ (ತೆರಿಗೆ ಸೇರಿ)',
    check_stay: 'ವಸತಿ ಪರಿಶೀಲಿಸಿ ↗',
    reviews_count: 'ವಿಮರ್ಶೆಗಳು',

    // Dining Tab
    regional_culinary_title: 'ಪ್ರಾದೇಶಿಕ ಆಹಾರ ಪರಂಪರೆ',
    top_restaurants_title: 'ಅತ್ಯುನ್ನತ ರೇಟಿಂಗ್ ಪಡೆದ ಪ್ರಸಿದ್ಧ ಹೋಟೆಲ್‌ಗಳು & ಖಾನಾವಳಿಗಳು',
    budget_menu_title: 'ಸ್ಥಳೀಯ ಬಜೆಟ್ ಆಹಾರ ಮೆನು (ಕನ್ನಡ ಹೆಸರುಗಳು ಮತ್ತು ದರಗಳೊಂದಿಗೆ)',
    budget_menu_sub: 'ನೀವು ಸವಿಯಲೇಬೇಕಾದ ಸ್ಥಳೀಯ ಸಾಂಪ್ರದಾಯಿಕ ತಿನಿಸುಗಳು',
    famous_for: 'ವಿಶೇಷತೆ:',
    avg_for_two: 'ಇಬ್ಬರಿಗೆ ಅಂದಾಜು',
    budget_price: 'ಬಜೆಟ್ ಬೆಲೆ:',

    // Map & Explorer
    map_banner_title: 'ಸ್ಮಾರ್ಟ್ ಕರ್ನಾಟಕ ಪ್ರವಾಸೋದ್ಯಮ ನಕ್ಷೆ',
    map_banner_sub: '31 ಜಿಲ್ಲೆಗಳು, ತಾಲೂಕುಗಳು ಮತ್ತು ಪರಂಪರೆ ತಾಣಗಳ ನೈಜ ಸಮಯದ ಓಪನ್‌ಸ್ಟ್ರೀಟ್‌ಮ್ಯಾಪ್ ನಕ್ಷೆ',
    search_map_placeholder: 'ಕರ್ನಾಟಕದ ಯಾವುದೇ ತಾಣವನ್ನು ಹುಡುಕಿ...',
    map_showing_spots: 'ದೃಢೀಕೃತ ತಾಣಗಳು',
    fly_instruction: 'ನಕ್ಷೆಯಲ್ಲಿ ತಾಣವನ್ನು ನೋಡಲು ಅಥವಾ ಸಾರಿಗೆ, ಹೋಟೆಲ್ ರೇಟಿಂಗ್ ವೀಕ್ಷಿಸಲು ಕ್ಲಿಕ್ ಮಾಡಿ',
    btn_reset: 'ಮರುಹೊಂದಿಸಿ',

    // Language Toggle
    lang_toggle_label: 'English',
    lang_current_label: 'ಕನ್ನಡ',
  },
};

const LanguageContext = createContext({
  language: 'en',
  setLanguage: () => {},
  toggleLanguage: () => {},
  isKannada: false,
  t: (key, fallback) => fallback || key,
});

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('pravasa_language') || 'en';
  });

  const setLanguage = (lang) => {
    setLanguageState(lang);
    localStorage.setItem('pravasa_language', lang);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'kn' : 'en');
  };

  const t = (key, fallback) => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict && dict[key]) {
      return dict[key];
    }
    // Fallback to English if translation is missing in Kannada
    if (TRANSLATIONS.en[key]) {
      return TRANSLATIONS.en[key];
    }
    return fallback || key;
  };

  useEffect(() => {
    document.documentElement.lang = language === 'kn' ? 'kn' : 'en';
  }, [language]);

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    isKannada: language === 'kn',
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}

