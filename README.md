# react-snack

> Snacks, lots of them

[![NPM](https://img.shields.io/npm/v/react-snack.svg)](https://www.npmjs.com/package/react-snack) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

Snackbar like notifications for react. Completely customizable but with batteries included!

## Install

```bash
yarn add react-snack
```

## Usage

React-snack uses the [React.Context API](https://reactjs.org/docs/context.html) introduced in React 16.3.

First Wrap your app in a `SnackProvider`

```jsx
import { SnackProvider } from 'react-snack'

ReactDOM.render(<SnackProvider><App /></SnackProvider>, document.getElementById('root'))
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

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
