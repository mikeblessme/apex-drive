// Squelette affiché pendant le chargement d'une page (hérité par toutes les
// routes). La barre d'app et les onglets (Chrome, dans layout.tsx) restent
// visibles : seul le contenu de la page est remplacé par ce squelette.
export default function Loading() {
  return (
    <div role="status" aria-label="Chargement de la page">
      <div className="skel skel-title" />
      <div className="skel skel-line" />
      <div className="skel skel-line short" />
      <div className="skel skel-block" />
      <div className="skel skel-block" />
      <div className="skel skel-btn" />
    </div>
  );
}
