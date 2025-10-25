import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Get root' })
  @ApiResponse({
    status: 200,
    description: 'Root endpoint',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        version: { type: 'string' },
        timestamp: { type: 'string' },
        endpoints: {
          type: 'object',
          properties: {
            health: { type: 'string' },
            api: { type: 'string' },
            auth: { type: 'string' },
            users: { type: 'string' },
            places: { type: 'string' },
          },
        },
      },
    },
  })
  @ApiTags('Health')
  getRoot() {
    return {
      message: 'Welcome to Side Advisor Backend API',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        health: '/health',
        api: '/api',
        auth: '/auth',
        users: '/users',
        places: '/places',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Get health' })
  @ApiResponse({
    status: 200,
    description: 'Health endpoint',
    schema: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        timestamp: { type: 'string' },
        service: { type: 'string' },
      },
    },
  })
  @ApiTags('Health')
  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'side-advisor-backend',
    };
  }
}
