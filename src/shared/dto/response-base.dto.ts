import { ApiProperty, ApiSchema } from '@nestjs/swagger';

@ApiSchema({
  name: 'The response base',
})
export class ResponseBaseDto<T = null> {
  @ApiProperty({
    description: 'Status code',
    type: 'number',
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    description: 'Response message',
    type: 'string',
    example: 'Success',
  })
  message: string;

  @ApiProperty({
    description: 'The data response',
    type: 'null',
    example: null,
  })
  content: T;

  @ApiProperty({
    description: 'Current date',
    type: 'string',
    example: '2025-02-26T07:10:27.791Z',
  })
  dateTime: Date;
}
