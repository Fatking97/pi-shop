import { useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e) => {
    e.preventDefault()
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      localStorage.setItem('admin_auth', 'true')
      router.push('/admin')
    } else {
      alert('Mot de passe incorrect')
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </main>
  )
}
