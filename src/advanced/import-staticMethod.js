import React from 'react'

function Demo(props) {
  return <div {...props}/>
}

function importStaticMethod(WrappendComponent) {
  return class ImportStaticMethod extends React.Component {
    render() {
      return (<WrappendComponent {...this.props}/>)
    }
  }
}

const ImportStaticMethod = importStaticMethod(Demo)

const one = function() {
  console.log('one')
}
ImportStaticMethod.staticMethod = one


export {one}

export default ImportStaticMethod
