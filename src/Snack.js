// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { TRANSITION } from './constants'

const Wrapper = styled.div`
  box-sizing: border-box;
  transition: ${TRANSITION}ms;
  height: auto;
  max-height: 200px;

  &.${props => props.className}-enter {
    max-height: 0px;
    transform: scale(0);
  }

  &.${props => props.className}-leave {
    max-height: 0px;
    transform: scale(0);
  }
`

const Main = styled.div`
  border: 1px solid #ccc;
  transform: scale(1);
  margin: 10px;
  box-shadow: 0px 3px 5px rgba(0,0,0,.1);
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  max-width: 300px;
`

const Title = styled.h4`
  font-size: 14px;
  margin: 0;
  font-weight: bold;
`

const Message = styled.p`
  font-size: 12px;
  margin: 0;
  line-height: 1.5em;
`

type Props = {
  type: "ERROR" | "SUCCESS" | "PENDING",
  className: string,
  title: string,
  message: string,
}

export default class Snack extends PureComponent<Props> {
  render() {
    const { title, type, message, className } = this.props

    return <Wrapper className={className}>
      <Main type={type}>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </Main>
    </Wrapper>
  }
}
