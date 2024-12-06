import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ClubsList from "./components/ClubsList";
import PlayersList from "./components/PlayersList";
import MatchesList from "./components/MatchesList";
import ClubDetails from "./components/ClubDetails";
import TeamDetails from "./components/TeamDetails";
import PlayerProfile from "./components/PlayerProfile";
import MatchView from "./components/matches/MatchView";
import CompetitionList from "./components/competitions/CompetitionList";
import CompetitionView from "./components/competitions/CompetitionView";
import GlobalStats from "./components/stats/GlobalStats";
import LoginPage from "./components/auth/LoginPage";
import UnauthorizedPage from "./components/auth/UnauthorizedPage";
import PrivateRoute from "./components/auth/PrivateRoute";

// Admin Components
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import UsersList from "./components/admin/users/UsersList";
import AdminPlayersList from "./components/admin/players/PlayersList";
import AdminClubsList from "./components/admin/clubs/ClubsList";
import AdminTeamsList from "./components/admin/teams/TeamsList";
import CategoriesList from "./components/admin/categories/CategoriesList";
import CompetitionsList from "./components/admin/competitions/CompetitionsList";
import GeneralSettings from "./components/admin/settings/GeneralSettings";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />

        <Route
          path="*"
          element={
            <div className="min-h-screen bg-gray-100">
              <Navbar />
              <main className="container mx-auto px-4 py-8">
                <Routes>
                  <Route index element={<ClubsList />} />
                  <Route path="players" element={<PlayersList />} />
                  <Route path="players/:playerId" element={<PlayerProfile />} />
                  <Route path="matches" element={<MatchesList />} />
                  <Route path="matches/:matchId" element={<MatchView />} />
                  <Route path="clubs/:clubId" element={<ClubDetails />} />
                  <Route path="teams/:teamId" element={<TeamDetails />} />
                  <Route path="competitions" element={<CompetitionList />} />
                  <Route
                    path="competitions/:competitionId"
                    element={<CompetitionView />}
                  />
                  <Route path="stats" element={<GlobalStats />} />
                </Routes>
              </main>
            </div>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute requireDelegate>
              <AdminLayout />
            </PrivateRoute>
          }>
          <Route index element={<Dashboard />} />
          <Route
            path="users"
            element={
              <PrivateRoute requireAdmin>
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route path="players" element={<AdminPlayersList />} />
          <Route path="clubs" element={<AdminClubsList />} />
          <Route path="teams" element={<AdminTeamsList />} />
          <Route path="categories" element={<CategoriesList />} />
          <Route path="competitions" element={<CompetitionsList />} />
          <Route
            path="settings"
            element={
              <PrivateRoute requireAdmin>
                <GeneralSettings />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
