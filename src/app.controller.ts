import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('questions')
  getQuestions(): any {
    return this.appService.getQuestions();
  }
}