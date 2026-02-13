import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide a username"],
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please provide a valid email address"],
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
        minLength:[6,"Password must be at least 6 characters long"],
        select:false,
    }
},{timestamps:true})

userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
    } catch (error) {
        console.error("Error hashing password:", error);
    }
})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User=mongoose.model("User",userSchema)
export default User;    