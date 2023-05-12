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





const getPostRestaurent=(cb,idRes)=>{
  const sql = `select * from Posts where restaurent_idRestaurent =?`
  connection.query(sql,[idRes],(err,res)=>{
    cb(err,res)
  })
}


const getPostDetails = (cb, idPost) => {
  const sql = `
SELECT 
  Posts.idPosts,
  Posts.PostsImage,
  Posts.PostsDescription,
  Posts.category,
  Posts.created_at,
  Posts.restaurent_idRestaurent,
  IFNULL(clients.ClientName, restaurents.restaurentName) as commenterName,
  COUNT(likes.idlikes) as likesCount
FROM Posts
LEFT JOIN comments ON Posts.idPosts = comments.posts_idPosts
LEFT JOIN clients ON comments.clients_idClient = clients.idClient
LEFT JOIN restaurents ON comments.restaurents_idRestaurent = restaurents.idRestaurent
LEFT JOIN likes ON Posts.idPosts = likes.posts_idPosts AND likes.liked = 1
WHERE Posts.idPosts = ?
GROUP BY Posts.idPosts, IFNULL(clients.ClientName, restaurents.restaurentName)`;

connection.query(sql,[idPost],(err,res)=>{
  cb(err,res)
})
}


const searchByCategory =(cb,category)=>{
const sql = `SELECT * FROM posts 
WHERE category = ?;`
connection.query(sql,[category],(err,res)=>{
  cb(err,res)
})
}



const searchByName_Specialite = (cb) =>{
  const sql = `select * from restaurents `
 connection.query(sql,(err,results)=>{
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
    getPostRestaurent,
    searchByCategory,
    searchByName_Specialite,
    getPostDetails,
    likePost,
    dislikePost,

}