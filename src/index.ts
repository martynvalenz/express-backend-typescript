import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import routes from './routes'

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req,res) => res.send('Hello'));

if(process.env.MONGO_URL){
   mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
   .then(() => {
      console.log('MongoDB connected')
      routes(app)
      const port = process.env.PORT || 5000
      app.listen(port, function(){
         console.log(`listening on http://localhost:${port}`);
      });
   })
   .catch(e => {
      console.log(e)
   })
}
else{
   throw new Error('MONGO URI NOT FOUND')
}

