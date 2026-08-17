export default async function handler(request, response) {
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  if (!projectId) return response.status(503).json({error: 'CMS is not configured'})
  const query = encodeURIComponent(`{\"settings\": *[_type == \"siteSettings\"][0]{companyName,heroTitle,heroText,contactEmail,\"heroImage\":heroImage.asset->url},\"products\": *[_type == \"product\" && published != false]|order(sku asc){sku,name,category,fitment,screenSize,summary,features,configurations,\"listImage\":listImage.asset->url,\"detailImage\":detailImage.asset->url}}`)
  const upstream = await fetch(`https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`)
  if (!upstream.ok) return response.status(upstream.status).json({error: 'Unable to read CMS content'})
  const {result} = await upstream.json()
  response.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300')
  return response.status(200).json(result)
}
