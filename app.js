const express = require('express')
const app = express()
const port = 3000

//ejs
app.set('view engine','ejs')


app.get('/', (req, res) => {
  
    const mahasiswa = [
        {
            nama: 'Daffa Apta Pratama',
            email: 'daffa@gmail.com',
        },
        {
            nama: 'Galung Ramadun',
            email: 'galung@gmail.com',
        },
        {
            nama: 'Riki Maulani',
            email: 'iki@gmail.com',
        },
    ]
    res.render('index', { 
        nama: 'Daffa Apta Pratama', 
        title: 'Halaman Utama',
        mahasiswa,
    })
})

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'})
})

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact'})
})

app.get('/product/:id', (req, res) =>{
    res.send(`Product ID :  ${req.params.id} <br> Category : ${req.query.category}`)
})

app.use('/', (req, res) => {
 res.status('404') 
 res.send('gaada bang')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
















// const http = require('http'); 
// const fs = require('fs'); 
 
// const port = 3000; 
// const renderHtml = (path, res) => { 
//     fs.readFile(path, (err, data)=> { 
//         if (err){ 
//             res.writeHead(404); 
//             res.write('Error : File Not Found'); 
//         }else { 
//             res.write(data); 
//         } 
//         res.end(); 
//     }) 
// } 
 
// http 
// .createServer((req, res)=> { 
    
//     res.writeHead(200, { 
//         'Content-Type' : 'text/html', 
//     }); 
// const url = req.url; 
// switch(url){ 
//     case '/about': 
//         renderHtml('./about.html', res); 
//         break; 
//     case '/contact': 
//         renderHtml('./contact.html', res); 
//          break; 
//     default: 
//         renderHtml('./index.html', res); 
//          break; 
// } 
 
// if (url === './about.html'){ 
//     renderHtml('./about.html', res); 
// }else if (url === './contact.html'){ 
//     renderHtml('./contact.html', res); 
// } 
// else if (url === './index.html'){ 
//     renderHtml('./index.html', res); 
// }; 
// }) 
// .listen(port, () => { 
// console.log(`Server is listening on port ${port}..`); 
// })