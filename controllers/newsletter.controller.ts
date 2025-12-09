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
          `Successfully created an audience. The audience id is ${response.id}.`
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
  }
);

export const saveEmail = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    let { email } = req.body;
    console.log("here is the email in the saveEmail function in my newleteer route",email)

    const NewNewsletter = new NewsletterModel({
      email,
    });

    NewNewsletter.save()
      .then((_) => {
        async function run() {
          const response = await mailchimp.lists.addListMember(
            process.env.MAILCHIMP_AUDIENCE_ID,
            {
              email_address: email,
              status: "subscribed",
            }
          );

          console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
          );
          if (response.id) {
            return res.status(200).json({ message: response.id });
          } else {
            console.log(response);
            return res.status(500).json({ message: response });
          }
        }

        run();
      })
      .catch((error) => {
        console.log(error.message);
        return res.status(500).json({
          message: "Newsletter not created",
        });
      });
  }
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
  }
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
  }
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
  }
);
