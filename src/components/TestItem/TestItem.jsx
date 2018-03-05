import React from 'react';

import Item from './Item';
import SubItem from './SubItem';

import TestSelection from '../TestSelection/TestSelection';

import Data from 'json-loader!../../../data.json';

class TestItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {pages: [], runTime: 0};
        this.addToSelection = this.addToSelection.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    addToSelection(e) {
        const target = e.target;
        const id = target.type === 'checkbox' && target.checked ? target.id : false;
        const runTime = parseInt(target.value);
        if(id) {
            const newArray = this.state.pages.slice();
            newArray.push(id);
            this.setState({
                pages: newArray,
                runTime: this.state.runTime + runTime
            });
        } else {
            const newArray = this.state.pages.slice();
            const index = this.state.pages.indexOf(`${target.id}`);
            newArray.splice(index, 1);
            this.setState({
                pages: newArray,
                runTime: this.state.runTime - runTime
            });
        }
        $('#showConfig').addClass('hide');
    }
    handleSubmit(e) {
        e.preventDefault();

        $('#runTestState').toggleClass('fa-paper-plane', false);
        $('#runTestState').toggleClass('fa-spinner fa-spin fa-fw', true);

        var data = JSON.stringify(this.state.pages);
        $.ajax({
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            url: '/receive',
            data: data,
            statusCode: {
                200() {
                    $('#runTestState').toggleClass('fa-paper-plane', true);
                    $('#runTestState').toggleClass('fa-spinner fa-spin fa-fw', false);
                    $('#showConfig').removeClass('hide');
                }
            }
        });
    }
    render() {
        /*
        const data = fetch('/api/data', {
            method: 'GET'
        }).then(function(response) {
            return response.json();
        });
        */
        const data = Data.items;
        return (
            <form onSubmit={this.handleSubmit}>
                <div className='test-container'>
                    {data.map((test) =>
                        <div className='test-item-container col-md-6'>
                            <Item
                                key={test}
                                pageId={test.pageId}
                                runTime={test.runTime}
                                icon={test.icon}
                                rating={test.rating}
                                addToSelection={this.addToSelection}
                            >
                                <SubItem
                                    description={test.description}
                                    subDescription={test.subDescription}
                                />
                            </Item>
                        </div>
                    )}
                    <TestSelection
                        count={this.state.pages.length}
                        runTime={this.state.runTime}
                    />
                </div>
            </form>
        );
    }
}

export default TestItem;