import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        // Activamos Server Actions con configuración por defecto:
        serverActions: {},

        // Y mantenemos las rutas tipadas a true:
        // typedRoutes: true,
    },
};

export default nextConfig;
