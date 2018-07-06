import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { TYPES, SnackProvider, SnackConsumer } from 'react-snack'
import CustomSnack from './CustomSnack'

const Main = styled.div`
  color: #666;
  height: 100%;
  position: relative;
  width: 100%;
  pre {
    white-space: pre-wrap;
    background: white;
    color: #7b7b7b;
    padding: .5em;
    margin: 0;
    width: 100%;
    margin-top: 1em;
    border-radius: 5px;
  }
`

const providerExample = `import { SnackProvider } from 'react-snack'

ReactDOM.render(<SnackProvider><App /></SnackProvider>, document.getElementById('root'))`


const consumerExample = `<SnackConsumer>
  {({ addMessage }) => (
    <button onClick={() => addMessage({
      title: 'You clicked the button',
      message: 'Lol'
    })}>Click me to add a notification</button>
  )}
</SnackConsumer>`

const RadioButton = styled.label`
  display: flex;
  cursor: pointer;
  flex-direction: row;
  padding-top: .3em;
  align-items: center;

  * {
    display: inline;
  }

  span {
    font-size: .9em;
    text-transform: capitalize;
  }

  input[type="radio"] {
    margin: 0;
    margin-right: 10px;
    width: auto;
  }
`

const Small = styled.small`
  font-size; .9em;
  padding-bottom: 2em;
  display: block;
`

const Label = styled.label`
  font-size: .85em;
  color: #999;
  flex-shrink: 0;
  padding-top: .8em;
  line-height: 1.5em;
`

const Field = styled.div`
  margin-bottom: .5em;
  max-width: 300px;

  input, select, textarea{
    outline: none;
    border: 1px solid #ccc;
    font-size: .9em;
    padding: .5em;
    width: 100%;
    background: #f0f0f0;
    border-radius: 3px;
  }
`

const Title = styled.h1`
  font-size: 2em;
`

const Fields = styled.div`
  border: 1px solid #fff;
  color: #333;
  border-radius: 10px;
  margin-bottom: 1em;
`

const Content = styled.div`
  font-size: 1em;
  padding: 2em;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  button {
    background: #4dab62;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    outline: none;
    font-weight: bold
    box-shadow: 0 2px 0px #115f22;
    padding: .5em 1em;
    color: #fff;
    display: inline-block;
    width: auto;
    transition: 300ms;
    font-size: 1.3em;
    transform: scale(1);

    &:hover {
      transform: scale(1.1);
    }
  }
`

const Highlight = styled.button`
  margin: 0;
  outline: none;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background: #ae5fe4;
  padding: 0.5em;
`

class AddMessages extends Component {
  componentDidMount() {
    const { addMessage } = this.props


    setTimeout(() => {
      addMessage({
        title: 'This is react-snack',
        type: 'INFO',
        message: 'A notification system, sweet as applie pie 🥧'
      })
    }, 2000)

    setTimeout(() => {
      addMessage({
        title: 'You only need 3 lines to integrate it',
        type: 'SUCCESS',
        message: (<div>
          <span>First, wrap your App in a SnackProvider.</span>
          <pre>{providerExample}</pre>
        </div>)
      })
    }, 4000)

    setTimeout(() => {
      addMessage({
        title: 'To complete the setup...',
        disableIcon: true,
        message: (<div>
          <span>Use SnackConsumer to trigger notifications</span>
          <pre>{consumerExample}</pre>
        </div>)
      })
    }, 6000)
  }

  render () {
    return null
  }
}

const initialMessages = [{
  title: 'Info message',
  message: 'This is a message of type "info". It\'s more of a general kinda message 😀',
  disableTimeout: true,
  type: 'INFO'
}, {
  title: 'Error Message',
  message: 'This is an "error" message - say your server is down or an error happened.',
  disableTimeout: true,
  type: 'ERROR'
}, {
  title: 'Success Message',
  message: 'This is a "success" message. Use when something goes right for once ;)',
  disableTimeout: true,
  type: 'SUCCESS'
}, {
  title: 'Disabling Icons',
  message: 'You can disable the icon on the left if you like',
  disableIcon: true,
  disableTimeout: true,
  type: 'SUCCESS'
}, {
  title: <div>The title can be <Highlight onClick={() => alert('Button Clicked')}>a React Element</Highlight></div>,
  message: <div>Or simply text... Same goes for the message, try it out, <Highlight onClick={() => alert('Button Clicked')}>click me</Highlight></div>,
  disableTimeout: true,
  type: 'ERROR'
}, {
  title: "You can also completely replace the snackbar...",
  message: "With your own component. It's pretty simple!",
  disableIcon: true,
  type: 'SUCCESS',
  component: CustomSnack,
  disableTimeout: true,
}].reverse()

export default class App extends Component {
  state = {
    message: 'A message for the snack bar. Can be both text or a component',
    title: 'A title! Can be text or a component',
    timeout: 6000,
    type: 'INFO'
  }

  render () {
    return (
      <Main>
        <SnackProvider>
          <SnackConsumer>
            {({ addMessage }) => <Fragment>
              <AddMessages addMessage={addMessage} />
              <Content>
                <Title>react-snack</Title>

                <Fields>
                  <Small>Here are some of the parameters you can configure</Small>
                  <Field>
                    <Label>Snack type</Label>
                    {TYPES.map(type => (
                      <RadioButton key={type}>
                        <input
                          checked={this.state.type === type}
                          value={type}
                          onChange={() => this.setState({type})}
                          type="radio"
                        />
                        <span>{type.toLowerCase()}</span>
                      </RadioButton>
                    ))}
                  </Field>

                  <Field>
                    <Label htmlFor="title">Title</Label>
                    <input id="title" value={this.state.title} type='text' onChange={event => this.setState({
                      title: event.target.value
                    })} />
                  </Field>

                  <Field>
                    <Label htmlFor="message">Message</Label>
                    <textarea id="message"value={this.state.message} type='text' onChange={event => this.setState({
                      message: event.target.value
                    })} />
                  </Field>

                  <Field>
                    <Label htmlFor="timeout">Timeout</Label>
                    <input id="timeout" value={this.state.timeout} type='number' onChange={event => this.setState({
                      timeout: Number(event.target.value)
                    })} />
                  </Field>

                </Fields>

                <button onClick={() => addMessage(this.state)}>Snack 🍔</button>
              </Content>
            </Fragment>}
          </SnackConsumer>
        </SnackProvider>
      </Main>
    )
  }
}
