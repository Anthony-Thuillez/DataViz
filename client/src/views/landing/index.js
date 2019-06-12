import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GlobalFiltering from '../../helpers/GlobalFiltering';
class Landing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            champions_top: null,
            champions_jungle: null,
            champions_middle: null,
            champions_bottom: null,
            champions_support: null,

            lanes: [
                { name: "All", isActive: true },
                { name: "Top" },
                { name: "Jungle" },
                { name: "Mid" },
                { name: "Bot" },
                { name: "Support" }
            ]
        };
    }

    componentWillMount() {
        this.setState({
            champions_top: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Top"),
            champions_jungle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Jungle"),
            champions_middle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Middle"),
            champions_bottom: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Bottom"),
            champions_support: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Support")
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.setState({
                champions_top: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Top"),
                champions_jungle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Jungle"),
                champions_middle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Middle"),
                champions_bottom: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Bottom"),
                champions_support: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Support")
            })
        }
    }


    handleIsActive = id => {
        this.setState(prev => {
            const { lanes } = prev;
            const nextPost = lanes.map(post => {
                if (post.name === id && post.isActive) return { ...post, isActive: true }
                if (post.name !== id) return { ...post, isActive: false };
                return {
                    ...post,
                    isActive: !post.isActive
                };
            });
            return { ...prev, lanes: nextPost };
        });
    };

    getName(champ_name) {
        this.props.set_champ(champ_name);
    }

    getPoste(selectedPoste) {
        this.props.set_poste(selectedPoste);
    }

    render() {
        const { lanes, champions_top, champions_jungle, champions_middle, champions_bottom, champions_support } = this.state;
        if (champions_support === null) {
            return (
                <div>loading champions</div>
            )
        } else {
            return (
                <>
                    <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
                        {champions_top.map((champion, index) => {
                            return (
                                <Link to={`./fiche-${champion.name}`}
                                    key={index}
                                    onMouseEnter={() => this.getName(`${champion.name}`)}
                                >
                                    <div
                                        className="bubble-champ big"
                                        style={{ backgroundImage: `url(${champion.icon})` }}
                                    >
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
                        {champions_bottom.map((champion, index) => {
                            return (
                                <Link to={`./fiche-${champion.name}`}
                                    key={index}
                                    onMouseEnter={() => this.getName(`${champion.name}`)}
                                >
                                    <div
                                        className="bubble-champ large"
                                        style={{ backgroundImage: `url(${champion.icon})` }}
                                    >
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
                        {champions_jungle.map((champion, index) => {
                            return (
                                <Link to={`./fiche-${champion.name}`}
                                    key={index}
                                    onMouseEnter={() => this.getName(`${champion.name}`)}
                                >
                                    <div
                                        className="bubble-champ medium"
                                        style={{ backgroundImage: `url(${champion.icon})` }}
                                    >
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
                        {champions_middle.map((champion, index) => {
                            return (
                                <Link to={`./fiche-${champion.name}`}
                                    key={index}
                                    onMouseEnter={() => this.getName(`${champion.name}`)}
                                >
                                    <div
                                        className="bubble-champ small"
                                        style={{ backgroundImage: `url(${champion.icon})` }}
                                    >
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div style={{ "display": "flex", "flex-wrap": "wrap" }}>
                        {champions_support.map((champion, index) => {
                            return (
                                <Link to={`./fiche-${champion.name}`}
                                    key={index}
                                    onMouseEnter={() => this.getName(`${champion.name}`)}
                                >
                                    <div
                                        className="bubble-champ tiny"
                                        style={{ backgroundImage: `url(${champion.icon})` }}
                                    >
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    <div className="page-landing">

                        {/* en attendant le graph nuage */}
                        <div style={{ "position": "absolute", "top": "50%", "left": "50%", "transform": "translate(-50%, -50%)", "display": "flex", "alignItems": "center" }} >

                            <Link to="./graph-Top" onMouseEnter={() => this.getPoste("Top")} className="bubble-post icon icon-top"><span>Top</span></Link>
                            <Link to="./graph-Jungle" onMouseEnter={() => this.getPoste("Jungle")} className="bubble-post icon icon-jgl"><span>Jungle</span></Link>
                            <Link to="./graph-Middle" onMouseEnter={() => this.getPoste("Middle")} className="bubble-post icon icon-mid"><span>Mid</span></Link>
                            <Link to="./graph-Bottom" onMouseEnter={() => this.getPoste("Bottom")} className="bubble-post icon icon-bot"><span>Bot</span></Link>
                            <Link to="./graph-Support" onMouseEnter={() => this.getPoste("Support")} className="bubble-post icon icon-supp"><span>Support</span></Link>

                        </div>
                    </div>

                    <div className="filter">
                        {
                            lanes.map((post, index) => {
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
                </>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_champ: (champ_name) => {
            dispatch({
                type: 'SET_CHAMP',
                value: champ_name
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
export default connect(mapStateToProps, mapDispatchToProps)(Landing)