import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { Layout } from "../src/components/layout";
import { Formik, Form, Field } from "formik";

import * as Yup from "yup";
import { useState } from "react";
import { BASE_URL } from "../src/config";
import { SEO } from "../src/components/seo";
import { WEBSITE_ID, breadcrumbSchema } from "../src/utils/jsonld";

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
  website: string;
};

enum Status {
  SUCCESS,
  ERROR,
  IDLE,
}

const Page: NextPage = () => {
  const initialValues: FormValues = { name: "", email: "", message: "", website: "" };
  const [status, setStatus] = useState<Status>(Status.IDLE);
  const toast = useToast();

  const onSubmit = async (values: FormValues, actions: any): Promise<void> => {
    setStatus(Status.IDLE);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setStatus(Status.SUCCESS);
        toast({
          title: "Message envoyé !",
          description: "Merci pour votre message. Je vous répondrai bientôt.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        actions.resetForm();
      } else {
        throw new Error("Erreur d'envoi");
      }
    } catch (error) {
      setStatus(Status.ERROR);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <>
      <SEO
        title="Michel Golfier | Contact"
        description="Contactez-moi sur cette page pour plus d'informations."
        url={`${BASE_URL}/contact`}
        jsonLd={[
          {
            "@type": "ContactPage",
            "@id": `${BASE_URL}/contact#webpage`,
            url: `${BASE_URL}/contact`,
            name: "Michel Golfier | Contact",
            isPartOf: { "@id": WEBSITE_ID },
            description:
              "Contactez Michel Golfier, auteur auvergnat, pour plus d'informations sur ses ouvrages.",
          },
          breadcrumbSchema([
            { name: "Accueil", item: BASE_URL },
            { name: "Contact" },
          ]),
        ]}
      />
      <Layout>
        {/* Page title */}
        <Box textAlign="center" mb={10}>
          <Text
            as="h1"
            fontFamily="heading"
            fontWeight="700"
            fontSize={{ base: "3xl", md: "4xl" }}
            color="brand.800"
            fontStyle="italic"
          >
            Contact
          </Text>
          <Box display="flex" alignItems="center" justifyContent="center" my={4}>
            <Box flex={1} maxW="60px" h="1px" bg="brand.300" />
            <Text mx={4} color="brand.400" fontSize="lg">&#9671;</Text>
            <Box flex={1} maxW="60px" h="1px" bg="brand.300" />
          </Box>
          <Text fontSize="md" color="warmGray.600" fontStyle="italic">
            N&rsquo;hésitez pas à me contacter pour toute question sur mes ouvrages.
          </Text>
        </Box>

        <Box maxW="600px" mx="auto">
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
              <Field name="website">
                {({ field }: any) => (
                  <Box
                    position="absolute"
                    left="-9999px"
                    aria-hidden="true"
                    tabIndex={-1}
                  >
                    <Input
                      {...field}
                      type="text"
                      id="website"
                      name="website"
                      autoComplete="off"
                      tabIndex={-1}
                    />
                  </Box>
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
                  <Text color="green.600" fontWeight="600">
                    Votre message a bien été envoyé, je vous répondrai dans les
                    plus brefs délais.
                  </Text>
                </Box>
              )}
              {status === Status.ERROR && (
                <Box mt={4}>
                  <Text color="red.600" fontWeight="600">
                    Une erreur est survenue lors de l&apos;envoi de votre
                    message, veuillez réessayer plus tard.
                  </Text>
                </Box>
              )}
            </Form>
          )}
        </Formik>
        </Box>
      </Layout>
    </>
  );
};

export default Page;
