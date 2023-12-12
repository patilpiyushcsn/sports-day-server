import * as mongoose from 'mongoose';
import { Event } from 'src/events/events.model';

export const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  events: { type: Array, required: false },
});

export interface User {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  events: Event[];
}
