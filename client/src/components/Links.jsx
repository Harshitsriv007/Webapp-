import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

class Links extends Component {
    render() {
        return (
            <React.Fragment>
                <Link to="/quiz/home" className="navbar-brand">
                    MCQ Series
                </Link>
                <Collapse>
                    <List>
                    <Item>
                            <Link to="/quiz/list" className="nav-link">
                                MCQ Quiz
                            </Link>
                        </Item>
                        {/* <Item>
                            <Link to="/quiz/list" className="nav-link">
                                List Quizs
                            </Link>
                        </Item> */}
                        <Item>
                            <Link to="/quiz/create" className="nav-link">
                                Create Quiz
                            </Link>
                        </Item>
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links