const { DateTime } = require('luxon')

module.exports = {

    // itemDate: function(dateObj) {
    //     return new Date(dateObj).toLocaleFormat('%Y-%b%d');
    // },

    // dateFormat: function(dateObj, format) {
    //     return new Date(dateObj).toLocaleFormat(format);
    // },
    include: require("./include.js"),

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

    dateToFormat: function(date, format) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toFormat(
            String(format)
        )
    },

    dateToISO: function(date) {
        return DateTime.fromJSDate(date, { zone: 'utc' }).toISO({
            includeOffset: false,
            suppressMilliseconds: true
        })
    },

    lowercase: function(str) {
        return str.toLowerCase();
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

    sortByOrder: function(values) {
        let vals =[...values];
        return vals.sort((a, b) => Math.sign(a.data.order - b.data.order));
    },

    uppercase: function(str) {
        return str.toUpperCase();
    }
}
