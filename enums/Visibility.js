class Visibility {
    static Public = new Visibility("public");
    static Private = new Visibility("private");

    constructor(name) {
        this.name = name.trim().toLowerCase();
    }

    static get(from) {
        switch(from.trim().toLowerCase()) {
            case "public": 
                return this.Public;
            case "private": 
                return this.Private;
            default: 
                throw `Error: Undefined Visibility`; 
        }
    }
}