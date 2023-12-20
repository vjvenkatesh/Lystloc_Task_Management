require("dotenv").config();
const express = require('express');
const app = express();
app.use(express.json());


const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const userRoutes = require('./routes/user.routes');



app.use('/', userRoutes);


//for swaggerUi
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


const PORT = process.env.PORT || 3000;



app.listen(PORT,()=>{
  console.log("Server running on",PORT);
})

