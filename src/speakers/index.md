---
layout: base
title: "Speakers"
eleventyExcludeFromCollections: true
---
{%- from "../includes/component.njk" import component -%}

{{ component('section', {title: 'Speakers', subtitle: '', data: collections.speakers}) }}