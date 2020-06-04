package fr.cheron.antoine.todomvc.graphql;

import java.util.List;
import java.util.stream.Collectors;

import graphql.GraphQLError;

public class GraphQLException extends Exception {

  public GraphQLException(String message) {
    super(message);
  }

  public static GraphQLException of(List<GraphQLError> errors) {
    final var errorMessages = errors.stream()
      .map(GraphQLError::getMessage)
      .collect(Collectors.joining("\n"));
    return new GraphQLException(errorMessages);
  }
  
}
