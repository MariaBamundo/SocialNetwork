// const express = require('express');

// const app = express();

// app.get('/', (req, res) => {
//     res.send('hey from express');
// });

// app.listen(3000);

const fs = require('fs');
const filename = "target.txt";

fs.readFile(filename, (err, data) => {
    if(err) {console.log(err)};
    console.log(data.toString());
});

console.log('node js async programming')