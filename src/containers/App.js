import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from './robots';
import './App.css';

import { connect } from 'react-redux';
import { setSearchField, requestRobotsAction } from '../actions';

class App extends React.Component {

    // --- The constructor is no longer needed as we're now getting the initial state using Redux ---
    // constructor(){
    //     // console.log('constructor');
    //     super();
    //     this.state = {
    //         robots: []
    //         // searchfield: ''
    //     }
    // }

    // onSearchChange = (event) => {
    //     this.setState({ searchfield: event.target.value })
    //     // Note: ^^ the above change does not take place immediately at this point.
    //     // It probably does it after the function is executed. 
    //     // console.log(this.state.searchfield);
        
    // }

    componentDidMount(){
        // console.log(this.props.store);

        // ---- The code below was replaced by the action requestRobotsAction which is available as 
        // the prop this.props.onRequestRobots ----
        // fetch('https://jsonplaceholder.typicode.com/users')
        // .then(response => response.json())
        // .then(users => this.setState({robots: users}))
        this.props.onRequestRobots()
    }

    render(){
        // console.log('render');

        // Destructuring the robots list and searchfield to keep it clean
        // const {robots} = this.state;
        const { robots, searchField, isPending } = this.props;

        // Filter the robots based on the searchfield
        const filteredRobots = robots.filter(item => {
            return item.name.toLowerCase().includes(searchField.toLowerCase())
        })
        // console.log(filteredRobots);

        if (isPending) {
            return <h1 className="tc">Loading...</h1>
        }
        else {
            return(
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.props.onSearchChange}/>
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

const mapStateToProps = (state) => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDisapatchToProps = (dispatch) => {
    return {
        // prop: (param) => dispatch(action(param))
        onSearchChange: (event) => dispatch(setSearchField(event.target.value)),

        // Use the async action like a regular action. redux-thunk will take care of it
        onRequestRobots: () => dispatch(requestRobotsAction())
    }
}

export default connect(mapStateToProps, mapDisapatchToProps)(App);