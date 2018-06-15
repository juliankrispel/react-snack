import React, { Component } from 'react'

import { TYPES, SnackProvider, SnackConsumer, SnackList } from 'react-snack'

export default class App extends Component {
  state = {
    message: '',
    title: '',
    timeout: 1000,
    type: 'INFO'
  }

  render () {
    return (
      <SnackProvider>
        <SnackConsumer>
          {({ messages, addMessage }) => <div>
            <SnackList messages={messages} />

            <div>
              <select
                onChange={option => this.setState({type: option.target.value})}
                value={this.state.type}
              >
                {TYPES.map(type => <option key={type}>{type}</option>)}
              </select>
            </div>

            <div>
              Title
              <input value={this.state.title} type='text' onChange={event => this.setState({
                title: event.target.value
              })} />
            </div>

            <div>
              Timeout
              <input value={this.state.timeout} type='number' onChange={event => this.setState({
                timeout: Number(event.target.value)
              })} />
            </div>

            <div>
              Message
              <input value={this.state.message} type='text' onChange={event => this.setState({
                message: event.target.value
              })} />
            </div>

            <button onClick={() => {
              addMessage(this.state)

              this.setState({message: '', title: ''})
            }}>Add Message</button>
          </div>}
        </SnackConsumer>
      </SnackProvider>
    )
  }
}
