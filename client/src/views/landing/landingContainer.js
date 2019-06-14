import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import GlobalFiltering from '../../helpers/GlobalFiltering';

class BubbleChart extends Component {
    constructor(props) {
        super(props)
        this.getName = this.getName.bind(this);
        this.getName = this.getName.bind(this);
        this.state = {
            championsTop: null,
            championsJungle: null,
            championsMiddle: null,
            championsBottom: null,
            championsSupport: null,
            lanes: [
                { name: "All", index: 5, isActive: true },
                { name: "Top", index: 0 },
                { name: "Jungle", index: 1 },
                { name: "Mid", index: 2 },
                { name: "Bot", index: 3 },
                { name: "Support", index: 4 }
            ],
            posts: [
                { "id": "Top", "name": "Top", "iconPost": "Top", index: 0, isActive: true, "x": "780", "y": "352" },
                { "id": "Jungle", "name": "Jungle", "iconPost": "Jgl", index: 1, isActive: true, "x": "240", "y": "500" },
                { "id": "Middle", "name": "Mid", "iconPost": "Mid", index: 2, isActive: true, "x": "420", "y": "200" },
                { "id": "Bottom", "name": "Bot", "iconPost": "Bot", index: 3, isActive: true, "x": "1240", "y": "196" },
                { "id": "Support", "name": "Support", "iconPost": "Supp", index: 4, isActive: true, "x": "1172", "y": "516" }
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

    componentDidMount() {
        this.drawChart();
    }

    componentWillMount() {
        this.updateChampions();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.data !== this.props.data) {
            this.updateChampions();
        }
    }

    getName(champ_name) {
        this.props.set_champ(champ_name);
    }

    getPoste(selectedPoste) {
        this.props.set_poste(selectedPoste);
    }

    handleIsActive = id => {
        this.setState(prev => {
            const { lanes, posts } = prev;
            const nextPost = lanes.map((lane, i) => {
                if (i === id + 1 && lane.isActive) return { ...lane, isActive: true }
                if (i !== id + 1) return { ...lane, isActive: false };
                return {
                    ...lane,
                    isActive: !lane.isActive
                };
            });
            let nextNodes = posts.map(post => {
                if (id === 5) {
                    return { ...post, isActive: true }
                }
                if (post.index === id) {
                    return { ...post, isActive: true }
                } else if (post.index !== id) {
                    return { ...post, isActive: false }
                }
                return {
                    ...post,
                    isActive: !post.isActive
                };
            })
            return { ...prev, lanes: nextPost, posts: nextNodes };
        });
        let container = document.querySelector('#map')
        container.innerHTML = ''
    };

    drawChart = () => {
        // Constante

        const width = "100%", height = "100%";
        const posts = this.state.posts.filter(post => post.isActive);
        const nodes = posts.map(post => {
            let item;
            switch (post.index) {
                case 0:
                    item = this.state.championsTop
                    break;
                case 1:
                    item = this.state.championsJungle
                    break;
                case 2:
                    item = this.state.championsMiddle
                    break;
                case 3:
                    item = this.state.championsBottom
                    break;
                case 4:
                    item = this.state.championsSupport
                    break;
                default:
                    break;
            }
            return item
        })

        // Force code
        nodes.forEach((index, i) => {
            d3.forceSimulation(index)
                .force("charge", d3.forceManyBody().strength(-100))
                .force("x", d3.forceX(0))
                .force("y", d3.forceY(0))
                .on('tick', function () {
                    node.attr("transform", function (d) {
                        return "translate(" + d.x + "," + d.y + ")";
                    })
                });
        });

        // Svg
        var svg = d3.select("#map").append("svg")
            .attr("width", width)
            .attr("height", height);

        // Linear background btn post
        var linearBackground = svg.append("linearGradient")
            .attr("x2", "0")
            .attr("y2", "1");

        linearBackground.attr("id", "gradient")
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#C79A3C");
        linearBackground.attr("id", "gradient")
            .append("stop")
            .attr("offset", "39.06%")
            .attr("stop-color", "#A6843C");
        linearBackground.attr("id", "gradient")
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#614B1D");

        // Icons
        svg.append("defs")
            .selectAll("post")
            .data(posts)
            .enter().append("pattern")
            .attr("id", function (d) {
                return "iconPost" + d.id;
            })
            .attr('width', width)
            .attr('height', height)
            .append("image")
            .attr("xlink:href", function (d) {
                return require("../../assets/icons/btn/" + d.iconPost + ".svg");
            })
            .attr('width', 32)
            .attr('height', 32);

        // Image
        svg.append("defs")
            .selectAll(".node")
            .data(this.props.data) // Changer de sorte à récupérer l'image de tous les champions
            .enter().append("pattern")
            .attr("id", function (d) {
                return "img" + d.id;
            })
            .attr('width', width)
            .attr('height', height)
            .append("image")
            .attr("xlink:href", function (d) {
                return d.icon;
            })
            .attr('width', function (d) {
                if (d.rank === 1) {
                    return 56;
                }
                if (d.rank === 2) {
                    return 48;
                }
                if (d.rank === 3) {
                    return 40;
                }
                if (d.rank === 4) {
                    return 32;
                }
                if (d.rank === 5) {
                    return 24;
                }
            });

        // Groupe de posts
        var post = svg
            .append("g")
            .attr("class", "posts")
            .selectAll(".post")
            .data(posts)
            .enter()
            .append("g")
            .attr("transform", function (d) {
                return "translate(" + d.x + "," + d.y + ")";
            })
            .attr("class", function (d) {
                return "post " + d.id + "";
            });

        // Post
        var btn = post.append("a")
            .attr("href", function (d) {
                return "./graph-" + d.id + "";
            })
            .on("mouseover", function () {
                d3.select(this).classed("post-active", true);
                d3.select(this).style("fill", "url(#gradient) #C79A3C");
            })
            .on("mouseout", function () {
                d3.select(this).classed("post-active", false);
                d3.select(this).style("fill", "#00CBE0");
            });

        btn.append("circle")
            .attr("r", 40);

        btn.append("rect")
            .attr("x", "-16.5")
            .attr("y", "-25")
            .style("width", 32)
            .style("height", 32)
            .style("fill", function (d) {
                return "url(#iconPost" + d.id + ")";
            });

        btn.append("text")
            .text(function (d) {
                return d.name;
            })
            .attr("y", "24")
            .attr("text-anchor", "middle")
            .style("font-family", "Lato")
            .style("font-size", 12)
            .style("fill", "#160B31");

        // Groupe de champions
        var node = post.append("g")
            .attr("class", "nodes")
            .selectAll(".node")
            .data(function (d) {
                if (nodes.length > 1) {
                    return nodes[d.index];
                } else {
                    return nodes[0];
                }
            }) // Changer de sorte à donner en paramètre la liste des champions correspondant au post
            .enter().append("g")
            .attr("class", "node");

        // Champion
        node.append("a")
            .attr("href", function (d) {
                return `./fiche-${d.name}`;
            })
            .on("mouseover", function () {
                d3.select(this).classed("node-active", true);
            })
            .on("mouseout", function () {
                d3.select(this).classed("node-active", false);
            })
            .append("circle")
            .attr("r", function (d) {
                if (d.rank === 1) {
                    return (d.rank + 55) / 2;
                }
                if (d.rank === 2) {
                    return (d.rank + 46) / 2;
                }
                if (d.rank === 3) {
                    return (d.rank + 37) / 2;
                }
                if (d.rank === 4) {
                    return (d.rank + 28) / 2;
                }
                if (d.rank === 5) {
                    return (d.rank + 19) / 2;
                }
            })
            .style("fill", function (d) {
                return "url(#img" + d.id + ")";
            });
    }

    render() {
        const { lanes } = this.state;

        this.drawChart()
        return (
            <>
                <div id="map"></div>

                <div className="filter">
                    {
                        lanes.map((post, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`btn-filter ${post.isActive ? 'active' : ''}`}
                                    onClick={() => this.handleIsActive(post.index)}
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

const mapStateToProps = (state) => {
    return {
        data: state.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        set_rate: (selectedRate) => {
            dispatch({
                type: 'SET_RATE',
                value: selectedRate
            })
        },
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BubbleChart);