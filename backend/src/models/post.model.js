import mongoose,{Schema} from "mongoose";

const postSchema=new Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        description:{
            type:String,
            required:true,
            trim:true,
        },

        age:{
            type:Number,
            required:true,
            min:1,
            max:120,
        }
    },

    {
        timestamps:true, // this will automatically create createdAt and updatedAt fields. we will get timestamps of when user was created and when it was last updated
    }
)

export const Post = mongoose.model("Post",postSchema);// this will create a collection named posts in the database and will use postSchema to define the structure of the documents in that collection