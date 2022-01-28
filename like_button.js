'use strict'

const e = React.createElement

class LikeButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { liked: false }
  }

  render() {
    if (this.state.liked ) {
      return e(
        'div',
        {onClick: () => this.setState({liked: !this.state.liked})},
        '组件序列号' + this.props.commentID
      )
    } else {
      return e(
        'button', 
        {onClick: () => this.setState({liked: !this.state.liked})},
        'Like'
      )
    }

  
  }
}

document.querySelectorAll('.like_button_container').forEach(domContainer => {
  console.log(domContainer, '.....commentID')
  console.log(domContainer.dataset, '.....commentID')
  
  const commentID = parseInt(domContainer.dataset.commentid, 10)
  console.log(commentID, '.....commentID')

  ReactDOM.render(
    e(
      LikeButton,
      { commentID },
    ),
    domContainer
  )
})