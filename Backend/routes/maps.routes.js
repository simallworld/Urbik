import express from 'express';
import authMiddleware from "../middlewares/auth.middleware.js";
import mapController from "../controllers/map.controller.js";
import { query } from 'express-validator';

const router = express.Router();

//To get coordinates
router.get('/get-coordinates',
  query('address').isString().isLength({ min: 3 }),
  authMiddleware.authUser,
  mapController.getCoordinates
);

//To get distance and Time from origin to destination
router.get('/get-distance-time', 
    query('origin').isString().isLength({min: 3}),
    query('destination').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getDistanceTime
)

// To get suggestions
router.get('/get-suggestions',
    query('input').isString().isLength({min: 3}),
    authMiddleware.authUser,
    mapController.getAutoCompleteSuggestions
)

export default router;
