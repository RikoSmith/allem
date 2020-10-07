const MongoClient = require('mongodb').MongoClient;

const uri = "mongodb+srv://admin:Zxc159Zxc159@cluster1.ldf3q.mongodb.net/allemdb?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true}, );

client.connect(err => {
  const collection = client.db("allemdb").collection("lang");
  console.log(collection)
  client.close();
});