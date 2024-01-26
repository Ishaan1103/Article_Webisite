import express from "express";
let articleInfo=[{
    name:'learn-node',
    upvote: 0,
    comments:[],
},{
    name:'learn-react',
    upvote:0,
    comments:[],
},{
    name:'mongo',
    upvote:0,
    comments:[],
}]

const app = express();
app.use(express.json());

app.put('/api/articles/:name/upvote',(req,res)=>{
    const {name}=req.params;
    const article=articleInfo.find(a=> a.name === name);
    if(article){
        article.upvote+=1;
        res.send(`The ${name} artticle now has ${article.upvote} upvote!!!`);
    }
    else{
        res.send('article doesn\'t exist');
    }
});

app.post('/api/article/:name/comments',(req,res)=>{
    const {name}=req.params;
    const {postedBy,text}=req.body;


    const article =articleInfo.find(a=>a.name === name);
    if(article){
    article.comments.push({postedBy,text});
    res.send(article.comments);
}
else{
    res.send('article doesn\'t exist');
}
});

app.listen(8000,()=>{
    console.log('server is listening on port 8000');
});
