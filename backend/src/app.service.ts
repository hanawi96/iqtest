import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth() {
    return {
      status: 'OK',
      message: '🧠 TestIQ Backend is running!',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    };
  }

  getStatus() {
    return {
      server: 'TestIQ Backend',
      status: 'healthy',
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV || 'development',
    };
  }
} 