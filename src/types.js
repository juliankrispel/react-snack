// @flow

import { type Node } from 'react'

export type SnackProps = {
  type: 'ERROR' | 'SUCCESS' | 'INFO',
  className: string,
  disableIcon?: ?boolean,
  color: string,
  onClose: () => void,
  title: Node,
  icon?: React$ComponentType<{color: string, width?: ?number}>,
  message: Node
}

export type Notification = {
  type?: 'ERROR' | 'SUCCESS' | 'INFO',
  title: Node,
  message: Node,
  disableTimeout?: ?boolean,
  disableIcon?: ?boolean,
  snackComponent?: React$ComponentType<SnackProps>,
  icon?: React$ComponentType<{color: string, width?: ?number}>,
  timeout?: number
}
