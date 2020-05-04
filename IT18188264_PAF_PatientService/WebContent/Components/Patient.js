$(document).ready(function()
		{
		if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
		$("#alertError").hide();
		});
// SAVE ============================================
$(document).on("click", "#btnSave", function(event)
		{
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();
// Form validation-------------------
	var status = validatePatientForm();
	if (status != true)
	{
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
// If valid------------------------
$("#formPatient").submit();
});

$(document).on("click", ".btnUpdate", function(event)
		{
		$("#hidPatientIDSave").val($(this).closest("tr").find('#hidPatientIDUpdate').val());
		$("#p_nic").val($(this).closest("tr").find('td:eq(0)').text());
		$("#p_fname").val($(this).closest("tr").find('td:eq(1)').text());
		$("#p_lname").val($(this).closest("tr").find('td:eq(2)').text());
		$("#p_dob").val($(this).closest("tr").find('td:eq(3)').text());
		$("#p_address").val($(this).closest("tr").find('td:eq(4)').text());
		$("#p_phone").val($(this).closest("tr").find('td:eq(5)').text());
		$("#p_email").val($(this).closest("tr").find('td:eq(6)').text());
		$("#p_gender").val($(this).closest("tr").find('td:eq(7)').text());
		
		});

//CLIENTMODEL=========================================================================
function validatePatientForm()
{
// CODE
if ($("#p_nic").val().trim() == "")
{
return "Insert NIC.";
}
// NAME
if ($("#p_fname").val().trim() == "")
{
return "Insert First Name.";
}

//PRICE-------------------------------
if ($("#p_lname").val().trim() == "")
{
return "Insert Last Name.";
}

//PRICE-------------------------------
if ($("#p_dob").val().trim() == "")
{
return "Insert Date of birth.";
}


//PRICE-------------------------------
if ($("#p_address").val().trim() == "")
{
return "Insert Address.";
}


//PRICE-------------------------------
if ($("#p_phone").val().trim() == "")
{
return "Insert Phone.";
}


//PRICE-------------------------------
if ($("#p_email").val().trim() == "")
{
return "Insert Email.";
}


//PRICE-------------------------------
if ($("#p_gender").val().trim() == "")
{
return "Insert Gender.";
}



return true;
}

