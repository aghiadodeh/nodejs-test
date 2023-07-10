export default {
    /**
     * Get `page` and `per_page` from any object if keys is exist or return default values
     * @param {Object} object object contains `page` and `per_page` keys
     * @returns page, per_page
     */
    paginationData: (object) => {
        const data = object ? object : { limit: 30, page: 1 };
        const limit = parseInt(data.limit || 30);
        const page = parseInt(data.page || 1);
        console.log('object', object);
        const skip = (limit * page) - limit;
        return { limit, skip };
    },

    /**
     * make first char in string Uppercase
     * @param {String} username 
     * @returns same passed string
     */
    firstUpper: (username) => {
        const name = username.toLowerCase();
        return name.charAt(0).toUpperCase() + name.slice(1);
    },

    /**
     * group list by key
     * @param {Array<any>} list list you want to group by
     * @param {String} key the key which the list will grouped by
     * @returns {Array<any>}
     */
    groupByKey: (list, key) => list.reduce((hash, obj) => ({...hash, [obj[key]]:( hash[obj[key]] || [] ).concat(obj)}), {}),
};