package com.github.antoinecheron.todomvc.restapi.hypermedia;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import lombok.Value;

public abstract class Link {

  @Value
  public static final class Simple extends Link {
    private final String value;

    public static class Serializer extends JsonSerializer<Simple> {

      @Override
      public Class<Simple> handledType() {
        return Simple.class;
      }

      @Override
      public void serialize(Simple value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeString(value.value);
      }
    }
  }

  @Value
  public static final class WithParameters extends Link {
    private final String relation;
    private final Map<String, Object> parameters;

    public static class Serializer extends JsonSerializer<WithParameters> {

      @Override
      public Class<WithParameters> handledType() {
        return WithParameters.class;
      }

      @Override
      public void serialize(WithParameters value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("relation", value.relation);
        provider.defaultSerializeField("parameters", value.parameters, gen);
        gen.writeEndObject();
      }
    }
  }

  public static class Serializer extends JsonSerializer<Link> {

    @Override
    public Class<Link> handledType() {
      return Link.class;
    }

    @Override
    public void serialize(Link value, JsonGenerator gen, SerializerProvider provider) throws IOException {
      if (value instanceof Link.Simple) {
        provider.defaultSerializeValue((Link.Simple) value, gen);
      } else if (value instanceof Link.WithParameters) {
        provider.defaultSerializeValue((Link.WithParameters) value, gen);
      }
    }
  }

}
