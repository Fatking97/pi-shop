import products from '../../lib/products.json'

export default function handler(req, res) {
  res.status(200).json(products)
}
