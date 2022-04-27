// An enum for categories of professions

class Category {
    static SoftwareEng = new Category("Software Engineering");
    static Education = new Category("Education");
    static Writing = new Category("Writing");
    static GraphicDesign = new Category("Graphic Design");
    static HR = new Category("Human Resources");

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
            default:
                throw `Error: Undefined Category`;
        }
    }
}

module.exports = Category;