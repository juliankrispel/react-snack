// @flow

import React, { Component, PureComponent } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components'

import { TRANSITION, COLORS } from './constants'
import Snack from './Snack'
import { SnackConsumer } from './Context'
import type { Notification, SnackProps } from './types'

const className = 'snack-list-transition'

const Main = styled.div`
  position: fixed;
  right: 0;
  text-align: right;
  height: 100%;
  overflow: auto;
  z-index: 9999;
  top: 0;
`

type Props = {
  snackComponent?: Component<SnackProps>,
  colors?: ?{
    ERROR?: string,
    SUCCESS?: string,
    INFO?: string,
  },
}

export default class SnackList extends PureComponent<Props> {
  static defaultProps = {
    snackComponent: Snack,
    colors: COLORS
  }

  render() {
    const { snackComponent, colors } = this.props

    return (
      <Main>
        <SnackConsumer>
          {({ notifications, removeNotification }) => (
            <ReactCSSTransitionGroup
              transitionName={className}
              transitionEnterTimeout={TRANSITION}
              transitionLeaveTimeout={TRANSITION}
            >
              {notifications.reverse().map(
                ({ key, notification }: { key: string, notification: Notification }) => {
                  const props = {
                    className,
                    onClose: () => removeNotification(key),
                    color: colors && colors[notification.type != null ? notification.type : 'INFO'],
                    key,
                    ...notification
                  }

                  return notification.snackComponent != null
                    ? <notification.snackComponent {...props} />
                    : <snackComponent {...props} />
                }
              )}
            </ReactCSSTransitionGroup>
          )}
        </SnackConsumer>
      </Main>
    )
  }
}
