// app/api-docs/page.tsx
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "API — Genuka Trust",
    description: "Documentation API Genuka Trust",
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
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/75 p-8 rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-2xl font-semibold mb-4">API Genuka Trust</h1>

                    <section className="space-y-6 text-sm text-gray-700 dark:text-gray-300">
                        <div>
                            <h3 className="font-medium">Base URL</h3>
                            <p><code>https://api.genukatrust.com/v1/</code></p>
                        </div>

                        <div>
                            <h3 className="font-medium">Authentification</h3>
                            <p>Clé API (header : <code>Authorization: Bearer &lt;API_KEY&gt;</code>).</p>
                        </div>

                        <div>
                            <h3 className="font-medium">Exemples d'endpoints</h3>
                            <pre className="bg-gray-100 dark:bg-gray-700/60 p-3 rounded text-xs overflow-x-auto">
                                {`GET /reviews?limit=50
POST /orders
POST /reviews (submit review)
GET /widgets/:shopId`}
                            </pre>
                        </div>

                        <p className="text-xs text-gray-500 dark:text-gray-400">Pour une documentation complète, ajouter schémas JSON, erreurs, codes HTTP et exemples curl.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
