// @flow

import React, { PureComponent } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components'

import { TRANSITION, COLORS } from './constants'
import Snack from './Snack'
import { SnackConsumer } from './Context'
import type { Message } from './types'

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
  colors?: ?{
    ERROR?: string,
    SUCCESS?: string,
    INFO?: string,
  },
}

export default class SnackList extends PureComponent<Props> {
  static defaultProps = {
    colors: COLORS
  }

  render() {
    return (
      <Main>
        <SnackConsumer>
          {({ messages, removeMessage }) => (
            <ReactCSSTransitionGroup
              transitionName={className}
              transitionEnterTimeout={TRANSITION}
              transitionLeaveTimeout={TRANSITION}
            >
              {messages.reverse().map(
                ({ key, message }: { key: string, message: Message }) => {
                  const props = {
                    className,
                    onClose: () => removeMessage(key),
                    color: this.props.colors[message.type],
                    key,
                    ...message
                  }

                  return message.component != null
                    ? <message.component {...props} />
                    : <Snack {...props} />
                }
              )}
            </ReactCSSTransitionGroup>
          )}
        </SnackConsumer>
      </Main>
    )
  }
}
