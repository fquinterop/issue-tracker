import axios from 'axios'

// Replace this URL with your own MockAPI endpoint
const BASE_URL = 'https://6a15023691ff9a63de07493f.mockapi.io/issues'

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * Fetches all issues.
 * @returns {Promise<Issue[]>}
 */
export async function getIssues() {
  const { data } = await api.get('/')
  return data
}

/**
 * Creates a new issue.
 * @param {Omit<Issue, 'id'>} issueData
 * @returns {Promise<Issue>}
 */
export async function createIssue(issueData) {
  const { data } = await api.post('/', issueData)
  return data
}

/**
 * Updates an existing issue.
 * @param {string} id
 * @param {Partial<Issue>} updates
 * @returns {Promise<Issue>}
 */
export async function updateIssue(id, updates) {
  const { data } = await api.put(`/${id}`, updates)
  return data
}

/**
 * Deletes an issue by id.
 * @param {string} id
 * @returns {Promise<void>}
 */
export async function deleteIssue(id) {
  await api.delete(`/${id}`)
}

/**
 * @typedef {{ id: string, titulo: string, descripcion: string, estado: 'Pendiente'|'En Progreso'|'Resuelto', prioridad: 'Baja'|'Media'|'Alta' }} Issue
 */
