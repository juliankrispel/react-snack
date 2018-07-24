// @flow

import React, { Component, createContext } from 'react'
import type { Node } from 'react'
import uuid from 'uuid/v1'

import { DURATION } from './constants'
import SnackList from './SnackList'
import type { Notification, SnackProps } from './types'

type NotificationId = string

type ContextType = {
  notifications: Array<{
    key: string,
    notification: Notification
  }>,
  addNotification: Notification => void,
  removeNotification: NotificationId => void
}

const contextType: ContextType = {
  notifications: [],
  addNotification: () => {},
  removeNotification: () => {}
}

const Context = createContext(contextType)

export const SnackConsumer = Context.Consumer

/**
 * SnackProvider Props
 */
type SnackProviderProps = {|
  children: Node,
  timeout?: number,
  enableSnackList?: boolean,
  snackComponent?: Component<SnackProps>,
  initialNotifications?: Array<Notification>,
  colors?: ?{
    ERROR?: string,
    SUCCESS?: string,
    INFO?: string,
  },
|}

type State = {
  notifications: Map<string, Notification>
}

/**
 * SnackProvider class
 */
export class SnackProvider extends Component<SnackProviderProps, State> {
  _timeouts: Array<number>
  _timeouts = []

  componentDidMount() {
    if (this.props.initialNotifications != null) {
      this.props.initialNotifications.forEach(this.addNotification)
    }
  }

  static defaultProps = {
    timeout: DURATION,
    enableSnackList: true
  }

  state = {
    notifications: new Map()
  }

  componentWillUnmount() {
    this._timeouts.forEach(timeout => clearTimeout(timeout))
  }

  removeNotification = (id: string) => {
    const { notifications: _notifications } = this.state
    _notifications.delete(id)

    this.setState({
      notifications: _notifications
    })
  }

  addNotification = (notification: Notification): string => {
    const { notifications } = this.state
    const id = uuid()

    if (notification.disableTimeout !== true) {
      this._timeouts.push(
        setTimeout(() => {
          const _notifications = notifications
          _notifications.delete(id)

          // release timeout
          this._timeouts.shift()

          this.setState({
            notifications: _notifications
          })
        }, notification.timeout != null ? notification.timeout : this.props.timeout)
      )
    }

    this.setState({
      notifications: notifications.set(id, { type: 'INFO', ...notification })
    })

    return id
  }

  buildValue = () => {
    const { notifications } = this.state
    return {
      notifications: Array.from(notifications.keys()).reduce((acc, key) => {
        const notification = notifications.get(key)

        return notification != null
          ? [
              ...acc,
              {
                key,
                notification
              }
            ]
          : acc
      }, []),
      addNotification: this.addNotification,
      removeNotification: this.removeNotification
    }
  }

  render() {
    const { colors, snackComponent, enableSnackList, children } = this.props
    return (
      <Context.Provider value={this.buildValue()}>
        {children}
        {enableSnackList === true && <SnackList snackComponent={snackComponent} colors={colors}/>}
      </Context.Provider>
    )
  }
}
