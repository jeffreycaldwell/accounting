var debit = 0.0;
var credits;

// Is our total credits equal to our debit?
var matchedValues = false;





// When the add credits button is pressed, add the correct html for a new credit.
$("#addCredits").click(function(event){
    var num = parseInt($("#numberOfCredits").html(), 10);
    num++;
    var formStuff = `<div class="row">
                    <div class="col col-sm-1">${num}</div>
                    <div class="col col-sm-6 form-group">
                        <input class="form-control" type="text" name="credit${num}[description]" placeholder="Credit Description">    
                    </div>
                    <div class="col col-sm-2 form-group">
                        <select class="form-control" name="credit[postReference]">`;
    
    parsedCompany.accounts.forEach(function(account){
                                formStuff += `<option value="`;
                                formStuff += account.id;
                                formStuff += `">`;
                                formStuff += account.name;
                                formStuff += " - ";
                                formStuff += account.reference;
                                formStuff += `</option>`;
                                
                            });
    formStuff += `</select>
                    </div>
                    <div class="col col-sm-2 form-group">
                        <input class="form-control MoneyAmounts Credit" type="text" name="credit${num}[amount]" placeholder="Credit Amount">
                    </div>
                    <div class="col col-sm-2 MoneyOuts"></div>
                </div>
                    `;
    
    $("#credits").append(formStuff);
    $("#numberOfCredits").text(num);
});

// Add a listener to the current Money Amount class elements to properly format the extra text.

$("form").on("keyup", ".MoneyAmounts", function () {
        var $input = $(this),
            value = $input.val(),
            num = parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
            
        $input.parent().parent().find('.MoneyOuts').text('$' + num);
});

// Checks that the debit equals the amounts of the credits
$(document).on("keyup", null, function() {
    var creditTotal = 0;
    debit = parseFloat($('.Debit').val());
    credits = $('.Credit').toArray();
    
    credits.forEach(function(credit){
        creditTotal += parseFloat(credit.value);
    });
    
    if(debit === creditTotal) {
       $(".MoneyOuts").css("color", "green");
       matchedValues = true;
    } else {
        $(".MoneyOuts").css("color", "red");
        matchedValues = false;
    }
});