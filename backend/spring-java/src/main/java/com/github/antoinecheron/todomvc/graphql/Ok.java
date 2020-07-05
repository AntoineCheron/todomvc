package com.github.antoinecheron.todomvc.graphql;

import java.util.Map;

import graphql.schema.Coercing;
import graphql.schema.CoercingParseLiteralException;
import graphql.schema.CoercingParseValueException;
import graphql.schema.CoercingSerializeException;
import graphql.schema.GraphQLScalarType;

public final class Ok implements Coercing<Ok, String> {

  public static final Ok OK = new Ok();

  public static final GraphQLScalarType OK_GRAPH_QL_SCALAR = GraphQLScalarType.newScalar()
    .name("Ok")
    .description("A custom scalar to represent the result of an operation returning nothing.")
    .coercing(OK)
    .build();

  private Ok() {}

  @Override
  public Ok parseLiteral(Object input, Map<String, Object> variables) throws CoercingParseLiteralException {
    return OK;
  }

  @Override
  public String serialize(Object dataFetcherResult) throws CoercingSerializeException {
    return "ok";
  }

  @Override
  public Ok parseValue(Object input) throws CoercingParseValueException {
    return OK;
  }

  @Override
  public Ok parseLiteral(Object input) throws CoercingParseLiteralException {
    return OK;
  }
}
