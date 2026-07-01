import { Router } from 'express';
import {
  initAddressList,
  getAddressList,
  getContact,
  getContactPlus,
  searchUser,
  addUser,
  acceptUser,
  delContact,
  modifyRemark,
  setFriendPermission,
  setTop,
  setDisturb,
  userPrivacySettings,
  sendHeadImage,
  checkZombie,
  getQrCode,
} from '../../controllers/eyun/contactController';

const router = Router();

// Contact List
router.post('/initAddressList', initAddressList);
router.post('/getAddressList', getAddressList);
router.post('/getContact', getContact);
router.post('/getContactPlus', getContactPlus);

// Friend Operations
router.post('/searchUser', searchUser);
router.post('/addUser', addUser);
router.post('/acceptUser', acceptUser);
router.post('/delContact', delContact);

// Friend Settings
router.post('/modifyRemark', modifyRemark);
router.post('/setFriendPermission', setFriendPermission);
router.post('/setTop', setTop);
router.post('/setDisturb', setDisturb);
router.post('/userPrivacySettings', userPrivacySettings);
router.post('/sendHeadImage', sendHeadImage);
router.post('/checkZombie', checkZombie);
router.post('/getQrCode', getQrCode);

export default router;
