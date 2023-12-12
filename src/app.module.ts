import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://patilpiyushcsn:T1NbFsiDGkImm4sr@cluster0.bobvoct.mongodb.net/sports-day?retryWrites=true&w=majority',
    ),
    EventsModule,
    UsersModule,
  ],
})
export class AppModule {}
