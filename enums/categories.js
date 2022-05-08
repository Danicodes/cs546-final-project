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
    static Chicken = new Category("Chicken");
    static Art = new Category("Art");
    static Milkshakes = new Category("Milkshakes");
    static Restaurants = new Category("Restaurants");
    static Party = new Category("Party");
    static Fun = new Category("Fun");
    static Enjoyment = new Category("Enjoyment");
    static Birthday = new Category("Birthday");
    static GameDevelopment = new Category("Game Development");
    static Events = new Category("Events");
    static Medieval = new Category("Medieval");
    static Hobbies = new Category("Hobbies");
    static Help = new Category("Help");
    static Rejected = new Category("Rejected");
    static Gaming = new Category("Gaming");
    static Sports = new Category("Sports");
    static Curling = new Category("Curling");
    static Hello = new Category("Hello");
    static Post = new Category("Post");
    static Request = new Category("Request");
    static SoftwareDevelopment = new Category("SoftwareDevelopment");
    static Adventure = new Category("Adventure");

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
            case "chicken":
                return this.Chicken;
            case "art":
                return this.Art;
            case "milkshakes":
                return this.Milkshakes;
            case "restaurants":
                return this.Restaurants;
            case "party":
                return this.Party;
            case "fun":
                return this.Fun;
            case "enjoyment":
                return this.Enjoyment;
            case "birthday":
                return this.Birthday;
            case "game development":
                return this.GameDevelopment;
            case "gamedevelopment":
                return this.GameDevelopment;
            case "events":
                return this.Events;
            case "medieval":
                return this.Medieval;
            case "hobbies":
                return this.Hobbies;
            case "help":
                return this.Help;
            case "rejected":
                return this.Rejected;
            case "gaming":
                return this.Gaming;
            case "sports":
                return this.Sports;
            case "curling":
                return this.Curling;
            case "hello":
                return this.Hello;
            case "post":
                return this.Post;
            case "request":
                return this.Request;
            case "software development":
                return this.SoftwareDevelopment;
            case "softwaredevelopment":
                return this.SoftwareDevelopment;
            case "adventure":
                return this.Adventure;
            default:
                throw `Error: Undefined Category`;
        }
    }
}

module.exports = Category;