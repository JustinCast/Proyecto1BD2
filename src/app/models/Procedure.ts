export class Procedure {
    constructor(
        public tableSchema?: string,
        public table?: string,
        public procSchema?: string,
        public prefix?: string,
        public action?: number
    ) {}
}