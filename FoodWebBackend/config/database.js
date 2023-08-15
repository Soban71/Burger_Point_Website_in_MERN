import mongoose from "mongoose";



const connectDb= async ()=>{
   // const url='mongodb+srv://janjuasoban846:Tbkdy6TCEi9P6Aih@cluster0.gz1cz8k.mongodb.net/'
  try{
    await mongoose.connect(process.env.MONGO_URl,{useUnifiedTopology: true , useNewUrlParser: true});
    console.log("Database Connected Successfully");
  }
  catch(err){
    console.log(err);
  }
}

export default connectDb;

////MONGO_URl=mongodb+srv://janjuasoban846:<Tbkdy6TCEi9P6Aih>@cluster0.gz1cz8k.mongodb.net/


//YFi34syVPq4cSJ6Qu5HCQL8B