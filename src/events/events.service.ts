import { Injectable } from '@nestjs/common';
import { Event } from './events.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class EventsService {
  private events: Event[] = [];

  constructor(
    @InjectModel('Event') private readonly eventModel: Model<Event>,
  ) {}

  async getAllEvents(): Promise<Event[]> {
    const events = await this.eventModel.find();
    return events;
  }
}
