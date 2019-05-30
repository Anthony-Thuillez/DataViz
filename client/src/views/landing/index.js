import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class Landing extends Component {

    state = {
        champions: [
            { name: "Gnar", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3IuwhHQix88XL6mc5mRaVUtkWoGfh5YeVdA-1E4iIrZBQjjYw" },
            { name: "Nidalee", icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxH1IXJvDcM_D8hfshgOsIhCbF7Q6BGHgDj5BWFBsCPmmbJkUo" },
            { name: "Vel'Koz", icon: "http://elohell.net/public/champions/avatar/VelKozSquare1.png" },
            { name: "Ezreal", icon: "http://img3.wikia.nocookie.net/__cb20150402220010/leagueoflegends/images/c/c3/EzrealSquare.png" },
            { name: "Sona", icon: "http://images6.fanpop.com/image/photos/36200000/Sona-image-sona-36206053-120-120.png" },
        ],
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
    
    getName(selectedChamp) {
        this.props.set_name(selectedChamp);
    }

    getPoste(selectedPoste) {
        this.props.set_poste(selectedPoste);
    }

    render() {
        const { posts, champions } = this.state;

        return (
            <div className="page-landing">

                {/* en attendant le graph nuage */}
                <div style={{ "position":"absolute", "top":"50%", "left":"50%", "transform":"translate(-50%, -50%)", "display":"flex", "alignItems":"center" }} >

                    <Link to="./graph" onMouseEnter={() => this.getPoste("Top")} className="bubble-post icon icon-top"><span>Top</span></Link>
                    <Link to="./graph" onMouseEnter={() => this.getPoste("Jungle")} className="bubble-post icon icon-jgl"><span>Jungle</span></Link>
                    <Link to="./graph" onMouseEnter={() => this.getPoste("Middle")} className="bubble-post icon icon-mid"><span>Mid</span></Link>
                    <Link to="./graph" onMouseEnter={() => this.getPoste("Bottom")} className="bubble-post icon icon-bot"><span>Bot</span></Link>
                    <Link to="./graph" onMouseEnter={() => this.getPoste("Support")} className="bubble-post icon icon-supp"><span>Support</span></Link>
                    
                    {
                        champions.map((champion, index) => {
                            return (
                                <Link to={`./fiche/${champion.name}`}
                                key={index}
                                onMouseEnter={() => this.getName(`${ champion.name }`)}
                                >
                                    <div className="bubble-champ big" style={{ backgroundImage: `url(${champion.icon})` }}></div>
                                </Link>
                            );
                        })
                    }
                    
                </div>

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
                
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_name: (selectedChamp) => {
            dispatch({
                type: 'SET_NAME',
                value: selectedChamp
            })
        },
        set_poste: (selectedPoste) => {
            dispatch({
                type: 'SET_POSTE',
                value: selectedPoste
            })
        },
    }
}
export default connect(null, mapDispatchToProps)(Landing)