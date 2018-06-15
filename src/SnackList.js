// @flow

import React, { PureComponent } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import styled from 'styled-components'

import { TRANSITION } from './constants'
import Snack from './Snack'
import { SnackConsumer } from './Context'
import type { Message } from './types'

const className = 'snack-list-transition'

const Main = styled.div`
  position: fixed;
  right: 0;
  width: 350px;
  top: 0;
`

export default class SnackList extends PureComponent<{}> {
  render() {
    return <Main>
      <SnackConsumer>
        {({ messages }) => <ReactCSSTransitionGroup
          transitionName={className}
          transitionEnterTimeout={TRANSITION}
          transitionLeaveTimeout={TRANSITION}
        >
          {messages.map(({ key, message }: {key: string, message: Message}) => <Snack
            className={className}
            key={key}
            {...message}
          />)}
        </ReactCSSTransitionGroup>}
      </SnackConsumer>
    </Main>
  }
}
