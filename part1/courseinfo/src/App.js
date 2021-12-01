import React from 'react'

const Header = (props) => {
  return (
    <div>
      <h1>
        {props.course}
      </h1>
    </div>
  )
}

const Content = (props) => {
  const [part1, part2, part3] = props.parts
  return (
    <div>
      <Part title={part1.name} exercises={part1.exercises}/>
      <Part title={part2.name} exercises={part2.exercises}/>
      <Part title={part3.name} exercises={part3.exercises}/>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      <p>
        {props.title} : {props.exercises}
      </p>
    </div>
  )
}

const Total = (props) => {
  const [first, second, third] = props.parts

  return (
    <div>
      <p>
        Number of exercises : {first.exercises + second.exercises + third.exercises}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content  parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App