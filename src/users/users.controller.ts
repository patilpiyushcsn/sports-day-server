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
    @Body('username') username: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.create(
        username,
        firstName,
        lastName,
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Post('/login')
  async login(@Body('username') username: string, @Res() response: Response) {
    try {
      const user: User = await this.usersService.login(username);
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Put('/:userId/events/:eventId/register')
  async registerEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
    @Body('event') event: Event,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.registerEvent(
        userId,
        parseInt(eventId, 10),
        event,
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Put('/:userId/events/:eventId/unregister')
  async unregisterEvent(
    @Param('userId') userId: string,
    @Param('eventId') eventId: string,
    @Res() response: Response,
  ) {
    try {
      const user: User = await this.usersService.unregisterEvent(
        userId,
        parseInt(eventId, 10),
      );
      return this.successResponse(user, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }

  @Get('/:userId/events/registered')
  async getRegisteredEvents(
    @Param('userId') userId: string,
    @Res() response: Response,
  ) {
    try {
      const events: Event[] =
        await this.usersService.getRegisteredEvents(userId);
      return this.successResponse(events, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }
}
