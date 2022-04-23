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
}

module.exports = Category;