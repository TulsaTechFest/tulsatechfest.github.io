const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const markdownIt = require('markdown-it')

const filters = require('./utils/filters.js')
const transforms = require('./utils/transforms.js')
const shortcodes = require('./utils/shortcodes.js')
const iconsprite = require('./utils/iconsprite.js')

if (process.env.NODE_ENV === "development") {
    require("dotenv").config();
}

const isProduction = process.env.NODE_ENV === `production`;

module.exports = function (config) {
    // Plugins
    config.addPlugin(pluginRss)
    config.addPlugin(pluginNavigation)

    // Filters
    Object.keys(filters).forEach((filterName) => {
        config.addFilter(filterName, filters[filterName])
    })

    // Transforms
    Object.keys(transforms).forEach((transformName) => {
        config.addTransform(transformName, transforms[transformName])
    })

    // Shortcodes
    Object.keys(shortcodes).forEach((shortcodeName) => {
        config.addShortcode(shortcodeName, shortcodes[shortcodeName])
    })

    // Icon Sprite
    config.addNunjucksAsyncShortcode('iconsprite', iconsprite)

    // Asset Watch Targets
    config.addWatchTarget('./src/assets')

    // Markdown
    config.setLibrary(
        'md',
        markdownIt({
            html: true,
            breaks: true,
            linkify: true,
            typographer: true
        })
    )

    // Layouts
    config.addLayoutAlias('base', 'base.njk')
    // config.addLayoutAlias('conference', 'conference.njk')
    config.addLayoutAlias('event', 'event.njk')
    config.addLayoutAlias('faq', 'faq.njk')
    config.addLayoutAlias('post', 'post.njk')    
    config.addLayoutAlias('section', 'section.njk')
    config.addLayoutAlias('speaker', 'speaker.njk')
    config.addLayoutAlias('sponsor', 'sponsor.njk')
    // config.addLayoutAlias('sponsorFeature', 'sponsorFeature.njk')
    // config.addLayoutAlias('sponsorLevel', 'sponsorLevel.njk')

    // Pass-through files
    config.addPassthroughCopy('src/assets/css')
    config.addPassthroughCopy('src/assets/images')
    config.addPassthroughCopy('src/assets/fonts')
    config.addPassthroughCopy('src/assets/js')
    config.addPassthroughCopy('src/robots.txt')
    config.addPassthroughCopy('src/site.webmanifest')    

    // Deep-Merge
    config.setDataDeepMerge(true)

    // config.addCollection('alerts', collection => {
    //     return data.alerts; //collection.getFilteredByTag('alerts');
    //     //return collection.getFilteredByTag('page').reverse().sort((a,b) => b.data.order - a.data.order);
    // })

    function filterTagList(tags) {
        return (tags || []).filter(tag => ["all", "nav", "post", "posts"].indexOf(tag) === -1);
    }

    // Collections?
    config.addCollection('tags', collection => {
        let tags = new Set();    
        collection.getAll().forEach(item => {
            (item.data.tags || []).forEach(tag => tags.add(tag));
            // if ('tags' in item.data) {
            //     for (const tag of item.data.tags) {
            //         tags.add(tag);
            //     }
            // }
        });
        //return [...tags];
        return filterTagList([...tags]);
    });
    
    // config.addCollection('nav-about', collection => {
    //     return collection.getFilteredByTag('nav-about');
    // });

    // config.addCollection('nav-main', collection => {
    //     return collection.getFilteredByGlob('./src/data/nav/main/**.md');
    // });

    // config.addCollection('alerts', collection => {
    //      return collection.getFilteredByGlob('./src/data/alerts/**.md');
    // });
    // config.addCollection('links', collection => {
    //     return collection.getFilteredByTag('link');
    // });
    // config.addCollection('faqs', collection => {
    //     return collection.getFilteredByTag('faq');
    // });
    // config.addCollection('events', collection => {
    //     return collection.getFilteredByTag('event');
    // });
    // config.addCollection('nav', collection => {
    //     return collection.getFilteredByTag('page');
    //     //return collection.getFilteredByTag('page').reverse().sort((a,b) => b.data.order - a.data.order);
    // });
    // config.addCollection('posts', collection => {
    //     return collection.getFilteredByTag('post');
    // });
    // config.addCollection('components', collection => {
    //     return collection.getFilteredByTag('section');
    // });
    // config.addCollection('sponsors', collection => {
    //     return collection.getFilteredByTag('sponsors');
    // });
    // config.addCollection('sponsorLevels', collection => {
    //     return collection.getFilteredByTag('sponsorlevel').reverse().sort((a,b) => b.data.order - a.data.order);
    //     //return collection.getFilteredByTag('page').reverse().sort((a,b) => b.data.order - a.data.order);
    // });
    // config.addCollection('sponsorFeatures', collection => {
    //     return collection.getFilteredByTag('sponsorfeature');
    //     //return collection.getFilteredByTag('page').reverse().sort((a,b) => b.data.order - a.data.order);
    // });
    
    // Base Config
    return {
        dir: {
            input: 'src',
            output: 'dist',
            includes: 'includes',
            layouts: 'layouts',
            data: 'data'
        },
        templateFormats: ['njk', 'md', 'css', '11ty.js'],
        htmlTemplateEngine: 'njk',
        markdownTemplateEngine: 'njk'
    }
}
