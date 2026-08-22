const db = require("../Config/db")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { fetchAll, findByEmail, createUser, findByPassword, deleteUser, updateName, updateEmail, updateEmailPassword, updateNameEmail, updateNamePassword, updatePassword } = require("../Models/user.model")

/**
 * -POST Request Register
 * -/register
*/
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
/**
 *  @ Post Request
 *  @ /Login
 */
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
        return res.status(500).json({
            success: false,
            message: "Something went wrong.."
        });
    }
};

/**
 *  @ Get Request
 *  @ /data
 */
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
}
/**
 * @ Through Post Request
 * @ /delete Route
 */
const remove = async (req, res) => {
    const { email, password } = req.body
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
        const result = await deleteUser(email, password)
        if (result.affectedRows === 1) {
            return res.status(200).json({
                message: "user Deleted SuccessFully ✅"
            })
        }
        return res.status(404).json({
            message: "NOT deleted",
        })


    } catch (err) {
        console.log(err);
        return res.json({
            message: " Database OR Query Error"
        })
    }

}
/**
 * @ Post Request
 * @ /update
 */
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
}
/**
 * @ Post Request
 * @ /updateData
 */
const updateData = async (req, res) => {
    const { name, email, password, prevEmail } = req.body;

    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("prevEmail:", prevEmail);

    try {
        // Update name only
        if (name && !email && !password) {
            const result = await updateName(name, prevEmail);

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Name Updated"
                });
            }

            return res.status(400).json({
                message: "Name cannot be updated"
            });
        }

        // Update email only
        if (email && !name && !password) {
            const result = await updateEmail(email, prevEmail);

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Email Updated"
                });
            }

            return res.status(400).json({
                message: "Email cannot be updated"
            });
        }

        // Update password only
        if (password && !name && !email) {
            const result = await updatePassword(password, prevEmail);

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Password Updated"
                });
            }

            return res.status(400).json({
                message: "Password cannot be updated"
            });
        }

        // Update email + password
        if (email && password && !name) {
            const result = await updateEmailPassword(
                email,
                password,
                prevEmail
            );

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Email and Password Updated"
                });
            }

            return res.status(400).json({
                message: "Email and Password cannot be updated"
            });
        }

        // Update name + email
        if (name && email && !password) {
            const result = await updateNameEmail(
                name,
                email,
                prevEmail
            );

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Name and Email Updated"
                });
            }

            return res.status(400).json({
                message: "Name and Email cannot be updated"
            });
        }

        // Update name + password
        if (name && password && !email) {
            const result = await updateNamePassword(
                name,
                password,
                prevEmail
            );

            if (result.affectedRows > 0) {
                return res.json({
                    message: "Name and Password Updated"
                });
            }

            return res.status(400).json({
                message: "Name and Password cannot be updated"
            });
        }

        return res.status(400).json({
            message: "No valid update data provided"
        });

    } catch (err) {
        console.error("err:", err);

        return res.status(500).json({
            message: "Server error"
        });
    }
};
module.exports = { Login, register, data, remove, update, updateData }