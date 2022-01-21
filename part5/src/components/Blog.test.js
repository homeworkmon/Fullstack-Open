/* eslint-disable no-unused-vars */
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let details

  const blog = {
    title: 'Component testing is done with react-testing library',
    author: 'matti',
    url: 'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16',
    likes: 0
  }

  const sampleFunc = jest.fn()

  beforeEach(() => {

    component = render(
      <Blog blog={blog} update={sampleFunc} remove={sampleFunc}/>
    )
    details = component.container.querySelector('.details')
  })

  test('renders note with title and author but details hidden', () => {

    console.log(prettyDOM(component.container))

    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing library',
    )
    expect(component.container).toHaveTextContent(
      'matti',
    )
    expect(details).toHaveStyle('display: none')
  })

  test('checks that url and likes show afer details button clicked', () => {
    const button = component.container.querySelector('.detail-button')
    fireEvent.click(button)

    expect(details).toHaveStyle('display: block')
    expect(details).toHaveTextContent(
      'https://fullstackopen.com/en/part5/testing_react_apps#exercises-5-13-5-16'
    )
    expect(details).toHaveTextContent(
      'likes: 0'
    )
  })

  test('check that likes button calls component correctly', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(sampleFunc.mock.calls).toHaveLength(2)
  })

})
