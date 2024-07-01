import { json } from '@sveltejs/kit';

// Detectar si estamos en un entorno de Cloudflare Workers
const isCloudflareWorker = typeof crypto.subtle !== 'undefined';

export async function GET() {
    const secretKey = '4c0b569e4c96df157eee1b65dd0e4d41'; // La misma clave en guacamole.properties
    const expires = Date.now() + 3600000; // 1 hora de validez

    const payload = {
        username: 'admin',
        expires,
        connections: {
            "Windows": {
                protocol: 'rdp',
                parameters: {
                    hostname: '217.71.204.218', // Cambia esto a la dirección de tu servidor RDP
                    username: 'admin',
                    port: '8443', // Puerto del servidor RDP, puede ser 8443 o 3389
                    password: '123456',
                    'ignore-cert': 'true' // Ignorar certificado, si es necesario
                }
            }
        }
    };

    const jsonPayload = JSON.stringify(payload);

    if (isCloudflareWorker) {
        // Entorno de Cloudflare Workers o navegador
        const enc = new TextEncoder();
        const keyData = enc.encode(secretKey);
        const key = await crypto.subtle.importKey(
            'raw',
            keyData,
            { name: 'HMAC', hash: 'SHA-256' },
            false,
            ['sign']
        );

        const signature = await crypto.subtle.sign('HMAC', key, enc.encode(jsonPayload));

        const signedPayload = new Uint8Array([...new Uint8Array(signature), ...enc.encode(jsonPayload)]);

        const aesKey = await crypto.subtle.importKey(
            'raw',
            keyData.slice(0, 16), // AES-128 usa una clave de 128 bits (16 bytes)
            { name: 'AES-CBC' },
            false,
            ['encrypt']
        );
        const iv = new Uint8Array(16); // IV de 16 bytes llenado de ceros
        const encryptedPayload = await crypto.subtle.encrypt(
            { name: 'AES-CBC', iv },
            aesKey,
            signedPayload
        );

        const base64Payload = btoa(String.fromCharCode(...new Uint8Array(encryptedPayload)));

        return json({ token: base64Payload });
    } else {
        // Entorno de Node.js
        const crypto = await import('crypto');
        const hmac = crypto.createHmac('sha256', Buffer.from(secretKey, 'hex'));
        hmac.update(jsonPayload);
        const signature = hmac.digest();

        const signedPayload = Buffer.concat([signature, Buffer.from(jsonPayload)]);

        const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey, 'hex'), Buffer.alloc(16, 0));
        const encryptedPayload = Buffer.concat([cipher.update(signedPayload), cipher.final()]);

        const base64Payload = encryptedPayload.toString('base64');

        return json({ token: base64Payload });
    }
}
