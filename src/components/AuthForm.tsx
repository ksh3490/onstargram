import React, { Component } from "react";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

import './AuthForm.scss'

class AuthForm extends Component {
  state = {
    loginForm: true,
  }

  toggleForm = () => this.setState({
    loginForm: !this.state.loginForm,
  })

  render() {
    const { loginForm } = this.state
    return (
      <div className="AuthForm">
        <h2 className="AuthForm__h2">
          Klaytn 기반 <br />
          업로드 이미지 NFT 등록 애플리케이션
        </h2>
        <h1 className="AuthForm__h1">
          <img src="" alt="Onstagram" />
        </h1>
        {loginForm ? <LoginForm /> : <SignupForm />}
        <p className="AuthForm__message">
          {loginForm ? '계정이 없으신가요?' : '계정을 가지고 계신가요?'}
          <span className="AuthForm__link" onClick={this.toggleForm}>
            {loginForm ? '회원 가입하기' : '로그인하기'}
          </span>
        </p>
      </div>
    )
  }
}

export default AuthForm