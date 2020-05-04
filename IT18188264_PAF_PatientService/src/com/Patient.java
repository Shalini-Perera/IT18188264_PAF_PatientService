package com;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

import config.DBConnector;

public class Patient {
	
	public String insertPatient(String p_nic, String p_fname, String p_lname, String p_dob, String p_address,
			String p_phone, String p_email, String p_gender) {
		String output = "";

		try (Connection con = DBConnector.getConnection()) {
			if (con == null) {
				return "Error while connecting to the database for inserting.";
			}
			System.out.println("1111111111");
			// create a prepared statement
			String query = " insert into patient(`patient_id`,`p_nic`,`p_fname`,`p_lname`,`p_dob`,`p_address`,`p_phone`,`p_email`,`p_gender`)"
					+ " values (?, ?, ?, ?, ?,?,?,?,?)";

			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values

			preparedStmt.setInt(1, 0);
			preparedStmt.setString(2, p_nic);
			preparedStmt.setString(3, p_fname);
			preparedStmt.setString(4, p_lname);
			preparedStmt.setString(5, p_dob);
			preparedStmt.setString(6, p_address);
			preparedStmt.setString(7, p_phone);
			preparedStmt.setString(8, p_email);
			preparedStmt.setString(9, p_gender);

			// execute the statement
			preparedStmt.execute();
			con.close();
			output = "Inserted successfully";
		} catch (Exception e) {
			output = "Error while inserting Patient.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String readPatients() {
		String output = "";
		try (Connection con = DBConnector.getConnection()) {
			if (con == null) {
				return "Error while connecting to the database for reading.";
			}

			// Prepare the html table to be displayed
			output = "<table border=\"1\"><tr><th>NIC</th>" + "<th>Fisrst Name</th><th>Last Name</th>"
					+ "<th>Date of Birth</th>" + "<th>Address</th>" + "<th>Phone</th>" + "<th>Email</th>"
					+ "<th>Gender</th>"
					+ "<th>Update</th><th>Remove</th></tr>";

			String query = "select * from patient";

			Statement stmt = con.createStatement();
			ResultSet rs = stmt.executeQuery(query);
			// iterate through the rows in the result set

			while (rs.next()) {

				String patient_id = Integer.toString(rs.getInt("patient_id"));
				String p_nic = rs.getString("p_nic");
				String p_fname = rs.getString("p_fname");
				String p_lname = rs.getString("p_lname");
				String p_dob = rs.getString("p_dob");
				String p_address = rs.getString("p_address");
				String p_phone = rs.getString("p_phone");
				String p_email = rs.getString("p_email");
				String p_gender = rs.getString("p_gender");

				// Add into the html table
				output += "<tr><td><input id=\"hidPatientIDUpdate\""
						+ "name=\"hidPatientIDUpdate\""
						+ "type=\"hidden\" value=\"" + patient_id + "\">"
				+ p_nic + "</td>";
				output += "<td>" + p_fname + "</td>";
				output += "<td>" + p_lname + "</td>";
				output += "<td>" + p_dob + "</td>";
				output += "<td>" + p_address + "</td>";
				output += "<td>" + p_phone + "</td>";
				output += "<td>" + p_email + "</td>";
				output += "<td>" + p_gender + "</td>";

				// buttons
				output += "<td><input name=\"btnUpdate\""
						+ "type=\"button\" value=\"Update\""
						+ "class=\" btnUpdate btn btn-secondary\"></td>"
						+ "<td><form method=\"post\" action=\"Patient.jsp\">"
						+ "<input name=\"btnRemove\" type=\"submit\""
						+ "value=\"Remove\" class=\"btn btn-danger\">"
						+ "<input name=\"hidPatientIDDelete\" type=\"hidden\""
						+ "value=\"" + patient_id + "\">" + "</form></td></tr>";
			}
			con.close();
			// Complete the html table
			output += "</table>";
		} catch (Exception e) {
			output = "Error while reading Patients.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String updatePatient(String patient_id, String p_nic, String p_fname, String p_lname, String p_dob,
			String p_address, String p_phone, String p_email, String p_gender) {
		String output = "";
		try (Connection con = DBConnector.getConnection()) {
			if (con == null) {
				return "Error while connecting to the database for updating.";
			}
			// create a prepared statement
			String query = "UPDATE patient SET p_nic=?,p_fname=?,p_lname=?,p_dob=?,p_address=?, p_phone=?,p_email=?,p_gender=? WHERE patient_id=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setString(1, p_nic);
			preparedStmt.setString(2, p_fname);
			preparedStmt.setString(3, p_lname);
			preparedStmt.setString(4, p_dob);
			preparedStmt.setString(5, p_address);
			preparedStmt.setString(6, p_phone);
			preparedStmt.setString(7, p_email);
			preparedStmt.setString(8, p_gender);
			preparedStmt.setInt(9, Integer.parseInt(patient_id));

// execute the statement
			preparedStmt.execute();
			con.close();
			output = "Updated successfully";
		} catch (Exception e) {
			output = "Error while updating the patient.";
			System.err.println(e.getMessage());
		}
		return output;
	}

	public String deletePatient(String patient_id) {
		String output = "";
		try (Connection con = DBConnector.getConnection()) {
			if (con == null) {
				return "Error while connecting to the database for deleting.";
			}
			// create a prepared statement
			String query = "delete from patient where patient_id=?";
			PreparedStatement preparedStmt = con.prepareStatement(query);
			// binding values
			preparedStmt.setInt(1, Integer.parseInt(patient_id));
			// execute the statement
			preparedStmt.execute();
			con.close();
			output = "Deleted successfully";
		} catch (Exception e) {
			output = "Error while deleting patient....";
			System.err.println(e.getMessage());
		}
		return output;
	}


}
