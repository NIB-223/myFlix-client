import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';



// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

// Main component (will eventually use all the others)
class MyFlixApplication extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null
    }
  }  

  render() {
    return <div>Hello World</div>;
  }

  componentDidMount(){
    axios.get('https://myflixdb20.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  componentDidUpdate(){
    // code executed right after component's state or props are changed.
  }

  componentWillUnmount(){
    // code executed just before the moment the component gets removed from the DOM.
  }


  render() {
    return (
      <MainView />
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);