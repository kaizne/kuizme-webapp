const BASE_URL = 'https://www.kuizme.com'
const EXTERNAL_DATA_URL = 'https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes'

const Sitemap = () => {}

const generateSiteMap = (posts) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
        <loc>https://www.kuizme.com</loc>
        </url>
        ${posts
        .map(({ attributes }) => {
            return `
        <url>
            <loc>${`${BASE_URL}/${attributes.slug}`}</loc>
        </url>
        `
        })
       .join('')}
   </urlset>
 `
}


export async function getServerSideProps({ res }) {
    const request = await fetch(EXTERNAL_DATA_URL)
    const posts = await request.json()
    const data = posts.data
    const sitemap = generateSiteMap(data)
    res.setHeader('Content-Type', 'text/xml')
    res.write(sitemap)
    res.end()
    return {
      props: {},
    }
  }

export default Sitemap
