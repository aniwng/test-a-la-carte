import React from 'react';

class SubItem extends React.Component {
    render() {
        return (
            <div className='description-container'>
                <span className='description'>
                    {this.props.description}
                </span>
                <span className='subPage'>{this.props.subDescription}</span>
            </div>
        );
    }
}

export default SubItem;