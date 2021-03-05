import React from 'react'
import { render } from 'react-dom'

// Para poder utilizar async - await
import regeneratorRuntime from 'regenerator-runtime'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

import MainApp from './componentes/MainApp'

import '../static/css/global.css'

render(<MainApp />, document.getElementById('app'))
