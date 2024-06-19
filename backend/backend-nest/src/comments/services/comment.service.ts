// src/services/comments.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from '../DTO/create-comment.dto';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(CommentEntity)
        private commentRepository: Repository<CommentEntity>,
        @InjectRepository(BookEntity)
        private bookRepository: Repository<BookEntity>,
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<CommentEntity> {
        const { comment, bookId, userId } = createCommentDto;

        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new NotFoundException(`Book with ID ${bookId} not found`);
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        const newComment = this.commentRepository.create({  
            comment,
            book,
            user,
        });

        return await this.commentRepository.save(newComment);
    }

    async findAll(): Promise<CommentEntity[]> {
        return await this.commentRepository.find({ relations: ['book', 'user'] });
    }

    async findOne(id: number): Promise<CommentEntity> {
        const comment = await this.commentRepository.findOne({ where: { id }, relations: ['book', 'user'] });

        if (!comment) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }

        return comment;
    }

    async update(id: number, updateCommentDto: CreateCommentDto): Promise<CommentEntity> {
        const { comment, bookId, userId } = updateCommentDto;

        const commentToUpdate = await this.commentRepository.findOne({ where: { id } });
        if (!commentToUpdate) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }

        const book = await this.bookRepository.findOne({ where: { id: bookId } });
        if (!book) {
            throw new NotFoundException(`Book with ID ${bookId} not found`);
        }

        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        commentToUpdate.comment = comment || commentToUpdate.comment;
        commentToUpdate.book = book;
        commentToUpdate.user = user;

        return await this.commentRepository.save(commentToUpdate);
    }

    async remove(id: number): Promise<void> {
        const commentToRemove = await this.commentRepository.findOne({ where: { id } });

        if (!commentToRemove) {
            throw new NotFoundException(`Comment with ID ${id} not found`);
        }

        await this.commentRepository.remove(commentToRemove);
    }

    async findByBook(bookId: number): Promise<CommentEntity[]> {
        const comments = await this.commentRepository.find({
            where: { book: { id: bookId } }, // Aqui estamos buscando todos os comentários relacionados a um livro pelo ID do livro
            relations: ['book', 'user'],
        });

        return comments; // Retorna uma lista de comentários relacionados ao livro com o ID fornecido
    }
}
