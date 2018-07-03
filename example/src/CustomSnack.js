// @flow

import React, { type Node, PureComponent } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  box-sizing: border-box;
  transition: 400ms;
  text-align: left;
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
  display: flex;
  transform: scale(1);
  margin: 20px;
  border-radius: 3px;
  border-left: 30px solid ${props => props.color};
  background: #f0f0f0;
  padding: 15px;
  max-width: 400px;
  padding-right: 60px;
`

const Title = styled.h4`
  font-size: 18px;
  color: #777;
  line-height: 1.4em;
  margin: 0;
  font-weight: bold;
`

const Message = styled.p`
  font-size: 12px;
  color: #777;
  text-align: left;
  margin: 0;
  padding-top: 5px;
  line-height: 1.5em;
`

const Cross = styled.button`
  position: absolute;
  border: none;
  outline: none;
  transition: 400ms;
  background: none;
  right: 10px;
  font-size: 20px;
  font-weight: bold;
  top: 8px;
  cursor: pointer;
  color: #999;
  opacity: .2;
  &:hover {
    opacity: 1;
  }
`

Cross.defaultProps = {
  children: <span>&times;</span>
}

type Props = {
  type: 'ERROR' | 'SUCCESS' | 'INFO',
  className: string,
  disableIcon: boolean,
  color: string,
  onClose: () => void,
  title: Node,
  icon?: ?({color: string, width: number}) => Node,
  message: Node
}

export default class Snack extends PureComponent<Props> {
  render() {
    const { color, title, type, message, className, onClose } = this.props

    return (
      <Wrapper className={className}>
        <Main type={type} color={color}>
          <div>
            <Title type={type}>{title}</Title>
            <Message>{message}</Message>
          </div>
          <Cross onClick={onClose}/>
        </Main>
      </Wrapper>
    )
  }
}
