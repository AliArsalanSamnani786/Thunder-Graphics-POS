import { IsBoolean, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class RegisterBusinessDto {
  @IsString()
  @IsNotEmpty()
  businessName!: string;

  @IsString()
  @IsNotEmpty()
  ownerName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  mobileNumber!: string;

  @IsString()
  @IsNotEmpty()
  whatsappNumber!: string;

  @IsString()
  @IsNotEmpty()
  country!: string;

  @IsString()
  @Length(10, 128)
  password!: string;

  @IsBoolean()
  acceptedTerms!: boolean;

  @IsBoolean()
  acceptedPrivacy!: boolean;

  @IsOptional()
  @IsString()
  deviceFingerprint?: string;
}

