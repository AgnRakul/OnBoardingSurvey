import React, { useState } from 'react'
import "./Card.css"
import SurveyJson from "../../Constant/survey.json"

const Card = () => {
  const [selected, setSelected] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobRole: "",
    phoneNumber: "",
  })


  const OnNextHandler = () => {
    setSelected(prev => {
      if (prev === SurveyJson.Questions.length - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    });

  }

  console.log(formData);

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
        return <input type={types} onChange={(e) => setFormData({
          ...formData,
          ...{firstName: e.currentTarget.value},
         
        })} />
      case 'radio':
        return values.Choice.map((val) => {
          return <div>
            <input type={types} name="radio" value={val.value} id={val.id} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })

      case 'checkbox':
        return values.Choice.map((val) => {
          return <div>
            <input type={types} name={val.name} id={val.id} value={val.value} />
            <label htmlFor={val.id}>{val.text}</label>
          </div>
        })
    }
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