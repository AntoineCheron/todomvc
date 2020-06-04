package fr.cheron.antoine.todomvc.graphql;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GraphQLExceptionHandler {

  @ResponseStatus(HttpStatus.BAD_REQUEST)
  @ExceptionHandler(GraphQLException.class)
  public String handleGraphQLError(GraphQLException exception) {
    return exception.getMessage();
  }

}
