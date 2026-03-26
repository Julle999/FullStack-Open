import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {

  test('blog title is rendered', async () => {
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

    const element = container.querySelector('#blog-title-author')
    console.log('!!!',element)
    expect(element).toBeDefined()
    expect(element).toHaveTextContent('this is blogs title - julle999')
  })
})