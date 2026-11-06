import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import process from 'node:process';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (mode === 'production') {
    const requiredVariables = [
      'VITE_API_URL',
      'VITE_SOCKET_URL',
      'VITE_STRIPE_PUBLISHABLE_KEY',
      'VITE_FIREBASE_API_KEY',
      'VITE_FIREBASE_AUTH_DOMAIN',
      'VITE_FIREBASE_PROJECT_ID',
      'VITE_FIREBASE_STORAGE_BUCKET',
      'VITE_FIREBASE_MESSAGING_SENDER_ID',
      'VITE_FIREBASE_APP_ID',
    ];
    const missingVariables = requiredVariables.filter((name) => !env[name]?.trim());

    if (missingVariables.length) {
      throw new Error(`Missing production environment variables: ${missingVariables.join(', ')}`);
    }

    if (env.VITE_STRIPE_PUBLISHABLE_KEY.includes('your_stripe')) {
      throw new Error('VITE_STRIPE_PUBLISHABLE_KEY is a placeholder and cannot be used for production.');
    }

    for (const name of ['VITE_API_URL', 'VITE_SOCKET_URL']) {
      let endpoint;
      try {
        endpoint = new URL(env[name]);
      } catch {
        throw new Error(`${name} must be an absolute production URL.`);
      }

      if (!['https:', 'wss:'].includes(endpoint.protocol) || /localhost|127\.0\.0\.1/i.test(endpoint.hostname)) {
        throw new Error(`${name} must use a secure, non-local production endpoint.`);
      }
    }
  }

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:5001',
          changeOrigin: true,
        },
        '/socket.io': {
          target: 'http://127.0.0.1:5001',
          ws: true,
        },
      },
    },
  };
});
