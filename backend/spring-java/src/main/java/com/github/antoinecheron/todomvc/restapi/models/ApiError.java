package com.github.antoinecheron.todomvc.restapi.models;

public class ApiError extends Exception {

  public final int code;

  public ApiError(String message, int code) {
    super(message);
    this.code = code;
  }

}
