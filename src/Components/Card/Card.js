import React, { useState } from 'react'
import "./Card.css"
import SurveyJson from "../../Constant/survey.json"


const Card = () => {
  const [selected, setSelected] = useState(1);
  const [currentValue, setCurrentvalue] = useState();
  const [storedVals, setStoreVals] = useState([]);
  const [finalValue, setFinalValue] = useState({});
  const checkBoxAnswers = [];

  const getNextQuestion = (answerIndex, nextQuestion, Question) => {
  
    checkBoxAnswers.length === 0 ? setStoreVals([...storedVals, currentValue]) : setStoreVals([...storedVals, checkBoxAnswers])

    setFinalValue({
      ...finalValue,
      [Question]: checkBoxAnswers.length === 0 ? currentValue : checkBoxAnswers
    })

    if (typeof nextQuestion === 'number')
      return setSelected(nextQuestion);

    answerIndex.map((x) => {
      return x.value === currentValue && setSelected(nextQuestion[answerIndex.indexOf(x)])
    })
  }

  const OnPreviousHandler = (info) => {
    setSelected(info.Prev);
  }

  const onInputHandler = (e, types) => {

    if (types === "checkbox") {

      checkBoxAnswers.push(e.currentTarget.value)


    } else {
      setCurrentvalue(e.currentTarget.value)
    }
  }


  const renderInputs = (types, values) => {

    switch (types) {
      case 'text':
        return <input type={types} onChange={(e) => onInputHandler(e, types)} required />
      case 'radio':
        return values.Choice.map((val, index) => {
          return <div key={index}>
            <input type={types} name="radio" value={val.value} id={val.id} onChange={(e) => onInputHandler(e, types)} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })

      case 'checkbox':
        return values.Choice.map((val, index) => {
          return <div key={index}>
            <input type={types} name={val.name} id={val.id} value={val.value} onChange={(e) => { onInputHandler(e, types) }} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })
    }

  }


  return (
    <div className='card'>
      <div className='input'>
        {
          SurveyJson.Questions.map((Qns, index) => {
            if (Qns.QuestionId === selected) {
              return <div key={index}>
                <h5>{Qns.QuestionId}.{Qns.Question}</h5>
                {renderInputs(Qns.Type, Qns)}
                <div>
                  <button className={Qns.Prev === null ? "hidden" : "none"} onClick={() => OnPreviousHandler(Qns)}>Previous</button>
                  <button onClick={() => getNextQuestion(Qns.Choice, Qns.Next , Qns.Question)}>{Qns.Next === null ? "Submit" : "Next"}</button>
                </div>
              </div>

            }

          })
        }
      </div>


    </div>
  )
}

export default Card
