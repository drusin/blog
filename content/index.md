---
title: Dawid's blog
layout: layout-main.html
---
{% assign sorted_posts = collections.post | reverse: "published" %}
{% for post in sorted_posts %}
## [{{ post.data.title }}]({{ post.url }})
{{ post.content | split: '</p>' | first }}
<div class="summary-footer">
    {% render 'common/render-date', published: post.data.published, modified: post.data.modified %}
    {% render 'common/render-tags', tags: post.data.tags %}
</div>
{% endfor %}