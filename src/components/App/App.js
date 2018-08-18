import React from 'react';
import './App.scss';
import Gallery from '../Gallery';
import {DebounceInput} from 'react-debounce-input';

class App extends React.Component {
  static propTypes = {
  };

  constructor() {
    super();
    this.state = {
      tag: 'art'
    };
  }

  render() {
    return (
      <div className="app-root">
        <div className="app-header">
          <h2>Flickr Gallery</h2>
          <DebounceInput className="app-input"  debounceTimeout={500} onChange={event => this.setState({tag: event.target.value})} value={this.state.tag}/>
        </div>
        <Gallery tag={this.state.tag}/>
      </div>
    );
  }
}

export default App;
