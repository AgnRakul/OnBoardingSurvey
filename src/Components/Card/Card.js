import React, { useState } from 'react'
import "./Card.css"
import SurveyJson from "../../Constant/survey.json"

const Card = () => {
  const [selected, setSelected] = useState(0);
  const [answer,setAnswer] = useState(SurveyJson);
  console.log("🚀 ~ file: Card.js ~ line 8 ~ Card ~ answer", answer)
 
  const OnNextHandler = () => {
    setSelected(prev => {
      if (prev === SurveyJson.Questions.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });
  }

 
  const OnPreviousHandler = () => {
    setSelected(prev => {
      if (prev === SurveyJson.Questions.length - 1) {
        return 0;
      } else {
        return prev - 1;
      }
    });
  }

  const renderInputs = (types, values) => {

    switch (types) {
      case 'text':
        return <input type={types} onChange={(e) => values.answer = e.currentTarget.value} required />
      case 'radio':
        return values.Choice.map((val) => {
          return <div>
            <input type={types} name="radio" value={val.value} id={val.id} required={values.IsRequired} onChange={(e) => values.answer = e.currentTarget.value} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })

      case 'checkbox':
        return values.Choice.map((val) => {
          return <div>
            <input type={types} name={val.name} id={val.id} value={val.value} required={values.IsRequired} onChange={(e) => values.answer.push(e.currentTarget.value)} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })
    }
    setAnswer(SurveyJson)
  }


  return (
    <div className='card'>
      <div className='input'>
        <h5>{SurveyJson.Questions[selected].QuestionId}.{SurveyJson.Questions[selected].Question}</h5>
        {renderInputs(SurveyJson.Questions[selected].Type, SurveyJson.Questions[selected])}
      </div>

      <div>
        <button onClick={OnPreviousHandler}>Previous</button>
        <button onClick={OnNextHandler}>Next</button>
      </div>
    </div>
  )
}

export default Card



//TODO: 
/* 
 Find the Question id and Render the Question for Next and Previous
*/