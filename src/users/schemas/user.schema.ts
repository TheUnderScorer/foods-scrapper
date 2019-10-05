import { Schema } from 'mongoose';

export default new Schema( {
    login:     String,
    password:  String,
    role:      String,
    createdAt: Date,
    updatedAt: Date,
} );
