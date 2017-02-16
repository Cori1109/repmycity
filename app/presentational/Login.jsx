import React from 'react';
import DocumentMeta from 'react-document-meta';

class Login extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Login</h1>
          <form>
            <input type="text" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="submit" className="button" value="Login" />
          </form>
        </div>
      </section>
    )
  }
}

module.exports = Login;
