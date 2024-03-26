---
layout: layout-main.html
---
{% assign sorted_posts = collections.post | reverse: "published" %}
{% for post in sorted_posts | reverse: "published" %}
## [{{ post.data.title }}]({{ post.url }})
{{ post.content | split: '</p>' | first }}
{% endfor %}