import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

import { Button, List, Collapse } from 'antd';
const { Panel } = Collapse;


function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [questions, setQuestions] = useState();
  const [inputQuestion, setInputQuestion] = useState('');
  const [inputAnswer, setInputAnswer] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState();

  let apiUrl = process.env.REACT_APP_API_URL || `http://localhost:3000/`;

  const fetchCategories = async () => {
    console.log('this will fetch the categories')

    // let res = await fetch(`http://localhost:3000/api/v1/categories`);
    // https://c4pstone-api.herokuapp.com/
    // console.log(process.env.API_URL)
    // console.log(process.env.REACT_APP_API_URL)

    console.log(`${apiUrl}api/v1/categories`);
    let res = await fetch(`${apiUrl}api/v1/categories`);
    let data = await res.json();
    console.log(data);
    setCategories(data);
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    // this code is going to run whenever the selectedCategory changes
    // fetchQuestions() todo: fetch and show the questions
  }, [selectedCategory])

  const fetchQuestionsForCategory = async (id) => {
    console.log('fetch questions for this category id', id)
    let res = await fetch(`${apiUrl}api/v1/categories/${id}/questions`);
    let data = await res.json();
    console.log(data);
    setQuestions(data);
    // setCategories(data);
  }

  const createNewQuestion = async () => {
    console.log('create a question for the selected category', selectedCategory)
    // the ususal fetch request / HINT : look up the stock API request
    let res = await fetch(`${apiUrl}api/v1/categories/${selectedCategory}/questions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ questionTxt: inputQuestion })
    });
    // at this line the call was succesful
    fetchQuestionsForCategory(selectedCategory)
    setInputQuestion('')

    // 1. make a POST request to create a question
    // 2. once the call is successful
    // 3. fetch the questions for a category again (reload the questions)
    // 4. done
  }

  // const createNewAnswer = async () => {
  //   console.log('create a question for the selected category', selectedQuestion)
  //   // the ususal fetch request / HINT : look up the stock API request

  //   // let res = await fetch(`${apiUrl}api/v1/categories/${selectedCategory}/questions/:questionId/answers`, {
  //   //   method: 'POST',
  //   //   headers: {
  //   //     'Content-Type': 'application/json'
  //   //     // 'Content-Type': 'application/x-www-form-urlencoded',
  //   //   },
  //   //   body: JSON.stringify({ answerTxt: inputAnswer })
  //   // });
  //   // // at this line the call was succesful
  //   // fetchQuestionsForCategory(selectedCategory)
  //   // setInputAnswer('')

  //   // 1. make a POST request to create a question
  //   // 2. once the call is successful
  //   // 3. fetch the questions for a category again (reload the questions)
  //   // 4. done
  // }

  const testFunc = (id) => {
    console.log('print question id', selectedQuestion)
  }

  return (
    <>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-full border p-5'} >
          <h1 className={'text-center text-xl font-bold'}>C4pstone App</h1>
        </div>
      </div>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-full md:col-span-3 lg:col-span-2 border p-5'} >

          {/* <Button type="primary">Submit</Button> */}

          {/* <h1 className={'text-center text-xl font-bold'}>Currently Selected Category: {selectedCategory}</h1> */}
          {/* <ul>
            {categories.map((category, index) => {
              return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-red-400' : 'border p-5 cursor-pointer'} onClick={() => {
                setSelectedCategory(category.id)
                fetchQuestionsForCategory(category.id)
              }}>
                {category.name}
              </li>
            })}
          </ul> */}

          <List
            size="large"
            header={<div className={'font-bold'}>Categories</div>}
            // footer={<div>Footer</div>}
            bordered
            dataSource={categories}
            renderItem={item => <List.Item>
              <div className={item.id == selectedCategory ? 'cursor-pointer text-blue-500 font-bold' : 'cursor-pointer'} onClick={() => {
                setSelectedCategory(item.id)
                fetchQuestionsForCategory(item.id)
              }}>
                {item.name}
              </div>

            </List.Item>}
          />

        </div>
        <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'} >
          {selectedCategory && <h1 className={'text-center text-xl font-bold'}>Category {selectedCategory}</h1>}

          {/* <button className={'border p-2 pl-4 pr-4 bg-blue-500 mb-5 text-white rounded'} onClick={createNewQuestion}>New Question</button> */}

          {selectedCategory && <div className={'mb-5'}>
            <input value={inputQuestion} onChange={(ev) => {
              setInputQuestion(ev.currentTarget.value);
            }} type="text" className={'border p-1 mr-5 w-1/4'} />
            <Button type={'primary'} onClick={createNewQuestion}>New Question</Button>
          </div>}

          {/* <ul>
            {questions && questions.map((question) => {
              return <li key={question.id}> */}
          {/* {question.questionTxt} - {question.Answers.length} */}
          {/* {question.questionTxt} {question.Answers.length > 0 && <span>- <span>{question.Answers.length}</span></span>}
              </li>
            })}
          </ul> */}

          {/* onClick={() => { setSelectedQuestion(question.id) }} */}

          {/* onClick={() => {
            setSelectedQuestion(question.id)
            console.log(selectedQuestion)
          }} */}



          {selectedCategory && <Collapse accordion>
            {questions && questions.map((question, index) => {
              return <Panel header={question.questionTxt} key={index}>
                <p>Answers go here for this particular question</p>

                <List
                  size="small"
                  // header={<div className={'font-bold'}>Answers</div>}
                  footer={<div>

                    <div>
                      <input value={inputAnswer} onChange={(ev) => {
                        setInputAnswer(ev.currentTarget.value);
                      }} type="text" className={'border p-1 mr-5 w-1/4'} />
                      <Button type={'primary'}>Add Answer</Button>
                    </div>

                  </div>}
                  bordered
                  dataSource={question.Answers}
                  renderItem={answer => <List.Item>
                    <div>
                      {answer.answerTxt}
                    </div>

                  </List.Item>}
                />


              </Panel>
            })}
            {/* <Panel header="This is panel header 1" key="1">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
              <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
              <p>{text}</p>
            </Panel> */}
          </Collapse>}

          {!selectedCategory && <h1 className={'text-3xl text-center uppercase tracking-wider text-blue-500'}>Choose a Category to get Started</h1>}

          {/* {questions && <p>{JSON.stringify(questions)}</p>} */}
        </div>
      </div >

    </>
  );
}

export default App;
