import { getEyunService } from './eyunService';
import { User } from '../models';

// Keywords that trigger auto-reply
const QUOTE_KEYWORDS = ['báo giá', 'giá', 'hỏi giá', 'chi phí', 'bao nhieu tien', 'price', '报价', '价钱'];

// Auto-reply message template
const DEFAULT_QUOTE_REPLY = `Cảm ơn bạn đã quan tâm!

📋 BÁO GIÁ DỊCH VỤ

Vui lòng liên hệ hotline để được báo giá chi tiết:
📞 Hotline: 0909-XXX-XXX
📧 Email: contact@example.com

Hoặc cung cấp thông tin để chúng tôi tư vấn:
- Tên dịch vụ bạn cần
- Số lượng
- Yêu cầu đặc biệt (nếu có)

Chúng tôi sẽ phản hồi trong vòng 30 phút!`;

interface IncomingMessage {
  msgId: string;
  fromWxId: string;
  toWxId: string;
  content: string;
  msgType: number;
}

/**
 * Check if message contains quote-related keywords
 */
export const containsQuoteKeyword = (content: string): boolean => {
  const lowerContent = content.toLowerCase();
  return QUOTE_KEYWORDS.some(keyword => lowerContent.includes(keyword.toLowerCase()));
};

/**
 * Send auto-reply quote message
 */
export const sendQuoteReply = async (fromWxId: string, wId: string): Promise<void> => {
  try {
    const eyun = getEyunService();
    await eyun.sendText({
      wId,
      wcId: fromWxId,
      content: customQuoteTemplate,
    });
    console.log(`[Quote] Sent quote reply to ${fromWxId}`);
  } catch (error) {
    console.error(`[Quote] Failed to send reply to ${fromWxId}:`, error);
  }
};

/**
 * Process incoming webhook message and auto-reply if needed
 */
export const processIncomingMessage = async (message: IncomingMessage): Promise<void> => {
  const { fromWxId, content, msgType } = message;

  // Only process text messages
  if (msgType !== 1) {
    console.log(`[Webhook] Skipping non-text message type: ${msgType}`);
    return;
  }

  // Check if message contains quote keywords
  if (containsQuoteKeyword(content)) {
    console.log(`[Quote] Detected quote keyword in message from ${fromWxId}: ${content}`);

    // Get first available account (wId) from database to send reply
    const account = await User.findOne({
      where: { wcId: { [require('sequelize').Op.ne]: '' } },
      order: [['createdAt', 'DESC']],
    });

    if (account && account.wId) {
      await sendQuoteReply(fromWxId, account.wId);
    } else {
      console.log('[Quote] No logged in account found to send reply');
    }
  }
};

/**
 * Update quote reply template
 */
let customQuoteTemplate = DEFAULT_QUOTE_REPLY;

export const setQuoteReplyTemplate = (template: string): void => {
  customQuoteTemplate = template;
};

export const getQuoteReplyTemplate = (): string => customQuoteTemplate;