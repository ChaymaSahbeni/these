const {
  SignIn,
  SignUp,
  update_posts,
  update_profile,
  add_posts,
  get_posts,
  get_restaurents,
  delete_profile,
  remove_posts,
  deleteOnePost,
  addComments,
  getComments,
  getPostDetails,
  deleteCommentAdmin
} = require("../../modules/restaurents/index");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signin = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body);
  if (!email || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  SignIn(email, (error, results) => {
    if (error) {
      console.log(error);
    } else {
      if (results.length == 0) {
        return res.status(404).json({ message: "user undefined" });
      } else {
        const hached = results[0]["restaurentPassword"];
        console.log(hached);
        let result = bcrypt.compareSync(password, hached);
        console.log(result);
        if (result) {
          let accessToken = jwt.sign(
            {
              data: results[0].idRestaurent,
            },
            process.env.JWT_SECERT,
            { expiresIn: 60 * 60 }
          );

          res.cookie("token", accessToken, { httpOnly: true });
          return res.status(200).send("User successfully logged in");
        } else {
          return res
            .status(208)
            .json({ message: "Invalid Login. Check username and password" });
        }
      }
    }
  });
};

const signup = (req, res) => {
  const email = req.body.restaurentEmail;
  const password = req.body.restaurentPassword;
  const restaurentName = req.body.restaurentName;
  const restaurentAddress = req.body.restaurentAddress;
  const restaurentNumber = req.body.restaurentNumber;
  const restaurentImage = req.body.restaurentImage;
  const restaurentDescription = req.body.restaurentDescription;
  const restaurentSpecialite = req.body.restaurentSpecialite;
  const restaurentMenu = req.body.restaurentMenu;
  const restaurentTiming = req.body.restaurentTiming;
  const restaurentEmail = req.body.restaurentEmail;
  const restaurentRates = req.body.restaurentRates;
  const restaurentsMatricule = req.body.restaurentsMatricule;
  const restaurentsStatus = req.body.restaurentsStatus;
  var salt = bcrypt.genSaltSync(10);
  var restaurentPassword = bcrypt.hashSync(password, salt);

  console.log(req.body, restaurentPassword);
  const restaurent_data = [
    restaurentName,
    restaurentAddress,
    restaurentNumber,
    restaurentImage,
    restaurentDescription,
    restaurentSpecialite,
    restaurentMenu,
    restaurentTiming,
    restaurentEmail,
    restaurentPassword,
    restaurentRates,
    restaurentsMatricule,
    restaurentsStatus,
  ];
  console.log(restaurent_data);
  if (!email || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }
  SignIn(email, (error, results) => {
    if (error != undefined) {
      console.log(error);
    } else {
      if (results.length > 0) {
        return res.status(404).json({ message: "User already exists!" });
      } else {
        SignUp(restaurent_data, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            console.log(results);
            return res
              .status(200)
              .json({
                message: "User successfully registred. Now you can login",
              });
          }
        });
      }
    }
  });
};

const add_post = (req, res) => {
  const restaurantId = req.params.id; // get restaurant ID from req.params
  add_posts(
    (err, result) => {
      console.log(result, "hello");
      err ? res.status(404).send(err) : res.status(200).send(result);
    },
    req.body,
    restaurantId
  ); // pass restaurant ID to add_posts function
};

const remove_post = (req, res) => {
  console.log("hi");
  remove_posts((err, results) => {
    err ? res.status(500).send(err) : res.status(201).send(results);
  }, req.params.id);
};

const deleteOnePoste = (req, res) => {
  console.log("hi");
  deleteOnePost(
    (err, results) => {
      err ? res.status(500).send(err) : res.status(201).send(results);
    },
    req.params.idRes,
    req.params.idPost
  );
};

const update_post = (req, res) => {
  console.log(req.params);
  update_posts(
    (err, result) => {
      err ? res.status(404).send(err) : res.status(200).send(result);
    },
    req.body,
    req.params.id,
    req.params.idRes
  );
};

const get_post = (req, res) => {
  get_posts((err, result) => {
    err ? res.status(500).send(err) : res.status(201).json(result);
  }, req.params.id);
};

const getPDetails = (req,res)=> {
    getPostDetails((err, result) => {
        err ? res.status(500).send(err) : res.status(201).json(result);
      }, req.params.id); 
}
const delete_profil = (req, res) => {
  console.log("hi");
  delete_profile((err, results) => {
    err ? res.status(500).send(err) : res.status(201).send(results);
  }, req.params.id);
};

const update_profil = (req, res) => {
  console.log(req.params.id);
  update_profile(
    (err, results) => {
      err ? res.status(500).send(err) : res.status(201).send(results);
    },
    req.body,
    req.params.id
  );
};

const get_restaurent = (req, res) => {
  get_restaurents((err, result) => {
    err ? res.status(500).send(err) : res.status(201).send(result);
  }, req.params.id);
};

const addComment = (req, res) => {
  const { idPost, idClient, idRes } = req.params;
  console.log({ idPost: idPost, idClient: idClient, idRes: idRes });
  addComments(
    (err, result) => {
      err ? res.status(404).send(err) : res.status(200).send(result);
    },
    req.body,
    idPost,
    idRes,
    idClient
  );
};

const getcomments = (req, res) => {
  console.log(req.body);
  getComments((err, results) => {
    err ? res.status(500).send(err) : res.status(201).send(results);
  }, req.params.id);
};
const deleteComAdmin =  (req,res)=> {
    deleteCommentAdmin((err, results) => {
      err ? res.status(500).send(err) : res.status(200).send(results);
    },Number( req.params.id));
}



module.exports = {
  signin_restaurent: signin,
  signup_restaurent: signup,
  add_post: add_post,
  remove_posts: remove_post,
  update_posts: update_post,
  get_posts: get_post,
  delete_profile: delete_profil,
  update_profile: update_profil,
  get_restaurents: get_restaurent,
  deleteOnePost: deleteOnePoste,
  addComments: addComment,
  getComments: getcomments,
  getPDetails:getPDetails,
  deleteComAdmin:deleteComAdmin
};
