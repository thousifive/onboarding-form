import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import React, { useState } from "react";
import Approved from "../approved.png";
import User from "../userIcon.png";
import Users from "../usersIcon.png";

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

export default function Home() {
  return (
    <div>
      <FormikStepper
        initialValues={{
          fullname: "",
          displayname: "",
          workspacename: "",
          workspaceurl: "",
        }}
        onSubmit={async (values) => {
          await sleep(3000);
          console.log("values", values);
        }}
      >
        <FormikStep>
          <h1>Welcome! First things first...</h1>
          <p>You can always change them later.</p>
          <Box padding={1}>
            <Field
              // fullWidth
              name="fullname"
              component={TextField}
              label="Full Name"
              placeholder="John Doe"
            />
          </Box>
          <Box padding={1}>
            <Field
              // fullWidth
              name="displayname"
              component={TextField}
              label="Display Name"
              placeholder="JohnDoe"
            />
          </Box>
        </FormikStep>
        <FormikStep>
          <h1>Let's set up a home for all your work</h1>
          <p>You can always create another workspace later.</p>
          <Box padding={1}>
            <Field
              name="workspacename"
              component={TextField}
              label="Workspace Name"
              placeholder="Enter Workspace Name"
            />
          </Box>
          <Box padding={1}>
            <Field
              // fullWidth
              name="workspaceurl"
              type="url"
              component={TextField}
              label="Workspace URL"
              placeholder="www.eden.com/"
            />
          </Box>
        </FormikStep>
        <FormikStep>
          <h1>How are you planning to use Eden?</h1>
          <p>We'll streamline your setup experience accordingly</p>
          <Grid item xs={12} className="third-step-cards" margin={1}>
            <Grid container justifyContent="center" spacing={1}>
              <Grid item>
                <Card sx={{ height: 185, width: 185 }}>
                  <CardContent>
                    <img src={User} alt="User Icon" />
                    <h3>For myself</h3>
                    <p>Write better. Think more clearly. Stay organized.</p>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card alignItems="start" sx={{ height: 185, width: 185 }}>
                  <CardContent>
                    <img src={Users} alt="User Icon" />
                    <h3>With my team</h3>
                    <p>Wikis, docs, tasks & projects, all in one place.</p>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </FormikStep>
        <FormikStep>
          <div>
            <img src={Approved} alt="approved"></img>
            <h1>Congratulations, Eren!</h1>
            <p>You have completed onboarding, you can start using the Eden!</p>
          </div>
        </FormikStep>
      </FormikStepper>
    </div>
  );
}

export function FormikStep({ children }) {
  return <div>{children}</div>;
}

export function FormikStepper({ children, ...props }) {
  const [step, setStep] = useState(0);
  const currentChild = children[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === children.length - 1;
  }

  return (
    <Formik
      {...props}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper className="stepper" alternativeLabel activeStep={step}>
            {children.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}

          <Grid
            container
            flex
            alignItems="center"
            justifyContent="center"
            padding={2}
          >
            <Grid item xs="auto" margin={2}>
              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                Create workspace
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}
