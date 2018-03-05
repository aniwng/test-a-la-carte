import React, { Component } from 'react';

import Container from './components/Container';
import Title from './components/Title';
import Blurb from './components/Blurb';
import TestItem from './components/TestItem/TestItem';

import '../main.css';

export default class App extends Component {
    render() {
        return (
            <div>
                <Container>
                    <Title title='Test on Demand' subTitle='a la Carte Method to Automation'/>
                    <hr className='divider'/>
                    <Blurb words='Select the pages you wish to run web driver tests on!'/>
                    <TestItem/>
                </Container>
            </div>
        );
    }
}