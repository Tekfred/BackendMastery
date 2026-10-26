import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new Schema(

    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,  
            minLength: 1,
            maxLength: 20,
            
        },

        password: {
            type: String,
            required: true,
            minLength: 6,
            // bcrypt hashes are 60 characters long. This also permits the
            // stored hash to pass validation during later document saves.
            maxLength: 72,
        }, 

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,

        },

        
    },

    {
       timestamps: true
    }
)

// before saving password, you need to hash it
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});

//compare passwords
userSchema.methods.comparePassword = async function (password) {
    // Existing accounts may contain a plain-text password from before the
    // hashing hook was added. If it matches, saving upgrades it to a hash.
    if (!this.password.startsWith("$2")) {
        if (password !== this.password) return false;
        this.password = password;
        await this.save();
        return true;
    }

    return bcrypt.compare(password, this.password);
};
export const User = mongoose.model("User", userSchema);
