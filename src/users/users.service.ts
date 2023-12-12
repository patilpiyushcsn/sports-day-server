import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from 'src/events/events.model';

@Injectable()
export class UsersService {
  private user: User[] = [];

  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(
    username: string,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    try {
      if (!(await this.login(username))) {
        const user = new this.userModel({
          username: username,
          first_name: firstName,
          last_name: lastName,
        });
        const result = await user.save();
        return result;
      }
      throw 'username already exist, please login using username';
    } catch (error) {
      throw error;
    }
  }

  async login(userId: string): Promise<boolean> {
    try {
      const user = await this.userModel.findOne({ user_id: userId });
      return user ? true : false;
    } catch (error) {
      throw error;
    }
  }

  async registerEvent(
    userId: string,
    eventId: number,
    event: Event,
  ): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);
      if (!user.events.some((event) => event.id === eventId)) {
        user.events = user.events.concat(event);
        const result = await user.save();
        return result;
      }
      throw new Error('Same event cannot be registered by the user twice');
    } catch (error) {
      throw error;
    }
  }

  async unregisterEvent(userId: string, eventId: number): Promise<User> {
    try {
      const user = await this.userModel.findById(userId);
      user.events = user.events.filter((event) => event.id !== eventId);
      const result = await user.save();
      return result;
    } catch (error) {
      throw error;
    }
  }

  async allRegisteredEvents(userId: string): Promise<Event[]> {
    try {
      const user = await this.userModel.findById(userId);
      return user.events;
    } catch (error) {
      throw error;
    }
  }
}
