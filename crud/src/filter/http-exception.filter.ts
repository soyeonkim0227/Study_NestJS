import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

// 기존 예외 처리
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                path: request.url
            });

        console.log(exception);
    }
}

/**
 * nest에서는 예외처리를 하지 않아도 알아서 보기 쉬운 형식으로 에러를 변환하여 전송하는 표준 예외 처리를 제공한다.
 * nest 기본적으로 제공하는 예외처리는 내장된 전역 예외 필터에 의해 수행된다.
 * 예외처리의 재사용성을 고려하여 하나로 모여 필터링을 거친 후, response로 반환해 주는 형식으로 예외필터를 만들고 사용할 수 있다.
 */