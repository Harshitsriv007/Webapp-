import React, { Component } from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class QuizInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            question: '',
            answer: '',
        }
    }

    handleChangeInputQuestion = async event => {
        const question = event.target.value
        this.setState({ question })
    }

    handleChangeInputAnswer = async event => {
        const answer = event.target.value
        this.setState({ answer })
    }

    handleIncludeQuiz = async () => {
        const { question, answer} = this.state
        const payload = { question, answer}

        await api.insertQuiz(payload).then(res => {
            window.alert(`Quiz inserted successfully`)
            this.setState({
                question: '',
                answer: '',
            })
        })
    }

    render() {
        const { question, answer} = this.state
        return (
            <Wrapper>
                <Title>Create Quiz</Title>

                <Label>Question: </Label>
                <InputText
                    type="text"
                    value={question}
                    onChange={this.handleChangeInputQuestion}
                />

                <Label>Answer: </Label>
                <InputText
                    type="text"
                    value={answer}
                    onChange={this.handleChangeInputAnswer}
                />

                <Button onClick={this.handleIncludeQuiz}>Add MCQ</Button>
                <CancelButton href={'/quiz/list'}>Cancel</CancelButton>
            </Wrapper>
        )
    }
}

export default QuizInsert
