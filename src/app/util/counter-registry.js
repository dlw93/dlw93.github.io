/**
 * @template {string} K, 
 * @template {number} V
 */
export class CounterRegistry extends Map {
    /**
     * @inheritdoc
     * 
     * @param {K} key 
     * @param {number} start 
     * 
     * @returns {(increment?: V) => V}
     */
    get(key, start = 0) {
        if (!this.has(key)) {
            this.set(key, this.#counter(start));
        }
        return super.get(key);
    }

    #counter(start = 0) {
        let value = start;
        return function (increment = 1) {
            return value += increment;
        };
    }
}
