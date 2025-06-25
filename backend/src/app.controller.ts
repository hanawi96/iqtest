import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('Health')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return this.appService.getHealth();
  }

  @Get('status')
  @ApiOperation({ summary: 'Server status' })
  getStatus() {
    return this.appService.getStatus();
  }
} 