import express from 'express';
import config from './db/config.js';
 import bodyParser from 'body-parser';
 import jwt from 'jsonwebtoken';
 import cors from 'cors';



// Import routes here
import userRoutes from './routers/userRoutes.js';
import plansRoutes from './routers/plansRoutes.js'

const app = express();

// Middlewares here
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
// Enable cors for all routes
app.use(cors());


// jwt middleware
app.use((req,res,next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.SECRET, (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
    
})




// Instantiate routes here
userRoutes(app);
plansRoutes(app);

app.get('/', (req,res) => {
    res.send('Hello Welcome To My Api!');
});

app.listen(config.port || 5000, () => {
    console.log(`Server is running on`);
});