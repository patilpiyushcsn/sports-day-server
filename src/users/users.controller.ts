import { Body, Controller, Get, Param, Post, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Event } from 'src/events/events.model';
import { BaseApiController } from 'src/shared/BaseAPIController';
import { Response } from 'express';
import { User } from './users.model';

@Controller('/users')
export class UsersController extends BaseApiController {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  @Post()
  async create(
    @Body('userId') userId: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.create(
        userId,
        firstName,
        lastName,
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Post('/login')
  async login(@Body('userId') userId: string, @Res() response: Response) {
    try {
      const loggedIn: boolean = await this.usersService.login(userId);
      return this.successResponse(loggedIn, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Put('/:id/events/:eventId/register')
  async registerEvent(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
    @Body('event') event: Event,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.registerEvent(
        id,
        parseInt(eventId, 10),
        event,
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Put('/:id/events/:eventId/unregister')
  async unregisterEvent(
    @Param('id') id: string,
    @Param('eventId') eventId: string,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.unregisterEvent(
        id,
        parseInt(eventId, 10),
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Get('/:id/events/registered')
  async allRegisteredEvents(
    @Param('id') id: string,
    @Res() response: Response,
  ) {
    try {
      const events: Event[] = await this.usersService.allRegisteredEvents(id);
      return this.successResponse(events, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }
}
