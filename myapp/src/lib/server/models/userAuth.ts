import mongoose from 'mongoose';

interface UserAuthI {
	userId: mongoose.Types.ObjectId;
	password: string;
	failedLoginAttempts: number;
	lastLoginAt?: Date;
	passwordChangedAt?: Date;
}

const userAuthSchema = new mongoose.Schema<UserAuthI>(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		password: { type: String, required: true },
		failedLoginAttempts: { type: Number, default: 0 },
		lastLoginAt: { type: Date },
		passwordChangedAt: { type: Date },
	},
	{
		collection: 'userAuth',
		strict: true,
		versionKey: '__v', // Keep version tracking
	}
);

// Create a unique index on userId to ensure one auth record per user
userAuthSchema.index({ userId: 1 }, { unique: true });

const UserAuth = mongoose.models.UserAuth || mongoose.model('UserAuth', userAuthSchema);

export default UserAuth;
