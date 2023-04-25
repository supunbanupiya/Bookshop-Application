import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();


const db=mysql.createConnection({
    host:"localhost",
    user:'root',
    password:"",
    database:'test',
});

app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.json("Hello this is the me!");
});
app.get('/books',(req,res)=>{
   const q = "SELECT * FROM books";
   db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data);
   })
})

app.post("/books",(req,res)=>{
    const q = "insert into books (`title`,`desc`,`price`,`cover`) values (?)";
    const values =[
       req.body.title,
       req.body.desc,
       req.body.price,
       req.body.cover
    ];
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been created successfully");
    });
})
app.delete("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "DELETE  from books WHERE id=?"
    db.query(q,[bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been deleted successfuly");
    })
});

app.put("/books/:id",(req,res)=>{
    const bookId = req.params.id;
    const q = "UPDATE books SET `title`=?,`desc`=?,`price`=?,`cover`=? WHERE id=?";
 const values=[
       req.body.title,
       req.body.desc,
       req.body.price,
       req.body.cover
 ]

    db.query(q,[...values, bookId],(err,data)=>{
        if(err) return res.json(err);
        return res.json("book has been updated successfuly");
    })
})

app.listen(8080,()=>{
    console.log("connected to the backend");
})