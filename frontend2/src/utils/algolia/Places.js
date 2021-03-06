import React, { Component } from 'react';
import places from 'places.js';
import connect from './connector';

class Places extends Component {
  createRef = c => (this.element = c);

  componentDidMount() {
    const { refine, defaultRefinement } = this.props;

    const autocomplete = places({
      container: this.element,
      // Algolia Places options
    });

    autocomplete.on('change', event => {
      refine(event.suggestion.latlng);
    });

    autocomplete.on('clear', () => {
      refine(defaultRefinement);
    });
  }

  render() {
    return (
      <div className="col-7 mx-auto" style={{ marginBottom: 20, textAlign: 'center' }}>
        <input
          ref={this.createRef}
          type="search"
          id="address-input"
          placeholder="Address"
          style={{textAlign: 'center'}}
        />
      </div>
    );
  }
}

export default connect(Places);
