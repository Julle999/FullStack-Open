import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

  test('blog title and author is rendered', async () => {
    const blog = {
      title: 'this is blogs title',
      author: 'julle999',
      url: 'osoite',
      likes: 0,
      user: {
        username: 'juippi7',
        name: 'julle julberi'
      }
    }

    const user = {
      username: 'juippi7',
      name: 'julle julberi'
    }

    const { container } = render(<Blog blog={blog} user={user}/>)
    //screen.debug()

    const element = container.querySelector('#hideWhenShowall')
    //console.log('!!!',element)
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('this is blogs title - julle999')
  })

  test('is rendered fully after view-button is pressed', async () => {
    const blog = {
      title: 'this is blogs title',
      author: 'julle999',
      url: 'osoite',
      likes: 0,
      user: {
        username: 'juippi7',
        name: 'julle julberi'
      }
    }

    const user = {
      username: 'juippi7',
      name: 'julle julberi'
    }
    const { container } = render(<Blog blog={blog} user={user}/>)

    const user1 = userEvent.setup()
    const button = screen.getByText('view')
    //console.log('!!!',button)
    //screen.debug()
    await user1.click(button)

    //screen.debug()
    //console.log('!!!',container)

    const element = container.querySelector('#showWhenShowall')
    const titleAndAuthor = container.querySelector('#titleAndAuthor')
    const url = container.querySelector('#url')
    const likes = container.querySelector('#likes')
    const usersName = container.querySelector('#usersName')
    //console.log('!!!',element)
    expect(element).toBeVisible()
    expect(titleAndAuthor).toHaveTextContent('this is blogs title - julle999').toBeVisible()
    expect(url).toHaveTextContent('osoite').toBeVisible()
    expect(likes).toHaveTextContent('likes 0').toBeVisible()
    expect(usersName).toHaveTextContent('julle julberi').toBeVisible()
  })

  test('calls modifyLikes when like-button is pressed', async () => {
    const blog = {
      title: 'this is blogs title',
      author: 'julle999',
      url: 'osoite',
      likes: 0,
      user: {
        username: 'juippi7',
        name: 'julle julberi'
      }
    }
    const user = {
      username: 'juippi7',
      name: 'julle julberi'
    }
    const likeHandler = vi.fn()
    render(<Blog blog={blog} user={user} modifyLikes={likeHandler}/>)

    const user1 = userEvent.setup()
    const likeButton = screen.getByText('like')
    //console.log(likeButton)
    await user1.click(likeButton)
    await user1.click(likeButton)

    expect(likeHandler.mock.calls).toHaveLength(2)
  })
})