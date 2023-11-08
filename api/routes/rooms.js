import express from 'express';
import { verifyAdmin, verifyUser } from '../utils/verifyToken.js';
import { createRoom, deleteRoom, getAllRooms, getRoom, updateRoom, updateRoomAvailibility } from '../controllers/room.js';

const router = express.Router()

// router.post('/:hotelid', verifyAdmin, createRoom);
router.post('/:hotelid',  createRoom);

//update
router.put('/:id', updateRoom);
router.put('/availability/:id', updateRoomAvailibility);

//delete
router.delete('/:id/:hotelid', deleteRoom);

//get
router.get("/:id", getRoom);

//get all
router.get("/", getAllRooms);

export default router;