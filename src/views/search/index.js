import React from 'react'
import ReactDom from 'react-dom'
import web from './assets/web.png'
import { a } from './tree-shaking'
import './search.less'

class Search extends React.Component {
  render () {
    const funcA = a()
    return <div className="search-text">
      Search Text2333{ funcA }
      <img src={web}/>
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)