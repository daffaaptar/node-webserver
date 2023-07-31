const express = require('express')
const { loadContact, findContact, addContact, cekDuplikat } = require('./utils/contacts')
const app = express()
const port = 3000
const { body, validationResult, check } = require('express-validator')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

//flash
app.use(cookieParser('secret'));
app.use(session({
  cookie:{ maxAge:6000},
  secret: 'secret',
  resave: true,
  saveUninitialized: true,

}));
app.use(flash());

//ejs
app.set('view engine','ejs')

//Built-in  Middleware
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    console.log('Time: ', Date.now())
    next()
})

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
    const contacts = loadContact()
    res.render('contact', { title: 'Contact',
    contacts,
    msg: req.flash('msg'),
})
})
// add data
app.get('/contact/add', (req, res) => {
    res.render('add-contact',{
        title: 'Form Tambah Data Contact'
    })
})

//proses add data  

app.post('/contact', [ 
    body('nama').custom((value) => { 
      const duplikat = cekDuplikat(value); 
      if(duplikat) { 
        throw new Error('Nama contact sudah digunakan!'); 
      } 
      return true; 
    }), 
    check('email', 'Email tidak valid!').isEmail(), 
    check('noHP', 'No HP tidak valid!!').isMobilePhone('id-ID'),
    ], (req, res) => { 
     const errors = validationResult(req); 
     if(!errors.isEmpty()) { 
      // return  res.status(404).json({ errors: errors.array() }); 
     res.render('add-contact', { 
      title: 'Form Tambah Data Contact', 
      layout: 'layouts/main-layout', 
      errors: errors.array(), 
     }) 
    }else{
      addContact(req.body); 
      //kirimkan flash masage
      req.flash('msg', 'Data Contact Berhasil Ditambahkan!');
      res.redirect('/contact') 
    }
  });
  
  

//detail kontak
app.get('/contact/:nama', (req, res) => {
    const contact = findContact(req.params.nama)
    res.render('detail', { title: 'Contact',
    contact,
})
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