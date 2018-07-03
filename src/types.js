// @flow
import React, { type Component } from 'react'

/**
 * Message
 */
export type Message = {
  type?: 'ERROR' | 'SUCCESS' | 'INFO',
  title: React.Node,
  message: React.Node,
  disableTimeout?: ?boolean,
  disableIcon?: ?boolean,
  component?: Component,
  icon?: Component,
  timeout?: number
}
