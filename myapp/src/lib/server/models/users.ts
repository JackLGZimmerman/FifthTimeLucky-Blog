import mongoose from 'mongoose';

// Define role values as lowercase strings to match policy keys directly
export enum UserRole {
	USER = 'user',
	SUPER_USER = 'super_user',
	ADMIN = 'admin',
	SUPER_ADMIN = 'super_admin',
}

interface UserI {
	username: string;
	email: string;
	emailVerified: boolean;
	role: UserRole;
}

const userSchema = new mongoose.Schema<UserI>(
	{
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		emailVerified: { type: Boolean, default: false },
		role: {
			type: String,
			required: true,
			enum: Object.values(UserRole),
			default: UserRole.USER,
		},
	},
	{
		collection: 'users',
		strict: true,
		timestamps: true, // This enables automatic createdAt and updatedAt fields
		versionKey: '__v', // Track document versions (this is the default name)
	}
);

// Prevent creating multiple models
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
