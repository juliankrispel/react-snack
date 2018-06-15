// @flow

import React, { Component, createContext } from 'react'
import type { Node } from 'react'
import uuid from 'uuid/v1'

import { DURATION } from './constants'
import type { Message } from './types'

type ContextType = {
  messages: Array<{
    key: string,
    message: Message
  }>,
  addMessage: Message => void,
}

const contextType: ContextType = {
  messages: [],
  addMessage: () => {}
}

const Context = createContext(contextType)

export const SnackConsumer = Context.Consumer

type Props = {
  children: Node,
  timeout: number
}

type State = {
  messages: Map<string, Message>
}

const initialMessages: Map<string, Message> = new Map()

export class SnackProvider extends Component<Props, State> {
  _timeouts: Array<number>
  _timeouts = []

  static defaultProps = {
    timeout: DURATION
  }

  state = {
    messages: initialMessages
  }

  componentWillUnmount() {
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  addMessage = (message: Message) => {
    const { messages } = this.state
    const id = uuid()

    this._timeouts.push(setTimeout(() => {
      const _messages = messages
      _messages.delete(id)

      // release timeout
      this._timeouts.shift()

      this.setState({
        messages: _messages
      })
    }, this.props.timeout))

    this.setState({
      messages: messages.set(id, message)
    })
  }

  buildValue = () => {
    const { messages } = this.state
    return {
      messages: Array.from(messages.keys())
        .reduce((acc, key) => {
          const message = messages.get(key)

          return message != null ? [...acc, {
            key,
            message
          }] : acc
        }, []),
      addMessage: this.addMessage
    }
  }

  render() {
    return <Context.Provider value={this.buildValue()}>
      {this.props.children}
    </Context.Provider>
  }
}
