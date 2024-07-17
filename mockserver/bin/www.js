'use strict'
const app = require('../app')
const PORT = 4000
app.listen(PORT, () => {
    console.log(`server started at http://localhost:${PORT}`);
})