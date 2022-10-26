import mongoose, { Schema } from 'mongoose';
import { TSettings } from '../types/types';

const SettingsSchema: Schema<TSettings> = new Schema ({
    refreshToken: { type: String, required: true }
});

export default mongoose.model('Settings', SettingsSchema);