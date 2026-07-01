import { Router } from 'express';
import {
  setWebhook,
  cancelWebhook,
  webhookCallback,
} from '../../controllers/eyun/webhookController';

const router = Router();

router.post('/setWebhook', setWebhook);
router.post('/cancelWebhook', cancelWebhook);

// Webhook endpoint to receive callbacks from Eyun
router.post('/callback', webhookCallback);

export default router;