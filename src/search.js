import React from 'react'
import ReactDom from 'react-dom'
import web from './assets/web.png'
import './search.less'

class Search extends React.Component {
  render () {
    return <div className="search-text">
      Search Text2333
      <img src={web}/>
    </div>
  }
}

ReactDom.render(
  <Search />,
  document.getElementById('root')
)