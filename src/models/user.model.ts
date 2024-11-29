import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type :String,
        enum:['super-admin'],
        default:'super-admin'
    },
    isFirstLogin:{
        type:Boolean,
        default:true
    },
})

userSchema.pre("save", async function (next) {
    const user = this;
  
    if (!user.isModified("password")) return next();
  
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(user.password, salt);
      user.password = hashedPassword;
      next();
    } catch (error:unknown) {
      next((error as Error));
    }
});
  
userSchema.methods.comparePassword = async function (candidatePassword:string) {
    try {
      const isMatch = await bcrypt.compare(candidatePassword, this.password);
      return isMatch;
    } catch (error) {
      throw error;
    }
};

const User = mongoose.model('user', userSchema);

export default User