import { SITE } from "./constants";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    jobTitle: SITE.title,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.province,
      postalCode: SITE.address.cap,
      addressCountry: "IT",
    },
    sameAs: [SITE.linkedin],
    image: `${SITE.url}/images/nicola.png`,
    description: SITE.tagline,
    knowsAbout: [
      "Digital Marketing",
      "E-commerce",
      "Conversion Rate Optimization",
      "Lead Generation",
      "Google Ads",
      "Meta Ads",
    ],
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/favicon.svg`,
    image: `${SITE.url}/favicon.svg`,
    email: SITE.email,
    telephone: SITE.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.province,
      postalCode: SITE.address.cap,
      addressCountry: "IT",
    },
    vatID: SITE.piva,
    taxID: SITE.cf,
    areaServed: "IT",
    serviceType: [
      "Fractional CMO",
      "Digital Marketing",
      "E-commerce Consulting",
      "Conversion Rate Optimization",
      "Lead Generation",
    ],
    description: SITE.tagline,
  };
}
