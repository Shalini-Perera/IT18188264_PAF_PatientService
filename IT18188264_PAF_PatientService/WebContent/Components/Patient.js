$(document).ready(function()
		{
		if ($("#alertSuccess").text().trim() == "")
		{
			$("#alertSuccess").hide();
		}
		$("#alertError").hide();
		});
$(document).ready(
		function() {
			var date_input = $('input[name="p_dob"]');
			var container = $('.bootstrap-iso form').length > 0 ? $(
					'.bootstrap-iso form').parent() : "body";
			var options = {
				format : 'dd-mm-yyyy',
				container : container,
				todayHighlight : true,
				autoclose : true,
			};
			date_input.datepicker(options);
		})
		
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
	var type = ($("#hidPatientIDSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PatientAPI",
		type : type,
		data : $("#formPatient").serialize(),
		dataType : "text",
		complete : function(response, status) {
			onPatientSaveComplete(response.responseText, status);
		}
	});
//$("#formPatient").submit();
});

function onPatientSaveComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();
			$("#divPatientGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving..");
		$("#alertError").show();
	}
	$("#hidPatientIDSave").val("");
	$("#formPatient")[0].reset();
}

$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PatientAPI",
		type : "DELETE",
		data : "patient_id=" + $(this).data("patientid"),
		dataType : "text",
		complete : function(response, status) {
			onPatientDeleteComplete(response.responseText, status);
		}
	});
});

function onPatientDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			$("#divPatientGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

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
		// F_NAME
		if ($("#p_fname").val().trim() == "")
			{
				return "Insert First Name.";
			}

		//L_Name-------------------------------
		if ($("#p_lname").val().trim() == "")
			{
				return "Insert Last Name.";
			}

		//DateOfBirth-------------------------------
		if ($("#p_dob").val().trim() == "")
			{
				return "Insert Date of birth.";
				}


		//Address-------------------------------
		if ($("#p_address").val().trim() == "")
			{
				return "Insert Address.";
			}


		//Phone-------------------------------
		if ($("#p_phone").val().trim() == "")
		{
			return "Insert Phone.";
		}
		// Check for numeric value
		var phone = $("#p_phone").val().trim();
		if (!$.isNumeric(phone)) {
			return "Insert a correct conatct number (don't insert characters)";
		}
		// check for length
		var pattern = /^\d{10}$/;
		if (!pattern.test(phone)) {
			return "Contact number should have 10 numbers";
		}
		


		//Email-------------------------------
		if ($("#p_email").val().trim() == "")
			{
				return "Insert Email.";
			}
		//
		var re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
		var phone = $("#p_email").val().trim();
		if (re.test(phone) == false) {
			return "Please enter valid email address";
		}


		//Gender-------------------------------
		if ($("#p_gender").val().trim() == "")
			{
				return "Insert Gender.";
			}

		return true;
}

