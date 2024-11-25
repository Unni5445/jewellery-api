import express from "express";
import EnquiryrController from "../controller/enquiry.controller";

const router = express.Router();

router.route('/enquirys').get(EnquiryrController.getEnquirys)
router.route('/enquiry').post(EnquiryrController.createCustomer)

router.route('/enquiry/:id')
    .get(EnquiryrController.getEnquiry)
    .put(EnquiryrController.updateEnquiry)
    .delete(EnquiryrController.deleteEnquiry)

export default router;
