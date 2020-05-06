$(function() {
    $(".devour").on("click", function(event) {
        var id = $(this).data("id");
        var newDevour = $(this).data("devoured");
        console.log(newDevour);

        var newDevourState = {
            devoured: newDevour
        };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newDevourState
        })
        .then(
            function() {
                console.log("changed sleep to ", newDevour);
                location.reload();
            }
        );
    });

    $(".create-form").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("#bg").val().trim(),
            devoured: 0
        };
        
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        })
        .then(
            function() {
                console.log("createed new burger");
                location.reload();
            }
        );
    });
});