import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateForm from './CreateForm'

describe('<CreateForm />', () => {

  const createNew = jest.fn()
  const component = render(
    <CreateForm createNew={createNew} />
  )

  test('check that createNew submits correct info', () => {

    const form = component.container.querySelector('form')
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')

    fireEvent.change(title, {
      target: { value: 'testing of forms could be easier' }
    })
    fireEvent.change(author, {
      target: { value: 'matti' }
    })
    fireEvent.change(url, {
      target: { value: 'www.testingcouldbeasier.net' }
    })

    fireEvent.submit(form)

    expect(createNew.mock.calls).toHaveLength(1)

    expect(createNew.mock.calls[0][0].title).toBe('testing of forms could be easier')

    expect(createNew.mock.calls[0][0].author).toBe('matti')

    expect(createNew.mock.calls[0][0].url).toBe('www.testingcouldbeasier.net')
  })

})