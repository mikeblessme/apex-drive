// Squelette affiché pendant le chargement différé d'une feuille (next/dynamic).
// Sans état, sans dépendance : utilisable comme fallback `loading` de next/dynamic.
export default function SheetSkeleton({ label }: { label: string }) {
  return (
    <div className="paywall" role="status" aria-label={label}>
      <div className="sheet" aria-hidden="true">
        <div className="skel skel-title" />
        <div className="skel skel-line" />
        <div className="skel skel-line short" />
        <div className="skel skel-block" />
        <div className="skel skel-btn" />
      </div>
    </div>
  );
}
