// Begin our main test block for the Blog application
describe('Blog app', function () {
    // Set up the initial state before each test
    beforeEach(function () {
        // Reset the application state
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        // Create a new user
        const user = {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        // Navigate to the application
        cy.visit('http://localhost:3000')
    })

    // Test for the availability of the login page
    it('login page can be opened', function () {
        cy.contains('login')
    })

    // Nested describe block for login specific tests
    describe('Login', function () {
        // Test case for successful login with correct credentials
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
            cy.contains('blogs')
        })

        // Test case for failed login with incorrect credentials
        it('fails with wrong credentials', function () {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()
            cy.get('.error').should('contain', 'Wrong username or password')
        })
    })

    // Another nested describe for actions when a user is logged in
    describe('When logged in', function () {
        // Set up for logged in state before each test in this block
        beforeEach(function () {
            // Perform a login request and store the login token
            cy.request('POST', 'http://localhost:3003/api/login', {
                username: 'mluukkai', password: 'salainen'
            }).then(response => {
                localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
                cy.visit('http://localhost:3000')
            })
        })

        // Test case to check blog creation
        it('A blog can be created', function () {
            const blog = {
                title: 'mluukkai blog',
                author: 'Jawad Zaheer',
                url: 'http://mluukkaiblog.com'
            }
            cy.createBlog(blog)
            cy.contains(blog.title)
        })

        // Nested describe for cases when multiple blogs exist
        describe('And if blogs exist', function () {
            // Set up for creating multiple blogs before each test
            beforeEach(function () {
                const blogs = [
                    { title: 'mluukkai blog 1', author: 'Jawad Zaheer', url: 'http://mluukkaiblog-1.com' },
                    { title: 'mluukkai blog 2', author: 'Jawad Zaheer', url: 'http://mluukkaiblog-2.com' },
                    { title: 'mluukkai blog 3', author: 'Jawad Zaheer', url: 'http://mluukkaiblog-3.com' },
                    { title: 'mluukkai blog 4', author: 'Jawad Zaheer', url: 'http://mluukkaiblog-4.com' }
                ]
                blogs.forEach(blog => cy.createBlog(blog))
            })

            // Test cases for liking, deleting, and sorting blogs go here...
            // Example for liking a blog:
            it('A blog can be liked', function () {
                cy.likeBlog('mluukkai blog 1')
                cy.contains('mluukkai blog 1').should('contain', 'likes 1')
            })

            // Add similar refactored tests for deleting and sorting blogs...
        })
    })
})
