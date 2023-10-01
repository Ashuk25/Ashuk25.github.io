

// Github repository

var user = 'Ashuk25';
window.onload = genRepo(user);


function genRepo(user) {
    const testuser = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

    if (testuser.test(user) == false || user == "" || user == null) {
        $("#repo-box").append("<div class='error-box'><h1 class='error-msg'> Sorry the GitHub username appears to be invalid </h1></div>");
    }

    else {

        var requestURL = 'https://api.github.com/users/' + user + '/repos';
        var request = $.get(requestURL, function () {
        })
            .done(function () {
                request = request.responseJSON;
                if (!Array.isArray(request) || !request.length) {
                    $("#repo-box").append("<div class='error-box'><h1 class='error-msg'> Sorry the GitHub username entered has no repos or does't exist </h1></div>");
                }
                else {
                    
                    for (i = request.length - 4; i < request.length; i++) {
                        // variables from api request
                        var repo_url = request[i].html_url;
                        var repo_name = request[i].name;
                        var repo_description = request[i].description;
                        var repo_language = request[i].language;

                        // replaces null values to be better represented when displayed
                        if (repo_description == null) {
                            repo_description = "<i>No Description</i>";
                        }
                        if (repo_language == null) {
                            repo_language = "-";
                        }

                        // Puts repo information into div
                        $("#repo-box").append("<div class='row' data-aos='fade-up'>" +
                            "<div class='col-md-2 d-flex align-items-center'>"+
                            "<i class='bi bi-github'></i>" +
                            "</div>"+
                            "<div class='col-md-10'>"+
                            "<h5><a href='" + repo_url + "' target='_blank'>" + repo_name + "</a></h5>" +
                            "<p>" + repo_description + "</p>" +
                            "<p>" + repo_language + "</p>"+
                            "<a href='" + repo_url + "' target='_blank' class='btn'>Visit <i class='bi bi-box-arrow-in-up-right'></i></a>"+
                            "</div>"+
                            "</div>");
                    }
                    
                }
            });
    }
}


// JS for medium blof
$(function () {
    var mediumPromise = new Promise(function (resolve) {
        var $content = $('#jsonContent');
        var data = {
            rss: 'https://medium.com/feed/@ashutoshkanojiya1'
        };
        $.get(' https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40ashutoshkanojiya1', data, function (response) {
            if (response.status == 'ok') {
                $("#logo").append(`<img src="${response.feed["image"]}" class="rounded-circle mx-auto" style="width:20%">`)
                var display = '';
                $.each(response.items, function (k, item) {
                    display += `<div class="card mb-3 mx-auto mr-5 blog" style="width: 20rem; padding:2%;">`;
                    var src = item["thumbnail"]; // use thumbnail url
                    display += `<img src="${src}" class="card-img-top" alt="Cover image">`;
                    display += `<div class="card-body">`;
                    display += `<h5 class="card-title"><a href="${item.link}" style="text-decoration:none; color:#0C356A;">${item.title}</a></h5>`;
                    var yourString = item.description.replace(/<img[^>]*>/g, ""); //replace with your string.
                    yourString = yourString.replace('h4', 'p');
                    yourString = yourString.replace('h3', 'p');
                    var maxLength = 80; // maximum number of characters to extract
                    //trim the string to the maximum length
                    var trimmedString = yourString.substr(0, maxLength);
                    //re-trim if we are in the middle of a word
                    trimmedString = trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))
                    display += `<p class="card-text">${trimmedString}...</p>`;
                    display += `<a href="${item.link}" target="_blank" class="btn">Read More <i class='bi bi-box-arrow-in-up-right'></i></a>`;
                    display += '</div></div>';
                    return k < 10;
                });

                resolve($content.html(display));
            }
        });
    });

    mediumPromise.then(function () {
        //Pagination
        pageSize = 4;

        var pageCount = $(".card").length / pageSize;

        for (var i = 0; i < pageCount; i++) {
            $("#pagin").append(`<li class="page-item"><a class="page-link" href="#">${(i + 1)}</a></li> `);
        }
        $("#pagin li:nth-child(1)").addClass("active");
        showPage = function (page) {
            $(".card").hide();
            $(".card").each(function (n) {
                if (n < pageSize * page)
                    $(this).show();
            });
        }

        showPage(3);

        $("#pagin li").click(function () {
            $("#pagin li").removeClass("active");
            $(this).addClass("active");
            showPage(parseInt($(this).text()))
            return false;
        });
    });
});
