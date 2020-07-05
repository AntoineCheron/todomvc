package com.github.antoinecheron.todomvc.commons;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.http.codec.json.Jackson2JsonEncoder;
import org.springframework.web.reactive.config.EnableWebFlux;
import org.springframework.web.reactive.config.WebFluxConfigurer;

@Configuration
@EnableWebFlux
public class WebConfig implements WebFluxConfigurer {

  @Override
  public void configureHttpMessageCodecs(ServerCodecConfigurer configurer) {
    final var config = configurer.defaultCodecs();
    final var objectMapper = JacksonConfiguration.objectMapper();
    config.jackson2JsonEncoder(new Jackson2JsonEncoder(objectMapper));
    config.jackson2JsonDecoder(new Jackson2JsonDecoder(objectMapper));
  }

}
