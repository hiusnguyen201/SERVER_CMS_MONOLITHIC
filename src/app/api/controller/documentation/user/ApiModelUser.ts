import { ApiProperty } from '@nestjs/swagger';

export class ApiModelUser {
  @ApiProperty({ type: 'string' })
  public id: string;

  @ApiProperty({ type: 'string' })
  public avatar: string;

  @ApiProperty({ type: 'string' })
  public name: string;

  @ApiProperty({ type: 'string' })
  public email: string;

  @ApiProperty({ type: 'string' })
  public phone: string;

  @ApiProperty({ type: 'string' })
  public address: string;

  @ApiProperty({ type: 'boolean' })
  public isVerified: boolean;

  @ApiProperty({ type: 'string' })
  public verifiedAt: Date;

  @ApiProperty({ type: 'string' })
  public createdAt: Date;

  @ApiProperty({ type: 'string' })
  public updatedAt: Date;
}
