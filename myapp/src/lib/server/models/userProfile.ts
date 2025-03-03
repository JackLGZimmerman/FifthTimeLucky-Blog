import mongoose from 'mongoose';

interface UserProfileI {
	userId: mongoose.Types.ObjectId;
	firstName?: string;
	lastName?: string;
	avatar?: string;
	preferences: {
		theme: string;
		language: string;
	};
	// timestamps and version will be handled by mongoose
}

const userProfileSchema = new mongoose.Schema<UserProfileI>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		firstName: { type: String },
		lastName: { type: String },
		avatar: { type: String },
		preferences: {
			theme: { type: String, default: 'light' },
			language: { type: String, default: 'en' },
		},
	},
	{
		collection: 'userProfiles',
		strict: true,
		timestamps: true, // Add automatic timestamp fields
		versionKey: '__v', // Add version tracking
	}
);

// Create a unique index on userId to ensure one profile per user
userProfileSchema.index({ userId: 1 }, { unique: true });

const UserProfile = mongoose.models.UserProfile || mongoose.model('UserProfile', userProfileSchema);

export default UserProfile;
