export class MailModel {
    constructor (
        public to: string,
        public message: MailMessage
    ) {}
}

export class MailMessage {
    constructor (
        public subject: string,
        public text: string,
        public html?: string
    ){}
}

export class MailTemplate {
    constructor (
        public subject: string,
        public text: string,
        public to?: string,
        public html?: string,
    ){}
}