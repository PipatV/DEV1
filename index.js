import  express  from "express";
import { connectionDB2 } from "./connet.js";


const app = express()

// body
app.use(express.json())
app.use(express.urlencoded({extends:true}))



app.get("/user", async (req,res)=>{

    let getuser = `SELECT * FROM test2`

    const [getuserS] =  await connectionDB2.query(getuser)

    
    
    res.send(getuserS)

})


app.post("/user",async (req,res)=>{

    const {username,password,name,surname} = req.body

    let adduser =  `INSERT INTO test2 (username,password,name,surname)  VALUES ('${username}','${password}','${name}','${surname}')`

    const [adduserS] = await connectionDB2.query(adduser)

     
    // console.log(adduserS)

    console.log(req.body)
    // console.log(username,password,name,surname)
    
     res.send(adduserS)

})


app.put("/user",async(req,res)=>{

    const {username,password,name,surname} = req.body

    let update = `UPDATE test2 SET password =?, name =?, surname =? WHERE username = '${username}' LIMIT 1 `;

    let [updateS] = await connectionDB2.query(update,[password,name,surname])

    

    console.log(req.body)

    res.send(updateS)

})









app.listen(4500,()=>{
    console.log("Start")
})