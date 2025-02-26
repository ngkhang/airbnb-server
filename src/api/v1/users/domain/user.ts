import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: 'User Id', type: Number, example: 1 })
  id: number | string;

  @ApiProperty({
    description: 'Email',
    type: String,
    example: 'user1@gmail.com',
  })
  email: string;

  @ApiProperty({ description: 'Password', type: String, example: '' })
  password_hash: string;

  @ApiProperty({ description: 'Status', type: Boolean, example: false })
  is_locked: boolean;

  @ApiProperty({
    description: 'Updated at',
    type: String,
    example: '2025-02-18T10:15:29.000Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'Created at',
    type: String,
    example: '2025-02-18T10:15:29.000Z',
  })
  created_at: Date;
}
