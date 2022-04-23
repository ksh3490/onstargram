import React, { Component } from 'react'
import { connect } from 'react-redux'
import { isValidPrivateKey } from '../utils/crypto'
import Input from './Input'
import Button from './Button'

import * as authActions from '../redux/actions/auth'

import './LoginForm.scss'
class LoginForm extends Component {
  state = {
    privateKey: '',
    warningMessage: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleLogin = () => {
    const { login } = this.props
    const { privateKey } = this.state
    isValidPrivateKey(privateKey)
      ? login(privateKey)
      : this.setState({ warningMessage: '* 유효하지 않은 개인키입니다.' })
  }

  render() {
    const { warningMessage } = this.state
    return (
      <div className='LoginForm'>
        <Input
          className="LoginForm__input"
          type="password"
          name="privateKey"
          label="개인키로 로그인"
          placeholder="0xas232d..."
          onChange={this.handleChange}
          err={warningMessage}
        />
        <Button

        />
      </div>
    )
  }
}