import React, { Component } from 'react'

import { SnackProvider, SnackConsumer, SnackList } from 'react-snack'

export default class App extends Component {
  state = {
    message: ''
  }

  render () {
    return (
      <SnackProvider>
        <SnackConsumer>
          {({ messages, addMessage }) => <div>
            <SnackList messages={messages} />
            <div>
              <input type='text' onChange={event => this.setState({
                message: event.target.value
              })} />
              <button onClick={() => {
                addMessage({
                  type: 'SUCCESS',
                  title: 'Hey there',
                  message: this.state.message
                })

                this.setState({message: ''})
              }}>Add Message</button>
            </div>
          </div>}
        </SnackConsumer>
      </SnackProvider>
    )
  }
}
