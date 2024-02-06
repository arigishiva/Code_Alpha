function submitIssue() {
    const getInputValue = id => document.getElementById(id).value;
    const description = getInputValue('issueDescription');
    const severity = getInputValue('issueSeverity');
    const assignedTo = getInputValue('issueAssignedTo');
    const attachment = getInputValue('issueAttachment');
    const id = Math.floor(Math.random() * 100000000) + '';
    const status = 'Created';

    if (description.length === 0 || assignedTo.length === 0 || attachment.length === 0) {
        alert("Please fill all fields with required data.");
        $('#add-issue').attr("data-toggle", "modal");
        $('#add-issue').attr("data-target", "#emptyField");
    } else {
        $('#add-issue').removeAttr("data-toggle", "modal");
        $('#add-issue').removeAttr("data-target", "#emptyField");
        const issue = { id, description, severity, assignedTo, attachment, status };
        let issues = localStorage.getItem('issues') ? JSON.parse(localStorage.getItem('issues')) : [];
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
        clearForm();
        fetchIssues();
    }
}

function updateIssue() {
    const updatedDescription = $('#updateDescription').val();
    const id = $('#updateId').val();

    if (updatedDescription.length === 0) {
        alert("Please enter a new description.");
        return;
    }

    let issues = JSON.parse(localStorage.getItem('issues'));
    const updatedIssues = issues.map(issue => {
        if (issue.id === id) {
            issue.description = updatedDescription;
        }
        return issue;
    });

    localStorage.setItem('issues', JSON.stringify(updatedIssues));
    fetchIssues();
    $('#updateModal').modal('hide');
}

function updateIssueModal(id) {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id === id);

    $('#updateDescription').val(currentIssue.description);
    $('#updateId').val(id);

    $('#updateModal').modal('show');
}

function closeIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    const currentIssue = issues.find(issue => issue.id === id);

    currentIssue.status = 'Closed';


    localStorage.setItem('issues', JSON.stringify(issues));
    fetchIssues();
}

function deleteIssue(id) {
    let issues = JSON.parse(localStorage.getItem('issues'));
    const remainingIssues = issues.filter(issue => issue.id !== id);

    localStorage.setItem('issues', JSON.stringify(remainingIssues));
    fetchIssues();
}

function fetchIssues() {
    const issues = JSON.parse(localStorage.getItem('issues'));
    const issuesList = $('#issuesList').find('tbody');
    issuesList.empty();

    if (issues) {
        const priorityOrder = { High: 0, Medium: 1, Low: 2 };

        const sortedIssues = issues.sort((a, b) => priorityOrder[a.severity] - priorityOrder[b.severity]);

        for (const issue of sortedIssues) {
            const { id, description, severity, assignedTo, attachment, status } = issue;
            const fileName = attachment ? attachment.replace(/^.*[\\\/]/, '') : '';
            const issueHtml = `<tr>
                        <td>${id}</td>
                        <td align="center"><span class="label label-info">${status}</span></td>
                        <td align="center">${description}</td>
                        <td align="center"><span class="glyphicon glyphicon-time"> ${severity}</span></td>
                        <td align="center"><span class="glyphicon glyphicon-user"> ${assignedTo}</span></td>
                        <td align="center"><span class="glyphicon glyphicon-paperclip"> ${fileName}</span></td>
                        <td>
                          <button onclick="closeIssue('${id}')" class="btn btn-warning">Close</button>
                          <button onclick="deleteIssue('${id}')" class="btn btn-danger">Delete</button>
                          <button onclick="updateIssueModal('${id}')" class="btn btn-primary">Update</button>
                        </td>
                      </tr>`;
            issuesList.append(issueHtml);
        }
    }
}

function clearForm() {
    document.getElementById('issueInputForm').reset();
}