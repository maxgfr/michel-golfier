export const generateMailTemplate = (
  name: string,
  email: string,
  message: string
): string => {
  return `
    <h1>Nouveau message de votre site</h1>
    <p>
      <strong>Nom:</strong> ${name}
    </p>
    <p>
      <strong>Email:</strong> ${email}
    </p>
    <p>
      <strong>Message:</strong> ${message}
    </p>
  `;
};

export const removeHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
