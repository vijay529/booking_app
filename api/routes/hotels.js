import express from 'express';
import { countByCity, countByType, createHotel, deleteHotel, getAllHotels, getHotel, getHotelRooms, updateHotel } from '../controllers/hotel.js';
import {verifyAdmin, verifyUser} from '../utils/verifyToken.js';
const router = express.Router();

//create
router.post('/', createHotel);

//update
router.put('/:id', updateHotel);

//delete
router.delete('/:id', deleteHotel);

//get
router.get("/find/:id", getHotel);

//get all
router.get("/", getAllHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);

export default router;