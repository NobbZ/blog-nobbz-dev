+++
title = "Hello world!"
date = "2022-07-08"
# slug = "hello-world"
description = "Just a Hello World Post!"
authors = ["nobbz"]

[taxonomies]
tags = [
  "nix",
  "hello",
  "elixir",
  "erlang",
  "javascript",
]

[extra]
hero_image = "./hello.jpg"
hero_image_alt = "Papercraft toy in front of PHP echo statement"
hero_image_credit = "KOBU Agency on Unsplash"
hero_image_credit_link = "https://unsplash.com/@kobuagency"
hero_image_link = "https://unsplash.com/photos/67L18R4tW_w"
+++

This is mainly a short post to see whether or not the infrastructure is working
as intended.

Withing this blog, we will probably see some languages used, I am not happy with
all of them, though this is the world we are living in 😅.

```nix,linenos
# nix
{ hello, runCommandNoCC }:
runCommandNoCC "hello-world" {} ''
  ${hello}/bin/hello > $out
''
```

```elixir,linenos
# elixir
defmodule HelloWorld do
  def hello, do: "Hello, World"
end
```

```erlang,linenos
%% erlang
-module(hello).
hello() -> "Hello, World".
```

```js,linenos
// javascript
function hello() {
  return "Hello, World";
}
```
