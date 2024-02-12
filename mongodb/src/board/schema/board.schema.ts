import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type BoardDocument = Board & Document

@Schema()
export class Board {
    @Prop()
    id: number;
    
    @Prop()
    title: string;

    @Prop()
    content: string;
}

export const BoardSchema = SchemaFactory.createForClass(Board);