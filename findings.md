## after sign in, the number of leads is shown (leadlist.spec.ts)
- **Predicted:** the number of employees is shown on the page
- **Actual:** failed
- **Verdict:** My test is wrong
- **Reasoning:** The data-testid of sign in button is 'login-button', i wrote 'signin-button'.

## Searching by company name narrows the list(search.spec.ts)
- **Predicted:** searching eSewa narrows the list to its lead(s)
- **Actual:** 0 rows shown, although the lead exists in the database
- **Verdict:** The application has a bug
- **Reasoning:** The same search by hand also returns nothing, the company is in the leads table, and the brief says company search should work.

## adding a lead with a chosen status saves it with that status(add-lead.spec.ts)
- **Predicted:** after adding Sita Poudel with status Qualified, her row shows status Qualified
- **Actual:** Sita Poudel is added but her row shows status New
- **Verdict:** The application has a bug.
- **Reasoning:** The status is not changing.

## editing a lead's email updates it in the list (edit-lead.spec.ts)
- **Predicted:** the email of lead changes
- **Actual:** failed
- **Verdict:** My test is wrong
- **Reasoning:** I didnt run schema_and_run so the old email was already updated and i kept on using that.

## an agent does not see a delete button (delete-lead.spec.ts)
- **Predicted:** the agent sees 12 leads, and does not see delete button 
- **Actual:** failed
- **Verdict:** My test is wrong
- **Reasoning:** the agent sees 11 leads at first since the previous delete test already deletes a lead.