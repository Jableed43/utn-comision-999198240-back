import nodemailer from "nodemailer";
import {
  EMAIL_PORT,
  EMAIL_HOST,
  EMAIL_USER,
  EMAIL_PASS,
} from "../../config.js";

// const createTransporter = () => { return nodemailer.createTransport({
//   host: EMAIL_HOST,
//   port: EMAIL_PORT,
//   secure: false,
//   auth: {
//     user: EMAIL_USER,
//     pass: EMAIL_PASS,
//   },
// })}

const createTransporter = () => {
    return nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER.trim(),
    pass: EMAIL_PASS.trim(),
  },
});
}

export const sendContactEmail = async (contactData) => {
  const { name, email, phone, subject, message, contactMethod } = contactData;

  // validar los campos requeridos
  if (!name || !email || !subject || !message) {
    const error = new Error(
      "Todos los campos requeridos deben estar completos"
    );
    error.statusCode = 400;
    throw error;
  }

  // Validar el email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Si el email no es valido ...
  if (!emailRegex.test(email)) {
    const error = new Error("El formato del email no es valido");
    error.statusCode = 400;
    throw error;
  }

  try {
    // Ejecutamos el metodo que tiene los datos en top
    const transporter = createTransporter();

    // Configuracion del email
    // de quien obtenemos el email, a quien se dirige
    // subject, el html del mail
    const mailOptions = {
      from: EMAIL_USER, // Quien lo manda
      to: EMAIL_USER, // Quien recibe las consultas
      replyTo: email, // Remitente a quien responder
      subject: `Consulta: ${subject}`,
      // html es para los clientes que aceptan emails en html
      html: `
        <h2> Nueva consulta de contacto </h2>
    <div style="font-family: Arial, Helvetica, sans-serif; line-height: 1.6; color: #333;" > 
        <p> <strong>Nombre:</strong> ${name} </p>
        <p> <strong>Email:</strong> ${email} </p>
        ${phone ? ` <p> <strong>Teléfono:</strong> ${phone} </p> ` : ""}
        <p> <strong>Metodo de contacto preferido:</strong> ${
        contactMethod || "Email"
        } </p>
        <p> <strong>Asunto:</strong> ${subject} </p>
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p> <strong>Mensaje:</strong> </p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-wrap;"> ${message} </p>
    </div>
            `,
        // text es para los clientes que NO aceptan emails en html
        text: `
        Nueva Consulta de Contacto

        Nombre: ${name}
        Email: ${email}
        ${phone ? `Telefono: ${phone}` : ""}
        Metodo de contacto preferido: ${contactMethod || "Email"}
        Asunto: ${subject}

        Message:
        ${message}
        `
    };

    // Enviar el email
    const info = await transporter.sendMail(mailOptions)

    return {
        message: "Email enviado exitosamente",
        messageId: info.messageId
    }
  } catch (error) {
    console.error("Error al enviar email: ", error)
    const errorMessage = new Error("Error al enviar el email. Por favor, intente nuevamente más tarde")
    errorMessage.statusCode = 500
    throw errorMessage
  }
};
