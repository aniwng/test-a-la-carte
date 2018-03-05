import React from 'react';

class Title extends React.Component {
    render() {
        return (
            <div className='header'>
                <span className='menuTitle'>{this.props.title}</span>
                <span className='subTitle'>{this.props.subTitle}</span>
            </div>
        );
    }
}

export default Title;