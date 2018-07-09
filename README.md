# react-snack

### **tl;dr** react-snack provides an out of the box (completely configurable) in-app notification system for web-apps. All you need to get started are adding two components to your App.

![lol](demo.gif)


react-snack is an easy to use In-App Notification system for react. The design of the feature inspired by the Material UI hence the name - but it doesn't implement the Material Design spec. react-snack abstracts a lot of the boilerplate that usually goes into writing such systems. State management is implemented with react's [Context API](https://reactjs.org/docs/context.html).

> This module is still in alpha but satisfies a web-app feature I've implemented too many times across different projects I worked on. Please if you have ideas for features, opinions or want to get involved, [talk to me 😍](/issues/new).


[![NPM](https://img.shields.io/npm/v/react-snack.svg)](https://www.npmjs.com/package/react-snack) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Snackbar like notifications for react. Completely customizable but with batteries included!

## Install

```bash
yarn add react-snack
```

## Usage

First Wrap your app in a `SnackProvider`

``

```jsx
import { SnackProvider } from 'react-snack'

ReactDOM.render(<SnackProvider
  renderSnack={renderCustomSnackBar}
><App /></SnackProvider>, document.getElementById('root'))
```

Then simply use the SnackConsumer to add messages to the snack bar anywhere in your app:

```jsx
import { SnackConsumer } from 'react-snack'

...
render() {
  return <SnackConsumer>
    {({ addMessage }) => (
      <button onClick={() => addMessage({
        title: 'A message',
        message: 'With a bunch of text',
        type: 'SUCCESS'
      })}>Add Notification</button>
    )}
  </SnackConsumer>
}
```

## Advanced Usage & Styling

Typically you only need the SnackProvider

## API

### SnackProvider

#### Notification
A notification is the primary data type that's used throughout this system. It carries all the information that we need to display and configure the style, content and animation of a Notification :)


#### Props

| | | |
|-|-|-|
| `timeout` | `number` | optional |
| `initialMessages` | `Array<`[Notification](#notification)`>` | optional |


## License

MIT © [juliankrispel](https://github.com/juliankrispel)
