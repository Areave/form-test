import React, {useEffect, useState} from "react";
import "./TestForm.css";
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import FormSelect from 'react-bootstrap/FormSelect';
import Select from 'react-select';
import {pageTitleArray, provinces, regexs, errorHints} from './data.js'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import 'react-datepicker/dist/react-datepicker.css'
import {countries} from "./data";


const TestForm = () => {
    const [step, setStep] = useState(6);
    const [errors, setErrors] = useState([]);
    const [isEmptyErrors, setIsEmptyErrors] = useState([]);
    const [isNextButtonDisabled, setIsNextButtonDisabled] = useState(false);
    const [formData, setFormData] = useState({
        province: "",
        fullName: "",
        otherNames: "",
        sex: "Male",
        idDocument: "Passport",
        idNumber: "",
        issuedOn: new Date(),
        issuedAt: "",
        placeOfBirth: "",
        dateOfBirth: new Date(),
        nationality: "",
        ethnicGroup: "",
        permanentAddress: "",
        temporaryAddress: "",
        fatherName: "",
        fatherDOB: new Date(),
        motherName: "",
        motherDOB: new Date(),
        spouseName: "",
        spouseDOB: new Date(),
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

    const nextStep = () => {
        setErrors([]);
        setStep((prev) => prev + 1)
    };
    const prevStep = () => {
        setErrors([]);
        setStep((prev) => prev - 1)
    };

    useEffect(() => {
        // console.log('formData', formData);
        const shouldNextButtonBeDisabled = checkIsNextButtonDisabled();
        if (isNextButtonDisabled !== shouldNextButtonBeDisabled) {
            setIsNextButtonDisabled(shouldNextButtonBeDisabled);
        }
    }, [formData, step]);

    useEffect(() => {
        // console.log('errors', errors);
    }, [errors]);
    useEffect(() => {
        // console.log('isEmptyErrors', isEmptyErrors);
    }, [isEmptyErrors]);

    const handleChange = (e) => {
        const {name, value, type, checked} = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const checkIsNextButtonDisabled = () => {
        console.log(' errors.length > 0', errors.length > 0);
        console.log('isEmptyErrors.length > 0', isEmptyErrors.length > 0);
        console.log('document.getElementsByClassName(\'hint\').length > 0', document.getElementsByClassName('hint').length > 0);
        console.log('document.getElementsByClassName(\'hint\')', document.getElementsByClassName('hint'));
        return errors.length > 0 || isEmptyErrors.length > 0 || document.getElementsByClassName('hint').length > 0;
    };

    const validateFieldByRegex = (fieldName, value, regex) => {
        const result = regex.test(value);
        if (result) {
            if (errors.includes(fieldName)) {
                setErrors(errors.filter(errorString => errorString !== fieldName));
            }
        } else {
            if (!errors.includes(fieldName)) {
                setErrors([...errors, fieldName]);
            }
        }
    };

    const validateField = (fieldName, value, regex, shouldBeFilled = true) => {

        if (!value) {
            setErrors(errors.filter(errorString => errorString !== fieldName));
        }

        if (shouldBeFilled) {
            if (!value) {
                if (!isEmptyErrors.includes(fieldName)) {
                    setIsEmptyErrors([...isEmptyErrors, fieldName]);
                }
            } else {
                if (isEmptyErrors.includes(fieldName)) {
                    setIsEmptyErrors(isEmptyErrors.filter(errorString => errorString !== fieldName));
                }
                validateFieldByRegex(fieldName, value, regex);
            }
        } else {
            validateFieldByRegex(fieldName, value, regex);
        }
    };


    // const stringToDate = (_date, _format, _delimiter) => {
    //     const formatLowerCase = _format.toLowerCase();
    //     const formatItems = formatLowerCase.split(_delimiter);
    //     const dateItems = _date.split(_delimiter);
    //     const monthIndex = formatItems.indexOf("mm");
    //     const dayIndex = formatItems.indexOf("dd");
    //     const yearIndex = formatItems.indexOf("yyyy");
    //     let month = parseInt(dateItems[monthIndex]);
    //     month -= 1;
    //     return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
    // };

    return (<div className={'content'}>
            <div className="page_title">{pageTitleArray[step] || ''}</div>


            <div className="glass-card">
                {step === 1 && (
                    <>
                        <div className="block">
                            <Form.Label> Please select the province where you reside and have either
                                temporary or permanent registration</Form.Label>
                            <Select isSearchable
                                    allowCreateWhileLoading={false}
                                    placeholder={'Select a Province'}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            // border: '2px solid black',
                                            // borderColor: state.isFocused ? 'blue' : 'none',
                                            height: '52px',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgb(245, 247, 250)'
                                        }),
                                    }}
                                    options={provinces.map((provinceString) => {
                                        return {
                                            value: provinceString,
                                            label: provinceString,
                                        }
                                    })}
                                    classNamePrefix={'custom-select'}
                                    className={'custom-select-container'}
                                    defaultValue={formData.province}
                                // value={formData.selectSearchValue}
                                    onChange={(e) => {
                                        e && setFormData({...formData, province: e.value})
                                    }}/>
                            <div className="hint_container">
                                {(isEmptyErrors.includes('province') || !formData.province) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 2: Applicant's Personal Data (1/2) */}
                {step === 2 && (
                    <>
                        {/*Name*/}
                        <div className="block">
                            <Form.Label>{'Full Name *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.fullName}
                                          bsPrefix={'form-control inp'}
                                          name="fullName"
                                          placeholder={'Enter your full legal name'}
                                          onChange={(e) => {
                                              validateField('fullName', e.target.value, regexs.forOnlyEnglishAndVietnameeseLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('fullName') && <div className="hint error">{errorHints.forOnlyEnglishAndVietnameeseLetters}</div>}
                                {(isEmptyErrors.includes('fullName') || !formData.fullName) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/*Sex*/}
                        <div className="block">
                            <Form.Label>{'Sex *'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.sex}
                                        name={'sex'}
                                        onChange={handleChange}
                                        placeholder={'Select sex'}>
                                <option value="Male">{'Male'}</option>
                                <option value="Female">{'Female'}</option>
                            </FormSelect>
                        </div>

                        {/*ID document*/}
                        <div className="block">
                            <Form.Label>{'ID Document *'}</Form.Label>
                            <FormSelect bsPrefix={'form-select sel'}
                                        value={formData.idDocument}
                                        name={'idDocument'}
                                        onChange={handleChange}
                                        placeholder={'ID Document'}>
                                <option value="Passport">{'Passport'}</option>
                                <option value="National ID">{'National ID'}</option>
                            </FormSelect>
                        </div>

                        {/*ID number*/}
                        <div className="block">
                            <Form.Label>{'ID Number *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.idNumber}
                                          bsPrefix={'form-control inp'}
                                          name="idNumber"
                                          placeholder={'Enter ID Number'}
                                          onChange={(e) => {
                                              validateField('idNumber', e.target.value, regexs.forOnlyDigitsAndEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('idNumber') && <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLetters}</div>}
                                {(isEmptyErrors.includes('idNumber') || !formData.idNumber) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/*Issued On **/}
                        <div className="block">
                            <Form.Label>{'Issued On *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.issuedOn}
                                onSelect={(e) => {
                                    setFormData({...formData, issuedOn: e});
                                }}
                            />
                        </div>

                        {/*Issued At **/}
                        <div className="block">
                            <Form.Label>{'Issued At *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.issuedAt}
                                          bsPrefix={'form-control inp'}
                                          name="issuedAt"
                                          placeholder={'Issued at'}
                                          onChange={(e) => {
                                              validateField('issuedAt', e.target.value, regexs.forOnlyDigitsAndEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('issuedAt') && <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLetters}</div>}
                                {(isEmptyErrors.includes('issuedAt') || !formData.issuedAt) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 3: Applicant's Personal Data (2/2) */}
                {step === 3 && (
                    <>
                        {/* Place of Birth - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Place of Birth *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.placeOfBirth}
                                          bsPrefix={'form-control inp'}
                                          name="placeOfBirth"
                                          placeholder={'City, Country'}
                                          onChange={(e) => {
                                              validateField('placeOfBirth', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('placeOfBirth') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('placeOfBirth') || !formData.placeOfBirth) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.dateOfBirth}
                                onSelect={(e) => {
                                    setFormData({...formData, dateOfBirth: e});
                                }}
                            />
                        </div>

                        {/* Nationality - Required */}
                        <div className="block">
                            <Form.Label>{'Nationality *'}</Form.Label>
                            <Select isSearchable
                                    allowCreateWhileLoading={false}
                                    placeholder={'Enter your nationality'}
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            // border: '2px solid black',
                                            // borderColor: state.isFocused ? 'blue' : 'none',
                                            height: '52px',
                                            borderRadius: '4px',
                                            backgroundColor: 'rgb(245, 247, 250)'
                                        }),
                                    }}
                                    options={countries.map((country) => {
                                        return {
                                            value: country,
                                            label: country,
                                        }
                                    })}
                                    classNamePrefix={'custom-select'}
                                    className={'custom-select-container'}
                                    defaultValue={formData.nationality}
                                    onChange={(e) => {
                                        e && setFormData({...formData, nationality: e.value})
                                    }}/>
                            <div className="hint_container">
                                {(isEmptyErrors.includes('nationality') || !formData.nationality) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Ethnic Group - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Ethnic Group *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.ethnicGroup}
                                          bsPrefix={'form-control inp'}
                                          name="ethnicGroup"
                                          placeholder={'Enter your ethnic group'}
                                          onChange={(e) => {
                                              validateField('ethnicGroup', e.target.value, regexs.forOnlyEnglishLetters);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('ethnicGroup') && <div className="hint error">{errorHints.forOnlyEnglishLetters}</div>}
                                {(isEmptyErrors.includes('ethnicGroup') || !formData.ethnicGroup) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 4: Applicant's Address */}
                {step === 4 && (
                    <>
                        <div className={'annotation'}>
                            A permanent address refers to your registered address in your
                            country of residency. A temporary address is your registered
                            address in Vietnam. If you have permanent registration in Vietnam,
                            please enter it in this field. Example of a correctly formatted
                            address in Vietnam: 123/5 Nguyen Hue, Phuong Vo Thi Sau, Quan 3,
                            Thanh pho Ho Chi Minh.{" "}
                        </div>

                        {/* Permanent Address - Required, Allow Latin, Numbers & Special Characters */}
                        <div className="block">
                            <Form.Label>{'Permanent Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.permanentAddress}
                                          bsPrefix={'form-control inp'}
                                          name="permanentAddress"
                                          placeholder={'Enter your permanent address'}
                                          onChange={(e) => {
                                              validateField('permanentAddress', e.target.value, regexs.forOnlyDigitsAndEnglishLettersSpacesChars);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('permanentAddress') && <div className="hint error">{errorHints.forOnlyEnglishLetters}</div>}
                                {(isEmptyErrors.includes('permanentAddress') || !formData.permanentAddress) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Temporary Address - Required, Allow Latin, Numbers & Special Characters */}
                        <div className="block">
                            <Form.Label>{'Temporary Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.temporaryAddress}
                                          bsPrefix={'form-control inp'}
                                          name="temporaryAddress"
                                          placeholder={'Enter your temporary address (if any)'}
                                          onChange={(e) => {
                                              validateField('temporaryAddress', e.target.value, regexs.forOnlyDigitsAndEnglishLettersSpacesChars);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('temporaryAddress') &&
                                <div className="hint error">{errorHints.forOnlyDigitsAndEnglishLettersSpacesChars}</div>}
                                {(isEmptyErrors.includes('temporaryAddress') || !formData.temporaryAddress) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
                )}

                {/* Step 5: Family Information */}
                {step === 5 && (
                    <>
                        <div className={'annotation'}>
                            If you do not have information about your parents and/or spouse,
                            please write "Don't have" in the "Name" field. Otherwise, provide
                            the relevant information.{" "}
                        </div>

                        {/* Father's Name - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Father\'s Name *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.fatherName}
                                          bsPrefix={'form-control inp'}
                                          name="fatherName"
                                          placeholder={'Enter your father\'s full name'}
                                          onChange={(e) => {
                                              validateField('fatherName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('fatherName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('fatherName') || !formData.fatherName) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Father's Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Father\'s Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.fatherDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, fatherDOB: e});
                                }}
                            />
                        </div>

                        {/* Mother's Name - Required, Only Latin */}
                        <div className="block">
                            <Form.Label>{'Mother\'s Name *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.motherName}
                                          bsPrefix={'form-control inp'}
                                          name="motherName"
                                          placeholder={'Enter your mother\'s full name'}
                                          onChange={(e) => {
                                              validateField('motherName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('motherName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                                {(isEmptyErrors.includes('motherName') || !formData.motherName) &&
                                <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Mother's Date of Birth - Required */}
                        <div className="block">
                            <Form.Label>{'Mother\'s Date of Birth *'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.motherDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, motherDOB: e});
                                }}
                            />
                        </div>

                        {/* Spouse's Name - Only Latin (Optional) */}
                        <div className="block">
                            <Form.Label>{'Spouse\'s Name'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.spouseName}
                                          bsPrefix={'form-control inp'}
                                          name="spouseName"
                                          placeholder={'Enter your spouse\'s full name (if any)'}
                                          onChange={(e) => {
                                              validateField('spouseName', e.target.value, regexs.forOnlyEnglishLettersAndSpaces);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('spouseName') && <div className="hint error">{errorHints.forOnlyEnglishLettersAndSpaces}</div>}
                            </div>
                        </div>

                        {/* Spouse's Date of Birth (Optional) */}
                        {formData.spouseName && <div className="block">
                            <Form.Label>{'Spouse\'s Date of Birth'}</Form.Label>
                            <DatePicker
                                wrapperClassName="datePicker"
                                dateFormat="dd/MM/yyyy"
                                showIcon
                                selected={formData.spouseDOB}
                                onSelect={(e) => {
                                    setFormData({...formData, spouseDOB: e});
                                }}
                            />
                        </div>}
                    </>
                )}

                {/* Step 6: Contact Information */}
                {step === 6 && (
                    <>
                        {/* Phone Number - Required, Only Numbers and special symbols */}
                        <div className="block">
                            <Form.Label>{'Phone Number *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.phone}
                                          bsPrefix={'form-control inp'}
                                          name="phone"
                                          placeholder={'Enter your phone number (e.g., +84 123456789)'}
                                          onChange={(e) => {
                                              validateField('phone', e.target.value, regexs.forPhone);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('phone') && <div className="hint error">{errorHints.forPhone}</div>}
                                {(isEmptyErrors.includes('phone') || !formData.phone) && <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>

                        {/* Email Address - Required, Only Valid Emails */}
                        <div className="block">
                            <Form.Label>{'Email Address *'}</Form.Label>
                            <Form.Control type={'text'}
                                          value={formData.email}
                                          bsPrefix={'form-control inp'}
                                          name="email"
                                          placeholder={'Enter your email (e.g., example@mail.com)'}
                                          onChange={(e) => {
                                              validateField('email', e.target.value, regexs.forEmail);
                                              handleChange(e);
                                          }}/>
                            <div className="hint_container">
                                {errors.includes('email') && <div className="hint error">{errorHints.forEmail}</div>}
                                {(isEmptyErrors.includes('email') || !formData.email) && <div className="hint">{errorHints.fieldShouldBeFilled}</div>}
                            </div>
                        </div>
                    </>
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
                <h2 className={'card_title'}>Step {step} of 10</h2>

                {/* Step Navigation */}

            </div>


            <div className="buttons">
                {step > 1 && <Button variant="primary" onClick={prevStep}>Back</Button>}
                {/*{step > 1 && <button onClick={prevStep}>Back</button>}*/}
                {step < 10 && <Button disabled={isNextButtonDisabled} variant="primary" onClick={() => {

                    // const newDate = new Date();
                    // console.log('newDate', newDate);
                    // console.log('typeof newDate', typeof newDate);
                    //
                    // const newDateString = (new Date()).toLocaleDateString();
                    // console.log('newDateString', newDateString);
                    // console.log('typeof newDateString', typeof newDateString);
                    //
                    // const dateFromNewDateString = stringToDate(newDateString, "dd.MM.yyyy",".");
                    // console.log('dateFromNewDateString', dateFromNewDateString);
                    // console.log('typeof dateFromNewDateString', typeof dateFromNewDateString);
                    nextStep()
                }}>Next</Button>}
                {/*{step < 10 && <button onClick={nextStep}>Next</button>}*/}
                {step === 10 && <button>Submit</button>}
            </div>
        </div>
    );
};

export default TestForm;
