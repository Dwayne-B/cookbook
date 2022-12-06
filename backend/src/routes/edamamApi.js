import express from "express";


const router = express.Router();

import searchEdemam from "../controllers/edamamController.js";
router.post('/', searchEdemam)

export default router;