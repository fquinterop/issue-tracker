import { useState, useEffect, useCallback } from 'react'
import { getIssues, createIssue, updateIssue, deleteIssue } from '../services/issuesService'

export function useIssues() {
  const [issues, setIssues] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchIssues = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getIssues()
      setIssues(data)
    } catch (err) {
      setError('No se pudieron cargar las incidencias. Intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchIssues()
  }, [fetchIssues])

  const addIssue = useCallback(async (issueData) => {
    const created = await createIssue(issueData)
    setIssues(prev => [created, ...prev])
    return created
  }, [])

  const editIssue = useCallback(async (id, updates) => {
    const updated = await updateIssue(id, updates)
    setIssues(prev => prev.map(issue => (issue.id === id ? updated : issue)))
    return updated
  }, [])

  const removeIssue = useCallback(async (id) => {
    await deleteIssue(id)
    setIssues(prev => prev.filter(issue => issue.id !== id))
  }, [])

  return { issues, loading, error, fetchIssues, addIssue, editIssue, removeIssue }
}
