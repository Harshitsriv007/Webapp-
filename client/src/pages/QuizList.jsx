import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

class UpdateQuiz extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/quiz/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteQuiz extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Do tou want to delete the Quiz ${this.props.id} permanently?`,
            )
        ) {
            api.deleteQuizById(this.props.id)
            window.location.reload()
            // QuizList()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

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
            // {
            //     Header: 'ID',
            //     accessor: '_id',
            //     filterable: true,
            // },
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
            {
                Header: 'Delete',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <DeleteQuiz id={props.original._id} />
                        </span>
                    )
                },
            },
            {
                Header: 'Update',
                accessor: '',
                Cell: function(props) {
                    return (
                        <span>
                            <UpdateQuiz id={props.original._id} />
                        </span>
                    )
                },
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
                        defaultPageSize={10}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )}
            </Wrapper>
        )
    }
}

export default QuizList
