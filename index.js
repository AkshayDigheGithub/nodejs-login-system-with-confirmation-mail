import express from 'express';
import logger from 'morgan';
import { connect } from './src/config/db';
import { restRouter } from './src/api';
import passport from 'passport';
import { configJWTStrategy } from './src/api/middleware/passport-jwt';

const app = express();
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', restRouter);
connect();
// passport , passport-jwt
app.use(passport.initialize());  //req.user
configJWTStrategy()

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.message = "Invalid route";
    error.status = 404;
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.json({
        error: {
            message: error.message
        }
    })
})

const port = 3000;
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(` app listening on port ${port}!`))