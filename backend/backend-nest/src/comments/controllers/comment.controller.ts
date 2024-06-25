// src/comments/controllers/comments.controller.ts

import { Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { CommentsService } from '../services/comment.service';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../DTO/create-comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) { }

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<CommentEntity> {
        return await this.commentsService.create(createCommentDto);
    }

    @Get()
    async findAll(): Promise<CommentEntity[]> {
        return await this.commentsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<CommentEntity> {
        return await this.commentsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCommentDto: CreateCommentDto): Promise<CommentEntity> {
        return await this.commentsService.update(id, updateCommentDto);
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
        await this.commentsService.remove(id);
    }

    @Get('book/:bookId')
    async findByBook(@Param('bookId', ParseIntPipe) bookId: number): Promise<CommentEntity[]> {
        return await this.commentsService.findByBook(bookId);
    }
}
