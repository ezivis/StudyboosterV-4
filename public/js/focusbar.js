var skills = {
  ph: 80,
};

$.each(skills, function(key, value) {
  var skillbar = $("." + key);

  skillbar.animate(
    {
      width: value + "%"
    },
    3000,
    function() {
      $(".speech-bubble").fadeIn();
    }
  );
}); 