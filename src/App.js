import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Dashboard from "./dashboard";

import React, { useEffect, useState } from "react";

import { Button, Collapse, Row, Col, notification, Tabs, Radio, Space } from 'antd';
const { TabPane } = Tabs;

let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000/';

function Auth() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const [login, setLogin] = useState('');


  useEffect(() => {
    // this code will run only once on component mount
    if (login) {

      setLogin(true)
    } else {

      setLogin(false)
    }
  }, [])

  const onSignIn = async (event) => {
    event.preventDefault();
    console.log(email)
    console.log(password)
    let res = await fetch(`${apiUrl}login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password })
    })
    let data = await res.json();
    console.log(data);
    if (data.token) {
      localStorage.setItem('token', data.token);
      window.location.href = '/dashboard'
    }
  };

  const onSignUp = async (event) => {
    event.preventDefault();
    console.log(email)
    console.log(password)
    console.log(retypePassword)
    let res = await fetch(`${apiUrl}signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ email, password })
    })
    let data = await res.json();
    console.log(data);
    if (data.success) {
      // Show a success message use ANT design success message?
      notification['success']({
        message: 'Thanks!',
        description:
          'You are all set. You can now login using your credentials.',
      });
    }
  };

  return (

    <div className={'container mx-auto h-full flex justify-center items-center'}>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Login" key="1">

          <form onSubmit={onSignIn}>

            <h1 className={'text-4xl text-center font-bold'}>Login to C4pstone</h1>

            <Row type={'flex'} align={'center'} className={'mt-5 p-10 border-1 border-green-400 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg'}>
              <Col span={24}>
                <h2 className={'text-xl font-bold'}>Username or Email</h2>
                <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-full rounded p-2'} placeholder={'Your Username'} />
              </Col>
              <Col span={24} className={'mt-5'}>
                <h2 className={'text-xl font-bold'}>Password</h2>
                <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-full rounded p-2'} placeholder={'Your Password'} />
              </Col>
              <Col span={24} className={'mt-5'}>
                <button htmlType={'submit'} className={'border-0 text-white bg-green-400 text-xl hover:text-gray-900 hover:bg-green-500 w-full rounded font-bold p-2'}>Submit</button>
              </Col>
            </Row>
          </form>
        </TabPane>

        <TabPane tab="Don't have an Account? Click Here!" key="2">



          <form onSubmit={onSignUp}>

            <h1 className={'text-4xl text-center font-bold'}>Sign Up - It's quick and easy.</h1>

            <Row type={'flex'} align={'center'} className={'mt-5 p-10 border-1 border-green-400 p-8 border-t-8 bg-white mb-6 rounded-lg shadow-lg'}>
              <Col span={24}>
                <h2 className={'text-xl font-bold'}>Username or Email</h2>
                <input type="email" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} required className={'border w-full rounded p-2'} placeholder={'Your Username'} />
              </Col>
              <Col span={24} className={'mt-5'}>
                <h2 className={'text-xl font-bold'}>Password</h2>
                <input type="password" value={password} onChange={(ev) => setPassword(ev.currentTarget.value)} required className={'border w-full rounded p-2'} placeholder={'Your Password'} />
              </Col>
              <Col span={24} className={'mt-5'}>
                <input type="password" value={retypePassword} onChange={(ev) => setRetypePassword(ev.currentTarget.value)} required className={'border w-full rounded p-2'} placeholder={'Retype Your Password'} />
                {(password != retypePassword) && <small className={'text-red-500 font-bold'}>Passwords don't match</small>}
              </Col>
              <Col span={24} className={'mt-5'}>
                <button htmlType={'submit'} disabled={password != retypePassword} className={'border-0 text-white bg-green-400 text-xl hover:text-gray-900 hover:bg-green-500 w-full rounded font-bold p-2'}>Submit</button>
                {/*<Button loading={loading} disabled={password != retypePassword} type="primary" htmlType={'submit'} className={'border-0 w-full rounded font-bold'}>Submit</Button>*/}
              </Col>
            </Row>
          </form>
        </TabPane>
      </Tabs>

    </div>

  )
}

function App() {
  return (
    <Router>
      <div>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Auth />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
