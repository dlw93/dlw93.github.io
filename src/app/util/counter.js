/**
 * @template {string} K, 
 * @template {number} V
 */
export class Counter extends Map {
    /**
     * @inheritdoc
     * 
     * @param {K} key 
     * @param {number} start 
     * 
     * @returns {V}
     */
    get(key, start = 0) {
        if (!this.has(key)) {
            this.set(key, this.#counter(start));
        }
        const counter = super.get(key);
        return counter();
    }

    #counter(start = 0) {
        let value = start;
        return function () {
            return value++;
        };
    }
}
