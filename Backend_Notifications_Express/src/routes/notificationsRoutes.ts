import { Router } from 'express';
import { Likes } from '../controllers/Likes/likesController';
import { Follow } from '../controllers/Follow/followController';
import { orders } from '../controllers/Order/orderController';
import { deleted } from '../controllers/AdminDelete/deletedController';
import { purchased } from '../controllers/Premium/purchasedController';
import { Expired } from '../controllers/Premium/ExpiredController';
import { Expiring } from '../controllers/Premium/ExpiringController';
import { General } from '../controllers/General/GeneralNotificacionController';
import { Comissions } from '../controllers/Comissions/comissionsController';


const router = Router();

router.post('/notifications/Likes', Likes);
router.post('/notifications/Follow', Follow);
router.post('/notifications/Orders', orders);
router.post('/notifications/Deleted', deleted);
router.post('/notifications/Purchased', purchased);
router.post('/notifications/Expired', Expired);
router.post('/notifications/Expiring', Expiring);
router.post('/notifications/General', General);
router.post('/notifications/Comissions', Comissions);

export default router;
