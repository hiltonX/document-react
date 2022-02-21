import React from 'react'

export default class ErrorBoundry extends React.Component {
  constructor(props){
    super(props)
    this.state={
      hasError: false
    }
  }

  componentDidCatch(error, info){
    this.setState({
      hasError: true
    })

    console.log(error, info)
  }

  render() {
    if(this.state.hasError) {
      return <div>something went wrong</div>
    }

    return this.props.children
  }
}