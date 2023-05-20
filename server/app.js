import express from 'express';
import cors from 'cors';

import mainPage from './router/mainPage.js';
import Tweet from './api/Tweet.js'

const app = express();

app.use(cors());

app.use(express.json());

app.use('/', mainPage)
app.use('/tweet', Tweet);

app.listen(8080);