// @flow

import React, { type Node, PureComponent } from 'react'
import styled from 'styled-components'
import SuccessIcon from './icons/Success'
import InfoIcon from './icons/Info'
import ErrorIcon from './icons/Error'
import { TRANSITION } from './constants'

const Wrapper = styled.div`
  box-sizing: border-box;
  transition: ${TRANSITION}ms;
  text-align: left;
  padding: 20px 20px 0px 20px;
  height: auto;
  max-height: 200px;

  &.${props => props.className}-enter {
    max-height: 0px;
    padding: 0;
    transform: scale(0);
  }

  &.${props => props.className}-leave {
    padding: 0;
    max-height: 0px;
    transform: scale(0);
  }
`

const Main = styled.div`
  position: relative;
  display: flex;
  transform: scale(1);
  border-radius: 3px;
  border: 1px solid #eee;
  background: #f7f7f7;
  padding: 15px;
  max-width: 400px;
  padding-right: 60px;
`

const IconContainer = styled.div`
  border-right: 1px solid #e0e0e0;
  padding-right: .8em;
  margin-right: .8em;
  padding-top: .2em;
`

const Title = styled.h4`
  font-size: 14px;
  line-height: 1.3em;
  color: #505050;
  margin: 0;
  font-weight: bold;
`

const Message = styled.div`
  font-size: 12px;
  color: #505050;
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
  opacity: .3;
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

const icons = {
  ERROR: ErrorIcon,
  SUCCESS: SuccessIcon,
  INFO: InfoIcon
}

export default class Snack extends PureComponent<Props> {
  render() {
    const { disableIcon, icon, color, title, type, message, className, onClose } = this.props

    const Icon = icon != null ? icon : icons[type]

    return (
      <Wrapper className={className}>
        <Main type={type}>
          {disableIcon !== true && <IconContainer>
            <Icon color={color}/>
          </IconContainer>}
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
