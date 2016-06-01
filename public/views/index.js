

$("document").ready(function(){
  console.log("Does it work?");
  console.log("As of May 9, 2016, yes, it seems to.");

  $("#loginform").onsubmit(function(){
      var loginUsername = $("").val();
      var loginPassword = $("").val();
      var hash = loginUsername + ":" + loginPassword;
      //document.location = "http://" + loginUsername + ":" + loginPassword + "localhost:1198/";
      $.ajax({
        url: "http://localhost:1198/",
        method: "POST",
        beforeSend: function(xhr){
          xhr.setRequestHeader("Authorization", "Basic", btoa(hash));
        }
      })

  });


});
