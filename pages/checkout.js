import { useEffect, useState } from 'react'

export default function Checkout() {
  const [cart, setCart] = useState([])
  const [piReady, setPiReady] = useState(false)
  const [authResult, setAuthResult] = useState(null)

  // Charger le panier depuis le localStorage
  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('cart') || '[]'))
  }, [])

  // Charger le Pi SDK
  useEffect(() => {
    const sdkUrl = 'https://sdk.minepi.com/pi-sdk.js'
    const script = document.createElement('script')
    script.src = sdkUrl
    script.async = true
    script.onload = () => {
      console.log('Pi SDK chargé')
      setPiReady(true)
      if (window.Pi && typeof window.Pi.init === 'function') {
        window.Pi.init({ version: '2.0' })
      }
    }
    document.body.appendChild(script)
  }, [])

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0)

  // Authentification Pi
  async function authenticateWithPi() {
    if (!window.Pi) {
      alert('Pi SDK non disponible. Testez dans Pi Browser.')
      return
    }
    try {
      const auth = await window.Pi.authenticate([])
      setAuthResult(auth)
      console.log('Utilisateur Pi:', auth)
      alert('Authentification Pi réussie !')
    } catch (err) {
      console.error('Erreur auth Pi:', err)
      alert("Erreur lors de l'authentification Pi. Voir console.")
    }
  }

  // Flow de paiement prototype
  async function payWithPi() {
    await authenticateWithPi()

    // Création d’un token de paiement (prototype)
    const paymentToken = 'TOKEN_DE_TEST_POUR_DEMO'

    try {
      await window.Pi.start_payment_flow({
        paymentId: 'ORDER_' + Date.now(),
        paymentToken,
      })
      alert('Paiement Pi terminé (prototype).')
    } catch (err) {
      console.error('Erreur paiement Pi:', err)
      alert('Erreur lors du paiement Pi.')
    }
  }

  return (
    <main style={{ padding: 20 }}>
      <h2>Paiement</h2>
      {cart.length === 0 ? (
        <p>Panier vide.</p>
      ) : (
        <>
          {cart.map((i) => (
            <div key={i.id} style={{ border: '1px solid #ccc', margin: 8, padding: 8 }}>
              <strong>{i.title}</strong> — {i.qty} x {i.price} FCFA
            </div>
          ))}
          <h3>Total: {total} FCFA</
