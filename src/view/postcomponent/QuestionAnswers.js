import React from "react";

const QuestionAnswers = ({answerstList, onUpVoteEvent, onDownVoteEvent}) =>(
    <section className="section hero is-dark">
        <div className="columns is-centered">
            <div className="column is-two-thirds">
                {answerstList.map(post=>(
                <article className="media" key={post.id}>
                    <div className="media-content">
                        <div className="content">
                            <p>
                                <strong>{post.author.username}-{post.author.score}</strong>
                                <p>{post.score}</p>
                                <br/>
                                <p>{post.body}</p>
                                    <br/>
                                <small>
                                    <div onClick={()=>(onUpVoteEvent(post.id))}>Upvote</div>
                                    <div onClick={()=>(onDownVoteEvent(post.id))}>Downvote</div>
                                </small>
                            </p>
                        </div>
                    </div>
                </article>
                ))}
            </div>
        </div>
    </section>
);

export default QuestionAnswers;