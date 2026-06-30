const express=require('express');
const app=express();

app.get("/", (req, res) => {
    res.send("Welcome to Express API");
});
app.get('/notes', (req, res) => {
    res.send('hello this is server');
    console.log('console');  
})
app.listen(3000, () => {
    console.log('hello from server');
})