import React from "react";

const Dashboard = ({postList, onEditEvent, onDeleteEvent}) =>(
    <section className="section hero is-dark">
        <div className="container">
            <div className="columns is-multiline is-mobile">
                { postList.map((post)=>(
                    <div className="column is-one-quarter">
                        <div className="card">
                            <header className="card-header content-dark has-text-centered">
                                <p className="card-header-title generic-text-colorful">
                                    {post.title}
                                </p>
                            </header>
                            <div className="card-content content-white">
                                <div className="content generic-text-dark">
                                    {post.summary}
                                </div>
                                <footer className="card-footer ">
                                    <div className="card-footer-item link-hoverable " onClick={()=>onEditEvent(post.id)}>Edit</div>
                                    <div className="card-footer-item link-hoverable" onClick={()=>onDeleteEvent(post.id)}>Delete</div>
                                </footer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Dashboard;