const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../components/Blogs/blog.model');

const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
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
];
beforeEach(async () => {
    await Blog.deleteMany({})
    let blog = new Blog(initialBlogs[0]);
    await blog.save();
    blog = new Blog(initialBlogs[1]);
    await blog.save();
})

describe('Blogs Api tests verifies that', () => {
    test('the correct amount of blog posts in the JSON format', async () => {
        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(2);
    })
    test('the unique identifier property of the blog posts is named _id', async () => {
        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
        expect(response.body[0]._id).toBeDefined();
    })
    test('POST request to the /api/blogs url successfully creates a new blog post', async () => {
        const newBlog = {
            title: 'Something',
            author: 'SomeOne',
            url: 'https://www.someone.com',
            likes: 21
        };
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        const contents = response.body.map(m => m.title);
        expect(response.body).toHaveLength(3);
        expect(contents).toContain('Something');
    })
    test('if the likes property is missing from the request, it will default to the value 0', async () => {
        const newBlog = {
            title: 'Something',
            author: 'SomeOne',
            url: 'https://www.someone.com'
        };

        const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

        expect(response.body.likes).toBeDefined();
        expect(response.body.likes).toBe(0);
    })
    test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
        const newBlog = {
            url: 'https://www.someone.com'
        };

        const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
    })
    test('deleting a blog returns 204 status code', async())
})

afterAll(() => {
    mongoose.connection.close()
})
