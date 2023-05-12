const express=require('express')
const {
    addComment,
    deleteComUser,
    get_restaurents,
    getP_Restaurent,
    getPDetails,
    searchCategory,
    search,
    like,
    dislike,

}= require('../controllers/user');
const users =express.Router()
users.post("/addComments/:idPost/:idClient", addComment);
users.delete("/delCommentUser/:idClient/:idCom", deleteComUser);
users.get("/getRestaurants",  get_restaurents);
users.get("/get/postRestaurant/:idRes",getP_Restaurent);
users.get("/get/postdetails/:idPost" , getPDetails);
users.get("/get/searchcategory/:inputCategory",searchCategory);
users.get("/search/:input",search)
users.post("/addLike/:idPost/:idclient" , like)
users.put("/updateLike/:idPost/:idlikes" , dislike);

 
module.exports = users ;