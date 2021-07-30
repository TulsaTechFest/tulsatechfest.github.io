module.exports = {
    icon: function (name) {
        return `<svg class="icon icon--${name}" role="img" aria-hidden="true" width="24" height="24">
                    <use xlink:href="#icon-${name}"></use>
                </svg>`
    },
    list: function(name, itemClass, options, data) {
        fs = require('fs');
        items = (typeof data !== 'string') ? data : JSON.parse(fs.readFileSync(`./src/data/${data}.js`));
        var results = ``;
        for (item in items) {
            results += `<li class="${itemClass}">`
            if (options.includes('link')) {
                results += `<a href="${item.url}" target="_blank" rel="noopener">`;
            }
            if (options.includes('icon')) {
                results += `<i class="${item.icon}"></i>`;
            }
            if (options.includes('img')) {
                results += `<img src="${item.img}" alt="${item.title}"></i>`;
            }
            if (options.includes('title')) {
                results += item.title;
            }
            if (options.includes('link')) {
                results += `</a>`;
            }
            results += `</li>`;
        }
        return `<ul class="${name}">${results}</ul>`
    },
    sectionList: function(name, itemClass, options, data) {
        let results = `<section id="${name}s"><div class="overlay"></div><div class="gradient-overlay"></div><div class="row narrow section-intro with-bottom-sep animate-this"><div class="col-full"><h3>${name}s</h3>`;
        //items = data;//(typeof data !== 'string') ? data : JSON.parse(fs.readFileSync(`./src/data/${data}.js`));
        let items =[...data];
        for (item in items) {
            //results += `<li class="${itemClass}">${item}` + item;
            results += `<li class="${itemClass}">`;
            let itemData = items[item];
            results += `${itemData}`;
            if (options.includes('link')) {
                let href = item.data && item.data.url ? item.data.url : ``;
                let target = href.startsWith('http') ? ` target="_blank" rel="noopener"` : ``;
                results += `<a href="${href}"${target}>`;
            }
            if (options.includes('icon')) {
                results += `<i class="${item.data.icon}"></i>`;
            }
            if (options.includes('img')) {
                results += `<img src="${item.data.img}" alt="${item.title}"></i>`;
            }
            if (options.includes('title')) {
                results += `${item.data.title}`;
            }
            if (options.includes('link')) {
                results += `</a>`;
            }
            results += `</li>`;
        }
        results += `</div></div></section>`
        return results;
    },
    carousel: function(name, data) {
        let results = ``;
        for (item in data) {
            results += `<div class="owl-item cloned" style="width: 117.5px; margin-right: 50px;"><div><i class="${item.icon}"></i></div></div>`
        }
        return `<section id="${name}s"><div class="row animate-this fadeInUp animated"><div class="col-twelve"><div class="${name}-lists owl-carousel owl-loaded owl-drag"><div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(-1005px, 0px, 0px); transition: all 0s ease 0s; width: 3853px;">${results}</div></div></div></div></div></section>`
    },
    iconImage: function (name){
        return `<i class="${name}"></i>`;
    },
    useComponent: function( compName, collection ) {
        singleComp = collection.filter(function( comp ) {
            return comp.inputPath.indexOf( compName + "/code.html" ) > -1;
        });
        return singleComp[ 0 ].template.frontMatter.content;
    }
}
