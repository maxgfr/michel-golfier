import xss from "xss";

export const generateMailTemplate = (
  name: string,
  email: string,
  message: string
): string => {
  // Sanitize les entrées pour éviter les attaques XSS
  const safeName = xss(name);
  const safeEmail = xss(email);
  const safeMessage = xss(message);
  
  return `
    <h1>Nouveau message de votre site</h1>
    <p>
      <strong>Nom:</strong> ${safeName}
    </p>
    <p>
      <strong>Email:</strong> ${safeEmail}
    </p>
    <p>
      <strong>Message:</strong> ${safeMessage}
    </p>
  `;
};

export const removeHtmlTags = (html: string): string => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};
