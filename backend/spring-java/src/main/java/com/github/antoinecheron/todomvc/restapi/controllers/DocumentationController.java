package com.github.antoinecheron.todomvc.restapi.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/rest")
public class DocumentationController {

  @RequestMapping(method = RequestMethod.OPTIONS, produces="application/json") @ResponseBody
  public Mono<String> getRestApiSemanticDocumentation() {
    return Mono.fromCallable(() -> {
      final var openApiDocumentationUrl = this.getClass().getClassLoader().getResource("openapi.yml");

      final var yamlReader = new ObjectMapper(new YAMLFactory());
      final var obj = yamlReader.readValue(openApiDocumentationUrl, Object.class);

      final var jsonWriter = new ObjectMapper();
      return jsonWriter.writeValueAsString(obj);
    });
  }

}
