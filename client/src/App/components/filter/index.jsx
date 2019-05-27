import React, { Component } from 'react';

import './filter.scss';

export default class Filter extends Component {
    state = {
        posts: [
            { name: "All", isActive: true },
            { name: "Top" },
            { name: "Jungle" },
            { name: "Mid" },
            { name: "Bot" },
            { name: "Support" }
        ]
    };

    handleIsActive = id => {
        this.setState(prev => {
            const { posts } = prev;
            const nextPost = posts.map(post => {
                if (post.name !== id) return { ...post, isActive: false };
                return {
                    ...post,
                    isActive: !post.isActive
                };
            });
            return { ...prev, posts: nextPost };
        });
    };
    render() {
        const { posts } = this.state;
        
        return (
            <div className="filter">
                {
                    posts.map((post, index) => {
                        return (
                            <div
                                key={index}
                                className={`btn-filter ${post.isActive ? 'active' : ''}`}
                                onClick={() => this.handleIsActive(post.name)}
                            >
                                <span>{post.name}</span>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}