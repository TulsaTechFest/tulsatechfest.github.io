const { DateTime } = require('luxon')

module.exports = {

    // itemDate: function(dateObj) {
    //     return new Date(dateObj).toLocaleFormat('%Y-%b%d');
    // },

    // dateFormat: function(dateObj, format) {
    //     return new Date(dateObj).toLocaleFormat(format);
    // },
    include: require("./include.js"),

    head: function(array, n) {
        if(!Array.isArray(array) || array.length === 0) {
          return [];
        }
        if( n < 0 ) {
          return array.slice(n);
        }
    
        return array.slice(0, n);
    },

    replace: function(value, searchValue, replaceValue) {
        return value.replace(searchValue, replaceValue)
    },

    exclude: function(values, ex) {         
        return values.filter(v => v !== ex);        
    },

    withCategory: function(values, key) {                 
        return values.find(v => v.data.key === key);
    },

    withTag: function(values, tag) {                 
        return values.find(v => v.tags === tag);
    },


    obfuscate: function(str) {
        const chars = []
        for (var i = str.length - 1; i >= 0; i--) {
            chars.unshift(['&#', str[i].charCodeAt(), ';'].join(''))
        }
        return chars.join('')
    },

    random: function(values) {
        values.sort(() => {
            return 0.5 - Math.random();
        });
        return values.slice(0, 1);
    },
    
    replace: function(value, find, replace) {
        return value.replace(find, replace);
    },

    urlspa: function(url, singlePageHomePage = '1') {
        return singlePageHomePage !== '1' ? url : url.replace('#','') + '/';
    },

    sortByOrder: function(values) {
        let vals =[...values];
        // if (!vals) return;
        return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
    },

    todate: function(dateObj) {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat("dd LLL yyyy");
    },
    
    // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
    tohtml: function(dateObj) {
        return DateTime.fromJSDate(dateObj, {zone: 'utc'}).toFormat('yyyy-LL-dd');
    },

    toformat: function(date, format) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    toiso: function(date) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    tolower: function(str) {
        return String(str).toLowerCase();
    },

    toupper: function(str) {
        return str.toUpperCase();
    },

    tostring: function(obj, type) {
        if (type == 'json'){
        return JSON.stringify(obj,null,'\t')
        }else{
            return String(obj) == '[object Object]' ? Object.prototype.toString.call(obj) : String(obj);
        }
    },

    tolist: function(obj) {
        return Object.entries(obj).map(e => ({ key: e[0], value: e[1] }));
    }
}
