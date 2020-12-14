import React from 'react'
import ReactDom from 'react-dom'
import web from './assets/web.png'
import { a } from './tree-shaking'
import './search.less'

class Search extends React.Component {
  constructor() {
    super(...arguments)

    this.state = {
      Text: null
    }
  }

  loadComponent () {
    import('./text').then((Text) => {
      this.setState({
        Text: Text.default
      })
    })
  }

  render () {
    const funcA = a()
    const {Text} = this.state
    return <div className="search-text">
      {
        Text ? <Text /> : null
      }
      Search Text2333{ funcA }
      <img src={web} onClick={this.loadComponent.bind(this)}/>
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)