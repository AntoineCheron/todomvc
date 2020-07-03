package com.github.antoinecheron.todomvc.restapi.hypermedia;

import java.io.IOException;
import java.util.Map;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import lombok.Value;

public abstract class Link {

  @Value
  public static final class Simple extends Link {
    private final String value;

    public static class Serializer extends StdSerializer<Simple> {

      public Serializer() { super(Simple.class); }

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

    public static class Serializer extends StdSerializer<WithParameters> {

      public Serializer() { super(WithParameters.class); }

      @Override
      public void serialize(WithParameters value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("relation", value.relation);
        provider.defaultSerializeField("parameters", value.parameters, gen);
        gen.writeEndObject();
      }
    }
  }

}
