import React, {Component, Fragment} from 'react'
import data from '../../../data.json'

class SearchBar extends Component {
    state = {
        q: "",
        list: this.getChampname(data),
        display: this.getChampname(data)
    }
    getChampname(data) {
        let champions = data.map((champ) => {
            return {
                name: champ.name
            }
        });
        return champions  
    }
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
            <Fragment>
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
                <ul>
                {
                    this.state.display.map(champ => {
                    return (
                    <li key={champ.name}>
                        <a href={`./${champ.name}`}> {/* Changer le path */}
                        {champ.name}
                        </a>
                    </li>
                    ); 
                })}
                </ul>
            </Fragment>
        )
    }
}

export default SearchBar