import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { title, price } = req.body
  const filePath = path.join(process.cwd(), 'lib/products.json')
  const products = JSON.parse(fs.readFileSync(filePath))
  const newProduct = { id: Date.now(), title, price }
  products.push(newProduct)
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
  res.status(200).json(newProduct)
}
