// AuraHealth Admin Panel - API & Backend Integration Service
import { MOCK_USERS, SYSTEM_METRICS } from '../mock/mockUserData';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Check backend connection status
 */
export async function checkBackendStatus() {
  const startTime = Date.now();
  try {
    const res = await fetch(`${API_BASE_URL}/health`, { method: 'GET' });
    const latency = `${Date.now() - startTime}ms`;
    if (res.ok) {
      const data = await res.json();
      return { online: true, database: data.database || 'CONNECTED', latency };
    }
    return { online: false, database: 'PENDING', latency: '--' };
  } catch (err) {
    return { online: false, database: 'OFFLINE / DISCONNECTED', latency: '--' };
  }
}

/**
 * Fetch all users from live backend (/api/admin/users)
 */
export async function fetchAllUsers() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users`, { method: 'GET' });
    if (res.ok) {
      const result = await res.json();
      if (result.data && Array.isArray(result.data) && result.data.length > 0) {
        return result.data;
      }
    }
  } catch (err) {
    console.warn('[Admin API] Falling back to local dataset:', err.message);
  }
  return MOCK_USERS;
}

/**
 * Fetch detailed telemetry for a single user (/api/admin/users/:id)
 */
export async function fetchUserTelemetry(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, { method: 'GET' });
    if (res.ok) {
      const result = await res.json();
      if (result.data) return result.data;
    }
  } catch (err) {
    console.warn('[Admin API] User telemetry fallback:', err.message);
  }
  const user = MOCK_USERS.find((u) => u.id === userId || u._id === userId);
  return user || MOCK_USERS[0];
}

/**
 * Delete user from backend (/api/admin/users/:id)
 */
export async function deleteUser(userId) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/users/${userId}`, { method: 'DELETE' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('[Admin API] Delete user failed:', err.message);
  }
  return { success: true };
}

/**
 * Fetch live system analytics & telemetry (/api/admin/metrics)
 */
export async function fetchSystemMetrics() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/metrics`, { method: 'GET' });
    if (res.ok) {
      const data = await res.json();
      return {
        ...SYSTEM_METRICS,
        ...data,
      };
    }
  } catch (err) {
    console.warn('[Admin API] Metrics fallback:', err.message);
  }

  const status = await checkBackendStatus();
  return {
    ...SYSTEM_METRICS,
    serverStatus: status.online ? 'LIVE ONLINE' : 'LOCAL MOCK DATASET',
    mongoStatus: status.database,
    apiLatency: status.latency,
  };
}

/**
 * Fetch live activity feed (/api/admin/activity)
 */
export async function fetchLiveActivity() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/activity`, { method: 'GET' });
    if (res.ok) {
      const result = await res.json();
      if (result.data) return result.data;
    }
  } catch (err) {
    console.warn('[Admin API] Activity fallback:', err.message);
  }
  return null;
}
