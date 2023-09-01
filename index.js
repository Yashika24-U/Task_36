
import express from "express"
import {MongoClient} from "mongodb"
import * as dotenv from 'dotenv'
dotenv.config()
const app = express()//contains all api method POST,PUT,CREATE,DELETE

const PORT = 9000;
const MONGO_URL = process.env.MONGO_URL

async function createConnection()
{
    const client = new MongoClient(MONGO_URL);
    await client.connect()
    console.log("Mongodb is connected")
    return client
}

const client = await createConnection();
app.use(express.json())
// ==========================================================================================

app.get("/",async function(req,res){

    const result = await client.db("task").collection("room").find({}).toArray()

    result ? res.send(result) : res.status("404").send("Room not Found")
   
});

// ==========================================================================================
app.post("/createRoom",async function(req,res){
    const data = req.body;
    console.log(data)
    const result = await client.db("task").collection("room").insertMany(data);
    res.send(result)
})

// ==========================================================================================
app.post("/BookRoom",async function(req,res){
    const { roomId, customerName, date, startTime, endTime } = req.body;

    // Find the room with the specified roomId
    try {
        const room = await client.db("task").collection("room").findOne({ id: roomId })
    
        if (!room) {
          return res.status(404).json({ error: 'Room not found.' });
        }
    
        if (room.Booked === 'True') {
          return res.status(400).json({ error: 'Room is already booked.' });
        }
    
        await room.updateOne({ id: roomId }, { $set: { Booked: 'True' } });

    
    
        const booking = await booking.create({
          customer_name: customerName,
          date,
          start_time: startTime,
          end_time: endTime,
          room: room._id,
        });
        await db.collection('booking').insertOne(booking);
    
        res.json({ message: 'Room booked successfully.', room, booking });
      } catch (error) {
        res.status(500).json({ error: 'An error occurred while booking the room.' });
      }
    }); 
 

    // ==========================================================================================
 

    app.get("/BookedRooms", async function (req, resp) {
     
      const result = await client
        .db("task")
        .collection("booking")
        .find({_id:0,roomId:1})
        .toArray();
    
      result ? resp.send(result) : resp.status(404).send("No rooms are booked!!");
    });
    

     // db.booking.find({}, { _id: 0, room_id: 1 })
// ==========================================================================================
 //  List all customers with booked Data with Customer name, Room Name, Date,Start Time,  End Time
  
 
 
 app.get("/ListCustomers", async function (req, resp) {
     
  const result = await client
    .db("task")
    .collection("booking")
    .distinct("customer_name", { room_id: { $exists: true } })
    .toArray();

  result ? resp.send(result) : resp.status(404).send("No rooms are booked!!");
});
//=========================================================================================
//List how many times a customer has booked the room with below details


 
 
 
 
 
 
 
 
 
 
 
 //======================================================================================




  
 

























app.listen((PORT),()=>console.log("Server Connected at portnumber",PORT))







// app.get("/availableRoom",async function(req,res){
//     const result = await client.db("task").collection("room").find({Booked:"False"}).toArray()
    
//     result ? res.send(result) : res.status(404).send({message:"All rooms are booked"})
// })



// app.get("/bookedroom",async function(req,res){

//     const result = await client.db("task").collection("bookedroom").find({}).toArray()
// })











// app.post("/bookRoom",async function(req,res){
//     const data = req.body;
//     const date = new Date().toString()
//     const bookStatus = {Booked:"True"};

//     var availableRooms = await client.db("task").collection("room").findOne({Booked:"False"});

//     if(availableRooms === null){
//         res.send({Message:"No Rooms are available,create a room!"})
//         return
//     }

//     const updatedata = {RoomId:availableRooms.id,date:date}
//     // Insert the booking data into the "room" collection
//     var result = await client.db("task").collection("room").insertOne(data);

//     // Update the booked room data in the "bookedroom" collection

//     // result = await client.db("task").collection("bookedroom").updateOne({$set:updatedata})
//     // Update the available room's status to booked
    
//     availableRooms = await client.db("task").collection("room").updateOne({id:availableRooms._id},{$set:bookStatus})


//     res.send(result);
// })



























