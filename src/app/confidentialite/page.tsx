export default function ConfidentialitePage() {
  return (
    <>
      <h1>Politique de confidentialité</h1>
      <p className="lead">Apex Drive — Shen Fire Inc. Dernière mise à jour : novembre 2026.</p>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Ce que l&apos;application ne fait pas</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          Apex Drive ne crée aucun compte et ne collecte aucune donnée personnelle.
          Il n&apos;y a ni inscription, ni suivi publicitaire, ni vente de données.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Données stockées sur votre appareil seulement</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          Vos choix restent sur votre téléphone : le centre sélectionné, la date
          d&apos;examen que vous saisissez et vos signalements d&apos;erreur de parcours.
          Ces informations ne sont envoyées à aucun serveur par l&apos;application
          elle-même. Les effacer revient à effacer les données du navigateur ou
          de l&apos;application sur votre appareil.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Hébergement et journaux techniques</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          L&apos;application est hébergée sur un serveur web. Comme tout site web,
          l&apos;hébergeur peut journaliser des données techniques standard lors du
          chargement des pages (par exemple l&apos;adresse IP et le type d&apos;appareil),
          uniquement pour faire fonctionner le service. Ces journaux ne sont pas
          utilisés pour vous identifier ni pour vous suivre.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Liens externes</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          L&apos;application propose des liens vers des services externes, comme
          Google Maps pour l&apos;itinéraire vers un centre. Ces services appliquent
          leurs propres politiques de confidentialité, indépendantes de celle-ci.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Parcours affichés</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          Les tracés et manœuvres présentés sont des schémas reconstitués à but
          d&apos;entraînement. Ils ne sont pas officiels et ne remplacent pas les
          consignes de l&apos;examinateur ni le code de la route.
        </div>
      </div>

      <div className="card">
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Contact et modifications</div>
        <div style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.55 }}>
          Éditeur : Shen Fire Inc. Pour toute question sur cette politique,
          contactez l&apos;éditeur via son site web, shenfire.com. Toute modification
          de cette politique sera publiée sur cette page.
        </div>
      </div>
    </>
  );
}
