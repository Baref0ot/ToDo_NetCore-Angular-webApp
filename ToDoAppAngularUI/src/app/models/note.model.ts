export class Note {
    // ? marks properties as optional since data WILL be initialized via the API. This way TypeScript doesn't complain in the meantime.
    id?: number;
    note: string = '';
}