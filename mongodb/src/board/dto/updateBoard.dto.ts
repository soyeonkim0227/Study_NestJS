import { IsString } from "class-validator";

export class BoardDto {
    @IsString()
    title: string;

    @IsString()
    content: string
}