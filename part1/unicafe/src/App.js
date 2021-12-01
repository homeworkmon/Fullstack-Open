import React, { useState } from 'react'

const Header = ({text}) => <h1>{text}</h1>

const Button =({ handleClick, text }) => (
  <button onClick= {handleClick}>
    {text}
  </button>
)

const Stat = ({text, count}) => (
  <tr>
    <td style={{padding: '5px'}}>{text}</td>
    <td>{count}</td>
  </tr>
)

const StatSection = ({good, bad, neutral}) => {
  const count = good + bad + neutral
  if (count > 0) {
    return (
      <div>
        <Stat text={'good'} count={good} />
        <Stat text={'neutral'} count={neutral}/>
        <Stat text={'bad'} count={bad} />
        <Stat text={'all'} count={bad + good + neutral} />
        <Stat text={'average'} count={((bad*-1) + (good*1) + (neutral*0)/(bad + good + neutral))/100} />
        <Stat text={'positive'} count={good/(bad+good+neutral)*100} />
      </div>
    )
  } else return (
    <div>
      <p>
        No feedback given
      </p>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

 const handleClick = (who) => {
   const increment = () => {
     if (who === 'good') {
       setGood(good + 1)
     }
     else if (who === 'neutral') {
       setNeutral(neutral + 1)
     }
     else if (who === 'bad') {
       setBad(bad + 1)
     }
   }
   return increment
 }

  return (
    <div>
      <Header text={'give feedback'} />
      <Button handleClick={handleClick('good')} text='good'/>
      <Button handleClick={handleClick('neutral')} text='neutral'/>
      <Button handleClick={handleClick('bad')} text='bad'/>
      <Header text={'statistics'} />
      <StatSection good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App