import { BASE_URL } from "../config";
import type { SchemaEntity } from "../data";

export const PERSON_ID = `${BASE_URL}/#person`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Michel Golfier",
  url: `${BASE_URL}/biographie`,
  image: `${BASE_URL}/img/image12.jpg`,
  jobTitle: "Auteur",
  birthDate: "1949-11-29",
  birthPlace: {
    "@type": "Place",
    name: "Clermont-Ferrand",
    addressCountry: "FR",
  },
  nationality: {
    "@type": "Country",
    name: "France",
  },
  gender: "male",
  description:
    "Auteur auvergnat spécialisé dans l'histoire locale et le patrimoine de la région Auvergne.",
  knowsAbout: [
    "Histoire locale",
    "Auvergne",
    "Paléontologie",
    "Patrimoine régional",
  ],
};

export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  name: "Michel Golfier",
  url: BASE_URL,
  publisher: { "@id": PERSON_ID },
};

export function entityToSchema(entity: SchemaEntity): Record<string, unknown> {
  switch (entity.type) {
    case "Place":
      return {
        "@type": "Place",
        name: entity.name,
        addressCountry: "FR",
        ...(entity.addressRegion && { addressRegion: entity.addressRegion }),
        ...(entity.latitude !== undefined &&
          entity.longitude !== undefined && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: entity.latitude,
              longitude: entity.longitude,
            },
          }),
      };
    case "Person":
      return {
        "@type": "Person",
        name: entity.name,
        ...(entity.description && { description: entity.description }),
      };
    case "Thing":
      return { "@type": "Thing", name: entity.name };
  }
}

export function breadcrumbSchema(
  items: Array<{ name: string; item?: string }>
) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: entry.name,
      ...(entry.item ? { item: entry.item } : {}),
    })),
  };
}
