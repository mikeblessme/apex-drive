import Link from "next/link";
import CentreDetail from "@/components/CentreDetail";
import { ALL_CENTRES, findCentre } from "@/lib/data";

// Server page (statically prerendered for every centre id) wrapping the
// interactive client detail, so the fiche content is in the served HTML.
export function generateStaticParams() {
  return ALL_CENTRES.map((c) => ({ id: c.id }));
}

export default async function CentrePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const centre = findCentre(id);
  if (!centre) {
    return (
      <>
        <h1>Centre introuvable</h1>
        <p className="lead">Ce centre ne fait pas partie de l&apos;arbre des centres.</p>
        <Link className="btn secondary" href="/centres">Retour à l&apos;arbre des centres</Link>
      </>
    );
  }
  return <CentreDetail centre={centre} />;
}
