const express = require("express");
const {
  signin_restaurent,
  signup_restaurent,
  add_post,
  getPDetails,
  remove_posts,
  update_posts,
  delete_profile,
  update_profile,
  get_posts,
  get_restaurents,
  deleteOnePost,
  addComments,
  getComments,
  deleteComAdmin
} = require("../controllers/restaurents/index");

const restaurents = express.Router();
restaurents.post("/signIn", signin_restaurent);
restaurents.post("/signUp", signup_restaurent);
restaurents.post("/add/posts/:id", add_post);
restaurents.get("/get/posts/:id", get_posts);
restaurents.get("/get/postdtails/:id", getPDetails);
restaurents.put("/update/posts/:id/:idRes", update_posts);
restaurents.delete("/remove/posts/:id", remove_posts);
restaurents.delete("/delete/onepost/:idRes/:idPost", deleteOnePost);
restaurents.get("/get/restaurents/:id", get_restaurents);
restaurents.delete("/delete/profile/:id", delete_profile);
restaurents.put("/update/profile", update_profile);
restaurents.post("/addComments/:idPost/:idRes/:idClient", addComments);
restaurents.get("/getComments/:id", getComments);
restaurents.delete("/delCommentAdmin/:id",deleteComAdmin)

// restaurents.use('signOut',)
//restaurents.use('/reservation',verify_token,reservation_restaurent)
// restaurents.use('search',)
// restaurents.use('history',)
// restaurents.use('profile',)
// restaurents.use('userObject',)
module.exports = restaurents;
