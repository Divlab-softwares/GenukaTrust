// app/cgv/page.tsx
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "CGV — Genuka Trust",
    description: "Conditions générales de vente — Genuka Trust",
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
            
            <main className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/70 p-8 rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-2xl font-semibold mb-6">Conditions Générales de Vente (CGV)</h1>

                    <section className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                        <p><strong>1. Champ d’application</strong> — Les présentes CGV régissent la fourniture des services Genuka Trust.</p>
                        <p><strong>2. Tarifs & Paiement</strong> — Les offres, facturation, modalités et révisions sont précisées dans les fiches produit.</p>
                        <p><strong>3. Durée & Résiliation</strong> — Modalités de souscription, durée d’engagement et résiliation.</p>
                        <p><strong>4. Remboursement</strong> — Conditions d’éligibilité.</p>
                        <p><strong>5. Responsabilité</strong> — Limitation dans les limites prévues par la loi.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Texte d’exemple — à compléter par vos conditions commerciales réelles et validées par un conseil juridique.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
