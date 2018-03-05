import React from 'react';
import ReactBootstrap from 'react-bootstrap';

const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;

let Data;

class BranchSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {branch: ''};
    }
    componentDidMount() {
    this.branch =
        $.ajax({
            type: 'GET',
            url: '/git-branch'
        }).then(data => {
            Data = data;
            this.setState({
                branch: data
            });
        });
    }
    render() {
        var branch = this.state.branch.split('\n');
        var options = [];
        for(let i = 0 ; i < branch.length ; i++) {
            if(branch[i].indexOf('*') > -1) {
                options.push(<option key={i} value={branch[i]} selected>{branch[i]}</option>);

            } else {
                options.push(<option key={i} value={branch[i]}>{branch[i]}</option>);
            }
        }
        return (
            <div id='branch-selection'>
                <FormGroup controlId="formControlsSelect">
                    <FormControl componentClass="select" placeholder="select">
                        <option key='master' value='master'>master</option>
                        {options}
                    </FormControl>
                    <span className='fa fa-caret-down'/>
                </FormGroup>
            </div>
        );
    }
}

export default BranchSelection;