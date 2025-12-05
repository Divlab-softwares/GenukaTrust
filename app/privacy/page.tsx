// app/privacy/page.tsx //politique de confidentialite
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";


export const metadata = {
    title: "Politique de confidentialité — Genuka Trust",
    description: "Politique de confidentialité et gestion des données personnelles",
};

export default function Page() {
    return (
        <>
            {/* En-tête simple */}
            <header className={` text-gray-600 backdrop-blur-sm border-b sticky top-0 z-50`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
                    <a href="/" className="flex items-center space-x-2">
                        <img src="/images/logo.png" alt="Genuka Trust" className="h-12 w-auto rounded-xl" />
                        <span className="text-2xl font-bold bg-linear-to-r from-amber-500 to-amber-700 bg-clip-text text-transparent">
                            Genuka Trust
                        </span>
                    </a>
                </div>
            </header>
            
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-4">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/75 p-8 rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-2xl font-semibold mb-4">Politique de confidentialité</h1>

                    <section className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <p><strong>Données collectées :</strong> informations commerçants (nom, email, URL), avis clients (note, commentaire, photo), logs techniques.</p>
                        <p><strong>Finalités :</strong> affichage des avis, analyses statistiques, sécurité et support.</p>
                        <p><strong>Base légale :</strong> consentement, exécution du contrat, intérêt légitime selon le traitement.</p>
                        <p><strong>Durée de conservation :</strong> données conservées tant que le compte est actif; options de suppression sur demande.</p>
                        <p><strong>Droits des personnes :</strong> accès, rectification, suppression, limitation, portabilité et opposition. Contact : <a href="mailto:privacy@genuka-trust.com" className="text-primary-600">privacy@genuka-trust.com</a>.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Cette page doit être rédigée et validée par un conseiller juridique pour conformité locale (RGPD, etc.).</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
