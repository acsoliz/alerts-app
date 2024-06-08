import { json } from '@sveltejs/kit';
import crypto from 'crypto';

export function GET() {
    const secretKey = '4c0b569e4c96df157eee1b65dd0e4d41'; // La misma clave en guacamole.properties
    const expires = Date.now() + 3600000; // 1 hora de validez

    const payload = {
        username: 'user',
        expires,
        connections: {
            "Windows": {
                protocol: 'rdp',
                parameters: {
                    hostname: '217.71.204.218', // Cambia esto a la dirección de tu servidor RDP
                    // username: 'user',
                    // security: 'any', // Cambia según sea necesario
                    port: '8443', // 8443   o 3389
                    password: '123456',
                    'ignore-cert': 'true'
                }
            }
        }
    };

    const jsonPayload = JSON.stringify(payload);
    console.log('jsonPayload::', payload)
    const hmac = crypto.createHmac('sha256', Buffer.from(secretKey, 'hex'));
    hmac.update(jsonPayload);
    const signature = hmac.digest();
    const signedPayload = Buffer.concat([signature, Buffer.from(jsonPayload)]);
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey, 'hex'), Buffer.alloc(16, 0));
    const encryptedPayload = Buffer.concat([cipher.update(signedPayload), cipher.final()]);
    const base64Payload = encryptedPayload.toString('base64');

    return json({ token: base64Payload });
}
