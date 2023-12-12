import { Controller, Get, Res } from '@nestjs/common';
import { EventsService } from './events.service';
import { Event } from './events.model';
import { Response } from 'express';
import { BaseApiController } from 'src/shared/BaseAPIController';

@Controller('/events')
export class EventsController extends BaseApiController {
  constructor(private readonly eventService: EventsService) {
    super();
  }

  @Get()
  async getEvents(@Res() response: Response) {
    try {
      const events: Event[] = await this.eventService.getAllEvents();
      return this.successResponse(events, response);
    } catch (error) {
      return this.serverErrorResponse(error.message ?? error, response);
    }
  }
}
