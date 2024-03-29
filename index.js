const express = require('express')
const app = express()
const port = 5000
const bodyParser=require('body-parser');
const User = require("./models/User");


//application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//application/json
app.use(bodyParser.json());


const mongoose = require('mongoose')
const uri="mongodb+srv://SeoinLee:abcd1234@atlascluster.qcco0vz.mongodb.net/";

mongoose
    .connect(uri)
    .then(()=> console.log("MongoDB connected..."))
    .catch((err)=>{console.log(err)});

app.get('/', (req, res) => { //request -> 클라이언트의 요청, response -> 서버가 클라이언트에 응답
  res.send('Hello World!~~안녕하세요!')
})

app.post('/register',(req,res)=>{
  //회원 가입 할때 필요한 정보들을 client에서 가져오면
  //그것들을 데이터 베이스에 넣어준다.


  const user = new User(req.body) // req.body로 유저 정보를 가져오는 것 -> DB에 넣어야 한다.
  //model 틀에 body -> 물을 얼음통에 넣음 -> 동그란 얼음: 물 body, 얼음통 User, 동그란 얼음 user
  
  user.save((err,userInfo)=>{
    if(err) return res.json({success:false,err})
    return res.status(200).json({
      success:true
    })
  })

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
})