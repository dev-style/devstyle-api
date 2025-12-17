import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import NewsletterModel from "../models/newsletter.model";

const mailchimp = require("@mailchimp/mailchimp_marketing");

// edit goodie

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export const createAudience = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(true, req);

      const event = {
        name: "_DevStyle Newletter",
      };

      const footerContactInfo = {
        company: "_DevStyle",
        address1: "Bonamoussadi",
        city: "Douala",
        state: "Littoral",
        zip: "237",
        country: "CM",
      };

      const campaignDefaults = {
        from_name: "_DevStyle",
        from_email: "contact.devstyle@gmail.com",
        subject: "_DevStyle Newsletter",
        language: "FR_FR",
      };

      async function run() {
        const response = await mailchimp.lists.createList({
          name: event.name,
          contact: footerContactInfo,
          permission_reminder: "permission_reminder",
          email_type_option: true,
          campaign_defaults: campaignDefaults,
        });

        console.log(
          `Successfully created an audience. The audience id is ${response.id}.`,
        );
        if (response.id) {
          return res.status(200).json({ message: response.id });
        } else {
          console.log(response);
          return res.status(500).json({ message: response });
        }
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  },
);

export const saveEmail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    console.log(
      "here is the email in the saveEmail function in my newleteer route",
      email,
    );

    if (!email || typeof email !== "string" || email.trim() === "") {
      return res.status(400).json({
        message:
          "L'adresse email est requise et doit être une chaîne non vide.",
      });
    }

    try {

      const NewNewsletter = new NewsletterModel({ email });
      await NewNewsletter.save();

      const listId = process.env.MAILCHIMP_AUDIENCE_ID;

      const subscriberHash = email.toLowerCase(); 

      let response;
      try {
        response = await mailchimp.lists.addListMember(listId, {
          email_address: email,
          status: "subscribed",
        });
      } catch (mailchimpError: any) {
        const errorBody = JSON.parse(mailchimpError.response.text);

        if (
          mailchimpError.status === 400 &&
          errorBody.title === "Member Exists"
        ) {
          console.log(`Email ${email} est déjà abonné. Poursuite du succès.`);
          return res.status(200).json({
            message: "Success (Email déjà abonné)",
            mailchimpId: errorBody.id,
          });
        }

        console.error("Erreur détaillée Mailchimp:", errorBody);

        return res.status(500).json({
          message: "Échec de l'ajout à la newsletter Mailchimp.",
          details: errorBody.detail || "Erreur de requête Mailchimp.",
        });
      }

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`,
      );

      return res.status(200).json({
        message: "Email abonné avec succès.",
        mailchimpId: response.id,
      });
    } catch (error: any) {
      console.error("Erreur Mongoose ou autre:", error.message);

      if (error.code === 11000) {
        return res.status(409).json({
          message: "Cet email est déjà enregistré dans notre base de données.",
        });
      }

      return res.status(500).json({
        message: "Erreur interne lors de l'enregistrement de la newsletter.",
      });
    }
  },
);

export const getAllEmails = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await NewsletterModel.find();
    res.status(200).json({
      message: results,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

export const getOneEmail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await NewsletterModel.findOne({ _id: req.params.id });
    res.status(200).json({
      message: results,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);

export const deleteOneEmail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const results = await NewsletterModel.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: results,
    });
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  },
);
