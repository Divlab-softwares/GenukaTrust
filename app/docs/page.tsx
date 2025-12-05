// app/docs/page.tsx
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Documentation — Genuka Trust",
    description: "Guide d'utilisation, installation et intégration de Genuka Trust",
};

export default function Page() {
    return (
        <>
            <Topbar />
            <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 py-12 px-4">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800/70 rounded-2xl p-8 shadow-lg border border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-3xl font-semibold mb-4">Documentation Genuka Trust</h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Retrouvez ici tous les guides pour installer, configurer et intégrer Genuka Trust (widget, API, SDK).
                    </p>

                    <section className="grid gap-4 sm:grid-cols-2">
                        <a className="p-4 rounded-lg bg-linear-to-r from-gray-900  to-gray-800 hover:shadow-md" href="/api-docs">
                            <h3 className="font-medium">API & Intégration</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Endpoints, authentification et exemples.</p>
                        </a>

                        <a className="p-4 rounded-lg bg-gradient-to-r from-secondary-50 to-secondary-100 hover:shadow-md" href="/docs/widget">
                            <h3 className="font-medium">Widget d'avis</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Installer le widget sur une boutique Genuka & autres plateformes.</p>
                        </a>

                        <a className="p-4 rounded-lg bg-white dark:bg-gray-700/60 border border-gray-100 dark:border-gray-700" href="/docs/guide-gestion-avis">
                            <h3 className="font-medium">Guide: gestion des avis</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Modération, réponses et bonnes pratiques.</p>
                        </a>

                        <a className="p-4 rounded-lg bg-white dark:bg-gray-700/60 border border-gray-100 dark:border-gray-700" href="/docs/faq">
                            <h3 className="font-medium">FAQ</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Questions fréquentes pour commerçants et clients.</p>
                        </a>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
