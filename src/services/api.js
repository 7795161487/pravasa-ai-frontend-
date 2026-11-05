// Pravasa AI Central Backend API Service
const API_BASE = '/api';

/**
 * Health check
 */
export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE}/health`);
    return await res.json();
  } catch (err) {
    console.warn('Backend health check error:', err);
    return { status: 'offline' };
  }
}

/**
 * User Auth: Login
 */
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Login failed');
  return data;
}

/**
 * User Auth: Register
 */
export async function registerUser(name, email, password) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Registration failed');
  return data;
}

/**
 * Advisories
 */
export async function fetchAdvisories() {
  try {
    const res = await fetch(`${API_BASE}/advisories`);
    if (res.ok) {
      const data = await res.json();
      return data.advisories || [];
    }
  } catch (err) {
    console.warn('Failed to load advisories from backend:', err);
  }
  return [];
}

/**
 * Chat Companion
 */
export async function sendChatMessage(message, sessionId = 'default', language = 'en') {
  try {
    const res = await fetch(`${API_BASE}/chat/message`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId, language }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend chat API failed, will use client fallback:', err);
  }
  return null;
}

/**
 * Destinations
 */
export async function fetchDestinations(params = {}) {
  try {
    const qs = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/destinations?${qs}`);
    if (res.ok) {
      const data = await res.json();
      return data.destinations || [];
    }
  } catch (err) {
    console.warn('Failed to fetch destinations from backend:', err);
  }
  return [];
}

/**
 * Planner Generate
 */
export async function generateItineraryBackend(payload) {
  try {
    const res = await fetch(`${API_BASE}/planner/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Planner backend call failed:', err);
  }
  return null;
}

/**
 * Submit SOS incident report
 */
export async function submitSOSIncident(report) {
  try {
    const res = await fetch(`${API_BASE}/sos/report`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Failed to submit SOS to backend:', err);
  }
  return null;
}

