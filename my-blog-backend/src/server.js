import express from "express";
import { db,connectToDb } from './db.js';
let articleInfo=[{
    name:'learn-node',
    upvote: 0,
    comments:[],
},{
    name:'learn-react',
    upvote:0,
    comments:[],
},{
    name:'my-thoughts-on-resumes',
    upvote:0,
    comments:[],
}]

const app = express();
app.use(express.json());
app.get('/api/articles/:name', async (req,res)=>{
const {name}=req.params;



const article =await db.collection('articles').findOne({name});

if(article){
res.json(article);
}
else{
res.sendStatus(404);
}
});
app.put('/api/articles/:name/upvote',async (req,res)=>{
    const {name}=req.params;
    
    await db.collection('artice').updateOne({ name }, {
        $inc:{ upvotes: 1 },
    });
    
    const article =await db.collection('articles').findOne({name});
    
    
    if(article){
        article.upvote+=1;
        res.send(`The ${name} artticle now has ${article.upvote} upvote!!!`);
    }
    else{
        res.send('article doesn\'t exist');
    }
});

app.post('/api/articles/:name/comments',async(req,res)=>{
    const {name}=req.params;
    const {postedBy,text}=req.body;

   
    await db.collection('articles').updateOne({name},{
        $push:{comments:{postedBy,text}},
    });
    const article = await db.collection('articles').findOne({name});
    if(article){
    res.send(article.comments);
}
else{
    res.send('article doesn\'t exist');
}
});
connectToDb(()=>{
    console.log('Connected to database');
    app.listen(8000,()=>{
        console.log('server is listening on port 8000');
    });
});
