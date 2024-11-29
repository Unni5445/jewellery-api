import express from 'express'
import AuthController from '../controller/auth.controller'
import { protect } from '../middleware/authProtect'

const router = express.Router()

router.route('/user').post(AuthController.createUser)
router.route('/login').post(AuthController.signinUser)
router.route('/reset-password').post(protect,AuthController.resetPassword)
router.route('/user-token').get(protect,AuthController.getuserByToken)
router.route('/logout').post(AuthController.signOut)

export default router