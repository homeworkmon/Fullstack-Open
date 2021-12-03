import React from 'react'

const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  const sum = parts.reduce((prev, cur) => ({exercises : prev.exercises + cur.exercises}))
  return(
    <b>Total of exercises {sum.exercises}</b>
  ) 
}

const Part = ({ part }) => {
  return (
    <p> {part.name} {part.exercises} </p>    
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} part={part} />
        )}
    </ul>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course