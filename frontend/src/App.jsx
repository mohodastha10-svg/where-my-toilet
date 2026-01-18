import React, { useState, useEffect } from 'react'

export default function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null)
  const [view, setView] = useState('User') // 'User' or 'Admin'
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/users')
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to fetch')
      setUsers(data.users || [])
    } catch (err) {
      console.error('fetchUsers error', err.message)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setStatus('Saved successfully')
      setName('')
      setEmail('')
      fetchUsers()
    } catch (err) {
      setStatus('Error: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this user?')) return
    try {
      const res = await fetch(`http://localhost:3000/api/users/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Delete failed')
      fetchUsers()
    } catch (err) {
      console.error('delete error', err.message)
    }
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Sign Up</h1>
      <div style={{ marginBottom: 12 }}>
        <button onClick={() => setView('User')} disabled={view === 'User'}>User View</button>
        <button onClick={() => setView('Admin')} disabled={view === 'Admin'} style={{ marginLeft: 8 }}>Admin View</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <label>Name</label><br />
          <input value={name} onChange={e => setName(e.target.value)} required />
        </div>
        <div style={{ marginBottom: 8 }}>
          <label>Email</label><br />
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}

      <hr />

      {view === 'User' ? (
        <div>
          <h2>Users</h2>
          <ul>
            {users.map(u => (
              <li key={u._id}>{u.name} — {u.email}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2>Admin: Users</h2>
          <ul>
            {users.map(u => (
              <li key={u._id} style={{ marginBottom: 6 }}>
                {u.name} — {u.email}
                <button onClick={() => handleDelete(u._id)} style={{ marginLeft: 8 }}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
