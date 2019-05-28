import React from 'react'
import { connect } from 'react-redux';

export async function fetchData() {
    const requestConfig = {
        method: "GET"
    }
    const url = "//localhost:9000/champions";
    const data = await fetch(url, requestConfig);
    return await data.json();
}

class Api extends React.Component{
    async componentWillMount() {
        let data = await fetchData()
        this.props.fetchingDATA(data)
    }
    render() {
        return (
            null
        )
    }
}

/**
 * Used to update the initstate values on redux
 */
const mapDispatchToProps = (dispatch) => {
    return { fetchingDATA: (data) => { dispatch({ type: 'fetchingDATA', value: data})},
    }
}

export default connect(null, mapDispatchToProps)(Api);