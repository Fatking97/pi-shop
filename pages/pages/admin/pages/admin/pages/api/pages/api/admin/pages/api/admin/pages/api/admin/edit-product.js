import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id, title, price } = req.body
  const filePath = path.join(process.cwd(), 'lib/products.json')
  const products = JSON.parse(fs.readFileSync(filePath))
  const index = products.findIndex((p) => p.id === id)
  if (index !== -1) {
    products[index] = { id, title, price }
    fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
  }
  res.status(200).json(products[index])
}
