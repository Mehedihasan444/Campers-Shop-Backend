import express from 'express';
// import validateRequest from '../../middlewares/validateRequest';
import { authControllers } from './auth.controller';
// import { UserValidation } from '../user/user.validation';



const router = express.Router();

router.post(
  '/sign-in',
//   validateRequest(UserValidation.signInUserValidationSchema),
  authControllers.signIn,
);


router.post(
  '/sign-up',
//   validateRequest(UserValidation.signUpUserValidationSchema),
  authControllers.signUp,
);


export const AuthRoutes = router;