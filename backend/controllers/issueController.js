const createIssue = (req, res) => {
    res.send("Issue created!");
};

const updateIssueById = (req, res) => {
    res.send("Issue updated!");
};

const deleteIssueById = (req, res) => {
    res.send("Issue delete!");
};

const getAllIssues = (req, res) => {
    res.send("All Issue fetched!");
};

const getAllIssueById = (req, res) => {
    res.send("Issue details fetched!");
};

export {
    createIssue,
    updateIssueById,
    deleteIssueById,
    getAllIssueById,
    getAllIssues,
}