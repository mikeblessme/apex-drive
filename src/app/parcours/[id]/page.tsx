import Link from "next/link";
import ParcoursDetail from "@/components/ParcoursDetail";
import { ETOBICOKE_ROUTES, findCentre, findRoute } from "@/lib/data";

// Server page (statically prerendered for every route id) wrapping the
// interactive client detail, so the parcours content is in the served HTML.
export function generateStaticParams() {
  return ETOBICOKE_ROUTES.map((r) => ({ id: r.id }));
}

export default async function ParcoursPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = findRoute(id);
  const centre = findCentre("etobicoke");
  if (!route || !centre) {
    return (
      <>
        <h1>Parcours introuvable</h1>
        <p className="lead">Ce parcours n&apos;existe pas dans cette version.</p>
        <Link className="btn secondary" href="/centres/etobicoke">Voir les parcours d&apos;Etobicoke</Link>
      </>
    );
  }
  return <ParcoursDetail route={route} centre={centre} />;
}
