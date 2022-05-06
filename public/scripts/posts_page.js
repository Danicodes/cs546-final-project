(function($){
    function getUserName(userId) {
        request = {
            method : "GET",
            url : `http://localhost:3000/users/${userId}`,
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
                    postNode.find("#post-report").val(countOfLikesForThisPost);
                },
                error: function(errorObj, exception) {
                    console.log(errorObj);
                    console.log("Failed to report this post" + exception);
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
                    postNode.find("#post-like").val(countOfLikesForThisPost);
                },
                error: function(errorObj, exception) {
                    console.log(errorObj);
                    console.log("Failed to add your like " + exception);
                }
            }
            // Add the comment into database and update the post comments div
            $.ajax(request);
        });
    }

    function addCommentHandler(event, postId, commentMessage) {
        if(typeof commentMessage !== "string" || commentMessage.trim().length < 0)
            return ;
        request = {
            method : "POST",
            data : {message: commentMessage},
            url : `http://localhost:3000/posts/${postId}/comments`,
            success: function(newCommentAdded) {
                renderComments([newCommentAdded], postId, true);
            },
            error: function(errorObj, exception) {
                console.log(errorObj);
                console.log("Failed to add message - " + commentMessage);
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
            addCommentHandler(event, postId, commentMessage);
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
            let user = await getUserName(comment.author);
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
            $(`#${postId}-comments-section`).hide();
            return;
        }
        
        // Else retrieve comments and add event handlers
        $(`#${postId}-comments-section`).show();
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

        for(let post of posts) {
            let username = (await getUserName(post.author)).name;
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
                    <li> <a class="post-like" href="/posts/${post._id}/like">Like - ${post.likedBy.length}</a></li>
                    <li> <a class="post-comment" href="/posts/${post._id}/comments">Comments</a></li>
                    <li> <a class="post-report" href="/posts/${post._id}/report">Reports - ${post.reportedBy.length}</a></li>
                </ul>
                <div id="${post._id}-comments-section" class="post-comments-section" hidden>
                    <div id="${post._id}-comments" class="post-comments">

                    </div>
                    <div id="${post._id}-comments-add">
                        <form id="posts-add-comment-form">
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
            addEventHandlerForReportPost(postNode, post._id);
        }
    }

    function loadPosts(postSearchText, myPosts) {
        console.log("Received search Text " + postSearchText);
        if(typeof postSearchText === "string" && postSearchText.length > 0) {
            // Hit search posts URL

        } else {
            // Hit Get All Posts URL
            request = {
                method : "GET",
                url : `http://localhost:3000/posts/`,
            }
            if(myPosts) {
                let userId = $("#user-id").val();
                request.url += `user/${userId}`;
            }
            $.ajax(request).then(function (posts) {
                renderPosts(posts);
            });
        }
    }

    $("#posts-search-form").submit(function(event) {
        event.preventDefault();
        let postSearchInput = $("#posts-search-text");
        let postSearchText = postSearchInput.val().trim();
        try {
            postSearchText = validateString(postSearchText);
            $("#posts-search-form").find(".error").remove();
            let myPosts = $("#my-posts").is(':checked');
            loadPosts(postSearchText, myPosts);
        } catch (e) {
            $("#posts-search-form").append($(`<p class="error">${e}</p>`));
        }
        
    });
    
    $("#posts-search-form").find("input:checkbox").click(function(event) {
        // event.preventDefault();
        let postSearchInput = $("#posts-search-text");
        let postSearchText = postSearchInput.val().trim();
        let myPosts = $("#my-posts").is(':checked');

        loadPosts(postSearchText, myPosts);
    });

    function validateString(inputStr, varName) {
        if(!inputStr || typeof(inputStr) != "string" || inputStr.trim().length == 0)
            throw `Invalid input for ${varName}`;
        else
            return inputStr.trim();
    }

    function validateNewPostForm() {
        let newPostForm = $("#post-form");
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

    $("#post-form").submit(function(event) {
        event.preventDefault();
        // Validate the form
        let newPostForm = $("#post-form");
        let newPostDesc = newPostForm.find("#post-description").val();
        let newPostTags = newPostForm.find("#post-tags").val();
        let visibility = newPostForm.find("input[name='visibility']:checked").val();
        try {
            validateNewPostForm(newPostDesc, newPostTags);
            newPostForm.find(".error").remove(); // Remove Error Tag
            
            let requestConfig = {
                method : "POST",
                url: `http://localhost:3000/posts`,
                data: {author: "6274526c073570c18813243f", visibility: visibility, content: newPostDesc, searchTags: newPostTags.split(" ")},
                success: function(newPost){renderPosts([newPost], true)},
                error: function(err, exception){throw err;}
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

console.log("Posts.js is hit");