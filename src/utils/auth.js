const AUTH_KEY = 'issue_tracker_user'

/**
 * Saves user session data to LocalStorage.
 * @param {{ name: string, role: string }} userData
 */
export function saveSession(userData) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(userData))
}

/**
 * Retrieves the current user session from LocalStorage.
 * @returns {{ name: string, role: string } | null}
 */
export function getSession() {
  const raw = localStorage.getItem(AUTH_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

/**
 * Removes the user session from LocalStorage.
 */
export function clearSession() {
  localStorage.removeItem(AUTH_KEY)
}

/**
 * Checks whether a session exists.
 * @returns {boolean}
 */
export function isAuthenticated() {
  return getSession() !== null
}
