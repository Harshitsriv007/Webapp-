import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

    
class QuizList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            quiz: [],
            columns: [],
            isLoading: false,

        }
    }
    
    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllQuizs().then(quiz => {
            this.setState({
                quiz: quiz.data.data,
                isLoading: false,
            })
        })
    }
    

    render() {
        const { quiz, isLoading } = this.state

        const columns = [
            {
                Header: 'Question',
                accessor: 'question',
                filterable: true,
            },
           {
            Header: 'Answer',
            accessor: 'answer',
            filterable: true,
            },
        ]

        let showTable = true
        if (!quiz.length) {
            showTable = false
        }

        return (
            <Wrapper>
                {showTable && (
                    <ReactTable
                        data={quiz}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={quiz.length}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default QuizList
