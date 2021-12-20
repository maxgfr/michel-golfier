import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../src/components/layout";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";

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

const Page: NextPage = () => {
  const initialValues: FormValues = { name: "", email: "", message: "" };

  const onSubmit = (values: FormValues, actions: any): void => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
    }, 1000);
  };

  return (
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
                  <FormLabel htmlFor="name">Prénom</FormLabel>
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
                  <Input {...field} id="message" placeholder="Votre message" />
                  <FormErrorMessage>{form.errors.message}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Button mt={8} isLoading={props.isSubmitting} type="submit">
              Envoyer mon message
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default Page;
