const express=require('express')
const {
    addComment,
    deleteComUser,
    get_restaurents,
    getPDetails,
    like,
    dislike,

}= require('../controllers/user');
const users =express.Router()
users.post("/addComments/:idPost/:idClient", addComment);
users.delete("/delCommentUser/:idClient/:idCom", deleteComUser);
users.get("/getRestaurants",  get_restaurents);
users.get("/get/postdetails/:idPost" , getPDetails);
users.post("/addLike/:idPost/:idclient" , like)
users.put("/updateLike/:idPost/:idlikes" , dislike);
 
module.exports = users ;