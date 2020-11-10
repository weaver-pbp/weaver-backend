import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class CreateGameDto {
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    public name: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(1024)
    public description: string;
}
