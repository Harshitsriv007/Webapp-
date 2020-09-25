import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import {QuizHome, QuizMCQ, QuizInsert } from '../pages'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/quiz/home" exact component={QuizHome} />
                <Route path="/quiz/list" exact component={QuizMCQ} />
                <Route path="/quiz/create" exact component={QuizInsert} />
                
            </Switch>
        </Router>
    )
}

export default App