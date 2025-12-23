import mongoose,{Schema} from "mongoose";

const userSchema=new Schema(
    {
    username:{
        type:String,
        required:true,
        unique:true, // no two users can have same username
        lowercase:true,
        trim:true,   // suppose i enter username as li   ly then it will trim the extra spaces
        minlength:2,
        maxlength:30,
    },

    password:{
        type:String,
        unique:true, // no two users can have same password
        required:true,
        minlength:6,
        

    },

    email:{
        type:String,
        required:true,
        unique:true, // no two users can have same username
        lowercase:true,
        trim:true,   // suppose i enter username as li   ly then it will trim the extra spaces
        
    }

    },
    {
        timestamps:true, // this will automatically create createdAt and updatedAt fields. we will get timestamps of when user was created and when it was last updated
    }
)

export const User = mongoose.model("User",userSchema);// this will create a collection named users in the database and will use userSchema to define the structure of the documents in that collection