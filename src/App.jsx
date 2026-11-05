import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PlanTrip from './pages/PlanTrip';
import Festivals from './pages/Festivals';
import HiddenGems from './pages/HiddenGems';
import CrowdStatus from './pages/CrowdStatus';
import SOSPage from './pages/SOSPage';
import Auth from './pages/Auth';
import SmartMap from './pages/SmartMap';
import AdventureRoads from './pages/AdventureRoads';
import FamilyTravel from './pages/FamilyTravel';
import BudgetCalculator from './pages/BudgetCalculator';
import SavedTrips from './pages/SavedTrips';

export default function App() {
  return (
    <Routes>
      {/* Auth page standalone */}
      <Route path="/auth" element={<Auth />} />

      {/* Main application layout */}
      <Route element={<Layout />}>
        <Route path="/"                   element={<Home />} />
        <Route path="/explore"            element={<Explore />} />
        <Route path="/gems"               element={<HiddenGems />} />
        <Route path="/adventure-roads"    element={<AdventureRoads />} />
        <Route path="/family-travel"     element={<FamilyTravel />} />
        <Route path="/plan"               element={<PlanTrip />} />
        <Route path="/saved-trips"        element={<SavedTrips />} />
        <Route path="/smart-map"          element={<SmartMap />} />
        <Route path="/budget-calculator"  element={<BudgetCalculator />} />
        <Route path="/festivals"          element={<Festivals />} />
        <Route path="/crowd"              element={<CrowdStatus />} />
        <Route path="/sos"                element={<SOSPage />} />
      </Route>
    </Routes>
  );
}
