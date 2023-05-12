const {
    addComments,
    deleteCommentUser,
    getRestaurants,
    getPostRestaurent,
    searchByCategory,
    searchByName_Specialite,
    getPostDetails,
    likePost,
    dislikePost,

} = require ('../../modules/user/index');



const addComment = (req, res) => {
    const { idPost, idClient } = req.params;
    console.log({ idPost: idPost, idClient: idClient });
    addComments(
      (err, result) => {
        err ? res.status(404).send(err) : res.status(200).send(result);
      },
      req.body,
      idPost,
      idClient
    );
  };




  const deleteComUser =  (req,res)=> {
    const { idClient, idCom } = req.params;
    deleteCommentUser((err, results) => {
      err ? res.status(500).send(err) : res.status(200).send(results);
    }, req.params);
}




    const get_restaurents=(req,res)=>{
        getRestaurants((err,results) => {
            err ? res.status(500).send(err) : res.status(200).send(results);
        });
    }


    const getP_Restaurent=(req,res)=>{
      getPostRestaurent((err,result)=>{
        err ? res.status(500).send(err) : res.status(200).send(result);
      },req.params.idRes)
    }



    const getPDetails = (req,res)=> {
        getPostDetails((err, result) => {
            err ? res.status(500).send(err) : res.status(201).json(result);
          }, req.params.idPost); 

        }


        const searchCategory=(req,res)=>{
          searchByCategory((err,result)=>{
            err ? res.status(500).send(err) : res.status(201).json(result);
          },req.params.inputCategory);
        }

    const search =(req,res)=>{
      searchByName_Specialite((err,results)=>{
        if(err){
          res.status(500).send(err) 
        }
        else{

          let filtred = results.filter(e=>e.restaurentName.toLowerCase().includes(req.params.input.toLowerCase()) ||(typeof e.restaurentSpecialite=== 'string' ? e.restaurentSpecialite.toLowerCase().includes(req.params.input.toLowerCase()) :  false))
          res.status(200).json(filtred)

        }
      },req.params.input)
    }



        const like = (req,res)=>{
            likePost((err,result) => {
                err ? res.status(500).send(err) : res.send(result);
        },req.params.idPost,req.params.idclient);
    }



 
    const dislike = (req,res)=>{
        dislikePost((err,result) => {
            err ? res.status(500).send(err) : res.send("disliked");
    },req.params.idPost, req.params.idlikes);
}



  module.exports = {
    addComment,
    deleteComUser,
   get_restaurents,
   getP_Restaurent,
   getPDetails,
   searchCategory,
   search,
   like,
   dislike
  }