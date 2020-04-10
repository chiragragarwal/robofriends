import React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
// import { robots } from './robots';
import './App.css';

class App extends React.Component {

    constructor(){
        // console.log('constructor');
        super();
        this.state = {
            robots: [],
            searchfield: ''
        }
    }

    onSearchChange = (event) => {
        this.setState({ searchfield: event.target.value })
        // Note: ^^ the above change does not take place immediately at this point.
        // It probably does it after the function is executed. 
        // console.log(this.state.searchfield);
        
    }

    componentDidMount(){
        // console.log('componentDidMount');
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({robots: users}))
    }

    render(){
        // console.log('render');

        // Destructuring the robots list and searchfield to keep it clean
        const {robots, searchfield} = this.state;

        // Filter the robots based on the searchfield
        const filteredRobots = robots.filter(item => {
            return item.name.toLowerCase().includes(searchfield.toLowerCase())
        })
        // console.log(filteredRobots);

        if (robots.length === 0) {
            return <h1 className="tc">Loading...</h1>
        }
        else {
            return(
                <div className="tc">
                    <h1>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
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

export default App;