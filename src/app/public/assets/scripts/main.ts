document.addEventListener("DOMContentLoaded", function(event) {
  console.log("document ready");

  $(".mde").each(function() {
    new SimpleMDE({
      element: this,
      spellChecker: false,
      status: false
    });
  });

    $("[data-modal-open]").click(function(event) {
      event.preventDefault();

      $($(this).data("modal-open")).addClass("active");
    });

    $("[data-modal-close]").click(function(event) {
      event.preventDefault();

      $($(this).data("modal-close")).removeClass("active");
    });

    $(document).keydown(function(e) {
      if (e.keyCode == 27) {
        $(".modal").removeClass("active");
      }
    });
});
