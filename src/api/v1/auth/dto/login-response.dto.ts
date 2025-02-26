import { ApiProperty } from '@nestjs/swagger';

import { ResponseBaseDto } from 'src/shared/dto/response-base.dto';

import { User } from '../../users/domain/user';

export class LoginResponseDto extends ResponseBaseDto<{
  user: User;
  token: string;
}> {
  @ApiProperty({
    type: 'object',
    properties: {
      user: { type: User },
      token: { type: 'string' },
    },
  })
  content: {
    user: User;
    token: string;
  };
}
