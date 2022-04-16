const data = require('../data/relationships');
const { ObjectId } = require('mongodb');
const Category = require('../data/categories');

module.exports = 
    async function(){
        // Create 5 relationship objects, not tied to existing users
        let mentor = ObjectId();
        let mentee = ObjectId();
        let relationshipDesc = "I've been coding for 3 years, how do I get to the next stage of my career"
        await data.createRelationship(relationshipDesc, mentor, mentee, Category.SoftwareEng);

        mentor = ObjectId();
        mentee = ObjectId();
        relationshipDesc = "How to communicate more effectively with my students";
        await data.createRelationship(relationshipDesc, mentor, mentee, Category.Education);

        mentor = ObjectId();
        mentee = ObjectId();
        relationshipDesc = "How to I make the shift from Data Analyst to Software Engineer";
        await data.createRelationship(relationshipDesc, mentor, mentee, Category.SoftwareEng);

        mentor = ObjectId();
        mentee = ObjectId();
        relationshipDesc = "I've been writing at the New York Times for 10 years, thinking of starting my own publication";
        await data.createRelationship(relationshipDesc, mentor, mentee, Category.Writing);
        
        mentor = ObjectId();
        mentee = ObjectId();
        relationshipDesc = "I just started working in HR, how do I ensure I'm doing good work?";
        await data.createRelationship(relationshipDesc, mentor, mentee, Category.HR);

        return;
    };
