let searchForm = $("#searchForm");
let userRadioBtn = $("#searchRadioOption1");
let postRadioBtn = $("#searchRadioOption2");

let userResults = $('#users-search-div');
let postsResults = $('#posts-search-div');

function addUserResults(data){
    userResults.empty();
    userResults.show();
    let results = data.results;
    if (results.length === 0){
        userResults.append($(`<p class="search-not-found">Sorry but no results were found for that search term</p>`));
        return;
    }
    else {
        let ul = $('<ul class="search-results"></ul>');
        userResults.append(ul);

        for (let result of results){
            let li = $(`<li class="search-result-item">${result.username}</li>`); // Bind with actions in the future
            ul.append(li);
        }
    }
}

function addPostResults(data){
    postsResults.empty(); // Empty any results from prev submission
    postsResults.show();
    let results = data.results;
    if (results.length === 0){
        postsResults.append($(`<p class="search-not-found">Sorry but no results were found for that search term</p>`));
        return;
    }
    else {
        let ul = $('<ul class="search-results"></ul>');
        postsResults.append(ul);

        for (let result of results){
            let li = $(`<li class="search-result-item">${result.author.toString()}: ${result.content}</li>`); // Bind with actions in the future
            ul.append(li);
        }
    }
}

(function($) {
    userResults.hide();
    postsResults.hide();
    
    searchForm.on('submit', function(event){
        event.preventDefault();
        let currData = $("#searchFormInput").val();
        let currCallBack;
        
        if (postRadioBtn.is(':checked')){
            userResults.hide();
            currCallBack = addPostResults;
        }
        else {
            postsResults.hide();
            currCallBack = addUserResults;
        }

        $.ajax({
            method: 'POST',
            url: searchForm.attr('action'),
            dataType: "json",
            data: { searchTerm: currData },
            success: currCallBack,
        }).fail(function(err){ // If fail print err
            console.log(err);
        });
        
    });

})(window.jQuery);