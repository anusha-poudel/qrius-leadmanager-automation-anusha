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

## count text reflects the number of leads after a search(search.spec.ts)
- **Predicted:** searching Mina Gurung narrows the count to 1 of 12 leads
- **Actual:** Test is passed, Mina Gurung row shown, but text is still 12 of 12 leads
- **Verdict:** The application has a bug
- **Reasoning:** The count is not updating.