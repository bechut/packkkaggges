import { CallHandler, ExecutionContext } from '@nestjs/common';
import { ResponseInterceptor } from './response.interceptor';
import { Observable, of } from 'rxjs';
import { Test, TestingModule } from '@nestjs/testing';

describe('Response interceptor', () => {
  let interceptor: ResponseInterceptor<any>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseInterceptor],
    }).compile();

    interceptor = module.get<ResponseInterceptor<any>>(ResponseInterceptor);
  });

  const context = {} as ExecutionContext;
  const handler = async (next: CallHandler) => {
    const observable = interceptor.intercept(context, next) as Observable<any>;

    try {
      await observable.toPromise();
    } catch (err) {
      expect(err).toBeInstanceOf(1);
      expect(err).not.toBeNull();
    }
  };

  it('data return object', async () => {
    const next = {
      handle: jest.fn(() => of({})),
    } as CallHandler;
    handler(next);
    expect(next.handle).toHaveBeenCalled();
  });

  it('data return array', async () => {
    const next = {
      handle: jest.fn(() => of([])),
    } as CallHandler;
    handler(next);
    expect(next.handle).toHaveBeenCalled();
  });

  it('data return string', async () => {
    const next = {
      handle: jest.fn(() => of('')),
    } as CallHandler;
    handler(next);
    expect(next.handle).toHaveBeenCalled();
  });

  it('data return number', async () => {
    const next = {
      handle: jest.fn(() => of(1)),
    } as CallHandler;
    handler(next);
    expect(next.handle).toHaveBeenCalled();
  });
});
