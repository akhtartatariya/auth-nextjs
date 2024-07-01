import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)
        const verifyUser = `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`

        const resetPassword = `<p>Click <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a>to ${emailType === "RESET" ? "reset your password" : "verify your email"} or copy and paste the link below in your browser <br>
            ${process.env.DOMAIN}/resetpassword?token=${hashedToken}
            </p>`
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId, {
                $set: {

                    verifyToken: hashedToken,
                    verifyTokenExpiry: Date.now() + 3600000
                }
            })
        }
        else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgotPasswordToken: hashedToken,
                    forgotPasswordTokenExpiry: Date.now() + 3600000
                }
            })
        }
        const transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "3704adb27e22b0",
                pass: "cb60997b2f7c0e"
            }
        });

        const mailOptions = {
            from: 'sample123akh@gmail.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify your Email" : "Reset your Password",
            html: emailType === "VERIFY" ? verifyUser : resetPassword
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error.message)
    }

}