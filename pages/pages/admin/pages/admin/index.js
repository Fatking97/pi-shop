import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function AdminDashboard() {
  const [products, setProducts] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !localStorage.getItem('admin_auth')) {
      router.push('/admin/login')
    }
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
  }, [])

  const deleteProduct = async (id) => {
    if (!confirm('Supprimer ce produit ?')) return
    await fetch('/api/admin/delete-product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setProducts(products.filter((p) => p.id !== id))
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Admin Dashboard</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.title} - {p.price} FCFA
            <button onClick={() => deleteProduct(p.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <p>Pour ajouter ou modifier un produit, utilisez l’API admin (prototype).</p>
    </main>
  )
}
