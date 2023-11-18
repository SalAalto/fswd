// Custom commands to extend Cypress functionality specific to the Blog app

// Command to log in via the API
Cypress.Commands.add('loginByApi', (username, password) => {
    cy.request('POST', 'http://localhost:3003/api/login', { username, password })
        .then(response => {
            localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
        })
})

// Command to create a blog using the API
Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    cy.request({
        method: 'POST',
        url: 'http://localhost:3003/api/blogs',
        body: { title, author, url },
        headers: {
            'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
        }
    })
    // Optionally, the visit could be removed if the UI is not needed to be refreshed after blog creation
    // cy.visit('http://localhost:3000')
})

// Command to like a blog
// This would require you to have an endpoint to like a blog or the ability to simulate the UI interaction
Cypress.Commands.add('likeBlog', (title) => {
    // Find the blog by title and access its details
    cy.contains(title).parent().find('button').contains('view').click();
    // Now click the like button
    cy.contains(title).parent().find('button').contains('like').as('likeButton').click();
    // Optionally check if the likes increased
    // You would need to implement logic to check the current number of likes and then confirm it has increased after clicking.
    // This is just an example and may need to be adjusted depending on your application's structure.
    cy.get('@likeButton').parent().contains('likes').invoke('text').then((textBefore) => {
        const likesBefore = parseInt(textBefore.split(' ')[1]);
        cy.get('@likeButton').click();
        cy.get('@likeButton').parent().contains('likes').should(($likesAfter) => {
            const likesAfter = parseInt($likesAfter.text().split(' ')[1]);
            expect(likesAfter).to.eq(likesBefore + 1);
        });
    });
});

// Add more custom commands as necessary for the tests to be more readable and maintainable.
