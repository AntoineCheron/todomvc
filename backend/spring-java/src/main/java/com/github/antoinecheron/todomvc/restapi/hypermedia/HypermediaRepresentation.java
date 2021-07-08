package com.github.antoinecheron.todomvc.restapi.hypermedia;

import java.io.IOException;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;
import com.github.antoinecheron.todomvc.commons.JacksonConfiguration;
import lombok.Value;
import lombok.extern.log4j.Log4j2;

@Value
public class HypermediaRepresentation<T> {

  private final T resource;
  private final List<Link> links;

  public static class Builder<T> {
    private final T resource;
    private final List<Link> links;

    private Builder(T resource) {
      this.resource = resource;
      this.links = new LinkedList<>();
    }

    public static <A> Builder<A> of (A resource) {
      return new Builder<>(resource);
    }

    public Builder<T> withLink(String relation) {
      this.links.add(new Link.Simple(relation));
      return this;
    }

    public Builder<T> withLink(String relation, Map<String, Object> parameters) {
      this.links.add(new Link.WithParameters(relation, parameters));
      return this;
    }

    public HypermediaRepresentation<T> build() {
      return new HypermediaRepresentation<>(this.resource, Collections.unmodifiableList(this.links));
    }
  }

  @Log4j2
  public static class Serializer extends JsonSerializer<HypermediaRepresentation> {

    @Override
    public Class<HypermediaRepresentation> handledType() {
      return HypermediaRepresentation.class;
    }

    @Override
    public void serialize(HypermediaRepresentation value, JsonGenerator gen, SerializerProvider provider) throws IOException {
      if (value.resource instanceof Collection) {
        log.warn("Can not create an hypermedia representation of an array. Links can not be added into an array. Please transform the array into an object.");

        provider.defaultSerializeValue(value.resource, gen);
      } else {
        final var objectMapper = JacksonConfiguration.objectMapper();

        final ObjectNode mainObject = objectMapper.convertValue(value.resource, ObjectNode.class);
        final ArrayNode linksArray = mainObject.putArray("_links");
        value.links.forEach(link -> linksArray.add(objectMapper.valueToTree(link)));

        mainObject.serialize(gen, provider);
      }
    }
  }

}
