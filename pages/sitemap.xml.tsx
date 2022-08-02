const BASE_URL = 'https://www.kuizme.com'
const EXTERNAL_DATA_URL = 'https://kuizme-strapi-ao8qx.ondigitalocean.app/api/quizzes'

const Sitemap = () => {}

const generateSiteMap = (posts) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
        <loc>https://www.kuizme.com</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/about</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/contact</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/privacy</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/terms-of-service</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/attack-on-titan</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/cowboy-bebop</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/death-note</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/demon-slayer</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/general</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/haikyuu</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/hunter-x-hunter</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/jujutsu-kaisen</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/kabaneri-of-the-iron-fortress</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/my-hero-academia</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/naruto</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/one-piece</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/one-punch-man</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/sailor-moon</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/sword-art-online</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/the-seven-deadly-sins</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/tokyo-revengers</loc>
        </url>
        <url>
        <loc>https://www.kuizme.com/anime/tokyo-ghoul</loc>
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
