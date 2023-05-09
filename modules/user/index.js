const connection=require("../../config")

const addComments=(cb,values,idPost,idClient)=>{
    const sql = `insert into comments (commentsBody,posts_idPosts,clients_idClient) values (?,?,?)`
    connection.query(sql,[values.commentsBody,idPost,Number(idClient)],(err,res)=>{
      cb(err,res)
    })
  }

  const deleteCommentUser = (cb,idClient,idCom)=> {
    const sql = `delete from comments where clients_idClient=? and idcomments=?`
    connection.query(sql,[idClient, idCom],(err,res)=>{
      console.log(id);
      cb(err,res)
    })
  }





  const getRestaurants=(cb)=>{
    const sql = `select * from restaurents`
    connection.query(sql,(err,res)=>{
        cb(err,res)
    })
}


const getPostDetails = (cb,idPost)=> {
    const sql = `SELECT *
    FROM Posts
    INNER JOIN comments
    ON Posts.idPosts = comments.posts_idPosts
    LEFT JOIN likes
    ON Posts.idPosts = likes.posts_idPosts
    `
    connection.query(sql,[idPost],(err,results)=>{
      cb(err,results) 
    })
    }

    const likePost = (cb,idPost,idclient)=>{
        const sql = `INSERT INTO likes (posts_idPosts, Client_idClient, liked) VALUES (?, ?, 1)`
        connection.query(sql,[idPost,idclient],(err,res)=>{
          cb(err,res)
        })
      }
      



    const dislikePost = (cb,idPost,idlikes)=>{
        const sql = `update likes set liked =0 where posts_idPosts =? and idLikes=?`
        connection.query(sql,[idPost, idlikes],(err,res)=>{
         cb(err,res)
        })
    }

  module.exports={
    addComments,
    deleteCommentUser,
    getRestaurants,
    getPostDetails,
    likePost,
    dislikePost,

}