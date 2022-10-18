export class MxStoreCategoryModel {
    constructor (
        public name: string,
        public fields: string[],
        public path?: string,
        public image?: string,
        public description?: string
    ) {

    }
}
