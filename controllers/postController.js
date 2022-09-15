const CustomError=require('../shared/errors')

const  {
    PosteCreateService,
    getPostsByIDService,
    getPostsService,
    deletePostService,
    updatePostService
}=require('../services/postService')
const {StatusCodes}=require('http-status-codes')
const createpostcontroller =async(req,res)=>{
    const {postName,postContent}= req.body
    if (!postName || !postContent){
         throw new CustomError.BadRequestError('champs requise')
        
    }
    const post = await PosteCreateService({... req.body})
    res.status(StatusCodes.CREATED).send({
        msg: 'Poste created',
        post: post
    })
}
const getPostscontroller=async(req,res)=>{
    // console.log('Query => ',req.query)
    const {postName,category}= req.query
    
    const queryObject ={}
    if(postName && postName !== ''){
        // queryObject.postName=postName
        queryObject.postName={$regex:postName,$options:'i'}
    }
    if(category && category !== ''){
        queryObject.category=category
    }
    
    
    const posts = await getPostsService(queryObject)
    // const sort = posts

    
    res.status(StatusCodes.OK).send({nbHits: posts.length,tous_post:posts })
    
    
}

const getpostbyidcontroller=async(req,res)=>{
    const id=req.params.id
    const post =await getPostsByIDService(id)
    if (!post){
        return res.status(StatusCodes.BAD_REQUEST).send('non trouvable id')
    }
    res.status(StatusCodes.OK).send(post)
}
const updatePostscontroller=async(req,res)=>{
    const {
        body:{postName, postContent },
        params:{id:postID}
    }=req
   const post_to_update=await updatePostService({postName,postContent},postID)
if (!post_to_update){
    return res.status(StatusCodes.OK).send('non trouvable id')
}
res.status(StatusCodes.OK).send('Poste up to date')
}

const deletepostecontroller = async(req,res)=>{
    const id=req.params.id
    const post_to_delete =await deletePostService(id)
    if (!post_to_delete){
        return res.status(StatusCodes.BAD_REQUEST).send('non trouvable id')
    }
    res.status(StatusCodes.OK).send('DELETED')
    
}
module.exports   ={
  createpostcontroller,
    getpostbyidcontroller,
    getPostscontroller,
    deletepostecontroller,
    updatePostscontroller
}