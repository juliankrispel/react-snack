// @flow
import type { Node, Component } from 'react'

export type Message = {
  type?: 'ERROR' | 'SUCCESS' | 'INFO',
  title: Node,
  message: Node,
  disableTimeout?: ?boolean,
  disableIcon?: ?boolean,
  component?: Component,
  icon?: Component,
  timeout?: number
}
