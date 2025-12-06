// api.ts
import axios from "axios";
import { fetchParameterByUrl } from "@/app/utils/param";

const api = axios.create({
    baseURL: "",           // Ou l'URL de ton API
    withCredentials: false,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Intercepteur pour injecter les params dans chaque requête
api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const { hmac, timestamp, companyId } = fetchParameterByUrl(window.location.href);

        if (hmac && timestamp && companyId) {
            config.params = {
                ...(config.params || {}),
                ...(hmac && { hmac }),
                ...(timestamp && { timestamp }),
                ...(companyId && { company_id: companyId }),
            };
        }
    }

    return config;
});

export default api;