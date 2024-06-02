"use server";

import emailjs from "emailjs-com";

export const sendEmail = async (formElement: HTMLFormElement) => {
  await emailjs
    .sendForm(
      "service_qwoeqx5",
      "template_n0zq65b",
      formElement,
      process.env.KEY_EMAILJS,
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.error(error.text);
      },
    );
};
