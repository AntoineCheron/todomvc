package com.github.antoinecheron.todomvc.graphql;

import java.util.Map;
import java.util.stream.Collectors;

import graphql.ExecutionInput;
import graphql.GraphQL;
import graphql.GraphQLError;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/graphql")
public class GraphQLController {

  private final GraphQL graphQL;

  public GraphQLController(@Autowired GraphQL graphQL) {
    this.graphQL = graphQL;
  }

  @GetMapping(produces="application/json") @ResponseBody
  public Mono<Map<String, Object>> getRequest(@RequestParam String query) {
    return this.resolveGraphQlQueries(Mono.just(query));
  }

  @PostMapping(produces="application/json") @ResponseBody
  public Mono<Map<String, Object>> postRequest(@RequestBody Publisher<String> body) {
    return this.resolveGraphQlQueries(body);
  }

  private Mono<Map<String, Object>> resolveGraphQlQueries(Publisher<String> query) {
    return Mono.fromDirect(query)
      .map(ExecutionInput::newExecutionInput)
      .map(this.graphQL::executeAsync).flatMap(Mono::fromFuture)
      .flatMap(result -> {
        if (result.isDataPresent()) {
          return Mono.just(result.toSpecification());
        } else {
          final var errorMessages = result.getErrors().stream()
            .map(GraphQLError::getMessage)
            .collect(Collectors.joining("\n"));
          return Mono.error(new GraphQLException(errorMessages));
        }
      });
  }

}
