Frontend Test Task – Multi-Step Form (React.js)

Welcome! This test task is designed to evaluate your React.js frontend skills with a focus on form structure, CSS layout, clean design and interface usability.

Goal:

Design a 10-step input-form using React.js and CSS only. All neccessary content and most of the structure are inside the repo already. The references also will be provided. 

Tech Stack & DONT's:

React.js + plain CSS. Don't mess with STATE and data transfering function.

Global Reference:
Input forms on https://gosuslugi.ru/.
If you dont have access to this website and form submissions, please check some screenshots: './Components/TestForm/Screenshots'.
If you feel that you can do better than references, creativity and best-practice thinking are appreciated. We will be happy to have a look. Just keep in mind, that the current web app will be mostly about interactions with government and close-to-government facilities, while implementing new styles and design.

Task Requirements:
- Some select's inputs will reveal additional inputs — but the form structure must remain static (i.e., don't shift layout when inputs appear).
- Implement field validation according to the rules we provide (See validations).
- Include a searchable selector for:
step 1: Select a province (Data: './Components/TestForm/DataForTestForm/PROVINCES', reference: https://evisa.gov.vn/e-visa/foreigners; go to the field '1.PERSONAL INFORMATION' and check input 'Nationality' ).
step 3: Applicant's personal data 2/2 (Data: './Components/TestForm/DataForTestForm/Countries', reference: same 
- Add helpful UX touches (error indicators, focus transitions). For error indicators, it should appear ONLY after error triggered from validation function or when we try to move the next step, and required* fields are empty.
No error on the start of the step, no error when we click on input.
- Floating tips on hover of particular inputs (for now you can chouse any three(3) inputs within different steps. (Reference: https://evisa.gov.vn/e-visa/foreigners; go to the field '6.INFORMATION ABOUT THE TRIP', and hover over 'Residential address in Viet Nam' ).
- No need to work on summary page (step 10), since collected data going either to another function or database)

Validations:
1. Only LATIN is permitted for all fields (obviously exept the dates).
2. For names: no numbers and no symbols (sorry mr.Musk children).
3. For email: only email.
4. For phone: only numbers and symbols.

Addons (not compulsary):
1. Add suitable navbar and footer of your choice.
2. Progress Bar.

How to start:
git clone thist repository -> npm install -> npm start.
or download this repository in zip, unzip and -> npm install -> npm start.

How to submit:
Pull request, send the link to your repository or even link to google drive with zip file. We dont care about your profficiency with git if you good with design, react and css.

If you have questions:
Please don't, in this README more than enough information for you to complete the task.
If you absolutly need to, you have a contact.

Happy coding!
