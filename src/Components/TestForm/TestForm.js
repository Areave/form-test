import React, { useState } from "react";
import "./TestForm.css";

const TestForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    province: "",
    fullName: "",
    otherNames: "",
    sex: "",
    idDocument: "",
    idNumber: "",
    issuedOn: "",
    issuedAt: "",
    placeOfBirth: "",
    dateOfBirth: "",
    nationality: "",
    ethnicGroup: "",
    permanentAddress: "",
    temporaryAddress: "",
    fatherName: "",
    fatherDOB: "",
    motherName: "",
    motherDOB: "",
    spouseName: "",
    spouseDOB: "",
    phone: "",
    email: "",
    lastEntry: "",
    submissionDate: "",
    occupation: "",
    workplace: "",
    criminalRecord: "",
    crimeDetails: "",
    certificateType: "",
    prohibitionConfirmation: "",
    purpose: "",
    numberOfCertificates: 1,
    electronicCopy: "",
    deliveryMethod: "",
    deliveryAddress: "",
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <div className="glass-form-container">
      <div className="glass-card">
        <h2>Step {step} of 10</h2>

        {/* Step 1: Select Province */}
        {step === 1 && (
          <div>
            <h3>Select a Province</h3>
            <p>
              Please select the province where you reside and have either
              temporary or permanent registration
            </p>
            <select
              name="province"
              value={formData.province}
              onChange={handleChange}
            >
              <option value="">Select a Province</option>
              <option value="Hanoi">Hanoi</option>
              <option value="Da Nang">Da Nang</option>
              <option value="Ho Chi Minh City">Ho Chi Minh City</option>
              <option value="Phan Thiet">Phan Thiet</option>
              <option value="Vung Tau">Vung Tau</option>
            </select>
          </div>
        )}

        {/* Step 2: Applicant's Personal Data (1/2) */}
        {step === 2 && (
          <div>
            <h3>Applicant's Personal Data (1/2)</h3>
            <div className="grid">
              <div className="input-group">
                <label>
                  Full Name <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full legal name"
                  />
                </div>
              </div>

              {/* Sex */}
              <div className="input-group">
                <label>
                  Sex <span className="required">*</span>
                </label>
                <select name="sex" value={formData.sex} onChange={handleChange}>
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>

            {/* Row 2: ID Document, ID Number */}
            <div className="grid">
              <div className="input-group">
                <label>
                  ID Document <span className="required">*</span>
                </label>
                <select
                  name="idDocument"
                  value={formData.idDocument}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Passport">Passport</option>
                  <option value="National ID">National ID</option>
                </select>
              </div>

              <div className="input-group">
                <label>
                  ID Number <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="idNumber"
                  value={formData.idNumber}
                  onChange={handleChange}
                  placeholder="Enter ID number"
                />
              </div>
            </div>

            {/* Row 3: Issued On, Issued At */}
            <div className="grid">
              <div className="input-group">
                <label>
                  Issued On <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="issuedOn"
                  value={formData.issuedOn}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>
                  Issued At <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="issuedAt"
                    value={formData.issuedAt}
                    onChange={handleChange}
                    placeholder="Enter issuing authority"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Applicant's Personal Data (2/2) */}
        {step === 3 && (
          <div>
            <h3>Applicant's Personal Data (2/2)</h3>
            <div className="grid">
              {/* Place of Birth - Required, Only Latin */}
              <div className="input-group">
                <label>
                  Place of Birth <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleChange}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Date of Birth - Required */}
              <div className="input-group">
                <label>
                  Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                />
              </div>

              {/* Nationality - Required */}
              <div className="input-group">
                <label>
                  Nationality <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  placeholder="Enter your nationality"
                />
              </div>

              {/* Ethnic Group - Required, Only Latin */}
              <div className="input-group">
                <label>
                  Ethnic Group <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="ethnicGroup"
                    value={formData.ethnicGroup}
                    onChange={handleChange}
                    placeholder="Enter your ethnic group"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Applicant's Address */}
        {step === 4 && (
          <div>
            <h3>Applicant's Address</h3>
            <p>
              A permanent address refers to your registered address in your
              country of residency. A temporary address is your registered
              address in Vietnam. If you have permanent registration in Vietnam,
              please enter it in this field. Example of a correctly formatted
              address in Vietnam: 123/5 Nguyen Hue, Phuong Vo Thi Sau, Quan 3,
              Thanh pho Ho Chi Minh.{" "}
            </p>
            <div className="grid">
              {/* Permanent Address - Required, Allow Latin, Numbers & Special Characters */}
              <div className="input-group full-width">
                <label>
                  Permanent Address <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="permanentAddress"
                    value={formData.permanentAddress}
                    onChange={handleChange}
                    placeholder="Enter your permanent address"
                  />
                </div>
              </div>

              {/* Temporary Address - Required, Allow Latin, Numbers & Special Characters */}
              <div className="input-group full-width">
                <label>
                  Temporary Address <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="temporaryAddress"
                    value={formData.temporaryAddress}
                    onChange={handleChange}
                    placeholder="Enter your temporary address (if any)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Step 5: Family Information */}
        {step === 5 && (
          <div>
            <h3>Family Information</h3>
            <p>
              If you do not have information about your parents and/or spouse,
              please write "Don't have" in the "Name" field. Otherwise, provide
              the relevant information.{" "}
            </p>
            <div className="grid">
              {/* Father's Name - Required, Only Latin */}
              <div className="input-group">
                <label>
                  Father's Name <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="fatherName"
                    value={formData.fatherName}
                    onChange={handleChange}
                    placeholder="Enter your father's full name"
                  />
                </div>
              </div>

              {/* Father's Date of Birth - Required */}
              <div className="input-group">
                <label>
                  Father's Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="fatherDOB"
                  value={formData.fatherDOB}
                  onChange={handleChange}
                />
              </div>

              {/* Mother's Name - Required, Only Latin */}
              <div className="input-group">
                <label>
                  Mother's Name <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="motherName"
                    value={formData.motherName}
                    onChange={handleChange}
                    placeholder="Enter your mother's full name"
                  />
                </div>
              </div>

              {/* Mother's Date of Birth - Required */}
              <div className="input-group">
                <label>
                  Mother's Date of Birth <span className="required">*</span>
                </label>
                <input
                  type="date"
                  name="motherDOB"
                  value={formData.motherDOB}
                  onChange={handleChange}
                />
              </div>

              {/* Spouse's Name - Only Latin (Optional) */}
              <div className="input-group">
                <label>Spouse's Name</label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="spouseName"
                    value={formData.spouseName}
                    onChange={handleChange}
                    placeholder="Enter your spouse's full name (if any)"
                  />
                </div>
              </div>

              {/* Spouse's Date of Birth (Optional) */}
              <div className="input-group">
                <label>Spouse's Date of Birth</label>
                <input
                  type="date"
                  name="spouseDOB"
                  value={formData.spouseDOB}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 6: Contact Information */}
        {step === 6 && (
          <div>
            <h3>Contact Information</h3>
            <div className="grid">
              {/* Phone Number - Required, Only Numbers and special symbols */}
              <div className="input-group">
                <label>
                  Phone Number <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (e.g., +84 123456789)"
                  />
                </div>
              </div>

              {/* Email Address - Required, Only Valid Emails */}
              <div className="input-group">
                <label>
                  Email Address <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email (e.g., example@mail.com)"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 7: Applicant's Background */}
        {step === 7 && (
          <div>
            <h3>Applicant's Background</h3>
            <p>
              Enter the date of your last entry into Vietnam as shown in your
              passport. Submission date – indicate the date when you plan to
              submit your application. If you have not decided on the date yet,
              you may leave this field blank{" "}
            </p>
            <div className="grid">
              {/* Last Entry Date - Required */}
              <div className="input-group">
                <label>
                  Last Entry Date <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="date"
                    name="lastEntry"
                    value={formData.lastEntry}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Submission Date - Required */}
              <div className="input-group">
                <label>
                  Submission Date <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="date"
                    name="submissionDate"
                    value={formData.submissionDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Occupation - Required */}
              <div className="input-group">
                <label>
                  Occupation <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter your occupation"
                  />
                </div>
              </div>

              {/* Workplace - Required */}
              <div className="input-group">
                <label>
                  Workplace <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="workplace"
                    value={formData.workplace}
                    onChange={handleChange}
                    placeholder="Enter your workplace"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 8: Other Information (1/2) */}
        {step === 8 && (
          <div>
            <h3>Other Information (1/2)</h3>
            <div className="grid">
              {/* Do you have a criminal record? - Required */}
              <div className="input-group">
                <label>
                  Do you have a criminal record?{" "}
                  <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <select
                    name="criminalRecord"
                    value={formData.criminalRecord}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              </div>

              {/* Conditional Field: Crime Details (Only if "Yes" is selected) */}
              {formData.criminalRecord === "Yes" && (
                <div className="input-group">
                  <label>Details of Criminal Record</label>
                  <input
                    type="text"
                    name="crimeDetails"
                    value={formData.crimeDetails}
                    onChange={handleChange}
                    placeholder="Enter details"
                  />
                </div>
              )}

              {/* Certificate Type - Required */}
              <div className="input-group">
                <label>
                  Criminal Record Certificate Type{" "}
                  <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <select
                    name="certificateType"
                    value={formData.certificateType}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Form N1">Form N1</option>
                    <option value="Form N2">Form N2</option>
                  </select>
                </div>
              </div>

              {/* Conditional Field: Prohibition Confirmation (Only if "Form N1" is selected) */}
              {formData.certificateType === "Form N1" && (
                <div className="input-group">
                  <label>Prohibition Confirmation (Form N1)</label>
                  <select
                    name="prohibitionConfirmation"
                    value={formData.prohibitionConfirmation}
                    onChange={handleChange}
                  >
                    <option value="">Select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 9: Other Information (2/2) */}
        {step === 9 && (
          <div>
            <h3>Other Information (2/2)</h3>
            <div className="grid">
              {/* Purpose of Applying - Required, Only Latin + Numbers + Symbols */}
              <div className="input-group">
                <label>
                  Purpose of Applying <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleChange}
                    placeholder="Enter the purpose of applying"
                  />
                </div>
              </div>

              {/* Number of Criminal Clearance Certificates - Required */}
              <div className="input-group">
                <label>
                  Number of certificates <span className="required">*</span>
                </label>
                <input
                  type="number"
                  name="numberOfCertificates"
                  value={formData.numberOfCertificates}
                  min="0"
                  onChange={handleChange}
                />
              </div>

              {/* Receive Electronic Copy Online - Required */}
              <div className="input-group">
                <label>
                  Receive Electronic Copy Online?{" "}
                  <span className="required">*</span>
                </label>
                <select
                  name="electronicCopy"
                  value={formData.electronicCopy}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>

              {/* Form and Methods of Receiving Results - Required */}
              <div className="input-group">
                <label>
                  How to receive
                  <span className="required">*</span>
                </label>
                <select
                  name="deliveryMethod"
                  value={formData.deliveryMethod}
                  onChange={handleChange}
                >
                  <option value="">Select</option>
                  <option value="Pickup at Office">Pickup at Office</option>
                  <option value="Delivery">Delivery</option>
                </select>
              </div>
            </div>

            {/* Conditional Field: Show Delivery Address on a Full Width New Line */}
            {formData.deliveryMethod === "Delivery" && (
              <div className="input-group full-width">
                <label>
                  Delivery Address <span className="required">*</span>
                </label>
                <div className="input-icon-group">
                  <input
                    type="text"
                    name="deliveryAddress"
                    value={formData.deliveryAddress}
                    onChange={handleChange}
                    placeholder="Enter full delivery address"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 10: Summary */}
        {step === 10 && (
          <div>
            <h3>Summary</h3>
            <ul className="summary-list">
              {Object.keys(formData).map((key) => (
                <li key={key}>
                  <strong>{key.replace(/([A-Z])/g, " $1").trim()}:</strong>{" "}
                  {String(formData[key])}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Step Navigation */}
        <div className="buttons">
          {step > 1 && <button onClick={prevStep}>Back</button>}
          {step < 10 && <button onClick={nextStep}>Next</button>}
          {step === 10 && <button>Submit</button>}
        </div>
      </div>
    </div>
  );
};

export default TestForm;
