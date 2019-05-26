import React, {Component} from 'react'
import data from '../../../data.json'

import './searchBar.scss';

class SearchBar extends Component {
    state = {
        active: false,
        q: "",
        list: this.getChampname(data),
        display: this.getChampname(data)
    }

    isActive = () => {
        this.setState({ active: true });
    }

    isNotActive = () => {
        this.setState({ active: false });
    }

    /** TESTED 🚫
     * Functions purpose: Get the champion name of each champions
     * @param {Object[]} data(json)
     * @return {Object[]} the name of all champions
    */
    getChampname(data) {
        let champions = data.map((champ) => {
            return {
                name: champ.name
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
                    <div onClick={this.isNotActive} className="icon icon-cross"></div>
                    <div className="modal-content">
                        <span className="searchbar">
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
                                                    <a href={`./${champ.name}`}> {/* Changer le path */}
                                                        <div className="btn-champ" style={{ backgroundImage: `url(${data[0].img})` }}></div>
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
                                        <div className="imgChamp"></div>
                                        <div className="nameChamp"></div>
                                    </li>
                                    <li className="input-empty">
                                        <div className="imgChamp"></div>
                                        <div className="nameChamp"></div>
                                    </li>
                                    <li className="input-empty">
                                        <div className="imgChamp"></div>
                                        <div className="nameChamp"></div>
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

export default SearchBar