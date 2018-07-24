// @flow

import { Component, type Node } from 'react'

export type SnackProps = {
  type: 'ERROR' | 'SUCCESS' | 'INFO',
  className: string,
  disableIcon: boolean,
  color: string,
  onClose: () => void,
  title: Node,
  icon?: ?({color: string, width: number}) => Node,
  notification: Node
}

export type Notification = {
  type?: 'ERROR' | 'SUCCESS' | 'INFO',
  title: Node,
  message: Node,
  disableTimeout?: ?boolean,
  disableIcon?: ?boolean,
  snackComponent?: Component<SnackProps>,
  icon?: Component<{}>,
  timeout?: number
}
