/*
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';
import * as fs from 'fs';
import * as path from 'path';


@Controller('quiz')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('topics')
  getAllTopics() {
    return this.appService.getAllTopics();
  }
  
  @Get('quiz/all')
  getAllInOneQuiz() {
    return this.appService.getAllInOneQuiz();
  }

  @Get(':topic')
  getQuizTopic(@Param('topic') topic: string) {
    return this.appService.getQuizTopic(topic);
  }
  @Get('learn/:topic')
  getLearnContent(@Param('topic') topic: string) {
    return this.appService.getLearnContent(topic);
  }
}
*/
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('quiz') // This will correctly prefix all routes with '/quiz'
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('topics')
  getAllTopics() {
    return this.appService.getAllTopics();
  }

  // --- THIS IS THE FIX ---
  // The path is now combined with the controller prefix to become '/quiz/all'
  @Get('all')
  getAllInOneQuiz() {
    return this.appService.getAllInOneQuiz();
  }

  @Get(':topic')
  getQuizTopic(@Param('topic') topic: string) {
    return this.appService.getQuizTopic(topic);
  }

  // Note: The 'learn' endpoint might have the same issue if it's inside this controller.
  // If it is, it should be just @Get('learn/:topic')
  @Get('learn/:topic')
  getLearnContent(@Param('topic') topic: string) {
    return this.appService.getLearnContent(topic);
  }
}