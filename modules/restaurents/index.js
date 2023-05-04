const connection=require("../../config")


const SignIn=(email,callback)=>{

    const sql=`SELECT * FROM restaurents WHERE restaurentEmail LIKE ?`
    const searchQuery = `%${email}%`;
    connection.query(sql, [searchQuery], (error, results) => {
      callback(error,results)
    });
   
}
const SignUp=(arrayRes,callback)=>{
  const sql=`INSERT INTO restaurents (restaurentName , restaurentAddress ,restaurentNumber, restaurentImage , restaurentDescription , restaurentSpecialite , restaurentMenu , restaurentTiming , restaurentEmail , restaurentPassword , restaurentRates , restaurentsMatricule , restaurentsStatus) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`
  connection.query(sql,arrayRes,(error,results)=>{
    callback(error,results)
  })

}
const add_posts = (cb, values, restaurantId) => {
  const sql = `INSERT INTO posts (PostsImage, PostsDescription, restaurent_idRestaurent) VALUES (?, ?, ?)`;
  connection.query(sql, [values.PostsImage, values.PostsDescription, restaurantId], (err, results) => {
    cb(err, results);
  });
};

const get_posts=(cb,id)=>{
  const sql = `select * from posts where  restaurent_idRestaurent = ?`
  connection.query(sql,[id],(err,results)=>{
    cb(err,results) 
  })
}


const update_posts=(cb,values,id,idRes)=>{
  const sql=`update posts set PostsImage=?, PostsDescription=? where idPosts=? and restaurent_idRestaurent=?`
    connection.query(sql,[values.PostsImage,values.PostsDescription,id,idRes],(err,results)=>{
  cb(err,results)
})
}
const remove_posts=(cb,id)=>{
  const sql = `delete from Posts where restaurent_idRestaurent =?`
  connection.query(sql,[id],(err,res)=>{
    cb(err,res)
  })
}

const deleteOnePost=(cb,idRes,idPost)=>{
  const sql = `delete from Posts where idRestaurent =? and idPosts=?`
  connection.query(sql,[idRes,idPost],(err,res)=>{
    cb(err,res)
})
}


const update_profile=(cb,values)=>{
  const sql = `update restaurents set restaurentName =?, restaurentAddress =?, restaurentNumber =?, restaurentImage =?,restaurentDescription =?, restaurentSpecialite =?, restaurentMenu =?, restaurentTiming =?, restaurentEmail =?, restaurentPassword=? where idRestaurent = ?`
  connection.query(sql,[values.name,values.address,values.number,values.img,values.description,values.specialite,values.menu,values.timing,values.email,values.password,id],(err,results)=>{
  cb(err,results)
})
}

const get_restaurents=(cb,id)=>{
  const sql = `select * from restaurents where idRestaurent = ?`
  connection.query(sql,[id],(err,results)=>{
    cb(err,results) 
  })
}
const delete_profile=(cb,id)=>{
  const sql = `delete from restaurents where idRestaurent =?`
  connection.query(sql,[id],(err,res)=>{
    cb(err,res)
  })
}

const addComments=(cb,values,idPost)=>{
  console.log(values,'the valeu');
  const sql = `insert into comments (commentsBody,posts_idPosts) values (?,?)`
  connection.query(sql,[values.commentsBody,idPost],(err,res)=>{
    cb(err,res)
  })
}



module.exports={
  SignIn,
  SignUp,
  add_posts,
  remove_posts,
  deleteOnePost,
  update_posts,
  get_posts,
  delete_profile,
  update_profile,
  get_restaurents,
  addComments
}