import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../src/components/layout";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { useState } from "react";
import { NextSeo } from "next-seo";
import { BASE_URL } from "../src/config";

const FormSchema = Yup.object().shape({
  name: Yup.string()
    .max(50, "Nom trop long")
    .required("Veuillez entrer votre nom"),
  message: Yup.string()
    .min(10, "Message trop court!")
    .max(50000, "Message trop long")
    .required("Veuillez entrer votre message"),
  email: Yup.string()
    .email("Email non valide")
    .required("Veuillez compléter votre email"),
});

type FormValues = {
  name: string;
  email: string;
  message: string;
};

enum Status {
  SUCCESS,
  ERROR,
  IDLE,
}

const Page: NextPage = () => {
  const initialValues: FormValues = { name: "", email: "", message: "" };
  const [status, setStatus] = useState<Status>(Status.IDLE);

  const onSubmit = async (values: FormValues, actions: any): Promise<void> => {
    setStatus(Status.IDLE);
    await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(response);
      })
      .then(() => {
        setStatus(Status.SUCCESS);
      })
      .catch(() => {
        setStatus(Status.ERROR);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <>
      <NextSeo
        title="Michel Golfier | Contact"
        description="Contactez-moi sur cette page pour plus d'informations."
        openGraph={{
          url: `${BASE_URL}/contact`,
          title: "Michel Golfier | Contact",
          description: "Contactez-moi sur cette page pour plus d'informations.",
          site_name: "Michel Golfier",
          type: "website",
          locale: "fr_FR",
        }}
      />
      <Layout>
        <Text as="h1" fontFamily="Oooh Baby" fontWeight="600" fontSize="4xl">
          Contactez-moi via ce formulaire
        </Text>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validationSchema={FormSchema}
        >
          {props => (
            <Form>
              <Field name="name">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.name && form.touched.name}
                    mt={4}
                  >
                    <FormLabel htmlFor="name">Nom</FormLabel>
                    <Input {...field} id="name" placeholder="Votre nom" />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="email">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.email && form.touched.email}
                    mt={4}
                  >
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input {...field} id="email" placeholder="Votre email" />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="message">
                {({ field, form }: any) => (
                  <FormControl
                    isInvalid={form.errors.message && form.touched.message}
                    mt={4}
                  >
                    <FormLabel htmlFor="message">Message</FormLabel>
                    <Textarea
                      {...field}
                      id="message"
                      placeholder="Votre message"
                    />
                    <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                mt={8}
                isLoading={props.isSubmitting}
                type="submit"
                name="Envoyer un message"
                aria-label="Envoyer un message"
              >
                Envoyer mon message
              </Button>
              {status === Status.SUCCESS && (
                <Box mt={4}>
                  <Text color="#267808" fontWeight="600">
                    Votre message a bien été envoyé, je vous répondrai dans les
                    plus brefs délais.
                  </Text>
                </Box>
              )}
              {status === Status.ERROR && (
                <Box mt={4}>
                  <Text color="#e71313" fontWeight="600">
                    Une erreur est survenue lors de l&apos;envoi de votre
                    message, veuillez réessayer plus tard.
                  </Text>
                </Box>
              )}
            </Form>
          )}
        </Formik>
      </Layout>
    </>
  );
};

export default Page;
