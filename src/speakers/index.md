---
title: "Speakers"
eleventyExcludeFromCollections: true
---

<h3>Speakers</h3>
<div class="col-full">{# col-full #}
    {% for item in collections.speakers | sortByOrder %}
        <h1>{{item.title | safe }}</h1>
    {% endfor %}
</div>