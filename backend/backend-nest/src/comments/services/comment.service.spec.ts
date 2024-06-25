import { Test, TestingModule } from '@nestjs/testing';
import { CommentsService } from './comment.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CommentEntity } from '../entities/comment.entity';
import { BookEntity } from '../../books/entities/book.entity';
import { UserEntity } from '../../users/entities/user.entity';
import { CreateCommentDto } from '../DTO/create-comment.dto';
import { NotFoundException } from '@nestjs/common';

describe('CommentsService', () => {
  let service: CommentsService;
  let commentRepositoryMock: any;
  let bookRepositoryMock: any;
  let userRepositoryMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentsService,
        {
          provide: getRepositoryToken(CommentEntity),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(BookEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentsService>(CommentsService);
    commentRepositoryMock = module.get(getRepositoryToken(CommentEntity));
    bookRepositoryMock = module.get(getRepositoryToken(BookEntity));
    userRepositoryMock = module.get(getRepositoryToken(UserEntity));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new comment', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test comment',
        bookId: 1,
        userId: 1,
      };

      const mockComment = new CommentEntity();
      mockComment.comment = createCommentDto.comment;

      jest.spyOn(bookRepositoryMock, 'findOne').mockResolvedValueOnce({ id: 1 } as BookEntity);
      jest.spyOn(userRepositoryMock, 'findOne').mockResolvedValueOnce({ id: 1 } as UserEntity);
      jest.spyOn(commentRepositoryMock, 'create').mockReturnValue(mockComment);
      jest.spyOn(commentRepositoryMock, 'save').mockResolvedValue(mockComment);

      const result = await service.create(createCommentDto);
      expect(result).toEqual(mockComment);
    });

    it('should throw NotFoundException when book not found', async () => {
      const createCommentDto: CreateCommentDto = {
        comment: 'Test comment',
        bookId: 999, 
        userId: 1,
      };

      jest.spyOn(bookRepositoryMock, 'findOne').mockResolvedValueOnce(undefined);

      await expect(service.create(createCommentDto)).rejects.toThrowError(NotFoundException);
    });
  });
});
