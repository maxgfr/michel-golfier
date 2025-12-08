import type { NextApiRequest, NextApiResponse } from "next";
import { MailService } from "../../src/services/mail";
import { z } from "zod";

type Data = {
  message: string;
};

// Rate limiting simple en mémoire (en production, utiliser Redis)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 3; // 3 requêtes par minute max

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now - record.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }
  
  record.count++;
  return record.count > RATE_LIMIT_MAX;
}

// Détection de spam : caractères aléatoires sans espaces ni sens
function looksLikeSpam(text: string): boolean {
  // Si le texte contient trop de majuscules aléatoires mélangées
  const randomPattern = /^[A-Za-z]{15,}$/;
  if (randomPattern.test(text.trim())) {
    return true;
  }
  
  // Ratio majuscules/minuscules anormal (alternance fréquente)
  const upperLowerAlternations = (text.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length;
  if (text.length > 10 && upperLowerAlternations > text.length * 0.3) {
    return true;
  }
  
  return false;
}

const ContactBody = z.object({
  name: z.string().min(1).max(50),
  email: z.string().email(),
  message: z.string().min(10).max(50000),
  // Honeypot : ce champ doit rester vide (les bots le remplissent)
  website: z.string().max(0).optional(),
});

export type ContactBody = z.infer<typeof ContactBody>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    try {
      // Récupérer l'IP pour le rate limiting
      const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0] || 
                 req.socket.remoteAddress || 
                 "unknown";
      
      // Vérifier le rate limit
      if (isRateLimited(ip)) {
        res.status(429).json({
          message: "Trop de requêtes. Veuillez réessayer dans une minute.",
        });
        return;
      }
      
      const body = ContactBody.parse(req.body);
      
      // Honeypot : si le champ website est rempli, c'est un bot
      if (body.website && body.website.length > 0) {
        // On renvoie un succès pour ne pas alerter le bot
        res.status(201).json({ message: "Le message a été envoyé avec succès." });
        return;
      }
      
      // Détection de spam
      if (looksLikeSpam(body.name) || looksLikeSpam(body.message)) {
        res.status(400).json({
          message: "Votre message semble invalide. Veuillez réessayer.",
        });
        return;
      }
      
      await MailService.getInstance().sendMail(body);
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
