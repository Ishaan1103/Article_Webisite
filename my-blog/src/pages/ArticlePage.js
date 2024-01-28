import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import CommentsList from "../component/CommentsList";
import AddCommentForm from "../component/AddCommentForm";
import axios from 'axios';

const ArticlePage = () => {
  const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] });
  
  const { articleId } = useParams();
  
  useEffect(() => {
    const loadArticleInfo = async () => {
      const response = await axios.get(`/api/articles/${articleId}`);
      const newArticleInfo = response.data;
      setArticleInfo(newArticleInfo);
    }

    loadArticleInfo();
  }, [articleId]); 

  

  const article = articles.find((article) => article.name === articleId);
  const addupvote = async()=>{
    const response =await axios.put(`/api/articles/${articleId}/upvote`);
    const updatedArticle =response.data;
    setArticleInfo(updatedArticle);
  }

  if (!article) {
    return <NotFoundPage />;
  }

  return (
    <>
      <h1>{article.title}</h1>
      
      <div className="upvotes-section">
      <button onClick={addupvote}>upVote</button>
      <p>This article has {articleInfo.upvotes} upvote(s)</p>
      </div>
      {article.content.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}
      <AddCommentForm
      articleName={articleId}
      onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
      <CommentsList comments={articleInfo.comments} />
    </>
  );
};

export default ArticlePage;
