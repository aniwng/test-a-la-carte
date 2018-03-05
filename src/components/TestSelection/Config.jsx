import React from 'react';
import ReactBootstrap from 'react-bootstrap';

const Modal = ReactBootstrap.Modal;

class Config extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showModal: false};
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }
    close() {
        this.setState({ showModal: false });
    }
    open() {
        $.ajax({
            type: 'GET',
            url: '/config',
            statusCode: {
                200(data) {
                    $('#configXML').html('<textarea readonly>' + new XMLSerializer().serializeToString(data) + '</textarea>');
                }
            }
        });
        this.setState({ showModal: true });
    }
    render() {
        return (
            <span>
            <div id='showConfig' className='btn btn-default hide' onClick={this.open}>
                <span className='fa fa-file-code-o'></span>
            </div>
                <div>
                    <Modal show={this.state.showModal} onHide={this.close}>
                        <Modal.Header closeButton/>
                        <Modal.Body>
                            <div id='configXML'></div>
                        </Modal.Body>
                    </Modal>
                </div>
            </span>

        );
    }
}

export default Config;