# Mentor Network Project

## Contribution Structure
---

### Before you start
If you haven't already, clone this repository to your desired directory
```
git clone git@github.com:Danicodes/cs546-final-project.git
```
The dev branch will be the starting point for any development done on this project, so before creating any new branch please checkout the dev branch.
```
git checkout dev
```

Ensure that you pull from the dev branch before you start contributing. Always ensure that your local branch is up-to-date with dev before making a pull request!

```
git pull 
```
If there were any changes made to dev after you've started working on your local topic branch branch, you need to merge dev into your local branch. While on your branch, use the command 
```
git merge dev
```

### Branches
Branches should be hyphen separated, short descriptions of the work the branch is concerning. If working on a standard feature please prepend your branch name with 'feature-' and if you are working on a bug fix, please prepend your branch name with 'fix-'. Examples: 'feature-user-routes', 'fix-user-data', 'feature-add-views'

Create and start working on a new local branch with the following syntax (remember to do this initially from the dev branch):
 ```
 git checkout -b <new branch name>
 ```

Switch to a branch by using the following command:
```
git checkout <existing branch name>
```

### Clean Code
 Please use clearly worded comments and descriptive variable names so that it will be easy for the rest of the team to follow your logic and solve any issues that may arise in the future. As a rule of thumb, if you feel that a certain portion of your code may be difficult to follow, include a comment.

### Commits
When working on a feature locally, don't forget to commit your work. Again please use descriptive commit messages so that the rest of the team understands what was done once the code is pushed to the remote repository.
```
git commit -m "Created main.handlebars layout for the homepage"
```

When working on a 'fix' branch, please create a longer, itemized commit message. (See [creating longer commit message](https://haydar-ai.medium.com/learning-how-to-git-creating-a-longer-commit-message-16ca32746c3a)) 

### Push
If you're working alongside someone else on the same branch, please push often enough that the other person/s has access to your changes.

### Pull Requests
Only make a pull request for a branch that is functional with the latest version of the dev branch. We will decide whether code can be merged by semi-formal code review via the github UI. Comment on the pull request with any potential concerns and when at least two other members of the team have reviewed and approved the code, then it will be merged with dev.

### Merge Conflicts
AVOID AT ALL COSTS

If you do encounter a merge conflict for some reason, you can resolve the changes line by line using your IDE.

This command will show you which commits are conflicting
```
git log --merge
```

This command will be useful for determining which lines of one or more files are different between two commits
```
git diff <commit-hash-1> <commit-hash-2> [Optional: <filename>]
```

More on merge conflicts [here](!https://www.atlassian.com/git/tutorials/using-branches/merge-conflicts)


### Releases
The 'main' branch will serve as our production branch for this project. The main branch will contain changes merged from the 'release' branch. Our release branch will allow us to test the final pre-production branch and identify any areas for bug fixes prior to merging the release branch into main. In other words, the release branch will serve as a buffer between our newly added features and the main branch that is in a working, deliverable state.

### Merge Schedule
- *Reviewed* feature or fix branches may be merged into dev as often as there are pull requests, the team will need to pull these changes as othen as possible to minimize merge conflicts
- Changes on the dev branch will be tested and merged into the release branch (1 to 2 times a week)
- The release branch will again be tested before merging into main (once a week)

---
## Project Description

The purpose of this application is to form a network of persons who want to help each other learn and grow in their respective fields. This application will allow potential mentees to connect with experienced professionals volunteering to mentor others in their fields.

### Basic Features:
- Homepage
- Profile Page
- Feed
- Search
- Post
- Direct Messaging
- Shared Workspace

### Extra Features:
- Authenticate login via LinkedIn
- Zoom integration in Direct Messages
- Real-time direct messaging: Push notifications and live view of other party's online status
- Rating system: Allow for mentees to rate their mentors
- Goal Pages: Overall goals a mentee is wanting to meet within a profession
  

---

## Helpful Links
- [Git cheatsheet](https://education.github.com/git-cheat-sheet-education.pdf)
- [Project Drive](https://drive.google.com/drive/u/0/folders/1hX7Sb6CIqGc5k1t-_d41YvrvaLbzr1d0)
- [LinkedIn Auth](https://www.loginradius.com/blog/async/linkedin-login-using-node-passport/)
