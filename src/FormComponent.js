import React from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  Button,
  TextField,
} from "@material-ui/core";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  country: Yup.string().required("Country is required"),
});

const genders = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const countries = [
  { value: "usa", label: "USA" },
  { value: "canada", label: "Canada" },
  { value: "uk", label: "UK" },
];

function FormComponent() {
  return (
    <Formik
      initialValues={{ name: "", email: "", gender: "", country: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => console.log(values)}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form>
          <TextField
            name="name"
            label="Name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.name && Boolean(errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            name="email"
            label="Email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
          />
          <FormControl
            component="fieldset"
            error={touched.gender && Boolean(errors.gender)}
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              {genders.map((gender) => (
                <FormControlLabel
                  key={gender.value}
                  value={gender.value}
                  control={<Radio />}
                  label={gender.label}
                />
              ))}
            </RadioGroup>
            <ErrorMessage name="gender" />
          </FormControl>
          <FormControl error={touched.country && Boolean(errors.country)}>
            <Select
              name="country"
              value={values.country}
              onChange={handleChange}
            >
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
            <ErrorMessage name="country" />
          </FormControl>
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
}

export default FormComponent;
