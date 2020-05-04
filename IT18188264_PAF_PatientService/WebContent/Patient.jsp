<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@ page import="com.Patient"%>    
        
 
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/Patient.js"></script>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>

<div class="container">
<div class="row">
<div class="col-6">

	<h1>Patient Registration</h1>
	
		<form id="formPatient" name="formPatient">
		
		Patient NIC:<input id="p_nic" name="p_nic" type="text"class="form-control form-control-sm">
		<br> 
		First Name:<input id="p_fname" name="p_fname" type="text" class="form-control form-control-sm">
		<br> 
		Last Name:<input id="p_lname" name="p_lname" type="text" class="form-control form-control-sm">
		<br> 
		Date of Birth: <input id="p_dob" name="p_dob" type="text" class="form-control form-control-sm" placeholder="YYYY-MM-DD">
		<br>
		Address: <input id="p_address" name="p_address" type="text" class="form-control form-control-sm">
		<br>
		Phone: <input id="p_phone" name="p_phone" type="text" class="form-control form-control-sm">
		<br>
		Email: <input id="p_email" name="p_email" type="text" class="form-control form-control-sm" placeholder="example@gmail.com">
		<br>
		Gender: <input id="p_gender" name="p_gender" type="text" class="form-control form-control-sm">
		<br>
		
		<input id="btnSave" name="btnSave" type="button" value="Save"class="btn btn-primary">
		<input type="hidden" id="hidPatientIDSave" name="hidPatientIDSave" value="">
		</form>


		<div id="alertSuccess" class="alert alert-success"></div>

		<div id="alertError" class="alert alert-danger"></div>
  
   <br>
   <div id="divPatientGrid">
   
   <%
   
      Patient patientObj = new Patient();
      out.print(patientObj.readPatients());
   %>
   </div>
   
   </div>
   </div>
   </div>



</body>
</html>