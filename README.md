# react-snack

### **tl;dr** react-snack provides an out of the box (completely configurable) in-app notification system for web-apps. All you need to get started are adding two components to your App.

![DemDemo](demo.gif)

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

```jsx
import { SnackProvider } from 'react-snack'

ReactDOM.render(<SnackProvider
  renderSnack={renderCustomSnackBar}
><App /></SnackProvider>, document.getElementById('root'))
```

Then simply use the SnackConsumer to add notifications to the snack bar anywhere in your app:

```jsx
import { SnackConsumer } from 'react-snack'

...
render() {
  return <SnackConsumer>
    {({ addNotification }) => (
      <button onClick={() => addNotification({
        title: 'A notification',
        notification: 'With a bunch of text',
        type: 'SUCCESS'
      })}>Add Notification</button>
    )}
  </SnackConsumer>
}
```

## API

### SnackProvider Component

#### Usage

```jsx
// Mount the SnackProvider at the root of the application
// Only use once
ReactDOM.render(<SnackProvider {...Props}><App /></SnackProvider>, document.getElementById('root'))
```

#### Props

| Property | Type | required? | Description |
| - | - | - | - |
| `timeout` | `number` | optional | The default timeout for all notifications (defaults to 6000) |
| `initialNotifications` | `Array<`[Notification](#notification)`>` | optional | List of initial notifications to display |
| `snackComponent` | `React.Component` | optional | Custom snack component to use instead of default. Read more about how to [customize your Snack Component here](#custom-snackbar)  |
| `colors` | { ERROR: `string`, SUCCESS: `string`, INFO: `string` } | optional | Object with color values for each notififcation type |
| `enableSnacklist` | `boolean` | optional | Whether to display SnackList. If you'd like to manage rendering the Snack components yourself,   |

### SnackConsumer Component

```jsx
<SnackConsumer>
  {({
    notifications,
    addNotification,
    removeNotification
  }) => (
  )}
</SnackConsumer>
```

#### Props


| Property | Type | required? | Description |
| - | - | - | - |
| `notifications` | `Array<`[Notification](#notification)`>` | optional | The default timeout for all notifications (defaults to 6000) |
| `initialNotifications` | `Array<`[Notification](#notification)`>` | optional | List of initial notifications to display (on startup) |
| `colors` | { ERROR: `string`, SUCCESS: `string`, INFO: `string` } | optional | Object with color values for each notififcation type |
| `enableSnacklist` | `boolean` | optional | Whether to display SnackList. If you'd like to manage rendering the Snack components yourself,   |


### Notification
A notification is the primary data type that's used throughout this system. It carries all the information that we need to display and configure the style, content and animation of a Notification :)

| Property | Type | required? | Description |
| - | - | - | - |
| `title` | `string\|React.Node` | required | The Title of the notification. Can be a string or a react Element. |
| `notification` | `string\|React.Node` | required | The body of a notification. Can be string or react Element. |
| `type` | `"ERROR"\|"SUCCESS"\|"INFO"` | optional | Will show different icon depending on notification type - (defaults to `"INFO"`) |
| `disableTimeout` | `boolean` | optional | When enabled, notification only disappears when closed |
| `disableIcon` | `boolean` | optional | Disables icon (showing what type of notification it is) |
| `component` | `React.Component` | optional | Custom Component for rendering the Notification |
| `icon` | `React.Component` | optional | Custom Component for rendering the Icon |
| `timeout` | `number` | optional | Timeout in miliseconds (defaults to whatever is set in [SnackProvider](#snackprovider)) |

## Advanced Usage & Styling

### Custom Snack Bar

You can completely customize the appearance and functionality of the Snack Bar by creating your own custom Snack Component.

You can override the default Snack component for every notification by using the SnackProvder prop `snackComponent` or for individual notifications by 

The Snackbar Component inherits all [Notification](#notification) props as well as `className` and `onClose`. By default `className` is purely used for animation. `onClose` is the callback for dismissing a notification.

As a starting point please use the default [Snackbar component](src/Snack.js), it's pretty simple :)

## License

MIT © [juliankrispel](https://github.com/juliankrispel)
