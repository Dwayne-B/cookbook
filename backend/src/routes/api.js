import express from "express";

const router = express.Router();

import { createCard, deleteCard, getAllCards, getOneCard, updateCard } from "../controllers/cardController.js";


// ROUTES
//GET 
//user should be able to get all saved cards
// [X]COMPLETE []IN PROGRESS 
router.get("/", getAllCards);
//GET 
//user should be able to get ONE saved cards
// [X]COMPLETE []IN PROGRESS 
router.get("/:id", getOneCard);
//POST 
// user should be able to create recipe and add it to DB
// [X]COMPLETE []IN PROGRESS 
router.post("/", createCard);
//POST 
// user should be able to delete recipe 
// [X]COMPLETE []IN PROGRESS 
router.delete("/deleteCard/:id", deleteCard);
/*PATCH 'because recipe can be editted *without complete overwrite'
**
**user should be able to update recipe
** [x]COMPLETE []IN PROGRESS 
*/
// route.patch(".updatecatd/:id", this is just a callback being exported from controller to handle req)
router.patch("/updatecard/:id", updateCard)


export default router;

