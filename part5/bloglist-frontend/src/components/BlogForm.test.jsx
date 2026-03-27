import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm/>', () => {
  test('', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm createBlog={createBlog}/>)

    const titleInput = screen.getByPlaceholderText('blogs title')
    const authorInput = screen.getByPlaceholderText('blogs author')
    const urlInput = screen.getByPlaceholderText('blogs url')
    const createButton = screen.getByText('create')

    await user.type(titleInput, 'otsikko')
    await user.type(authorInput, 'julkaisija')
    await user.type(urlInput, 'osoite')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('otsikko')
    expect(createBlog.mock.calls[0][0].author).toBe('julkaisija')
    expect(createBlog.mock.calls[0][0].url).toBe('osoite')
  })
})