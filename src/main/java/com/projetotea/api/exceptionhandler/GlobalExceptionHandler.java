package com.projetotea.api.exceptionhandler;


import com.projetotea.domain.exception.BaseEntityInUse;
import com.projetotea.domain.exception.BaseNotFoundException;
import com.projetotea.domain.exception.NegocioException;
import org.flywaydb.core.internal.util.ExceptionUtils;
import org.hibernate.PropertyValueException;
import org.springframework.boot.context.properties.bind.BindException;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.*;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import tools.jackson.core.JacksonException;
import tools.jackson.databind.exc.IgnoredPropertyException;
import tools.jackson.databind.exc.InvalidFormatException;
import tools.jackson.databind.exc.UnrecognizedPropertyException;

import java.nio.file.AccessDeniedException;
import java.util.List;
import java.util.stream.Collectors;
@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    private MessageSource messageSource;

    public GlobalExceptionHandler(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers,
                                                                  HttpStatusCode status, WebRequest request) {
        Throwable exception = ExceptionUtils.getRootCause(ex);

        if (exception instanceof InvalidFormatException) {
            return handleInvalidFormatException((InvalidFormatException) exception, headers, status, request);
        }

        if (exception instanceof IgnoredPropertyException) {
            return handleIgnorePropertyException((IgnoredPropertyException) exception, headers, status, request);
        }

        if(exception instanceof UnrecognizedPropertyException) {
            return handleUnrecognizedProperty((UnrecognizedPropertyException) exception, headers, status, request);
        }
        if(exception instanceof MethodArgumentNotValidException) {
            return handleMethodArgumentNotValid((MethodArgumentNotValidException) exception, headers, status, request);
        }

        ProblemType problemType = ProblemType.MENSAGEM_INCOMPREENSIVEL;
        String detail = "O corpo da requisição está inválido. Verifique erro de sintaxe";
        Problem problem = createProblemBuilder((HttpStatus) status, problemType, detail).build();
        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request);
    }

    protected ResponseEntity<Object>  handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
                                                                   HttpStatusCode status, WebRequest request) {
        List<String> paths = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> {
                    String path = error.getField();
                    String message;
                    if (error.getCode() != null && error.getCode().equals("typeMismatch")) {
                        message = String.format("Valor '%s' é inválido para o campo '%s'",
                                error.getRejectedValue(), path);
                    } else {
                        message = messageSource.getMessage(error, LocaleContextHolder.getLocale());
                    }
                    return String.format("'%s': '%s'", path, message);
                })
                .collect(Collectors.toList());
        String detail = String.format("Campos inválidos: '%s' ", String.join(", ", paths));
        Problem problem = createProblemBuilder((HttpStatus) status, ProblemType.ATRIBUTO_FALTANDO, detail).build();
        return handleExceptionInternal(ex, problem, headers, status, request);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleUncaughtException(
            Exception ex,
            WebRequest request) {

        logger.error("Erro interno não tratado", ex);

        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

        Problem problem = createProblemBuilder(
                status,
                ProblemType.ERRO_DE_SISTEMA,
                "Ocorreu um erro interno inesperado. Tente novamente."
        ).build();

        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request
        );
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<?> handleDataIntegrityViolationException(
            DataIntegrityViolationException ex,
            WebRequest request) {

        HttpStatus status = HttpStatus.BAD_REQUEST;

        ProblemType problemType = ProblemType.ATRIBUTO_FALTANDO;

        String detail = "Um ou mais campos obrigatórios não foram informados.";

        Problem problem = createProblemBuilder(
                status,
                problemType,
                detail
        ).build();

        return handleExceptionInternal(
                ex,
                problem,
                new HttpHeaders(),
                status,
                request
        );
    }
    @ExceptionHandler(AuthorizationDeniedException.class)
    public ResponseEntity<?> handleAuthorizationDeniedException(
            AuthorizationDeniedException ex,
            WebRequest request) {

        HttpStatus status = HttpStatus.FORBIDDEN;

        Problem problem = createProblemBuilder(
                status,
                ProblemType.SEM_PERMISSAO,
                "Você não possui permissão para acessar esse recurso.").build();

        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request);

    }


    private ResponseEntity<Object> handleUnrecognizedProperty(UnrecognizedPropertyException ex, HttpHeaders headers, HttpStatusCode
            status, WebRequest request) {
        String path = pather(ex.getPath());
        ProblemType problemType = ProblemType.PROPRIEDADE_NAO_RECONHECIDA;
        String detail = String.format("Campo '%s' não reconhecido ou inexistente", path);
        Problem problem = createProblemBuilder((HttpStatus) status, problemType, detail).build();
        return handleExceptionInternal(ex, problem, headers, status, request);
    }

    private ResponseEntity<Object> handleIgnorePropertyException(IgnoredPropertyException ex, HttpHeaders headers,
                                                                 HttpStatusCode status, WebRequest request) {
        String path = pather(ex.getPath());
        String detail = String.format("Campo '%s' inválido", path);
        ProblemType problemType = ProblemType.PROPRIEDADE_IGNORADA;
        Problem problem = createProblemBuilder((HttpStatus) status, problemType, detail).build();
        return handleExceptionInternal(ex, problem, headers, status, request);
    }

    private ResponseEntity<Object> handleInvalidFormatException(InvalidFormatException ex, HttpHeaders headers,
                                                                HttpStatusCode status, WebRequest request) {

        String path = pather(ex.getPath());
        ProblemType problemType = ProblemType.MENSAGEM_INCOMPREENSIVEL;
        String detail = String.format("A propriedade '%s' recebeu um valor inválido.",path);
        Problem problem = createProblemBuilder((HttpStatus) status, problemType, detail).build();

        return handleExceptionInternal(ex, problem, headers, status, request);
    }

    @ExceptionHandler(BaseNotFoundException.class)
    public ResponseEntity<?> handleNotFound(BaseNotFoundException ex, WebRequest request) {

        HttpStatus status = HttpStatus.NOT_FOUND;
        ProblemType problemType = ProblemType.ENTIDADE_NAO_ENCONTRADA;
        Problem problem = createProblemBuilder(status, problemType, ex.getMessage()).build();
        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(BaseEntityInUse.class)
    public ResponseEntity<?> handleEntidadeEmUso(BaseEntityInUse ex, WebRequest request) {
        HttpStatus status = HttpStatus.CONFLICT;
        String detail = ex.getMessage();
        ProblemType problemType = ProblemType.ENTIDADE_EM_USO;
        Problem problem = createProblemBuilder(status, problemType, detail).build();
        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request);
    }

    @ExceptionHandler(NegocioException.class)
    public ResponseEntity<?> handleNegocioException(NegocioException ex, WebRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        ProblemType problemType = ProblemType.REQUISICAO_INVALIDA;
        Problem problem = createProblemBuilder(status, problemType, ex.getMessage()).build();
        return handleExceptionInternal(ex, problem, new HttpHeaders(), status, request);
    }



    private Problem.ProblemBuilder createProblemBuilder(HttpStatus status, ProblemType problemType, String detail) {
        return Problem.builder()
                .status(status.value())
                .type(problemType.getUri())
                .title(problemType.getTitle())
                .detail(detail);

    }
    private String pather(List<JacksonException.Reference> references) {
        return references.stream()
                .map(JacksonException.Reference::getPropertyName)
                .collect(Collectors.joining("."));
    }
}
