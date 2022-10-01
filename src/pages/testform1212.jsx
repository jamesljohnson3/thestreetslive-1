import * as React from "react";
import { useState } from "react";

export default function MyComponent() {
  const [FormForm, FormInput, FormSubmitButton, formErrorMessage, setFormErrorMessage] = useState(() => null);

  return (
    <>
      <FormForm
        sendSubmissionsTo="custom"
        sendSubmissionsToEmail="your@email.com"
        name="My form"
        contentType="application/json"
        method="POST"
        previewState="unsubmitted"
        action="https://u54c6bretuaamtskuinoh1.hooks.webhookrelay.com"
        className="form-form"
        sendWithJs={true}
        successMessage={[
          {
            "@type": "@builder.io/sdk:Element",
            "@version": 2,
            id: "builder-8df1c5c1965543a49ee54415160cfb3a",
            component: {
              name: "Text",
              options: {
                text: "<span>Thanks!</span>",
              },
            },
            responsiveStyles: {
              large: {
                marginTop: "10px",
              },
            },
          },
        ]}
        validate={true}
        errorMessage={[
          {
            "@type": "@builder.io/sdk:Element",
            "@version": 2,
            bindings: {
              "component.options.text":
                "formErrorMessage || block.component.options.text",
            },
            id: "builder-e420337763d2453a881a961091c8b7d3",
            component: {
              name: "Text",
              options: {
                text: "<span>Form submission error :( Please check your answers and try again</span>",
              },
            },
            responsiveStyles: {
              large: {
                marginTop: "10px",
              },
            },
          },
        ]}
        sendingMessage={[
          {
            "@type": "@builder.io/sdk:Element",
            "@version": 2,
            id: "builder-99e8dd744dd54ffcbe42d016fc87a6aa",
            component: {
              name: "Text",
              options: {
                text: "<span>Sending...</span>",
              },
            },
            responsiveStyles: {
              large: {
                marginTop: "10px",
              },
            },
          },
        ]}
      >
        <FormInput
          name="name"
          placeholder="Jane Doe"
          type="file"
          className="form-input"
        />
        <div className="div">
          <span>Enter your email</span>
        </div>
        <FormInput
          required="true"
          name="email"
          placeholder="jane@doe.com"
          className="form-input"
        />
        <FormSubmitButton text="Submit" className="form-submit-button" />
      </FormForm>
      <style jsx>{`
        .form-form {
          display: flex;
          flex-direction: column;
          position: relative;
          margin-top: 15px;
          padding-bottom: 15px;
        }
        .form-input {
          margin-top: 10px;
        }
        .div {
          margin-top: 10px;
        }
        .form-submit-button {
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}