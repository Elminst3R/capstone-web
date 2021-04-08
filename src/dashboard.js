import './App.css';

import React, { useEffect, useState } from "react";

import { Button, List, Collapse } from 'antd';

const { Panel } = Collapse;

function Dashboard() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [questions, setQuestions] = useState();
  const [questionTxt, setQuestionTxt] = useState('');
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [selectedToken, setSelectedToken] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [answerTxt, setAnswerTxt] = useState();
  const [answers, setAnswers] = useState();

  let apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3000';


  const fetchCategories = async () => {
    console.log('this will fetch the categories');
    // let res = await fetch('http://localhost:3000/api/v1/categories');
    //   https://cohort11a-capstone-api.herokuapp.com
    //   console.log(process.env.API_URL)
    //   console.log(process.env.REACT_APP_API_URL)
    console.log(`${apiUrl}/api/v1/categories`)
    let res = await fetch(`${apiUrl}/api/v1/categories?token=${localStorage.getItem('token')}`);
    let data = await res.json();
    console.log(data);
    setCategories(data);
  };

  const fetchUserId = async () => {
    let userRes = await fetch(`${apiUrl}/api/v1/users/me?token=${localStorage.getItem('token')}`);
    let u = await userRes.json()
    console.log('the current user is', u);
    setUserId(u.userId);
  };

  const isLoggedIn = () => {
    if (localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));

      fetchUserId()

      return true;
    } else {
      return false;
    }

  };

  useEffect(() => {
    // this code will run only once on component mount
    if (isLoggedIn()) {
      fetchCategories()
      setSelectedToken(true)
    } else {
      window.location.href = '/'
      setSelectedToken(false)
    }
  }, [])

  useEffect(() => {
    // this code is going to run whenever the selectedCategory changes
    // fetchQuestions() TheTodo: fetch and show the questions
  }, [selectedCategory])

  // useEffect(() => {
  //   // this code will run every time the someStateVariable changes
  //   // this code will run every time var2 OR someStateVariable changes
  //   // write code here that reloads the page as a side effect of var2 OR someStateVariable changing
  // }, [someStateVariable, var2])

  const fetchAnswerForQuestion = async (id) => {
    // console.log('fetch this answer id', id);
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${id}/answers?token=${token}&userId=${userId}`);
    let data = await res.json();
    // console.log(data);
    data = data.reverse()
    setAnswers(data);
  }

  const fetchQuestionsForCategory = async (id) => {
    // console.log('fetch questions for this category id', id);
    // console.log('userId', userId)
    let res = await fetch(`${apiUrl}/api/v1/categories/${id}/questions?token=${token}&userId=${userId}`);
    let data = await res.json();
    // console.log(data);
    data = data.reverse()
    setQuestions(data);
    // setCategories(data);
  };

  const createNewQuestion = async () => {
    // console.log('create a question for the category id', selectedCategory)
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ questionTxt: questionTxt, userId: userId })
    });
    fetchQuestionsForCategory(selectedCategory);
    setQuestionTxt('')
  };

  const createANewAnswer = async () => {
    console.log('create a new answer for this question id', selectedQuestion)
    let res = await fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${selectedQuestion}/answers?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ answerTxt: answerTxt, userId: userId })
    });
    fetchAnswerForQuestion(selectedQuestion)
    setAnswerTxt('')
  };

  const deleteQuestion = async (id) => {
    fetch(`${apiUrl}/api/v1/categories/${selectedCategory}/questions/${id}?token=${token}`, { method: 'DELETE' })
    console.log('the selected category.id is', selectedCategory)
    console.log('the selected question.id is', id)
    window.location.reload();
  }

  const logout = async () => {
    localStorage.removeItem('token');
    window.location.href = '/';

  };

  return (
    <>
      {selectedToken && <div className="grid grid-cols-12">
        <div className={'col-span-full p-5'}>
          <h1 >
            <div className={'bg-green-500 rounded font-bold text-2xl p-4 text-white text-center'}>C4pstone App
            <Button type="primary" className={'float-right'} onClick={logout}>Logout</Button></div>
          </h1>
        </div>

      </div>}

      {selectedToken && <div className="grid grid-cols-12">
        <div className={'col-span-full md:col-span-3 lg:col-span-2 p-5 rounded'}>

          {/*<Button type={'primary'}>Submit</Button>*/}
          {/*<h1 className={'text-center text-3xl'}>Currently selected category is: {selectedCategory}</h1>*/}
          {/*  <ul>*/}
          {/*      {categories.map((category, index) => {*/}
          {/*          return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-gray-200' : 'border p-5 cursor-pointer'} onClick={() => {*/}
          {/*              setSelectedCategory(category.id);*/}
          {/*              fetchQuestionsForCategory(category.id)*/}
          {/*          }}>*/}
          {/*              {category.name}*/}
          {/*          </li>*/}
          {/*      })}*/}
          {/*  </ul>*/}

          <List
            size="large"
            header={<div className={'font-bold text-xl bg-green-500 rounded p-2 text-white'}>Categories</div>}
            // footer={<div>Footer</div>}
            // bordered
            dataSource={categories}
            renderItem={category => <List.Item>
              <div className={category.id == selectedCategory ? 'bg-green-500 rounded cursor-pointer font-bold text-xl p-2 w-full text-white' : 'cursor-pointer text-lg text-black'} onClick={() => {
                setSelectedCategory(category.id);
                fetchQuestionsForCategory(category.id)
              }}>
                {category.name}
              </div>

            </List.Item>}
          />

        </div>

        <div className={'col-span-full md:col-span-9 lg:col-span-10 p-5'}>

          {selectedCategory && <div>
            <input value={questionTxt} onChange={(ev) => {
              setQuestionTxt(ev.currentTarget.value);
            }} type="text" className={'border p-1 mr-5 w-2/3'} />
            <Button type={'primary'} style={{ background: "#10B981", borderColor: "#34D399" }} onClick={createNewQuestion}>New Question</Button>
            <br />
            <br />
          </div>}

          {/*<ul>*/}
          {/*    {questions && questions.map((question) => {*/}
          {/*        return <li key={question.id}>*/}
          {/*            /!*{question.questionTxt} - {question.Answers.length}*!/*/}
          {/*            {question.questionTxt} {question.Answers.length >0 && <span>- <span>{question.Answers.length}</span></span>}*/}
          {/*        </li>*/}
          {/*    })}*/}
          {/*</ul>*/}

          {/* onChange={() => {
            setSelectedQuestion(question.id)
          }} */}

          {/* defaultActiveKey={['0']} */}

          {selectedCategory && questions && <Collapse onChange={(key) => {
            if (key == undefined) {
              // if the panel is collapsed, do not assign a new .id to setSelectedQuestion / otherwise error
            } else {
              // console.log(key);
              setSelectedQuestion(questions[key].id)
              fetchAnswerForQuestion(questions[key].id)
            }
          }} accordion className={'site-collapse-custom-collapse'}>

            {/* style={{ border: "none", borderRadius: "0px", backgroundColor: "#F9FAFB", boxShadow: "none", background: "#F9FAFB" }} */}

            {questions && questions.map((question, index) => {
              return <Panel header={<div className={'text-xl'}>{question.questionTxt}<Button onClick={() => {
                setSelectedQuestion(question.id)
                deleteQuestion(question.id)
              }} className={'float-right'} type={'danger'}>Delete</Button></div>} key={index} className={'site-collapse-custom-panel'}>
                {/* {console.log(question.questionTxt)} */}

                <List className={'site-collapse-custom-panel'}
                  size="small"
                  header={<div className={'font-bold text-xl ml-4'}>Answers</div>}
                  footer={<div>
                    <input value={answerTxt} onChange={(ev) => {
                      setAnswerTxt(ev.currentTarget.value);
                    }} type="text" className={'border p-1 mr-5 w-1/2 ml-4'} />
                    <Button type={'primary'} style={{ background: "#10B981", borderColor: "#34D399" }} onClick={createANewAnswer}>Add Answer</Button>
                  </div>}
                  // bordered
                  dataSource={answers}
                  renderItem={answer => <List.Item>
                    <div className={'text-xl'}>
                      {answer.answerTxt}
                    </div>
                  </List.Item>}
                />

              </Panel>
            })}
          </Collapse>}

          {!selectedCategory && <h1 className={'text-center text-xl uppercase tracking-wider text-blue-500'}>Select a Category to Get Started</h1>}

          {/*{questions && <p>{JSON.stringify(questions)}</p>}*/}
        </div>

      </div >}

    </>
  );
}

// createNewQuestion - done
// the usual fetch request / HINT : look up the stock API request
// 1. Make a POST request to create a question
// 2. Once the call is successful
// 3. Fetch the questions for a category again (reload the questions)
// 4. done!

// createANewAnswer - done
// you will need something called selectedQuestion to keep a track of the question that has been selected
// a state variable to store the answer text that the user types in

// the usual fetch request / HINT : look up the stock API request
// 1. Make a POST request to create an answer
// 2. Once the call is successful
// 3. Fetch the questions for a category again (reload the questions)
// 4. done!

// - Try to delete the question
// Try to delete an answer

// /categories/:categoryId/questions/:questionId/answers

// 1. Hide the Ui unless the user is logged in - done

export default Dashboard;
