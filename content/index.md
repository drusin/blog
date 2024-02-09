---
title: Dawid's blog
layout: layout.html
---
{% for post in collections.post %}
## [{{ post.data.title }}]({{ post.url }})

{{ post.content }}
{% endfor %}