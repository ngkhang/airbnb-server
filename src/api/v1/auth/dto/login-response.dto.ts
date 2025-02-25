import { ResponseBaseDto } from 'src/shared/dto/response-base.dto';

import { User } from '../auth.service';

export class LoginResponseDto extends ResponseBaseDto<{
  token: string;
  user: User;
}> {}
