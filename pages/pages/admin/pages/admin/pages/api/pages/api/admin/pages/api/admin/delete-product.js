import fs from 'fs'
import path from 'path'

export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { id } = req.body
  const filePath = path.join(process.cwd(), 'lib/products.json')
  let products = JSON.parse(fs.readFileSync(filePath))
  products = products.filter((p) => p.id !== id)
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2))
  res.status(200).json({ success: true })
}
