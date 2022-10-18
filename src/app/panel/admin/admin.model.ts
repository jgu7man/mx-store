export interface AdminInterface {
    email: string;
    password?:string
    displayName?: string;
    rol?: 'admin' | 'editor' | 'colab' | 'revoke'
    uid?: string;
}

export interface AdminRol {
    value: string,
    viewValue: string
}