package com.github.antoinecheron.todomvc.restapi.models;

import java.util.Collection;

import lombok.Value;

import com.github.antoinecheron.todomvc.commons.models.Todo;
import com.github.antoinecheron.todomvc.restapi.hypermedia.HypermediaRepresentation;

@Value
public class TodoCollectionHypermedia {

  private final Collection<HypermediaRepresentation<Todo>> todos;

}
