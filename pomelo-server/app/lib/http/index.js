/**
 * http component组件
 */
module.exports = {
	components: `${__dirname}/components/`,
	beforeFilters: [],
	afterFilters: [],

	filter: (filter) => {
		if (filter.before) {
			this.beforeFilters.push(filter.before.bind(filter));
		}
		if (filter.after) {
			this.afterFilters.push(filter.after.bind(filter));
		}
	},

	beforeFilter: (filter) => {
		this.beforeFilters.push(filter);
	},

	afterFilter: (filter) => {
		this.afterFilters.push(filter);
	},
};
