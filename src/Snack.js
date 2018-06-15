// @flow

import React, { PureComponent } from 'react'
import styled from 'styled-components'

import { TRANSITION, COLORS } from './constants'

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
  position: relative;
  border: 1px solid ${props => COLORS[props.type]};
  border-left-width: 10px;
  transform: scale(1);
  margin: 10px;
  box-shadow: 0px 2px 7px rgba(0,0,0,.05);
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  max-width: 300px;
`

const Title = styled.h4`
  font-size: 12px;
  letter-spacing: 0.05em;
  color: ${props => COLORS[props.type]};
  margin: 0;
  font-weight: bold;
`

const Message = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0;
  padding-top: 5px;
  line-height: 1.5em;
`

const Cross = styled.button`
  position: absolute;
  border: none;
  background: none;
  right: 10px;
  font-size: 14px;
  font-weight: bold;
  top: 8px;
  cursor: pointer;
  color: #999;
  &:hover {
    color: #666;
  }
`
type Props = {
  type: "ERROR" | "SUCCESS" | "INFO",
  className: string,
  onClose: () => void,
  title: string,
  message: string
}

export default class Snack extends PureComponent<Props> {
  render() {
    const { title, type, message, className, onClose } = this.props

    return <Wrapper className={className}>
      <Main type={type}>
        <Title type={type}>{title}</Title>
        <Message>{message}</Message>
        <Cross onClick={onClose}>&#10005;</Cross>
      </Main>
    </Wrapper>
  }
}
