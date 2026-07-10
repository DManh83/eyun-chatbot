import { getEyunService } from "./eyunService"
import Contact from "../models/contact"

/**
 * Get contact info from Eyun and save/update contact in database
 * @param wId - WId from webhook (used for API call only)
 * @param userName - WxId (WeChat ID) of the contact
 * @returns The saved Contact record, or null if failed
 */
export async function saveContact(wId: string, userName: string): Promise<Contact | null> {
    try {
        const eyun = getEyunService()
        const contactResult = await eyun.getContact({ wId, wcId: userName })
        console.log("[ContactService] Contact result", contactResult)

        if (!contactResult.data || contactResult.data.length === 0) {
            console.log(`[ContactService] No contact data for ${userName}`)
            return null
        }

        const c = contactResult.data[0]

        const [contact] = await Contact.upsert({
            userName,
            nickName: c.nickName || null,
            remark: c.remark || null,
            signature: c.signature || null,
            sex: c.sex || null,
            aliasName: c.aliasName || null,
            country: c.country || null,
            bigHead: c.bigHead || null,
            smallHead: c.smallHead || null,
            labelList: c.labelList || null,
            v1: c.v1 || null,
            province: c.province || null,
            city: c.city || null,
            v3: c.v3 || null,
            desc: c.desc || null,
            cardImgUrl: c.cardImgUrl || null,
            pyInitial: c.pyInitial || null,
            remarkPyInitial: c.remarkPyInitial || null,
            phoneNumList: c.phoneNumList || null,
        })

        console.log(`[ContactService] Contact ${c.nickName || userName} saved/updated`)
        return contact
    } catch (err) {
        console.error(`[ContactService] Failed to save contact ${userName}:`, err)
        return null
    }
}

/**
 * Get contact by userName (wxId) from local database
 * @param userName - WxId (WeChat ID) of the contact
 * @returns The Contact record or null
 */
export async function getContactByWxId(userName: string): Promise<Contact | null> {
    return Contact.findOne({ where: { userName } })
}

/**
 * Update contact nickname
 * @param userName - WxId (WeChat ID) of the contact
 * @param nickName - New nickname
 */
export async function updateContactNickName(userName: string, nickName: string): Promise<void> {
    await Contact.update({ nickName }, { where: { userName } })
}

