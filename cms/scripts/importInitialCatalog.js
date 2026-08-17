/* Run with: npm run studio:seed
   Creates editable Sanity records from the navigation catalog already on the site.
   Existing records are updated, not duplicated. */
import {readFileSync} from 'node:fs'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'
import {getCliClient} from 'sanity/cli'

const here = dirname(fileURLToPath(import.meta.url))
const page = readFileSync(resolve(here, '../../outputs/navpioneers-site/index.html'), 'utf8')
const match = page.match(/let kits = (\[[\s\S]*?\n    \]);\n    const rows/)
if (!match) throw new Error('Navigation catalog could not be read from index.html')

// This evaluates only the maintained in-project catalog array, never user input.
const kits = Function(`return ${match[1]}`)()
const client = getCliClient({apiVersion: '2024-01-01'})

const navigationDocs = kits.map(([sku, brand, fitment, screenSize, note], index) => ({
  _id: `product-${sku.toLowerCase()}`,
  _type: 'product',
  sku,
  name: `${fitment || sku} Refurbished Navigation System`,
  category: 'Navigation systems',
  brand,
  fitment,
  screenSize: screenSize || undefined,
  summary: `Complete refurbished head unit with a vehicle-specific bezel${note ? ` (${note})` : ''}.`,
  configurations: [
    { _key: `${sku.toLowerCase()}-2-64`, label: '2GB + 64GB' },
    { _key: `${sku.toLowerCase()}-4-64`, label: '4GB + 64GB' }
  ],
  sortOrder: index + 1,
  published: true
}))

const carplayProducts = [
  ['B1', 'Button Style Wireless Adapter', 'Adapter', 'Wireless CarPlay / Android Auto adapter'],
  ['T1', '4-in-1 Wireless CarPlay Adapter', 'Adapter', 'CarPlay and Android Auto wireless conversion'],
  ['M19', 'USB Wireless CarPlay Adapter', 'Adapter', 'Compact USB connected-driving adapter'],
  ['M6', 'Mini Wireless CarPlay Adapter', 'Adapter', 'Mini wireless CarPlay and Android Auto adapter'],
  ['S7', 'Apple-Style Wireless Adapter', 'Adapter', 'Wireless CarPlay and Android Auto adapter'],
  ['Y2', 'Video Box', 'Video box', 'Multimedia video interface for in-car displays'],
  ['Y3H', 'HDMI Input Interface', 'Video box', 'HDMI input interface for wired CarPlay systems'],
  ['GT7H', 'CarPlay Android AI Box', 'AI box', 'Android 13 AI box with HDMI output'],
  ['GT8D', 'Android 15 AI Box', 'AI box', 'High-performance Android AI box']
]
const carplayDocs = carplayProducts.map(([sku, name, brand, summary], index) => ({
  _id: `product-${sku.toLowerCase()}`,
  _type: 'product', sku, name, category: 'CarPlay', brand, summary,
  features: ['Professional installation', 'Request availability and pricing'],
  sortOrder: 1000 + index, published: true
}))
const docs = [...navigationDocs, ...carplayDocs]

for (let offset = 0; offset < docs.length; offset += 25) {
  const transaction = client.transaction()
  docs.slice(offset, offset + 25).forEach(doc => transaction.createOrReplace(doc))
  await transaction.commit()
}

console.log(`Imported ${docs.length} editable navigation products into Sanity.`)
