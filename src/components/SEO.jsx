import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  ogImage = "https://m-couture.onrender.com/favicon.svg", // Fallback to favicon/logo
  ogType = "website",
  schema 
}) {
  const siteName = "M'Couture by Minky Narang";
  const defaultTitle = "M'Couture by Minky Narang | Luxury Women's Couture";
  const defaultDesc = "M'Couture by Minky Narang — a premium Haryana-based boutique for luxury women's couture, custom bridal wear, trousseau collections, maternity wear and elegant ready-to-wear.";

  const finalTitle = title ? `${title} | M'Couture` : defaultTitle;
  const finalDesc = description || defaultDesc;

  return (
    <Helmet>
      {/* Standard SEO Tags */}
      <title>{finalTitle}</title>
      <meta name="description" content={finalDesc} />

      {/* Canonical URL to avoid duplicate content */}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDesc} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteName} />
      {canonical && <meta property="og:url" content={canonical} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  canonical: PropTypes.string,
  ogImage: PropTypes.string,
  ogType: PropTypes.string,
  schema: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
