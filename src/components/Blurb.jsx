import React from 'react';

class Blurb extends React.Component {
    render() {
        return (
            <div className='blurb-container'>
                <span className='blurb'>{this.props.words}</span>
            </div>
        );
    }
}

export default Blurb;