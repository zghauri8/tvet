# ADOF Testing Guide for Managers

## How to Test the ADOF System - Step by Step

This guide will walk you through testing the complete ADOF system from start to finish.

### Step 1: Access the ADOF Dashboard
1. **Login** to the system with your credentials
2. **Navigate** to the ADOF dashboard
3. **Verify** you can see the main menu with 6 options:
   - Dashboard
   - Enter Job for Apply
   - Collect CV
   - Personality Test
   - Provide Personality Report
   - Filter Out Employees
   - Recommend or Reject

### Step 2: Create a Test Job
1. **Click** "Enter Job for Apply" from the sidebar
2. **Fill out** the job form with test data:
   - Job Title: "Software Developer"
   - Company: "Test Company"
   - Location: "New York, NY"
   - Salary: "$80,000 - $100,000"
   - Type: "Full-time"
   - Description: "We are looking for a skilled software developer"
   - Requirements: Add 3-4 requirements
   - Skills: Add 5-6 technical skills
3. **Click** "Save Job" button
4. **Verify** the job appears in the dashboard

### Step 3: Add Test CVs
1. **Click** "Collect CV" from the sidebar
2. **Click** "Add CV" button
3. **Fill out** CV form with test data:
   - Applicant Name: "John Doe"
   - Email: "john.doe@email.com"
   - Phone: "+1 (555) 123-4567"
   - Location: "New York, NY"
   - Experience: "4 years of software development"
   - Education: "Bachelor's in Computer Science"
   - Skills: Add 5-6 skills matching the job
   - Summary: Add a professional summary
4. **Click** "Add CV" to save
5. **Repeat** for 2-3 more test CVs with different names

### Step 4: Test Personality Assessment
1. **Click** on a CV card to select it
2. **Click** "Review" button
3. **Verify** the CV analysis screen appears
4. **Click** "Generate Personality Test" button
5. **Wait** for the test to be generated (loading screen)
6. **Complete** the personality test questions
7. **Submit** the test when finished
8. **Verify** results are displayed

### Step 5: Generate Reports
1. **Click** "Provide Personality Report" from the sidebar
2. **Select** a candidate from the list
3. **Click** "Generate Report" button
4. **Verify** the report is generated
5. **Check** that you can download the report
6. **Review** the report content for accuracy

### Step 6: Test Filtering
1. **Click** "Filter Out Employees" from the sidebar
2. **Set** filtering criteria (score thresholds)
3. **Click** "Apply Filters" button
4. **Verify** candidates are filtered based on criteria
5. **Adjust** filters and test different scenarios
6. **Export** filtered results

### Step 7: Test Final Recommendations
1. **Click** "Recommend or Reject" from the sidebar
2. **Select** a candidate from the filtered list
3. **Review** all assessment data
4. **Make** a recommend or reject decision
5. **Verify** the decision is recorded
6. **Check** that reports are generated

## Testing Checklist

### ✅ Basic Functionality
- [ ] Can access all menu items
- [ ] Can create and save jobs
- [ ] Can add and manage CVs
- [ ] Can generate personality tests
- [ ] Can complete assessments
- [ ] Can generate reports
- [ ] Can filter candidates
- [ ] Can make final decisions

### ✅ Data Validation
- [ ] All required fields are validated
- [ ] Email formats are checked
- [ ] Phone numbers are validated
- [ ] Skills are properly stored
- [ ] Test results are accurate

### ✅ User Experience
- [ ] Navigation is intuitive
- [ ] Loading states are shown
- [ ] Error messages are clear
- [ ] Success messages appear
- [ ] Forms are easy to fill
- [ ] Reports are readable

### ✅ System Integration
- [ ] All steps connect properly
- [ ] Data flows between components
- [ ] No data is lost between steps
- [ ] Back navigation works
- [ ] State is maintained

## Common Issues to Test

### Data Persistence
- Refresh the page and check if data is still there
- Navigate between steps and return to verify data
- Close and reopen the browser

### Error Handling
- Try submitting forms with missing data
- Test with invalid email formats
- Try to access steps without required data

### Performance
- Test with multiple CVs (5-10)
- Check loading times for personality tests
- Verify report generation speed

## Expected Results

After completing all steps, you should have:
- 1 test job created
- 3-4 test CVs added
- 1-2 personality tests completed
- 1-2 reports generated
- 1 filtered candidate list
- 1 final recommendation made

## Troubleshooting

**If personality test fails to generate:**
- Check that CV has sufficient data
- Verify job requirements are complete
- Try refreshing the page

**If reports don't generate:**
- Ensure personality test was completed
- Check that test results are available
- Try with a different candidate

**If filtering doesn't work:**
- Verify test scores are available
- Check filter criteria settings
- Ensure candidates have completed tests

## Success Criteria

The ADOF system is working correctly if:
- All 6 workflow steps can be completed
- Data persists between steps
- Personality tests generate appropriate questions
- Reports contain meaningful analysis
- Filtering produces logical results
- Final recommendations are based on data

**Total Testing Time**: Approximately 30-45 minutes
**Recommended**: Test with 2-3 different scenarios to ensure reliability
