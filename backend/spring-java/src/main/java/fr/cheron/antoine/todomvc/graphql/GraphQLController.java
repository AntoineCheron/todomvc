package fr.cheron.antoine.todomvc.graphql;

import graphql.GraphQL;
import org.reactivestreams.Publisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

@Controller
@RequestMapping("/graphql")
public class GraphQLController {

  private final GraphQL graphQL;

  public GraphQLController(@Autowired GraphQL graphQL) {
    this.graphQL = graphQL;
  }

  @GetMapping
  public Mono<String> getRequest(@RequestParam Publisher<String> query) {
    return this.resolveGraphQlQueries(query);
  }

  @PostMapping
  public Mono<String> postRequest(@RequestBody Publisher<String> body) {
    return this.resolveGraphQlQueries(body);
  }

  private Mono<String> resolveGraphQlQueries(Publisher<String> query) {
    return Mono.fromDirect(query)
      .map(this.graphQL::execute)
      .map(result -> result.getData().toString());
  }

}
