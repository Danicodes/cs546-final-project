(function ($){ 

    let workspaceDiv = $("#workspace-files");
    let workspaceSectionDiv = $("#workspace-files-section");
    let workspaceForm = $("#workspace-files-form");
    let relationshipId = workspaceDiv.find($("#relationshipId")).text();

    let filesAnchors = workspaceDiv.find("a");
    for(let fileAnchor of filesAnchors) {
        let fileName = fileAnchor.text;
        console.log(fileName);
        fileAnchor.setAttribute('href', `/relationships/${relationshipId}/download/${fileName}`);
    }

    function renderFileNames(filesList, relationshipId) {
        console.log(" Is this running " + filesList);
        if(filesList.length === 0) {
            workspaceSectionDiv.append($(`<p class="warning"> No files Shared Yet! </p>`));
            return ;
        }
        workspaceSectionDiv.find(".warning").remove();
        let ulNode = workspaceDiv.find("ul");
        ulNode.empty();
        for(let file of filesList) {
            if(file.length > 0) {
                let element = `<li><a href="/relationships/${relationshipId}/download/${file}">${file}</a></li>`;
                ulNode.append(element);
            }
        }
    }

    workspaceForm.submit(function(event) {
        event.preventDefault();
        let uploadFileName = workspaceForm.find("input[type=file]").val();
        let uploadFile= workspaceForm.find("input[type=file]")[0].files[0];

        // Validations
        if(!uploadFileName) {
            workspaceForm.append($(`<p class="error"> Please input File to Upload </p>`));
            return ;
        }
        
        // If Validtion is success, remove any error tags next time
        workspaceForm.find(".error").remove();

        var form = new FormData();
        form.append("uploadfile", uploadFile, uploadFileName);
        let requestConfig = {
            url: `http://localhost:3000/relationships/${relationshipId}/upload`,
            method : "POST",
            processData: false,
            mimeType: "multipart/form-data",
            contentType: false,
            data: form,
            fail: function(err, exception){console.log(err + "\n" + exception);}
        }
        $.ajax(requestConfig)
        .then((uploadedFileList) => {
            renderFileNames(JSON.parse(uploadedFileList), relationshipId);
            workspaceForm.find(".error").remove();
            workspaceForm.trigger("reset");
        })
        .fail((error, exception) => {
            workspaceForm.append(`<p class='error'>${error.statusText}</p>`);
        });
    });

})(window.jQuery);