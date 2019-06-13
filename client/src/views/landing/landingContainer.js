import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as d3 from "d3";
import GlobalFiltering from '../../helpers/GlobalFiltering';

class BubbleChart extends Component {
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
            ],
            posts : [
                { "id": "Top", "name": "Top", "iconPost": "Top" },
                { "id": "Jungle", "name": "Jungle", "iconPost": "Jgl" },
                { "id": "Middle", "name": "Mid", "iconPost": "Mid" },
                { "id": "Bottom", "name": "Bot", "iconPost": "Bot" },
                { "id": "Support", "name": "Support", "iconPost": "Supp" }
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

    drawChart() {
        // Constante
        const width = "100%", height = "100%";
        const posts = this.state.posts;
        const nodes = [
            this.state.championsTop,
            this.state.championsJungle,
            this.state.championsMiddle,
            this.state.championsBottom,
            this.state.championsSupport
        ];

        // Force code
        d3.forceSimulation(posts)
            .force("charge", d3.forceManyBody().strength(-3000))
            .force("x", d3.forceX(window.innerWidth / 2))
            .force("y", d3.forceY(window.innerHeight / 2))
            .on('tick', function () {
                post.attr("transform", function(d) {
                    console.log(d);
                    return "translate(" + d.x + "," + d.y + ")";
            })
            });

            nodes.forEach(index => {
                d3.forceSimulation(index)
                    .force("charge", d3.forceManyBody().strength(-80))
                    .force("x", d3.forceX(20))
                    .force("y", d3.forceY(40))
                    .on('tick', function () {
                        node.attr("transform", function (d) {
                            console.log(d);
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
            .attr("id", function(d) {
                return "img" + d.id;
            })
            .attr('width', width)
            .attr('height', height)
            .append("image")
            .attr("xlink:href", function(d) {
                return d.icon;
            })
            .attr('width', function(d) {
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
            .attr("class", function(d) {
                return "post "+ d.id +"";
            });

        // Post
        var btn = post.append("a")
            .attr("href", function(d) {
                return "./graph-" + d.id + "";
            })
            .on("mouseover", function() {
                d3.select(this).classed("post-active", true);
                d3.select(this).style("fill", "url(#gradient) #C79A3C");
            })
            .on("mouseout", function() {
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
            .style("fill", function(d) {
                return "url(#iconPost" + d.id + ")";
            });

        btn.append("text")
            .text(function(d) {
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
            .data(function(d) {
                return nodes[d.index];
            }) // Changer de sorte à donner en paramètre la liste des champions correspondant au post
            .enter().append("g")
            .attr("class", "node");

        // Champion
        node.append("a")
            .attr("href", function(d) {
                return `./fiche-${d.name}`;
            })
            .on("mouseover", function() {
                d3.select(this).classed("node-active", true);
            })
            .on("mouseout", function() {
                d3.select(this).classed("node-active", false);
            })
            .append("circle")
            .attr("r", function(d) {
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
            .style("fill", function(d) {
                return "url(#img" + d.id + ")";
            });
    }

    render() {
        const { lanes } = this.state;
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