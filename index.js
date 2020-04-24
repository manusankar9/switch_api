const myexpress = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
const corsConfig = require('./cors-config')

const app = myexpress();
const PORT = process.env.PORT || 8000;

const url = `mongodb+srv://manusankar410:ajG61LSj4yb7HFIO@cluster0-5ahtq.mongodb.net/test?retryWrites=true&w=majority`

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.listen(PORT,()=>{console.log(`hmmmm listening ${PORT}`)});
app.get("/",(req,resp)=>{
	resp.status(200).send("Welcome to switch-api");
});

app.get('/switch',cors(corsConfig),(request,response)=>{
	console.log(">>>>>>>>>>>switch>>>>>>>>");

	MongoClient.connect(url,(err,db)=>{
		const collection = db.db("switch_app").collection("darklaunch");

		collection.find().toArray((err,result)=>{
			if(err) throw err;
			response.json(result || []);
		});
		db.close();
	});

});
