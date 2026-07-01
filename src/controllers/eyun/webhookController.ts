import { Request, Response } from 'express';
import { getEyunService } from '../../services/eyunService';
import { processIncomingMessage } from '../../services/quoteService';

export const setWebhook = async (req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService();
        const { httpUrl, type } = req.body;
        const result = await eyun.setHttpCallbackUrl({ httpUrl, type: type || 2 });
        res.json(result);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ code: '1001', message, data: null });
    }
};

export const cancelWebhook = async (_req: Request, res: Response): Promise<void> => {
    try {
        const eyun = getEyunService();
        const result = await eyun.cancelHttpCallbackUrl();
        res.json(result);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ code: '1001', message, data: null });
    }
};

// Webhook endpoint to receive messages from Eyun
export const webhookCallback = async (req: Request, res: Response): Promise<void> => {
    try {
        const messageData = req.body;
        console.log('[Webhook] Received callback:', JSON.stringify(messageData));

        // Process incoming message for auto-reply
        if (messageData.data) {
            await processIncomingMessage(messageData.data);
        }

        res.json({ code: '1000', message: 'ok' });
    } catch (error) {
        console.error('[Webhook] Error processing callback:', error);
        res.json({ code: '1000', message: 'ok' }); // Always return ok to prevent retries
    }
};