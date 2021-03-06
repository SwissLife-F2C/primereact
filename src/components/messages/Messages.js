import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { UIMessage } from './UIMessage';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var messageIdx = 0;

export class Messages extends Component {

    static defaultProps = {
        id: null,
        className: null,
        style: null
    }

    static propTypes = {
        id: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object
    };

    constructor(props) {
        super(props);
        this.state = {
            messages: null
        }

        this.onClose = this.onClose.bind(this);
    }

    show(value) {
        if (value) {
            let newMessages;

            if (Array.isArray(value)) {
                for (let i = 0; i < value.length; i++) {
                    value[i].id = messageIdx++;
                    newMessages = [...this.state.messages, ...value];
                }
            }
            else {
                value.id = messageIdx++;
                newMessages = this.state.messages ? [...this.state.messages, value] : [value];
            }

            this.setState({
                messages: newMessages
            });
        }
    }

    clear() {
        this.setState({
            messages: null
        })
    }

    onClose(message) {
        let newMessages = this.state.messages.filter(msg => msg.id !== message.id);
        this.setState({
            messages: newMessages
        });

        if (this.props.onRemove) {
            this.props.onRemove(message);
        }
    }

    renderMessages() {
        if (this.state.messages && this.state.messages.length) {
            return this.state.messages.map((message, index) => {
                return <UIMessage key={message.id} message={message} onClick={this.props.onClick} onClose={this.onClose} />;
            });
        }
        else {
            return null;
        }
    }

    render() {
        let messages = this.renderMessages();

        return (
            <div id={this.props.id} className={this.props.className} style={this.props.style}>
                <ReactCSSTransitionGroup
                    transitionName="ui-messages"
                    transitionEnterTimeout={250}
                    transitionLeaveTimeout={500}>
                    {messages}
                </ReactCSSTransitionGroup>
            </div>
        );  
    }
}