import React, { useState, useEffect } from 'react';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import OverviewStats from './components/dashboard/OverviewStats';
import AnalyticsCharts from './components/dashboard/AnalyticsCharts';
import LiveActivityFeed from './components/dashboard/LiveActivityFeed';
import UserListTable from './components/users/UserListTable';
import UserDetailModal from './components/users/UserDetailModal';
import NutritionTelemetryInspector from './components/dashboard/NutritionTelemetryInspector';
import DatabaseInspector from './components/dashboard/DatabaseInspector';
import PrivacyPolicyView from './components/compliance/PrivacyPolicyView';
import { MOCK_USERS, SYSTEM_METRICS } from './mock/mockUserData';
import { checkBackendStatus, fetchAllUsers, fetchSystemMetrics, deleteUser } from './services/api';

export default function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState(MOCK_USERS);
  const [selectedUser, setSelectedUser] = useState(null);
  const [systemMetrics, setSystemMetrics] = useState(SYSTEM_METRICS);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Poll backend health status and users on mount
  useEffect(() => {
    async function loadData() {
      const [status, metrics, liveUsers] = await Promise.all([
        checkBackendStatus(),
        fetchSystemMetrics(),
        fetchAllUsers(),
      ]);
      setSystemMetrics((prev) => ({
        ...prev,
        ...metrics,
        serverStatus: status.online ? 'LIVE ONLINE' : 'LOCAL MOCK DATASET',
        mongoStatus: status.database,
        apiLatency: status.latency,
      }));
      if (liveUsers && liveUsers.length > 0) {
        setUsers(liveUsers);
      }
    }
    loadData();
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    const [status, metrics, liveUsers] = await Promise.all([
      checkBackendStatus(),
      fetchSystemMetrics(),
      fetchAllUsers(),
    ]);
    setSystemMetrics((prev) => ({
      ...prev,
      ...metrics,
      serverStatus: status.online ? 'LIVE ONLINE' : 'LOCAL MOCK DATASET',
      mongoStatus: status.database,
      apiLatency: status.latency,
    }));
    if (liveUsers && liveUsers.length > 0) {
      setUsers(liveUsers);
    }
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(users, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `aurahealth_athletes_telemetry_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to remove this athlete from the admin panel and database?')) {
      await deleteUser(userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: isDark ? '#0B0F17' : '#F4F7FB',
        color: isDark ? '#F8FAFC' : '#0F172A',
      }}
    >
      {/* 1. Permanent Left Command Dock */}
      <Sidebar
        currentView={currentView}
        onSelectView={setCurrentView}
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        userCount={users.length}
      />

      {/* 2. Main Content Viewport */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        {/* Sticky Header */}
        <Header
          activeView={currentView}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          isDark={isDark}
          systemMetrics={systemMetrics}
          onRefresh={handleRefresh}
          onExport={handleExportData}
          isRefreshing={isRefreshing}
        />

        {/* Scrollable View Container */}
        <main style={{ padding: '28px 32px', flex: 1 }}>
          {/* VIEW: COMMAND CENTER DASHBOARD */}
          {currentView === 'dashboard' && (
            <div className="animate-fade-in">
              <OverviewStats
                users={users}
                systemMetrics={systemMetrics}
                isDark={isDark}
              />
              <AnalyticsCharts
                users={users}
                isDark={isDark}
              />
              <LiveActivityFeed
                isDark={isDark}
              />
              <UserListTable
                users={users}
                searchQuery={searchQuery}
                onSelectUser={setSelectedUser}
                onDeleteUser={handleDeleteUser}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: ALL USERS DIRECTORY */}
          {currentView === 'users' && (
            <div className="animate-fade-in">
              <UserListTable
                users={users}
                searchQuery={searchQuery}
                onSelectUser={setSelectedUser}
                onDeleteUser={handleDeleteUser}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: NUTRITION & BODYBUILDING MACROS */}
          {currentView === 'nutrition' && (
            <div className="animate-fade-in">
              <NutritionTelemetryInspector
                users={users}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: VITALS & ECG REGISTRY */}
          {currentView === 'vitals' && (
            <div className="animate-fade-in">
              <UserListTable
                users={users}
                searchQuery={searchQuery}
                onSelectUser={setSelectedUser}
                onDeleteUser={handleDeleteUser}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: ACTIVITY & STRAIN */}
          {currentView === 'activity' && (
            <div className="animate-fade-in">
              <AnalyticsCharts
                users={users}
                isDark={isDark}
              />
              <UserListTable
                users={users}
                searchQuery={searchQuery}
                onSelectUser={setSelectedUser}
                onDeleteUser={handleDeleteUser}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: DATABASE & BACKEND */}
          {currentView === 'database' && (
            <div className="animate-fade-in">
              <DatabaseInspector
                systemMetrics={systemMetrics}
                isDark={isDark}
              />
            </div>
          )}

          {/* VIEW: GOOGLE PLAY PRIVACY POLICY & COMPLIANCE */}
          {currentView === 'privacy' && (
            <div className="animate-fade-in">
              <PrivacyPolicyView
                isDark={isDark}
              />
            </div>
          )}
        </main>
      </div>

      {/* 3. Deep-Dive User Telemetry Modal */}
      {selectedUser && (
        <UserDetailModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          isDark={isDark}
        />
      )}
    </div>
  );
}

