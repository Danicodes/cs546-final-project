// An enum for categories of professions

class Category {
    static SoftwareEng = new Category("Software Engineering");
    static Education = new Category("Education");
    static Writing = new Category("Writing");
    static GraphicDesign = new Category("Graphic Design");
    static HR = new Category("Human Resources");
    static Cooking = new Category("Cooking");
    static Painting = new Category("Painting");
    static Gambling = new Category("Gambling");
    static GameDesign = new Category("Game Design");

    constructor(name){
        this.name = name;
    }

    static get(from) {
        switch(from.trim().toLowerCase()) {
            case "software engineering": 
                return this.SoftwareEng;
            case "education": 
                return this.Education;
            case "writing":
                return this.Writing;
            case "graphicdesign":
                return this.GraphicDesign;
            case "hr":
                return this.HR;
            case "cooking":
                return this.Cooking;
            case "painting":
                return this.Painting;
            case "gambling":
                return this.Gambling;
            case "game design":
                return this.GameDesign;
            default:
                throw `Error: Undefined Category`;
        }
    }
}

module.exports = Category;