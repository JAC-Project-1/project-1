document.addEventListener('DOMContentLoaded', function() {


    var age_verification = function () {

        var info = ['You must agree with each of the following statements and indicate your comprehension and permission to abide by the laws that are applicable to you in your geographical location ' +
            'I am an adult, being of legal age, 21, in my legal jurisdiction. (Local laws vary throughout the United States, so if you are not 100% sure of the laws applicable to you, you are advised to proceed no further.) '
        ];

        $('#myModal').html("");
        $('body').append($('<footer/>'));
        $('footer').append($('<div/>', {
            'class': 'modal fade',
            'id': 'myModal',
            'role': 'dialog'
        }));
        $('#myModal').append($('<div/>', {
            'class': 'modal-dialog'
        }));
        $('.modal-dialog').append($('<div/>', {
            'class': 'modal-content'
        }));
        $('.modal-content').append($('<div/>', {
            'class': 'modal-header'
        }));
        $('.modal-header').append($('<button/>', {
            'class': 'close',
            'data-dismiss': 'modal'
        }));
        $('.modal-header').append($('<h4/>', {
            'class': 'modal-title',
            text: 'Age Verification'
        }));
        $('.modal-content').append($('<div/>', {
            'class': 'modal-body'
        }));
        $('.modal-body').append($('<p/>', {
            text: info
        }));
        $('.modal-body').append($('<input/>', {
            'class': 'modal-footer form-control',
            'id': 'age-year',
            placeholder: 'YYYY'
        }));
        $('.modal-body').append($('<input/>', {
            'class': 'modal-footer form-control',
            'id': 'age-month',
            placeholder: 'MM'
        }));
        $('.modal-body').append($('<input/>', {
            'class': 'modal-footer form-control',
            'id': 'age-day',
            placeholder: 'DD',
        }
        ));
        $('.modal-body').append($('<div/>', {
            'class': 'modal-footer'
        }));
      
        $('.modal-footer').append($('<button/>', {
            'class': 'btn btn-success',
           // 'data-dismiss': 'modal',
            text: 'I accept',
            'id': 'age-yes'
        }));
        $('.modal-footer').append($('<button/>', {
            'class': 'btn btn-dangert',
           // 'data-dismiss': 'modal',
            text: 'I reject',
            'id': 'age-no'
        }));

        /**
         * Click to check age
         */
        $('.modal-footer button').click(function () {

            var id = $(this).attr('id');
            var age_21 = sessionStorage.getItem('age');
            var userAge = moment($("#age-year").val() + $("#age-month").val() + $("#age-day").val());
            var today = moment(new Date());

            var ageDiff = today.diff(userAge, "years");
            console.log(ageDiff);
            console.log(id);
            if (age_21 == null) {

                if (id == "age-no" || ageDiff < 21) {

                    sessionStorage.setItem('age', 'false');
                  //  $("#myModal").modal("show");

                } else if (id == "age-yes" && ageDiff >= 21) { 

                    sessionStorage.setItem('age', 'true');
                        console.log(id);
                    /*
                     *Execute click on button shows Adult content on the page
                     */ 
                  
                    $('#myBtn4').trigger("click");
                     $("#myModal").modal("hide");
                }
            } else if (age_21 == 'false') {

                return;

            }
        }); //end $('.modal-footer button').click(function()

        /**
         * Toggles modal window
         */
        $('#myModal').modal({backdrop: 'static', keyboard: false})  ;
       $('#myModal').modal("toggle");
    } //end age verification()

    age_verification();

});