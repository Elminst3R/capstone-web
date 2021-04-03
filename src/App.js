import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";

function App() {

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [questions, setQuestions] = useState();

  const fetchCategories = async () => {
    console.log('this will fetch the categories')
    let res = await fetch(`http://localhost:3000/api/v1/categories`);
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
    let res = await fetch(`http://localhost:3000/api/v1/categories/${id}/questions`);
    let data = await res.json();
    console.log(data);
    setQuestions(data);
    // setCategories(data);
  }

  const createNewQuestion = async () => {
    console.log('create a question for the selected category', selectedCategory)
    // the ususal fetch request / HINT : look up the stock API request

    // 1. make a POST request to create a question
    // 2. once the call is successful
    // 3. fetch the questions for a category again (reload the questions)
    // 4. done
  }

  return (
    <>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-full border p-5'} >
          <h1 className={'text-center text-xl font-bold'}>App Title</h1>
        </div>
      </div>

      <div className={'grid grid-cols-12'}>
        <div className={'col-span-full md:col-span-3 lg:col-span-2 border p-5'} >
          <h1 className={'text-center text-xl font-bold'}>Currently Selected Category: {selectedCategory}</h1>
          <ul>
            {categories.map((category, index) => {
              return <li key={index} className={category.id == selectedCategory ? 'border p-5 cursor-pointer bg-red-400' : 'border p-5 cursor-pointer'} onClick={() => {
                setSelectedCategory(category.id)
                fetchQuestionsForCategory(category.id)
              }}>
                {category.name}
              </li>
            })}
          </ul>
        </div>
        <div className={'col-span-full md:col-span-9 lg:col-span-10 border p-5'} >
          <h1 className={'text-center text-xl font-bold'}>BLANK SPACE</h1>

          <button className={'border p-2 pl-4 pr-4 bg-gray-200'} onClick={createNewQuestion}>New Question</button>

          <ul>
            {questions && questions.map((question) => {
              return <li key={question.id}>
                {/* {question.questionTxt} - {question.Answers.length} */}
                {question.questionTxt} {question.Answers.length > 0 && <span>- <span>{question.Answers.length}</span></span>}
              </li>
            })}
          </ul>

          {/* {questions && <p>{JSON.stringify(questions)}</p>} */}
        </div>
      </div>

    </>
  );
}

export default App;
