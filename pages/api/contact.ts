import type { NextApiRequest, NextApiResponse } from "next";
import { MailService } from "../../src/services/mail";
import { z } from "zod";

type Data = {
  message: string;
};

const ContactBody = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(50000),
});

export type ContactBody = z.infer<typeof ContactBody>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      ContactBody.parse(req.body);
      await MailService.getInstance().sendMail(req.body);
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
