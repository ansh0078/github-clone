const createReposittory = (req, res) => {
    res.send("Repository created!");
};

const getAllReposittories = (req, res) => {
    res.send("All Repositories fetched!");
};

const fetchReposittoryById = (req, res) => {
    res.send("Repository Details fetched!");
};

const fetchReposittoryByName = (req, res) => {
    res.send("Repository Details fetched bu name!");
};

const fetchReposittoryForCurrentUser = (req, res) => {
    res.send("Repositories for logged in user fetched!");
};

const updatedReposittoryById = (req, res) => {
    res.send("Repository updated!");
};

const toggleReposittoryById = (req, res) => {
    res.send("Visibility toggled!");
};

const deletedReposittoryById = (req, res) => {
    res.send("Repository delted!");
};

export {
    createReposittory,
    getAllReposittories,
    fetchReposittoryById,
    fetchReposittoryByName,
    fetchReposittoryForCurrentUser,
    updatedReposittoryById,
    toggleReposittoryById,
    deletedReposittoryById,
}
