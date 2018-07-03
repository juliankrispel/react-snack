// @flow

import React, { Component, createContext } from 'react'
import type { Node } from 'react'
import uuid from 'uuid/v1'

import { DURATION } from './constants'
import SnackList from './SnackList'
import type { Message } from './types'

type ContextType = {
  messages: Array<{
    key: string,
    message: Message
  }>,
  addMessage: Message => void
}

const contextType: ContextType = {
  messages: [],
  addMessage: () => {}
}

const Context = createContext(contextType)

export const SnackConsumer = Context.Consumer

type Props = {|
  children: Node,
  timeout?: number,
  initialMessages?: Array<Message>,
  colors?: ?{
    ERROR?: string,
    SUCCESS?: string,
    INFO?: string,
  },
|}

type State = {
  messages: Map<string, Message>
}

export class SnackProvider extends Component<Props, State> {
  _timeouts: Array<number>
  _timeouts = []

  componentDidMount() {
    if (this.props.initialMessages != null) {
      this.props.initialMessages.forEach(this.addMessage)
    }
  }

  static defaultProps = {
    timeout: DURATION
  }

  state = {
    messages: new Map()
  }

  componentWillUnmount() {
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  removeMessage = (id: string) => {
    const { messages: _messages } = this.state
    _messages.delete(id)

    this.setState({
      messages: _messages
    })
  }

  addMessage = (message: Message): string => {
    const { messages } = this.state
    const id = uuid()

    if (message.disableTimeout !== true) {
      this._timeouts.push(
        setTimeout(() => {
          const _messages = messages
          _messages.delete(id)

          // release timeout
          this._timeouts.shift()

          this.setState({
            messages: _messages
          })
        }, message.timeout != null ? message.timeout : this.props.timeout)
      )
    }

    this.setState({
      messages: messages.set(id, { type: 'INFO', ...message })
    })

    return id
  }

  buildValue = () => {
    const { messages } = this.state
    return {
      messages: Array.from(messages.keys()).reduce((acc, key) => {
        const message = messages.get(key)

        return message != null
          ? [
              ...acc,
              {
                key,
                message
              }
            ]
          : acc
      }, []),
      addMessage: this.addMessage,
      removeMessage: this.removeMessage
    }
  }

  render() {
    const { colors, children } = this.props
    return (
      <Context.Provider value={this.buildValue()}>
        {children}
        <SnackList colors={colors}/>
      </Context.Provider>
    )
  }
}
