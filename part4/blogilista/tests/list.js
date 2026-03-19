const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
    user: '69bbfd5c749635ff4be53c39'
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }  
]

const users = [
  {
    "username": "uusi user",
    "name": "uuseri",
    "blogs": [ ],
    "id": "69bbd200c12c30b148ea4612",
    "password": "salainen"
  },
  {
    "username": " tosi uusi user",
    "name": "uuseri",
    "blogs": [ ],
    "id": "69bbd56c0d29d9497dc332e1",
    "password": "salainen"
  }
]

const blogWithMostLikes = {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
}

const oneNewBlog = {
            title: "testi",
            author: "julle999",
            url: "osoite",
            likes: 4
            }


const listWithTwoBlogs = [
        {
            _id: "69aa85d3ffdde5918b3e980d",
            title: "testi",
            author: "julle999",
            url: "osoite",
            likes: 4,
            __v: 0
        },
        {
            _id: "69aaa684df5911fa2128a0a9",
            title: "testi2",
            author: "julle9992",
            url: "osoite2",
            likes: 4,
            __v: 0
        }
]
 const tokenForuusi_user = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InV1c2kgdXNlciIsImlkIjoiNjliYmQyMDBjMTJjMzBiMTQ4ZWE0NjEyIiwiaWF0IjoxNzczOTE2ODMzfQ.9TOFtZLJfuJ3y29hvg6IrXT4Grlj3RixWirfVEdVDaY'

module.exports = {
    blogs, 
    users,
    blogWithMostLikes, 
    oneNewBlog, 
    listWithTwoBlogs,
    tokenForuusi_user
}