import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  async headers() {
    return [
      {
        // Fichiers versionnés par hash : immuables, 1 an.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Icônes PWA à nom stable (pas de hash) : cache long, sans immutable,
        // pour qu'une icône remplacée finisse par être reprise.
        source: "/icons/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000" },
        ],
      },
      {
        // Le manifest référence les icônes : revalidation quotidienne.
        source: "/manifest.webmanifest",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400" },
        ],
      },
    ];
  },
};

export default nextConfig;
