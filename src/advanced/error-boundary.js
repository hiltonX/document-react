import React from 'react'


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    // 更新state使下一次渲染能够显示降级后的ui
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    console.log('错误')
    // 将错误日志上报给服务器
    // logErrorToMyService(error, index)
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <div>子组件错误</div>
    }
    return (this.props.children)
  }

}

export default ErrorBoundary