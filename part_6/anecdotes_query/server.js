import jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Validator middleware
const validator = (req, res, next) => {
    if (req.method === 'POST') {
        const content = req.body.content || '';
        if (content.length < 5) {
            res.status(400).json({ error: 'too short anecdote, must have length 5 or more' });
        } else {
            next();
        }
    } else {
        next();
    }
};

// Server setup
server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(validator);
server.use(router);

// Start server
const PORT = 3001;
server.listen(PORT, () => console.log(`JSON Server is running on port ${PORT}`));

