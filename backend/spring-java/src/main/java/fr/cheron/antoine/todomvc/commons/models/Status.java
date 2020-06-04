package fr.cheron.antoine.todomvc.commons.models;

import java.util.Optional;

import lombok.Getter;

@Getter
public enum Status {
  ALL, COMPLETED, ACTIVE;

  public static Optional<Status> of(String s) {
    try {
      return Optional.of(Status.valueOf(s));
    } catch (IllegalArgumentException e) {
      return Optional.empty();
    }
  }
}
