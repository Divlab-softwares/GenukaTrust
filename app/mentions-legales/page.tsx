// app/mentions-legales/page.tsx
import Topbar from "@/app/components/Topbar";
import Footer from "@/app/components/Footer";

export const metadata = {
    title: "Mentions légales — Genuka Trust",
};

export default function Page() {
    return (
        <>
            <Topbar />
            <main className="min-h-screen py-12 px-4 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800/75 p-8 rounded-2xl shadow border border-gray-200/50 dark:border-gray-700/50">
                    <h1 className="text-2xl font-semibold mb-4">Mentions légales</h1>

                    <section className="text-sm text-gray-700 dark:text-gray-300 space-y-3">
                        <p><strong>Éditeur :</strong> Genuka Trust — (Nom de la société ou du porteur)</p>
                        <p><strong>Siège social :</strong> Adresse complète</p>
                        <p><strong>Directeur de publication :</strong> Nom & fonction</p>
                        <p><strong>Hébergeur :</strong> Nom et coordonnées de l’hébergeur</p>
                        <p><strong>Propriété intellectuelle :</strong> Tous droits réservés. Reproduction interdite sauf autorisation.</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Compléter les champs en fonction de la structure juridique de Genuka.</p>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
}
