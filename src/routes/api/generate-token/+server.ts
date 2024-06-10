import { json } from '@sveltejs/kit';
import crypto from 'crypto';

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

    // Firmar el JSON usando la clave secreta con HMAC/SHA-256
    const hmac = crypto.createHmac('sha256', Buffer.from(secretKey, 'hex'));
    hmac.update(jsonPayload);
    const signature = hmac.digest(); // Generar la firma HMAC

    // Anteponga la firma al JSON de texto sin formato
    const signedPayload = Buffer.concat([signature, Buffer.from(jsonPayload)]);

    // Cifrar el resultado usando AES en modo CBC, con el IV establecido en cero bytes
    const cipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(secretKey, 'hex'), Buffer.alloc(16, 0));
    const encryptedPayload = Buffer.concat([cipher.update(signedPayload), cipher.final()]);

    // Codificar el resultado cifrado utilizando base64
    const base64Payload = encryptedPayload.toString('base64');

    return json({ token: base64Payload });
}
