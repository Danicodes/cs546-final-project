(function($){
    /**
     * post-like, post-comment, post-report 
     *  are the links for corresponding actions
     */
    let postSearchForm = $("#posts-search-form");
    let newPostForm = $("#post-form");
    let postSearchInput = $("#posts-search-text");
    let myPostsCheckbox = $("#my-posts");
    let myPreferredFeedCheckbox = $("#my-preferred-feed");
    let sessionUserId = $("#post-user-id").text();


    async function getUserObject(userId) {
        request = {
            method : "GET",
            url : `http://localhost:3000/users/post/${userId}`,
            error: function(error) {return error;}
        }
        return $.ajax(request);
    }

    function addEventHandlerForReportPost(postNode, postId){
        postNode.find(".post-report").click(function(event) {
            event.preventDefault();
            request = {
                method : "POST",
                url : `http://localhost:3000/posts/${postId}/report`,
                success: function(countOfReportsForThisPost) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.find(".post-report").html(`Reports - ${countOfReportsForThisPost}`);
                },
                error: function(errorObj, exception) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.append($(`<p class="error">${errorObj} ${exception}</p>`));
                    console.log(errorObj);
                    console.log("Failed to report this post" + exception);
                }
            }
            // Add the comment into database and update the post comments div
            $.ajax(request);
        });
    }

    function addEventHandlerForDisLikePost(postNode, postId){
        postNode.find(".post-dislike").click(function(event) {
            event.preventDefault();
            request = {
                method : "POST",
                url : `http://localhost:3000/posts/${postId}/dislike`,
                success: function(countOfDislikesForThisPost) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.find(".post-dislike").html(`Dislikes - ${countOfDislikesForThisPost}`);
                },
                error: function(errorObj, exception) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.append($(`<p class="error">${errorObj} ${exception}</p>`));
                    console.log(errorObj);
                    console.log("Failed to Dislike this post" + exception);
                }
            }
            // Add the comment into database and update the post comments div
            $.ajax(request);
        });
    }

    function addEventHandlerForLikePost(postNode, postId){
        postNode.find(".post-like").click(function(event) {
            event.preventDefault();
            request = {
                method : "POST",
                url : `http://localhost:3000/posts/${postId}/like`,
                success: function(countOfLikesForThisPost) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.find(".post-like").html(`Likes - ${countOfLikesForThisPost}`);
                },
                error: function(errorObj, exception) {
                    if(postNode.find(".error").length > 0)
                        postNode.find(".error").remove();
                    postNode.append($(`<p class="error">${errorObj} ${exception}</p>`));
                    console.log(errorObj);
                    console.log("Failed to add your like " + exception);
                }
            }
            // Add the comment into database and update the post comments div
            $.ajax(request);
        });
    }

    function addCommentHandler(addCommentForm, event, postId, commentMessage) {
        if(typeof commentMessage !== "string" || commentMessage.trim().length < 0)
            return ;
        request = {
            method : "POST",
            data : {message: commentMessage},
            url : `http://localhost:3000/posts/${postId}/comments`,
            success: function(newCommentAdded) {
                renderComments([newCommentAdded], postId, true);
                addCommentForm.find(".error").remove();
            },
            error: function(errorObj, exception) {
                addCommentForm.append($(`<p class="error">Please add the comment</p>`));
            }
        }
        // Add the comment into database and update the post comments div
        $.ajax(request);
    }

    function addEventHandlerForAddCommentAction(postNode, postId) {
        let addCommentForm = postNode.find(`#${postId}-comments-section`).find("form");
        addCommentForm.submit(function(event) {
            event.preventDefault();
            console.log("Submitted a new Comment for postId " + postId);
            let commentMessage = addCommentForm.find("#comment-message").val();
            if(commentMessage.length == 0) 
                return addCommentForm.append($(`<p class="error">Please add the comment</p>`));
            addCommentForm.find(".error").remove();
            addCommentHandler(addCommentForm,event, postId, commentMessage);
            addCommentForm.find("input").val("");
        });
    }

    /**
     * 
     * @param {List of Objects} comments - [comment]
     * comment - {
     *      author: "6257b2085c63aa640c130917",
     *      message: "This is my first Comment for the post 625df5015db9d33bf6e0f80f",
     *      timestamp: "2022-04-19T03:35:47.194Z"
     *  }
     * @param {string} postId - Add/Get Comments of this post
     * @param {boolean} append - if true, commentsDiv is not emptied 
     */
    async function renderComments(comments, postId, append){
        let commentsDiv = $(`#${postId}-comments`);
        if(!append)
            commentsDiv.empty();
        for(let comment of comments){
            let user = await getUserObject(comment.author).person;
            let username = user.name;
            let commentHtml =
            `<section class="comment">
                <div class="meta">
                    ${username} on ${comment.timestamp}
                </div>
                <div class="text">
                    ${comment.message}
                </div>
            </section>`;
            let commentDiv = $(commentHtml);
            commentsDiv.append(commentDiv);
        }
    }

    function clickCommentHandler(event, postId){
        event.preventDefault();

        // If comments-section are visible already
        if($(`#${postId}-comments-section`).is(":visible")) {
            $(`#${postId}-comments`).empty();
            $(`#${postId}-comments-section`).attr("hidden", true);
            return;
        }
        
        // Else retrieve comments and add event handlers
        $(`#${postId}-comments-section`).removeAttr('hidden');
        request = {
            method : "GET",
            url : `http://localhost:3000/posts/${postId}/comments`,
            success: function(comments){renderComments(comments, postId);},
            error: function(errorObj, exception) {
                console.log(errorObj);
                console.log("Failed to get messages for post - " + postId);
            }
        }
        $.ajax(request);
    }

    function addEventHandlersForCommentActions(postNode, postId){
        postNode.find(".post-comment").click(function(event) {
            clickCommentHandler(event, postId); 
        });
    }

    async function renderPosts(posts, shouldPush) {
        let postsDiv = $("#posts-display");
        if(!shouldPush)
            postsDiv.empty();

        if(posts.length == 0)
            postsDiv.append(`<p class="warning"> No Posts Found </p>`);
        else 
            postsDiv.find(".warning").remove();
        for(let post of posts) {
            let username = (await getUserObject(post.author));
            username = username.person ? username.person.name : "PlaceHolder";//.person.name;
            let postHtml = 
            `<li class="card" id=${post._id}>
                <div class="card-header">
                    <h3 hidden>${post._id}</h3>
                    <h3>${username}</h3>
                    <p>Created On: ${post.createdOn}</p>
                </div>
                <p class="card-body">${post.content}</p>
                <p class="visibility">${post.visibility}</p>
                <ul class="card-actions">
                    <li> <a class="post-like" href="/posts/${post._id}/like">Likes - ${post.likedBy.length}</a></li>
                    <li> <a class="post-dislike" href="/posts/${post._id}/dislike">Dislikes - ${post.dislikedBy && post.dislikedBy.length}</a></li>
                    <li> <a class="post-comment" href="/posts/${post._id}/comments">Comments</a></li>
                    <li> <a class="post-report" href="/posts/${post._id}/report">Reports - ${post.reportedBy.length}</a></li>
                </ul>
                <div id="${post._id}-comments-section" class="post-comments-section" hidden>
                    <div id="${post._id}-comments" class="post-comments">

                    </div>
                    <div id="${post._id}-comments-add">
                        <form class="posts-add-comment-form">
                            <input type="text" placeholder="Add Comment Here" id="comment-message"/>
                            <button type="submit"> Add Comment </button>
                        </form>
                    </div>
                </div>
            </li>`;
            let postNode = $(postHtml);
            if(shouldPush)
                postsDiv.prepend(postNode);
            else
                postsDiv.append(postNode);
            addEventHandlersForCommentActions(postNode, post._id);
            addEventHandlerForAddCommentAction(postNode, post._id);
            addEventHandlerForLikePost(postNode, post._id);
            addEventHandlerForDisLikePost(postNode, post._id);
            addEventHandlerForReportPost(postNode, post._id);
        }
    }

    function loadPosts(postSearchText, myPosts) {
        let request = {}
        if(myPosts) {
            // Hit My Posts URL
            request = {
                method : "GET",
                url : `http://localhost:3000/posts/user` // This UserID will be taken from session in future
            };
            $.ajax(request).then((posts) => renderPosts(posts)).fail(function(error) {
                console.log("Error while loading the Posts - " + error);
            });
        } else if(typeof postSearchText === "string" && postSearchText.length > 0) {
            // Hit search posts URL
            request = {
                method : "GET",
                url : `http://localhost:3000/search/posts/?searchTerm=${postSearchText}`,
            };
            $.ajax(request).then((posts) => renderPosts(posts.results)).fail(function(error) {
                console.log("Error while loading the Posts - " + error);
            });
        } else {
            // Hit Get All Posts URL
            request = {
                method : "GET",
                url : `http://localhost:3000/posts/`,
            };
            $.ajax(request).then((posts) => renderPosts(posts)).fail(function(error) {
                console.log("Error while loading the Posts - " + error);
            });
        }
    }

    postSearchForm.submit(function(event) {
        event.preventDefault();
        let postSearchText = postSearchInput.val().trim();
        myPreferredFeedCheckbox.prop("checked", false);
        myPostsCheckbox.prop("checked", false);
        try {
            postSearchText = validateString(postSearchText, "Search Term", true);
            postSearchForm.find(".error").remove();
            let myPosts = myPostsCheckbox.is(':checked');
            loadPosts(postSearchText, myPosts);
        } catch (e) {
            if(postSearchForm.find(".error").length > 0)
                postSearchForm.find(".error").remove();
            postSearchForm.append($(`<p class="error">${e}</p>`));
        }
        
    });

    /**
     * When myPreferredFeedCheckBox is hit
     */
    myPreferredFeedCheckbox.click(async function(event) {
        // Reset search Posts and my interest feed
        postSearchInput.val("");
        myPostsCheckbox.prop("checked", false);
        if(!myPreferredFeedCheckbox.is(":checked")) {
            // if Uncheced, load all the posts 
            loadPosts("", false); 
            return ;
        }
         
        let myUser = await getUserObject(sessionUserId).person;
        let postSearchText = myUser.myPreferredFeed;
        postSearchInput.val(postSearchText);
        loadPosts(postSearchText, false);
    });
    
    /**
     * When "MyPosts" is checked
     */
     myPostsCheckbox.click(function(event) {
        let postSearchText = postSearchInput.val("");
        let myPosts = myPostsCheckbox.is(':checked');
        if(myPosts) 
            postSearchForm.find("button").attr("disabled", '');
        else 
            postSearchForm.find("button").removeAttr("disabled");
        loadPosts(postSearchText, myPosts);
    });

    function validateString(inputStr, varName, canEmpty) {
        if(!inputStr || typeof(inputStr) != "string")
            throw `Invalid input for ${varName}`;
        inputStr = inputStr.trim();
        if(!canEmpty && inputStr.length === 0)
            throw `${varName} Cannot be Empty`;
        return inputStr.trim();
    }

    function validateNewPostForm() {
        let newPostDesc = newPostForm.find("#post-description").val();
        let newPostTags = newPostForm.find("#post-tags").val();
        let visibility = newPostForm.find("input[name='visibility']:checked").val();
        // Validate Post Description
        newPostDesc = validateString(newPostDesc, "Post Description");
        // Validate Tags
        newPostTags = validateString(newPostTags, "Post Tags");
        // Validate visibility
        visibility = validateString(visibility, "Visibility");
    }

    /**
     * When a New Post Form is Submitted
     */
    newPostForm.submit(function(event) {
        event.preventDefault();
        // Validate the form
        let newPostDesc = newPostForm.find("#post-description").val();
        let newPostTags = newPostForm.find("#post-tags").val();
        let visibility = newPostForm.find("input[name='visibility']:checked").val();
        try {
            validateNewPostForm(newPostDesc, newPostTags);
            newPostForm.find(".error").remove(); // Remove Error Tag
            
            let requestConfig = {
                method : "POST",
                url: `http://localhost:3000/posts`,
                data: {visibility: visibility, content: newPostDesc, searchTags: newPostTags.split(" ")},
                success: function(newPost){renderPosts([newPost], true)},
                error: function(err, exception){console.log(exception); throw exception;}
            }
            $.ajax(requestConfig);
            newPostForm.trigger("reset");
        } catch (e) {
            console.log("Error in validations - " + e);
            newPostForm.append($(`<p class="error">${e}</p>`));
        }
    });

    /**
     * Initial Loading of Posts
     */
    loadPosts();
})(window.jQuery);