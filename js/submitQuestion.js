$(function() {
  $('#success').fadeOut(0);
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors) {
      // additional error messages or events
    },
    submitSuccess: function($form, event) {
      event.preventDefault(); // prevent default submit behaviour
      // get values from FORM
      var name = $("input#name").val();
      var question = $("textarea#question").val();

      $.ajax({
        url: "http://questions.curiosityforall.org/api/groups/55a00306b9b6e13a0b22bdc7/questions",
        type: "POST",
        data: {
          _id: "55a01373b9b6e13a0b22bdc9",
          content: question,
          creator: name
        },
        cache: false,
        success: function() {
          // Success message
          $('#success').fadeIn();
          setTimeout(function() { $('#success').fadeOut(); }, 3000);
          $("textarea#question").val("");
          $.ajax({
            url: "http://questions.curiosityforall.org/api/groups/55a00306b9b6e13a0b22bdc7/questions",
            type: "GET",
            success: function(res) {
                  $('#questions').html("");
                  for (i = 0; i < 5; i++) {
                    $('#questions').append('<div class="question"><blockquote class="media-body"><p class="media-heading">' + res[i].content + '</p><footer>' + (res[i].creator || 'Anonymous' )+ '</footer></blockquote></div>');
                  }
                },
            error: function() {
                },
          });

        },
        error: function() {
          // Fail message
          $('#success').html("<div class='alert alert-danger'>");
          $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
              .append("</button>");
          $('#success > .alert-danger').append("<strong>Sorry " + name + ", it seems my server is not responding. Please try again later!");
          $('#success > .alert-danger').append('</div>');
          //clear all fields
          $('#contactForm').trigger("reset");
        },
      })
    },
    filter: function() {
      return $(this).is(":visible");
    },
  });

  $("a[data-toggle=\"tab\"]").click(function(e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
  $('#success').html('');
});
