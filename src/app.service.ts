import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class AppService {
  getQuestions(): any {
    const filePath = join(process.cwd(), 'data', 'quiz-data.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
  }
}