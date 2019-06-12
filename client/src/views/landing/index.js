import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import GlobalFiltering from '../../helpers/GlobalFiltering';

const RenderChampion = (props) => {
    let getName = props.getName
    let championPoste = props.championPoste;
    return (
        <div style={{ "display": "flex", "flexWrap": "wrap" }}>
            {championPoste.map((champion, index) => {
                return (
                    <Link to={`./fiche-${champion.name}`}
                        key={index}
                        onMouseEnter={() => getName(champion.name)}
                    >
                        <div
                            className="bubble-champ small"
                            style={{ backgroundImage: `url(${champion.icon})` }}
                        >
                        </div>
                    </Link>
                )
            })}
        </div>
    );
}

class Landing extends Component {
    constructor(props) {
        super(props)
        this.getName = this.getName.bind(this);
        this.state = {
            championsTop: null,
            championsJungle: null,
            championsMiddle: null,
            championsBottom: null,
            championsSupport: null,

            lanes: [
                { name: "All", isActive: true },
                { name: "Top" },
                { name: "Jungle" },
                { name: "Mid" },
                { name: "Bot" },
                { name: "Support" }
            ]
        }
    }

    updateChampions = () => {
        this.setState({
            championsTop: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Top"),
            championsJungle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Jungle"),
            championsMiddle: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Middle"),
            championsBottom: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Bottom"),
            championsSupport: GlobalFiltering.getChampByMostPlayedPoste(this.props.data, "Support")
        })
    }

    componentWillMount() {
        this.updateChampions()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.updateChampions();
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
        const { lanes, championsTop, championsJungle, championsMiddle, championsBottom, championsSupport } = this.state;
        if (championsSupport === null) {
            return (
                <div>loading champions</div>
            )
        } else {
            return (
                <>
                    {
                        lanes.map(lane => {
                            if (lane.isActive && lane.name === "Top") {
                                return <RenderChampion championPoste={championsTop} getName={this.getName} />
                            } else if (lane.isActive && lane.name === "Jungle") {
                                console.log(lane);
                                return <RenderChampion championPoste={championsJungle} getName={this.getName} />
                            } else if (lane.isActive && lane.name === "Mid") {
                                return <RenderChampion championPoste={championsMiddle} getName={this.getName} />
                            } else if (lane.isActive && lane.name === "Bot") {
                                return <RenderChampion championPoste={championsBottom} getName={this.getName} />
                            } else if (lane.isActive && lane.name === "Support") {
                                return <RenderChampion championPoste={championsSupport} getName={this.getName} />
                            } else if (lane.isActive && lane.name === "All") {
                                return (
                                    <>
                                        <RenderChampion championPoste={championsTop} getName={this.getName} />
                                        <RenderChampion championPoste={championsJungle} getName={this.getName} />
                                        <RenderChampion championPoste={championsMiddle} getName={this.getName} />
                                        <RenderChampion championPoste={championsBottom} getName={this.getName} />
                                        <RenderChampion championPoste={championsSupport} getName={this.getName} />
                                    </>
                                )
                            }
                        })
                    }
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