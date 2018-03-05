import React from 'react';
import ReactBootstrap from 'react-bootstrap';

const Tooltip = ReactBootstrap.Tooltip;
const OverlayTrigger = ReactBootstrap.OverlayTrigger;

class Item extends React.Component {
    determineTimeString() {
        const runTime = this.props.runTime;
        const string = runTime > 1 ? `${runTime} Mins` : `${runTime} Min`;
        return string;
    }
    getTooltipString() {
        if(this.props.icon === 'ducky') {
            return (
                <p>
                <strong>Highly</strong> recommended!
                </p>
            );
        } else if(this.props.icon === 'chili') {
            return (
                <p>
                Spicy!
                </p>
            );
        }
    }
    render() {
        const recommendedTooltip = (
            <Tooltip id="tooltip">{this.getTooltipString()}</Tooltip>
        );
        return (
            <div className='item-container'>
                <div className='fancy-checkbox'>
                    <input type="checkbox" value={this.props.runTime} id={this.props.pageId} onChange={this.props.addToSelection} />
	  	            <label htmlFor={this.props.pageId}>
                        <span className='itemTitle'>
                            {this.props.pageId}
                            {Array.apply(null, Array(this.props.rating)).map((item, i) =>
                                <OverlayTrigger placement="right" overlay={recommendedTooltip}>
                                    <span key={i} className={this.props.icon}/>
                                </OverlayTrigger>
                            )}
                        </span>
                    </label>
                </div>
                <span className='runTime'>
                    <span className='fa fa-clock-o'/> {this.determineTimeString()}
                </span>
                {this.props.children}
            </div>
        );
    }
}

export default Item;