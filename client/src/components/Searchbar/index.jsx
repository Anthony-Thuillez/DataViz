import React, {Component} from 'react';
import { connect } from 'react-redux';

class SearchBar extends Component {
    state = {
        active: false,
        q: "",
        list: [],
        display: []
    }

    isActive = () => {
        this.setState({ active: !this.state.active });
        let champ = this.getChampData(this.props.data)
        this.setState({
            list: champ
        })
    }

    /** TESTED 🚫
     * Functions purpose: Get the champion name of each champions
     * @param {Object[]} data(json)
     * @return {Object[]} the name of all champions
    */
    getChampData(data) {
        let champions = data.map((champ) => {
            return {
                name: champ.name,
                icon: champ.icon
            }
        });      
        return champions
    }
    
    /** TESTED 🚫
     * Functions purpose: Get the champion name of each champions
     * @param {String} q(query from input) @param {Object[]} list(the name of all champions)
     * @return {Boolean}
     */
    filterList(q, list) {
        function escapeRegExp(s) {
            return s.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");
        }
        const words = q
            .split(/\s+/g)
            .map(s => s.trim())
            .filter(s => !!s);
        const hasTrailingSpace = q.endsWith(" ");
        const searchRegex = new RegExp(
            words
            .map((word, i) => {
                if (i + 1 === words.length && !hasTrailingSpace) {
                    return `(?=.*\\b${escapeRegExp(word)})`;
                } else {
                    return `(?=.*\\b${escapeRegExp(word)}\\b)`;
                }
            })
            .join("") + ".+",
            "gi"
        );
        return list.filter(item => {
            return searchRegex.test(item.name);
        });
    }
    render() {
        return(
            <>
                <div onClick={this.isActive} className="icon icon-search"></div>
                <div className={this.state.active ? 'modal active' : 'modal'}>
                    <div onClick={this.isActive} className="icon icon-cross"></div>
                    <div className="modal-content searchbar">
                        <span className="searchbar-input">
                            <input
                            type="search"
                            value={this.state.q}
                            placeholder="Enter a first letter for search..."
                            onChange={event => {
                                this.setState({ q: event.target.value }, () => {
                                    if (this.state.q) {
                                        this.setState({
                                            display: this.filterList(this.state.q, this.state.list)
                                        });
                                    } else {
                                        this.setState({ display: this.state.list });
                                    }
                                });
                            }}
                            />
                        </span>
                        {
                            this.state.q ? (
                                <ul className="list-champ">
                                {
                                    this.state.display.map(champ => {
                                        return (
                                            <li key={champ.name}>
                                                <a href={`./fiche/${champ.name}`}> {/* Changer le path */}
                                                    <div className="bubble-champ big" style={{ backgroundImage: `url(${champ.icon})` }}></div>
                                                    {champ.name}
                                                </a>
                                            </li>
                                        );
                                    })
                                }
                                </ul>
                            ) : (
                                <ul>
                                    <li className="input-empty">
                                        <div className="bubble-champ big"></div>
                                        <div className="name-champ"></div>
                                    </li>
                                    <li className="input-empty">
                                        <div className="bubble-champ big"></div>
                                        <div className="name-champ"></div>
                                    </li>
                                    <li className="input-empty">
                                        <div className="bubble-champ big"></div>
                                        <div className="name-hamp"></div>
                                    </li>
                                </ul>
                            )
                        }
                    </div>
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

export default connect(mapStateToProps, null)(SearchBar);