package com.projetotea.api.exceptionhandler;

import lombok.Getter;

@Getter
public enum ProblemType {

    MENSAGEM_INCOMPREENSIVEL("Mensagem incompreensível", "/mensagem-incompreensivel"),

    RECURSO_NAO_ENCONTRADO("Recurso não encontrado", "/recurso-nao-encontrado"),

    RECURSO_EM_USO("Recurso em uso", "/recurso-em-uso"),

    HORARIO_EM_CONFLITO("Horário em conflito", "/horario-em-conflito"),

    ERRO_DE_NEGOCIO("Violação de regra de negócio", "/erro-de-negocio"),

    ERRO_DE_SISTEMA("Erro interno de sistema", "/erro-de-sistema"),

    PROPRIEDADE_NAO_RECONHECIDA("Propriedade não reconhecida", "/propriedade-nao-reconhecida"),

    ATRIBUTO_FALTANDO("Está faltando atributos no body", "/atributos-faltando"),

    PROPRIEDADE_IGNORADA("Propriedade Ignorada no Domain", "/mensagem-ignorada"),

    ENTIDADE_NAO_ENCONTRADA("Entidade não encontrada", "/entidade-nao-encontrada"),

    ENTIDADE_EM_USO("Entidade em uso", "/entidade-em-uso"),

    REQUISICAO_INVALIDA("Requisição inválida", "/requisicao-invalida"),

    SEM_PERMISSAO("Acesso negado", "/acesso-negado");




    private final String title;
    private final String uri;

    ProblemType(String title, String path) {
        this.title = title;
        this.uri = "https://projetotea.com.br" + path;
    }

}