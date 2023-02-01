import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Home from './index'
import { getMovieByName } from './api/movie'

jest.mock('./api/movie', () => {
  return {
    getMovieByName: jest.fn(() => Promise.resolve({ results: [] }))
  }
})

describe('Home Page', () => {
  it('should render search bar and movie list', async () => {
    const { findByPlaceholderText, findByText } = render(<Home />)
    const searchBar = await findByPlaceholderText('Find movie by name')
    const searchButton = await findByText('Search')

    expect(searchBar).toBeInTheDocument()
    expect(searchButton).toBeInTheDocument()
  })

  it('should call API when form submitted', async () => {
    const { findByPlaceholderText, findByText } = render(<Home />)
    const searchBar = await findByPlaceholderText('Find movie by name')
    const searchButton = await findByText('Search')

    fireEvent.change(searchBar, { target: { value: 'inception' } })
    fireEvent.click(searchButton)

    expect(getMovieByName).toHaveBeenCalledWith('inception')
  })

  it('should show loading when searching', async () => {
    const { findByPlaceholderText, findByText, findByText:findByTextLoading } = render(<Home />)
    const searchBar = await findByPlaceholderText('Find movie by name')
    const searchButton = await findByText('Search')

    fireEvent.change(searchBar, { target: { value: 'inception' } })
    fireEvent.click(searchButton)
    const loading = await findByTextLoading('Loading...')
    expect(loading).toBeInTheDocument()
  })

  it('should show message when no movie found', async () => {
    const { findByPlaceholderText, findByText } = render(<Home />)
    const searchBar = await findByPlaceholderText('Find movie by name')
    const searchButton = await findByText('Search')

    fireEvent.change(searchBar, { target: { value: 'not_exist_movie' } })
    fireEvent.click(searchButton)
    const message = await findByText("Can't find any movies:(")
    expect(message).toBeInTheDocument()
  })
})
