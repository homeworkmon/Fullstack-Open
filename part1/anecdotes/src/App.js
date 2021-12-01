import React, { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick= {handleClick}>
      {text}
    </button>
  )
}

const Header = ({text}) => <div><h1>{text}</h1></div>

const Text = ({text}) => <div>{text}</div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [top, setTop] = useState(0)

  const randomizer = () => {
    const random = Math.floor(Math.random() * 7)
    setSelected(random)
    rank()
  }

  const vote = () => {
    const copy = [...points]
    copy[selected] += 1
    setPoints(copy)
  }

  const rank = () => setTop(points.indexOf(Math.max(...points)))

  return (
    <div>
      <Header text={'Anecdote of the Day'} />
      <Text text={anecdotes[selected]}/>
      <Text text={'has ' + points[selected] + ' votes'}/>
      <Button handleClick={vote} text={'vote'}/>
      <Button handleClick={randomizer} text={'next anecdote'}/>
      <Header text={'Anecdote with the most votes'} />
      <Text text={anecdotes[top]} />
      <Text text={'has ' + points[top] + ' points'} />
    </div>
  )
}

export default App