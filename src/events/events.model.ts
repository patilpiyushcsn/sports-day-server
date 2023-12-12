import * as mongoose from 'mongoose';

export const EventSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  event_name: { type: String, required: true },
  event_category: { type: String, required: true },
  start_time: { type: String, required: true },
  end_time: { type: String, required: true },
});

export interface Event {
  _id: string;
  id: number;
  event_name: string;
  event_category: string;
  start_time: string;
  end_time: string;
}
