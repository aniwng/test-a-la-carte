import React from 'react';

import Config from './Config';
import BranchSelection from './BranchSelection';

class TestSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {className: 'test-selection-container hide'};
    }
    shouldComponentUpdate() {
        return true;
    }
    determineBtnString() {
        const count = this.props.count;
        const testString = count > 1 ? `${count} Tests` : `${count} Test`;

        const runTime = this.props.runTime;
        const timeString = runTime > 1 ? `Approx ${runTime} Mins` : `Approx ${runTime} Min`;

        return `${testString} | ${timeString}`;
    }
    getClassName() {
        const count = this.props.count;

        if(count > 0) {
            return 'test-selection-container';
        } else {
            return 'test-selection-container hide';
        }
    }
    render() {
        return (
            <div className={this.getClassName()}>
                <BranchSelection/>
                <button id='runTest' type='submit' className='btn btn-default'>
                    <span id='runTestState' className='fa fa-paper-plane'/>
                    {this.determineBtnString()}
                </button>
                <Config/>
            </div>
        );
    }
}

export default TestSelection;