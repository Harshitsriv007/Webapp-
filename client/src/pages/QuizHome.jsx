import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'

import styled from 'styled-components'

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
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

class QuizHome extends Component {
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
                Header: 'Radio',
                accessor: '',
                Cell: function(props) {
                    return (
                        
                        <table>                                                             
                             <tbody>
                                       <tr>
                            
                             <td class="col-sm-4">
                         <input
                      type="radio"
                      name="react-tips"
                      value="option1"
                      checked={true}
                      className="form-check-input"
                    />
                    <span>Option 1</span>
                    </td>
                    <td class="col-sm-4">
                    <input
                      type="radio"
                      name="react-tips"
                      value="option2"
                      checked={true}
                      className="form-check-input"
                    />
                                        <span>Option 2</span>

                    </td>
                    <td class="col-sm-4">
                    <input
                      type="radio"
                      name="react-tips"
                      value="option3"
                      checked={true}
                      className="form-check-input"
                    />
                                        <span>Option 3</span>

                    </td>
                    <td class="col-sm-4">
                    <input
                      type="radio"
                      name="react-tips"
                      value="option4"
                      checked={true}
                      className="form-check-input"
                    />
                                        <span>Option 4</span>

                    </td>
                    </tr>
                    </tbody>
                    </table>
                  
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
                <Button onClick={this.props}>Submit</Button>
                <CancelButton href={'/quiz/list'}>Cancel</CancelButton>                          
                {showTable &&  (
                    <ReactTable
                        data={quiz}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={quiz.length}
                        showPageSizeOptions={true}
                        minRows={0}
                    />
                )
                }
            </Wrapper>
        )
    }
}
export default QuizHome
