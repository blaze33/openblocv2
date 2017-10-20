import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './containers/app'

import './styles/App.scss'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
