import { Helmet } from "react-helmet-async";

const SEOHead = ({
  title = "GM Marriage Hall Sheikhpura | Best AC Banquet & Wedding Venue",
  description = "GM Marriage Hall (GM Hall Royal Palace) Sheikhpura ka sabse luxury AC marriage hall hai. Station Road, near Sheikhpura Hill par grand weddings, receptions & corporate events ke liye 24/7 available.",
  canonicalUrl = "https://gmmarriagehall.com",
  schema = null,
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph / Facebook (Social SEO) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content="GM Marriage Hall Royal Palace" />

      {/* Twitter Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      {/* GEO & Local Search Signals */}
      <meta name="geo.region" content="IN-BR" />
      <meta name="geo.placename" content="Sheikhpura" />
      <meta name="geo.position" content="25.1385;85.8560" />
      <meta name="ICBM" content="25.1385, 85.8560" />

      {/* Inject Structured Data Schema (AEO/GEO Core) */}
      {schema && (
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
