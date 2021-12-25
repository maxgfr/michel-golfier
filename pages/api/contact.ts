import type { NextApiRequest, NextApiResponse } from "next";
import { MailService } from "../../src/services/mail";

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      await MailService.getInstance().sendMail(
        req.body.name,
        req.body.email,
        req.body.message
      );
      res.status(201).json({ message: `Le message a été envoyé avec succès.` });
    } catch {
      res.status(500).json({
        message: `Une erreur est survenue, veuillez réessayer plus tard.`,
      });
    }
  } else {
    res.status(404).json({ message: `Cette page n'existe pas.` });
  }
}
