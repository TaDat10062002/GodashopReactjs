import React from 'react';

export default function CommentList({ comments, ReactStars }) {
    return (
        <>
            {
                comments.map((comment, index) => (
                    <div className="comment-list" key={index}>
                        <hr />
                        <span className="date pull-right">{comment.created_date}</span>
                        <ReactStars
                            value={Number(comment.star)}
                            size={24}
                            activeColor="#ffd700"
                            edit={false}
                            isHalf={true}
                        />
                        <span className="by">{comment.fullname}</span>
                        <p>{comment.description}</p>
                    </div>
                ))
            }
        </>
    );
}
