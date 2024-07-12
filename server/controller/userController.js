
export const signupUser = async (req, res) => {
    const { email, password } = req.body;
    res.json({ email, password });
};

export const loginUser = async (req, res) => {
    res.status(200).json({ msg: 'login' });
};

export const test = async (req, res) => {
    res.status(200).json({ msg: 'test' });
};