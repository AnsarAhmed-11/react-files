const db = require("../Config/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { fetchAll, findByEmail, createUser, findByPassword } = require("../Models/user.model")

const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const result = await findByEmail(email)
        if (result.length > 0) {
            return res.status(409).json({
                message: "email already exists",
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const newUser = await createUser(name, email, hashPassword)
        const token = jwt.sign(
            {
                id: newUser.insertId,
                email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
        });
        res.json({
            message: "Registered",
        });

    } catch (err) {
        return res.status(500).json({
            message: "something went wrong"
        })
        console.log(err)
    }
}
const Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userEmail = await findByEmail(email);

        if (userEmail.length <= 0) {
            return res.status(400).json({
                success: false,
                message: "Email doesn't exist"
            });
        }

        const user = userEmail[0];

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(400).json({
                success: false,
                message: "Password not matched"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success: true,
            message: "Login successful"
        });

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: "Something went wrong.."
        });
    }
};
const data = async (req, res) => {
    try {
        const results = await fetchAll()
        res.status(200).json(results)
    } catch (err) {
        console.error(err);
        res.status(500).json({
            error: err.message
        });
    }
    // db.query("SELECT * FROM reactData", (err, results) => {
    //     if (err) {
    //         return res.status(500).json({ error: err.message });
    //     }
    //     res.json(results);
    // });
}
const remove = async (req, res) => {
    const { email, password } = req.body
    //query Fetch and Delete
    const findData = "SELECT * FROM reactData WHERE email = ?"
    const sqlD = "DELETE FROM reactData WHERE email = ?"
    db.query(findData, [email], async (err, result) => {
        if (err) {
            res.status(500).json({
                message: "something went wrong..."
            })
        }
        if (result.length === 0) {
            return res.status(404).json({
                message: "Invalid user-email"
            });
        }
        try {
            const hashPassword = result[0].password
            const matchPassword = await bcrypt.compare(password, hashPassword);
            if (!matchPassword) {
                return res.status(401).json({
                    message: "invalid password,"
                })
            }
            db.query(sqlD, [email], (err, deleteResult) => {
                if (err) {
                    return res.status(500).send(err);
                }
                return res.status(200).json({
                    message: "data deleted ✅"
                })
            });
        } catch (err) {
            return res.status(500).json({
                message: "server error from DB",
            })
        }
    })

}
const update = async (req, res) => {
    const { email, password } = req.body
    try {

        const user = await findByEmail(email);

        if (user.length === 0) {
            return res.status(409).json({
                message: "Email doesn't exist",
                success: false
            });
        }

        // Now check the password for this user
        const passwordMatch = await bcrypt.compare(password, user[0].password);

        if (!passwordMatch) {
            return res.status(401).json({
                message: "Incorrect password",
                success: false
            });
        }

        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: user[0]
        });

    } catch (err) {
        return res.status(401).json({
            message: "soemthing went wrong",
        })
    }
    // db.query(findData, [email, password], (err, result) => {
    //     if (err) {
    //         return res.status(500).json({
    //             success: false,
    //             message: "backend error"
    //         })
    //     }
    //     if (result.length === 0) {
    //         return res.status(404).json({
    //             success: false,
    //             message: "User not found"
    //         });
    //     }
    //     res.json({
    //         success: true,
    //         message: "user found",
    //         email
    //     })
    // })

}
const updateData = async (req, res) => {
    const { name, password } = req.body
    sqlN = "UPDATE reactData SET name = ? WHERE email = ?"
    sqlP = "UPDATE reactData SET password = ? WHERE email = ?"

    if (name == "") {
        if (password == "") {
            return res.status(500).json({
                message: "somehting went wrong"
            })
        }
        else {
            db.query(sqlP, (err, result) => {
                if (err) {
                    return res.status(500).json({
                        message: "password realted issue"
                    })
                }
                return res.json({
                    message: "password updated"
                })
            })

        }
    }
    else {
        db.query(sqlN)
    }

}
module.exports = { Login, register, data, remove, update, updateData }