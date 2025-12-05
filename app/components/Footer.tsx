import React from "react";
import LogoGenukaTrust from "../assets/images/Genuka1.jpg";
import { link } from "fs";

const Footer: React.FC = () => {
    const resources = {labels: ["Documentation", "Guides", "Centre d'aide", "API"] , links:["/docs", "#", "#", "/api-docs"]};
    const legal = {labels: ["Conditions d'utilisation", "Politique de confidentialité", "Mentions légales", "CGV"], links:["/cgu", "/privacy", "/mentions-legales", "/cgv"]};
    const socialIcons = {labels: ["fab fa-facebook-f", "fab fa-twitter", "fab fa-instagram", "fab fa-linkedin-in"], links:["#", "#", "#", "# "]};

    return (
        <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-t border-gray-200/50 dark:border-gray-700/50 py-8 ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                {/* Logo + Description */}
                <div>
                    <div className="flex items-center mb-2">
                        <img src={LogoGenukaTrust.src} alt="Logo" className="w-auto h-15 rounded-lg border border-gray-200 dark:border-gray-700" />
                        <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-300 bg-clip-text text-transparent">
                            Genuka Trust
                        </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        La solution tout-en-un pour collecter et gérer les avis clients.
                    </p>
                </div>

                {/* Ressources */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Ressources</h4>
                    <ul className="space-y-2">
                        {resources.labels.map((item, i) => (
                            <li key={item}>
                                <a href={resources.links[i]} className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors" target="_blank" rel="noopener noreferrer">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Légal */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Légal</h4>
                    <ul className="space-y-2">
                        {legal.labels.map((item, i) => (
                            <li key={item}>
                                <a href={legal.links[i]} className="text-sm text-gray-600 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 transition-colors" target="_blank">{item}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">Contact</h4>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-center">
                            <i className="fas fa-envelope mr-2 text-primary-600 dark:text-primary-400"></i>
                            <a href="mailto:support@genuka-trust.com" className="hover:text-primary-600 dark:hover:text-primary-400">support@genuka-trust.com</a>
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-phone-alt mr-2 text-primary-600 dark:text-primary-400"></i> +237 695 961 093
                        </li>
                        <li className="flex items-center">
                            <i className="fas fa-map-marker-alt mr-2 text-primary-600 dark:text-primary-400"></i> Douala, Cameroun
                        </li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
                <p>&copy; 2025 Genuka Trust. Tous droits réservés.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    {socialIcons.labels.map((icon, i) => (
                        <a href={socialIcons.links[i]} key={icon} className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors">
                            <i className={icon}></i>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
